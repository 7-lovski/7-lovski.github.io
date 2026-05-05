# UE OnlineSubsystem 与 Dedicated Server 博客规划

日期：2026-05-01

## 背景

这组博客基于论文《基于 Unreal Engine OnlineSubsystem 的多人联机系统实践与关键问题研究》扩展而来。论文已经覆盖 UE 多人联机基础、OnlineSubsystem 抽象、Steam/EOS 差异、Dedicated Server 部署、Coordinator、调试分层和状态机。博客不直接复述论文，而是转成面向开发者的工程教程：给出配置、代码链路、排查方法和架构边界。

目标读者是已经了解 UE 基础玩法开发，但没有系统接入过 OnlineSubsystem、Steam、EOS 或 Dedicated Server 的开发者。

## 总体拆分

计划拆成两篇博客：

1. 《UE OnlineSubsystem 多人联机实践：Steam、EOS 与会话系统完整拆解》
2. 《UE Dedicated Server 部署实践：Docker、WSL/Ubuntu 与 Python Coordinator》

第一篇聚焦平台在线服务接入、身份认证、会话创建/搜索/加入、Steam/EOS 差异。第二篇聚焦真正承载游戏实例的服务端构建、部署、容器化、Python Coordinator 和网络传输机制。

两篇文章共享一个核心边界：OnlineSubsystem 负责平台在线服务接入，UE Replication/RPC 负责游戏世界同步，Dedicated Server 负责权威游戏实例，自定义后端/Coordinator 负责业务数据和实例管理。不要把 EOS、Steam 或 OnlineSubsystem 写成完整游戏服务器方案。

## 已确认写作约束

### 文章风格

采用“教程 + 复盘混合型”。正文要能让读者跟着理解和复现关键流程，同时穿插为什么这样设计、哪些边界容易误解、哪些问题来自实际工程踩坑。

语言风格采用教学型：术语准确，但不写成论文；复杂概念先解释“解决什么问题”，再解释“怎么配置/怎么写代码/错了会怎样”。可以穿插经验总结，但不写成日记。

### 页面排版

以纯技术文章排版为主，技术手册模块为辅。正文保持连续、干净、可阅读；在关键节点加入少量检查清单、排查表和对比表，例如 EOS 配置排查、搜不到房间排查、Docker 部署排查。

### 代码呈现

代码采用“先完整类，再分段拆解”的方式：

- 正文直接展示关键函数和关键配置。
- 完整 `UOnlineSessionManager.h/.cpp`、完整 Coordinator Flask App、完整 Dockerfile、完整 `docker-compose.yml` 放在折叠面板中。
- 每个关键代码块要说明它依赖什么前置状态、解决什么问题、失败时该看哪一层日志。

代码块配色目标采用 Rider 中接近 Visual Studio 的代码配色风格。正式实现时优先检查 Astro/Markdown 当前使用的高亮方案；如果可配置 Shiki 主题，则选择最接近 Visual Studio/Rider VS 配色的主题；如果当前站点只依赖 CSS，则在 `pre`、`code` 和 token 样式中模拟该风格。验收重点是 C++、ini、Python、Dockerfile、YAML 代码块在浅色页面上清晰、稳定、接近 IDE 阅读体验。

### 图表形式

采用混合方案：

- 流程图、状态机、组件关系图使用 Mermaid。
- Steam/EOS、Session/Lobby、Listen/Dedicated、UDP/TCP 等对比使用 Markdown 表格。
- 如后续需要更强视觉表现，再把核心架构图替换成图片。

### UE 版本与 API 口径

正文以 UE 5.6 语境为主，代码以旧 `OnlineSubsystem` C++ 接口为主。EOS 部分单独说明 UE 5.6+ 的 `OnlineServices`、`OnlineServicesEOS`、`OnlineServicesEOSGS` 趋势、配置差异和不要混用的原因。

可复制代码不要把旧 `OnlineSubsystem` 和新 `OnlineServices` API 混在同一个实现里。

