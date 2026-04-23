# Resume Page Design

## Goal

将当前占位性质的网页简历页升级为一页真实可用的中英双语游戏开发实习简历，保持现有站点风格，并突出 `UE 客户端 / Gameplay` 方向、多人联机经历、Unity 项目经验、教育背景与社团经历。

## Current State

- 简历数据当前集中在 [src/data/siteContent.ts](E:/Web博客/7-lovski.github.io/src/data/siteContent.ts) 的 `resumeContent` 中，仍是占位文案。
- 简历页面组件 [src/components/ResumePage.astro](E:/Web博客/7-lovski.github.io/src/components/ResumePage.astro) 只支持一组简单卡片，不足以承载正式简历结构。
- 当前站点已经具备双语路由和 `LocalizedText` 组件，可复用现有国际化模式。

## User-Approved Direction

- 继续沿用数据驱动方式，不单独新建复杂的数据来源。
- 将 `resumeContent` 扩展为真正的简历结构，而不是几张占位卡片。
- 页面采用双栏布局：
  - 左栏：求职方向、技术栈、教育背景、社团经历
  - 右栏：个人简介、项目经历
- 保持现有站点视觉语言，不做完全跳脱的新主题。
- 内容以中文为主先落地，同时补上英文占位/翻译版本，保持中英页面可访问。

## Content Structure

### Hero

- 页面标题
- 页面简介
- 姓名
- 求职方向标题

### Left Column

- 技术栈
- 教育背景
- 社团经历

### Right Column

- 个人简介
- 项目经历列表

## Content Decisions

### Header Identity

- 姓名：`王禹琛`
- 求职方向：`游戏开发实习生｜UE 客户端 / Gameplay 方向`

### Profile Summary

中文版本采用用户确认稿：

> 以 Unreal Engine 客户端 / Gameplay 开发为主要方向，具备 Unity 项目开发经验。独立完成过联机插件开发和多人项目实践，熟悉多人联机、玩法系统与项目开发流程。参与过多类型游戏合作项目开发，具备较强的自学能力、系统实现能力与团队协作意识。

英文版本采用等价表达，不追求完全逐字翻译，但需保持专业简历口吻。

### Skill Tags

- Unreal Engine
- Unity
- C++
- C#
- Gameplay
- 多人联机 / Multiplayer
- Online Subsystem（Steam / EOS 接入）
- GAS
- 状态机 / State Machines
- AI
- ScriptableObject
- JSON 存档
- 编辑器工具开发
- Git

### Education

- 学校：`汕头大学`
- 专业：`计算机科学与技术，本科`
- 毕业时间：`预计 2028 年 6 月毕业`

### Society Experience

- 社团：`汕头大学动漫与游戏技术协会`
- 角色：`开发部部长`
- 重点：开发方向内容组织、为新成员开展开发分享与入门课程

### Project Ordering

项目顺序按“能力证明强度 + 岗位相关性”排序：

1. `UE｜基于 GAS 与联机能力的第三人称多人项目`
2. `Unity｜工厂 + 塔防项目中的塔防玩法开发`
3. `Unity｜类银河恶魔城横版通关项目`
4. `Unity｜校园生活模拟职业生涯规划小游戏`
5. `UE｜基于 Online Subsystem 的 Steam 联机插件开发`
6. `Unity｜驾驶舱模拟交互评估系统`

## Component Changes

### Data Layer

扩展 [src/data/siteContent.ts](E:/Web博客/7-lovski.github.io/src/data/siteContent.ts) 中 `resumeContent` 的结构，使其支持：

- title / description
- identity
- summary
- skills
- education
- society
- projects

继续使用 `DualText` 与现有国际化风格，避免额外增加新的数据入口。

### Presentation Layer

重构 [src/components/ResumePage.astro](E:/Web博客/7-lovski.github.io/src/components/ResumePage.astro)：

- 将单一网格卡片布局改为更接近正式简历的双栏布局
- 增加页面头图信息区
- 增加标签式技术栈
- 将项目经历渲染为标题 + 多条 bullet
- 继续通过 `LocalizedText` 渲染双语文本

## Visual Direction

- 沿用当前站点卡片风格和柔和背景，不引入新的突兀主题
- 保持信息密度高但易扫读
- 左栏相对紧凑，右栏强调项目内容
- 移动端回落为单栏

## Constraints

- 不修改整站导航与其他页面结构
- 不引入新的前端框架或复杂状态逻辑
- 不在本次任务中新增完整测试基础设施
- 以 `npm run build` 作为本次改动的主要验证方式

## Verification Plan

- 构建通过：`npm run build`
- 人工检查点：
  - 中文与英文简历页均能构建
  - 内容结构与项目顺序符合确认稿
  - 页面在桌面与窄屏下都能自然排布

## Risks And Mitigations

- 风险：简历内容过多导致页面拥挤
  - 处理：使用双栏与紧凑项目 bullet，并控制左栏信息长度
- 风险：中英双语结构不一致
  - 处理：统一数据结构，逐项补全 `zh/en`
- 风险：页面风格与站点其他页面割裂
  - 处理：保留现有卡片、间距和色彩语汇
