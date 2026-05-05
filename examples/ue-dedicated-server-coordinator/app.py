import os
import re
import signal
import subprocess
import threading
import uuid
from dataclasses import asdict, dataclass
from functools import wraps
from pathlib import Path

from flask import Flask, Response, jsonify, request


ADMIN_TOKEN = os.environ.get("COORDINATOR_ADMIN_TOKEN", "")
UE_SERVER_EXECUTABLE = os.environ.get("UE_SERVER_EXECUTABLE", "")
UE_SERVER_LOG_DIR = Path(os.environ.get("UE_SERVER_LOG_DIR", "logs"))
UE_PORT_START = int(os.environ.get("UE_PORT_START", "7777"))
UE_PORT_END = int(os.environ.get("UE_PORT_END", "7799"))
DEFAULT_MAP_NAME = "/Game/Maps/DedicatedEntry"
STOP_TIMEOUT_SECONDS = 10
DEFAULT_LOG_TAIL_BYTES = 64 * 1024
MAX_LOG_TAIL_BYTES = 256 * 1024

app = Flask(__name__)

if not ADMIN_TOKEN or ADMIN_TOKEN == "change-me":
    raise RuntimeError("Set COORDINATOR_ADMIN_TOKEN to a non-placeholder value before starting the coordinator.")


@dataclass
class RoomInstance:
    room_id: str
    map_name: str
    port: int
    pid: int
    log_path: str
    status: str


rooms: dict[str, RoomInstance] = {}
processes: dict[str, subprocess.Popen] = {}
state_lock = threading.Lock()


def require_admin_token(route_handler):
    @wraps(route_handler)
    def wrapped(*args, **kwargs):
        if request.headers.get("X-Admin-Token") != ADMIN_TOKEN:
            return jsonify({"error": "unauthorized"}), 401
        return route_handler(*args, **kwargs)

    return wrapped


def allocate_port() -> int | None:
    used_ports = {room.port for room in rooms.values() if room.status == "running"}
    for port in range(UE_PORT_START, UE_PORT_END + 1):
        if port not in used_ports:
            return port
    return None


def safe_room_id(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]", "_", value)


def is_safe_room_id(value: str) -> bool:
    return bool(re.fullmatch(r"[A-Za-z0-9_.-]+", value))


def start_server(room_id: str, map_name: str, port: int) -> RoomInstance:
    if not UE_SERVER_EXECUTABLE:
        raise RuntimeError("UE_SERVER_EXECUTABLE is not configured")

    UE_SERVER_LOG_DIR.mkdir(parents=True, exist_ok=True)
    log_path = UE_SERVER_LOG_DIR / f"{safe_room_id(room_id)}.log"
    command = [UE_SERVER_EXECUTABLE, map_name, "-log", f"-port={port}"]

    with log_path.open("ab") as log_file:
        process = subprocess.Popen(
            command,
            stdout=log_file,
            stderr=subprocess.STDOUT,
            start_new_session=(os.name != "nt"),
        )

    room = RoomInstance(
        room_id=room_id,
        map_name=map_name,
        port=port,
        pid=process.pid,
        log_path=str(log_path),
        status="running",
    )
    processes[room_id] = process
    rooms[room_id] = room
    return room


def refresh_room_status(room_id: str) -> RoomInstance | None:
    room = rooms.get(room_id)
    if room is None:
        return None

    process = processes.get(room_id)
    if process is None:
        if room.status == "running":
            room.status = "unknown"
        return room

    exit_code = process.poll()
    if exit_code is None:
        room.status = "running"
    else:
        room.status = f"exited:{exit_code}"
        processes.pop(room_id, None)
    return room


def room_payload(room: RoomInstance):
    return asdict(room)


@app.get("/health")
def health():
    with state_lock:
        room_count = len(rooms)
    return jsonify({"status": "ok", "rooms": room_count})


@app.get("/rooms")
@require_admin_token
def list_rooms():
    with state_lock:
        for room_id in list(rooms):
            refresh_room_status(room_id)
        return jsonify({"rooms": [room_payload(room) for room in rooms.values()]})


@app.post("/rooms")
@require_admin_token
def create_room():
    payload = request.get_json(silent=True) or {}
    room_id = str(payload.get("room_id") or uuid.uuid4())
    map_name = str(payload.get("map_name") or DEFAULT_MAP_NAME)

    if not is_safe_room_id(room_id):
        return jsonify({"error": "room_id may only contain letters, numbers, underscore, dash, and dot"}), 400

    with state_lock:
        if room_id in rooms:
            return jsonify({"error": "room already exists"}), 409

        for existing_room_id in list(rooms):
            refresh_room_status(existing_room_id)

        port = allocate_port()
        if port is None:
            return jsonify({"error": "no ports available"}), 503

        try:
            room = start_server(room_id, map_name, port)
        except Exception as exc:
            rooms.pop(room_id, None)
            processes.pop(room_id, None)
            return jsonify({"error": str(exc)}), 500

        return jsonify(room_payload(room)), 201


@app.get("/rooms/<room_id>")
@require_admin_token
def get_room(room_id):
    with state_lock:
        room = refresh_room_status(room_id)
        if room is None:
            return jsonify({"error": "room not found"}), 404
        return jsonify(room_payload(room))


@app.delete("/rooms/<room_id>")
@require_admin_token
def delete_room(room_id):
    with state_lock:
        room = refresh_room_status(room_id)
        if room is None:
            return jsonify({"error": "room not found"}), 404

        process = processes.pop(room_id, None)
        room.status = "stopping"

    if process is not None and process.poll() is None:
        if os.name == "nt":
            process.terminate()
        else:
            os.killpg(process.pid, signal.SIGTERM)

        try:
            process.wait(timeout=STOP_TIMEOUT_SECONDS)
        except subprocess.TimeoutExpired:
            if os.name == "nt":
                process.kill()
            else:
                os.killpg(process.pid, signal.SIGKILL)
            process.wait(timeout=STOP_TIMEOUT_SECONDS)

    with state_lock:
        room = rooms.pop(room_id, room)
        room.status = "stopped"
        return jsonify(room_payload(room))


@app.get("/rooms/<room_id>/logs")
@require_admin_token
def get_room_logs(room_id):
    try:
        tail_bytes = int(request.args.get("bytes", DEFAULT_LOG_TAIL_BYTES))
    except ValueError:
        return jsonify({"error": "bytes must be an integer"}), 400

    tail_bytes = max(1, min(tail_bytes, MAX_LOG_TAIL_BYTES))

    with state_lock:
        room = rooms.get(room_id)
        if room is None:
            return jsonify({"error": "room not found"}), 404
        log_path = Path(room.log_path)

    if not log_path.exists():
        return Response("", mimetype="text/plain")

    file_size = log_path.stat().st_size
    with log_path.open("rb") as log_file:
        log_file.seek(max(file_size - tail_bytes, 0))
        content = log_file.read(tail_bytes)

    return Response(content, mimetype="text/plain")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("COORDINATOR_HTTP_PORT", "8080")))