只讲 C++，不写 Blueprint 版本。若需要暴露给 UI，可以在 C++ 类中保留清晰的 public 方法边界，但正文不展开蓝图节点封装。

### Steam 与 EOS 篇幅权重

第一篇以 EOS 为主，Steam 为辅。EOS 会详细讲 Developer Portal 产品设置、Artifact、Client、Client Policy、登录方式、Session/Lobby、权限和跨平台边界。Steam 用作对照，帮助读者理解 AppID、Steam 客户端、Lobby/Session、`OnlineSubsystemSteam` 和平台内联机。

写作逻辑可以是：先理解 EOS 这条更复杂的完整链路，再回看 Steam 会更清楚。

实践记忆边界：EOS 部分明确以“曾配置过 EOS 官网产品相关内容”为实践背景，登录方式如 `AccountPortal`、Dev Auth Tool、`ExchangeCode` 若没有明确项目记录，则按官方常见路径和需要核验项描述，不写成亲测结果。Steam 部分可以提到 Spacewar/`SteamDevAppId=480` 作为测试 AppID，但要说明它只适合开发测试，正式项目需要自己的 AppID。

### EOS 产品设置深度

EOS 产品设置写到工程排错级：

- 解释 Product、Sandbox、Deployment、Client、Client Policy、Artifact 是什么。
- 说明它们在 Developer Portal 中大致如何配置。
- 映射到 UE 配置字段。
- 说明配错后的典型症状，例如登录失败、Session 创建失败、搜索结果为空、权限不足。
- 提供“Portal 字段 -> UE 配置 -> 影响功能 -> 常见错误”表格。

### Coordinator 代码深度

第二篇中的 Coordinator 采用“正文最小可运行 + 折叠完整版本”：

- 正文讲核心设计：端口池、房间记录、启动进程、停止进程、健康检查。
- 正文展示关键函数：`allocate_port()`、`start_server()`、`stop_server()`、`create_room()`。
- 折叠面板放完整 Flask App。
- 状态持久化、超时回收、Docker SDK、日志轮转只作为可扩展方向简要说明。

Coordinator 主线以 Dedicated Server 为目标。正文中的默认实现可以先管理本机 UE server 进程，便于最小可运行；Docker 版本作为部署路径展开，说明如何通过 Dockerfile/Compose 管理打包好的 server 产物。代码要尽量实际可用，避免只写伪代码。

完整示例代码可以单独放到 `examples/` 目录，文章通过 MDX 引用或同步展示关键片段，便于后续修改维护。

Coordinator API 命名采用：

- `POST /rooms`
- `GET /rooms`
- `GET /rooms/{room_id}`
- `DELETE /rooms/{room_id}`
- `GET /rooms/{room_id}/logs`
- `GET /health`

示例端口规划：

- UE Dedicated Server 默认 `7777/udp`
- 多实例端口池 `7777-7799/udp`
- Coordinator Flask App `8080/tcp`

Coordinator 示例中加入简单 `X-Admin-Token` 请求头鉴权，作为教学级安全边界。正文要说明这不是完整生产认证系统，生产环境仍需要更严格的鉴权、网络隔离和审计。

Dockerfile 示例使用当前最新稳定 Ubuntu 基础镜像口径，并提醒读者按项目实际运行库依赖调整。Dockerfile 假设 UE Dedicated Server 已经打包好，不负责在容器内编译 UE 项目。

### 网络传输机制深度

UDP/TCP 部分写到概念级 + 工程级，不进入 UE NetDriver 源码级分析。

重点说明：

- UE 游戏同步常见路径基于 UDP/IP NetDriver 或平台 socket。
- UDP 适合低延迟、高频状态同步。
- UE 在 UDP 之上实现可靠/不可靠消息、Actor channel、重传和顺序等机制。
- Reliable RPC 是 UE 网络层可靠语义，不等于 TCP。
- TCP 更适合 HTTP API、后台管理、Coordinator、工具服务通信。
- Coordinator/Flask App 走 HTTP/TCP，UE 游戏实例连接走游戏网络端口，职责不同。

