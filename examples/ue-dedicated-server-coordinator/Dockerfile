FROM ubuntu:24.04

WORKDIR /opt/ue-server

COPY Server ./Server

EXPOSE 7777/udp

CMD ["./Server/YourProjectServer.sh", "/Game/Maps/DedicatedEntry", "-log", "-port=7777"]