文章需要包含关键日志与排查关键词，例如 `LogOnline`、`LogOnlineSession`、`NetDriver`、`TravelFailure`、连接超时和端口监听相关日志。可以包含“不要这么做”小节，用于提醒不要把管理接口裸露公网、不要把真实密钥提交到仓库、不要把 Coordinator 当作游戏同步层。

### 语言与多语言策略

第一阶段先写中文正文。结构和 frontmatter 要预留后续英文以及第三语言补全空间，但当前不把翻译作为正文完成的阻塞项。

### 站点组织方式

两篇文章作为“UE 多人联机系列”发布到 `src/content/blog`：

- 第一篇结尾引到第二篇：OnlineSubsystem 解决发现和会话，但真正部署还需要 Dedicated Server。
- 第二篇开头回扣第一篇：OnlineSubsystem 管会话发现，Dedicated Server 和 Coordinator 管实例运行。
- 后续可以轻量更新相关项目页，链接到这组文章。

两篇文章使用 MDX。文章应包含目录 TOC 和系列上一篇/下一篇导航。长代码使用更精致的折叠组件，而不是只依赖裸 `<details>`；组件风格应和现有项目详情页的视觉系统一致。

图片可以先预留，也可以在后续由用户补充。正式写作时不要依赖图片作为必需信息；核心流程和架构先用 Mermaid/表格表达。

frontmatter 的发布时间先不固定，等正式发布时再确定 `pubDate`；`updatedDate` 也先不写，后续多语言补全或大修时再补。建议 slug：

- `ue-online-subsystem-steam-eos-multiplayer.mdx`
- `ue-dedicated-server-docker-python-coordinator.mdx`

标题保留 `UE`、`OnlineSubsystem`、`Steam`、`EOS`、`Dedicated Server`、`Docker`、`Python Coordinator` 等英文技术词，不强行翻译成纯中文标题。

### 引用方式

正文关键事实处直接加官方文档链接，文末再统一列参考资料。避免每段都脚注化，以免影响博客阅读节奏。

不需要专门标注“哪些内容来自论文实践，哪些内容来自官方文档/通用经验”。但对不确定的实践细节要在正文中用谨慎表述，例如“常见配置方式”“需要根据项目实际核验”，不要写成已经完成过的项目验证。

### 术语统一

正文统一使用以下术语：

- Session：会话
- Lobby：大厅
- Dedicated Server：专用服务器
- Listen Server：监听服务器
- Replication：复制
- RPC：远程过程调用
- Travel：地图跳转/连接跳转，首次出现时解释

示例代码前或完整示例折叠区域前加教学免责声明：示例用于理解架构和流程，生产环境需要补充鉴权、持久化、资源隔离、错误恢复、日志轮转和密钥管理。

## 博客一设计：OnlineSubsystem

### 标题

《UE OnlineSubsystem 多人联机实践：Steam、EOS 与会话系统完整拆解》

### 核心目标

让读者理解 OnlineSubsystem 在 UE 多人联机中的位置，并能看懂 Steam/EOS 的配置、登录、会话创建、会话搜索、加入和 Travel 的完整异步链路。

### 文章结构

1. 引入：为什么 UE 联机不只是 Replication
   - 说明“角色能同步”不等于“玩家能登录、搜索房间、加入房间、跨平台发现”。
   - 区分游戏世界同步和平台在线服务。

2. 三层模型：Replication/RPC、OnlineSubsystem、业务后端
   - Replication/RPC：同步 Actor、属性、RPC 和游戏状态。
   - OnlineSubsystem：身份、会话、好友、邀请、Presence、平台服务。
   - 自定义后端：账号映射、战绩、玩家数据、房间规则、服务器实例管理。

3. OnlineSubsystem 接口体系
   - `IOnlineSubsystem`：获取当前平台子系统。
   - `IOnlineSession`：创建、搜索、加入、销毁会话。
   - `IOnlineIdentity`：登录、账号标识、本地用户。
   - 强调统一接口不等于统一行为。

4. Steam 接入实践
   - 插件：`OnlineSubsystem`、`OnlineSubsystemSteam`。
   - 运行条件：Steam 客户端、Steam AppID、`steam_appid.txt`、正式 AppID。
   - 配置：`DefaultPlatformService=Steam`、`SteamDevAppId`、NetDriver。
   - Session/Lobby：`bUsesPresence`、`bUseLobbiesIfAvailable`、搜索条件。
   - 常见误区：`CreateSession` 成功不等于会话一定可见。

5. EOS 产品设置与 UE 配置
   - Developer Portal 概念：Product、Sandbox、Deployment、Client、Client Policy、Artifact。
   - UE OSS EOS 配置和 Artifact 映射。
   - 登录方式：`AccountPortal`、`Developer`、`ExchangeCode`。
   - 权限策略：普通客户端、专用服务器、可信后端的权限应区分。
   - 跨平台注意：Steam + EOS 不是启用插件就自动互通。

6. Session 与 Lobby 的区别
   - Session 更接近一场游戏实例或比赛的发现/加入记录。
   - Lobby 更接近赛前组队、共享状态、邀请和准备流程。
   - Lobby 可以保存 Session ID，引导成员进入同一个游戏实例，但二者不是同一个概念。

7. 完整代码链路
   - 获取 `IOnlineSubsystem` 和 `IOnlineSession`。
   - 绑定 delegate。
   - 登录完成后创建会话。
   - `CreateSession` 成功后 `ServerTravel("?listen")`。
   - 客户端 `FindSessions`。
   - `JoinSession` 后 `GetResolvedConnectString`。
   - `ClientTravel` 进入游戏地图。

8. 为什么会话创建成功但搜不到
   - 平台未初始化。
   - 登录状态无效。
   - Steam AppID 或 EOS Deployment 不一致。
   - Session 参数和 Search 参数不匹配。
   - 未广告、Presence/Lobby 设置不一致。
   - 旧 Session 未销毁。
   - 客户端只完成 JoinSession，未完成 Travel。

9. 技术选型建议
   - 只发 Steam：优先 Steam OnlineSubsystem。
   - 需要跨平台：优先研究 EOS、EOS Plus、Crossplay Sessions 和外部账号映射。
   - 需要长期运营数据：OnlineSubsystem + Dedicated Server + 自定义后端。

### 代码示例清单

1. Steam `DefaultEngine.ini` 示例与逐项解释。
2. EOS `DefaultEngine.ini` / Artifact 配置示例与后台字段映射。
3. `Build.cs` 依赖配置：`OnlineSubsystem`、`OnlineSubsystemUtils` 等。
4. `UOnlineSessionManager` 类骨架。
5. `Login()`：EOS `IOnlineIdentity` 登录示例。
6. `CreateRoom()`：`FOnlineSessionSettings` 参数详解。
7. `OnCreateSessionComplete()`：成功后 Travel。
8. `SearchRooms()`：`FOnlineSessionSearch` 与搜索条件。
9. `JoinRoom()`：`JoinSession`、解析连接字符串、`ClientTravel`。
10. 错误分层结构：`ENetworkErrorLayer`、`FOnlineErrorRecord`。
11. 联机状态机：`Idle`、`LoggingIn`、`CreatingSession`、`Searching`、`Joining`、`Connecting`、`InGame`、`Failed`。

### 图表清单

1. UE 联机三层模型图。
2. 登录到进入游戏的流程图。
3. Steam vs EOS 对比表。
4. Session vs Lobby 对比表。
5. 搜不到房间的分层排查表。
6. 联机状态机图。

## 博客二设计：Dedicated Server 部署

### 标题

《UE Dedicated Server 部署实践：Docker、WSL/Ubuntu 与 Python Coordinator》

### 核心目标

让读者理解 UE Dedicated Server 与 Listen Server 的工程差异，能看懂从本地测试走向 Linux/Ubuntu/WSL/Docker 部署的路径，并理解 Python Coordinator 为什么存在、怎么写、和 OnlineSubsystem 有什么关系。

### 文章结构

1. 引入：为什么本地多人测试不等于服务器部署
   - 编辑器多客户端验证的是基础逻辑。
   - 真正部署会遇到构建产物、端口、防火墙、日志、容器、进程管理和实例调度问题。

2. Listen Server vs Dedicated Server
   - Listen Server：主机玩家同时承担服务器职责，适合原型和小规模测试。
   - Dedicated Server：无渲染、独立进程、权威状态，适合正式部署。
   - 说明 Dedicated Server 仍需 OnlineSubsystem 或后端服务完成发现/注册。

3. UE Dedicated Server 构建与启动
   - Server Target。
   - 地图启动参数。
   - `-log`、`-port=7777`、配置文件路径。
   - Windows 与 Linux 构建差异。

4. Ubuntu 与 WSL 环境准备
   - WSL 用于本地模拟 Linux 环境。
   - Ubuntu 服务器用于真实部署。
   - 重点关注文件权限、运行库、端口、防火墙。

5. Docker 安装与基础概念
   - Ubuntu 上按 Docker 官方 apt repository 安装 Docker Engine。
   - WSL/Windows 上可用 Docker Desktop + WSL 2 backend。
   - 说明镜像、容器、Volume、端口映射和日志。

6. Dockerfile 设计
   - 基础镜像。
   - 拷贝 UE server 构建产物。
   - 设置工作目录。
   - 暴露 UDP 游戏端口和可选查询端口。
   - 入口命令启动 server。

7. docker compose 设计
   - `coordinator` 服务。
   - `ue-server` 模板或动态启动方式。
   - volume 挂载日志。
   - network 与端口映射策略。

8. Python Coordinator 的作用
   - 分配端口。
   - 启动/停止 server 进程或容器。
   - 记录房间 ID、地图、端口、进程 ID、状态。
   - 提供健康检查和日志查询。
   - 和 Steam/EOS Session 结合：Coordinator 管实例，OnlineSubsystem 管发现/会话。

9. Flask App 写法
   - `POST /rooms`：创建房间并启动实例。
   - `GET /rooms/{id}`：查询实例状态。
   - `DELETE /rooms/{id}`：停止实例。
   - `GET /rooms/{id}/logs`：读取日志。
   - `GET /health`：健康检查。
   - 使用 `subprocess` 或 Docker SDK 管理进程/容器。

10. UE 网络传输机制：UDP、TCP、Replication、RPC
    - UE 游戏同步常见路径基于 UDP/IP NetDriver 或平台 socket。
    - UDP 负责低延迟游戏包传输，UE 网络层在其上实现可靠/不可靠消息、重传、顺序、Actor channel 等机制。
    - Reliable RPC 是 UE 网络层的可靠机制，不等于 TCP。
    - TCP 更适合控制面、管理 API、后台 HTTP、Coordinator 与 Web 服务通信。
    - 不要把 UE UDP Messaging/TCP Messaging 和游戏 replication 混为一谈。

11. 部署排查
    - 服务端是否启动。
    - 端口是否监听。
    - UDP 端口是否开放。
    - 容器端口是否映射。
    - 客户端连接地址是否正确。
    - 地图是否存在。
    - 日志是否输出 Travel、Join、NetDriver 错误。

### 代码示例清单

1. Dedicated Server 启动命令。
2. Dockerfile。
3. `docker-compose.yml`。
4. Flask App 目录结构。
5. Coordinator 数据模型：`RoomInstance`。
6. 端口分配函数。
7. 启动 UE server 进程函数。
8. 停止/回收实例函数。
9. REST API 示例。
10. UE 客户端如何连接 Coordinator 返回的地址。

### 图表清单

1. 本地测试到服务器部署流程图。
2. Dedicated Server 架构图。
3. Coordinator 与 UE server 实例关系图。
4. Docker 容器与宿主机端口映射图。
5. UDP/TCP 在项目中的职责对比表。
6. 部署问题排查表。

## 官方资料核验清单

写正文前需要逐项核验并引用：

1. Unreal Engine Online Subsystems and Services
   - https://dev.epicgames.com/documentation/en-us/unreal-engine/online-subsystems-and-services-in-unreal-engine

2. Unreal Engine Sessions Interface
   - https://dev.epicgames.com/documentation/en-us/unreal-engine/sessions-interface-in-unreal-engine

3. Online Subsystem EOS Plugin
   - https://dev.epicgames.com/documentation/en-us/unreal-engine/online-subsystem-eos-plugin-in-unreal-engine

4. Enable and Configure Online Services EOS
   - https://dev.epicgames.com/documentation/en-us/unreal-engine/enable-and-configure-online-services-eos-in-unreal-engine

5. Unreal Engine Lobbies Interface
   - https://dev.epicgames.com/documentation/en-us/unreal-engine/lobbies-interface-in-unreal-engine

6. Unreal Engine Networking and Multiplayer
   - https://dev.epicgames.com/documentation/en-us/unreal-engine/networking-and-multiplayer-in-unreal-engine

7. Steamworks API Overview
   - https://partner.steamgames.com/doc/sdk/api

8. Steam Matchmaking and Lobbies
   - https://partner.steamgames.com/doc/features/multiplayer/matchmaking

9. Steamworks Spacewar Example
   - https://partner.steamgames.com/doc/sdk/api/example

10. Docker Engine on Ubuntu
    - https://docs.docker.com/engine/install/ubuntu/

11. Dockerfile Reference
    - https://docs.docker.com/reference/dockerfile/

12. Docker Compose File Reference
    - https://docs.docker.com/reference/compose-file/

13. Flask Quickstart
    - https://flask.palletsprojects.com/en/stable/quickstart/

## 已确认边界

1. 正文以 UE 5.6 的旧 `OnlineSubsystem` C++ 接口为主，额外说明 UE 新 `OnlineServices` 与 EOSGS 的关系，但不把两套 API 混在同一段可复制代码里。
2. 项目部署主线以 Dedicated Server 为目标。Steam 的 Listen Server/Lobby 只作为理解 OnlineSubsystemSteam 的对照内容；Dedicated Server 注册到 Steam Server Browser 只做边界说明，避免展开成第三篇。
3. EOS 部分讲产品设置和客户端接入，跨平台 Steam + EOS 只讲条件和风险，不承诺完整跨平台方案。
4. 第二篇 Coordinator 以 Flask App + Python 标准库/必要 Docker 调用为主，不加入 systemd、Nginx、监控、CI/CD 等扩展主题。
5. UDP/TCP 部分只解释 UE 多人项目中常见职责边界，不深入实现 UE NetDriver 源码级分析。
6. Dockerfile 假设 UE Dedicated Server 已经打包好，只负责把产物复制进镜像并运行，不把 UE 构建流水线写进 Dockerfile。
7. 所有 EOS/Steam/服务端配置中的密钥、Client Secret、Encryption Key、AppID 等敏感或项目专属字段都使用占位符，不提交真实值。
8. 不需要专门写“开始前你需要准备什么”的大清单，也不需要专门标注论文实践/官方文档/通用经验来源分类；但文章中要保留必要前提说明和谨慎措辞。
9. UE 示例类型命名不强制固定在早期建议的 `UOnlineSessionManager`、`FRoomConfig` 等名称上；写正文时可根据实际示例结构调整，但要保持命名一致、可读、贴近 UE C++ 风格。

## 自检

- 没有把 EOS 或 Steam 写成完整游戏服务器。
- 没有把 OnlineSubsystem 的接口统一误写成行为统一。
- 没有把 Reliable RPC 误写成 TCP。
- 没有把 Lobby 和 Session 混成同一概念。
- 没有把 Coordinator 写成游戏同步层。
- 没有加入用户明确不需要的 systemd、Nginx、监控、CI/CD 等扩展主题。
