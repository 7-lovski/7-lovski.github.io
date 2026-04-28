export type DualText = {
	zh: string;
	en: string;
};

export type ResumeProject = {
	slug?: string;
	title: DualText;
	stack?: DualText[];
	bullets: DualText[];
};

export type ProjectSummary = {
	slug?: string;
	repositoryUrl?: string;
	title: DualText;
	description: DualText;
	tags: DualText[];
};

export const navigationContent = {
	tagline: {
		zh: '项目展示、写作记录与长期学习',
		en: 'Projects, writing, and steady learning.',
	},
	labels: {
		home: { zh: '主页', en: 'Home' },
		projects: { zh: '项目', en: 'Projects' },
		blog: { zh: '博客', en: 'Blog' },
		about: { zh: '关于', en: 'About' },
		resume: { zh: '简历', en: 'Resume' },
	},
};

export const footerContent = {
	copy: {
		zh: '一个用于项目、笔记与长期成长的个人网站。',
		en: 'A personal site for projects, notes, and long-term growth.',
	},
};

export const homeContent = {
	eyebrow: {
		zh: '能力优先首页',
		en: 'Skill-First Homepage',
	},
	title: {
		zh: '在作品、文字与学习中慢慢生长',
		en: 'Grow through work, writing, and learning.',
	},
	description: {
		zh: '一个用于项目展示、写作记录与长期学习的个人网站。',
		en: 'A personal site for projects, writing, and steady learning.',
	},
	buttons: {
		projects: {
			zh: '查看项目',
			en: 'View Projects',
		},
		blog: {
			zh: '进入博客',
			en: 'Visit Blog',
		},
	},
	skills: [
		{ zh: '前端', en: 'Frontend' },
		{ zh: 'Astro', en: 'Astro' },
		{ zh: '项目实践', en: 'Projects' },
		{ zh: '写作记录', en: 'Writing' },
		{ zh: '持续学习', en: 'Continuous Learning' },
	],
	profileTitle: {
		zh: '个人形象占位',
		en: 'Profile Placeholder',
	},
	profileNote: {
		zh: '后面你可以把这里替换成头像、照片或插画。',
		en: 'Later you can replace this with an avatar, portrait, or illustration.',
	},
	overviewTitle: {
		zh: '这个网站将展示什么',
		en: 'What this site is for',
	},
	overviewText: {
		zh: '首页先展示能力、项目和文章入口，让访问者第一眼就知道你会什么、正在做什么。',
		en: 'The homepage leads with capability first, then projects and writing, so visitors immediately understand what you do.',
	},
	summaryCards: [
		{
			title: {
				zh: '开发方向',
				en: 'Development Focus',
			},
			text: {
				zh: '前端开发、网站搭建、游戏相关实践，以及可以持续积累的小型项目。',
				en: 'Frontend work, site building, game-related practice, and small projects worth growing over time.',
			},
		},
		{
			title: {
				zh: '常用工具',
				en: 'Core Tools',
			},
			text: {
				zh: 'Astro、JavaScript、TypeScript、Git，以及一套边做边学的工作流。',
				en: 'Astro, JavaScript, TypeScript, Git, and a steady workflow for learning by building.',
			},
		},
		{
			title: {
				zh: '当前学习',
				en: 'Currently Learning',
			},
			text: {
				zh: '更好的页面结构、更清晰的项目表达，以及把练习做成成品。',
				en: 'Better UI structure, clearer project presentation, and turning practice into polished output.',
			},
		},
	],
	featuredTitle: {
		zh: '精选项目',
		en: 'Selected Projects',
	},
	featuredLink: {
		zh: '查看全部项目',
		en: 'See all projects',
	},
	projects: [
		{
			slug: 'ue-gas-multiplayer',
			name: {
				zh: 'UE MOBA 原型 — 捕获推进',
				en: 'UE MOBA Prototype — Capture Push',
			},
			description: {
				zh: '基于 UE5 + GAS + EOS + Docker 的第三人称网络 MOBA 游戏原型，核心玩法为护送捕获器推进至敌方核心。',
				en: 'A third-person online MOBA prototype built with UE5, GAS, EOS, and Docker, centered on escorting a capturer into the enemy core.',
			},
			stack: ['Unreal Engine 5', 'GAS', 'EOS', 'Docker'],
		},
		{
			slug: 'unity-factory-td',
			name: {
				zh: 'Unity｜工厂 + 塔防项目中的塔防玩法开发',
				en: 'Unity | Tower-Defense Gameplay Development for a Factory + TD Project',
			},
			description: {
				zh: '融合工厂建造与塔防玩法的团队项目，独立负责塔防模块功能实现，完成多类防御塔、攻击表现与能力系统衔接。',
				en: 'A team project combining factory building and tower-defense gameplay. Independently handled tower-defense module implementation, multiple tower types, attack presentation, and ability-system integration.',
			},
			stack: ['Unity', 'C#', 'Tower Defense', 'Lightweight Ability System'],
		},
	],
	postsTitle: {
		zh: '最新文章',
		en: 'Recent Posts',
	},
	postsLink: {
		zh: '进入博客',
		en: 'Visit blog',
	},
};

export const projectsContent = {
	title: {
		zh: '项目与实践',
		en: 'Projects and Practice',
	},
	description: {
		zh: '这里先放精选项目与练习占位，后面再逐步替换成真实作品。',
		en: 'Start with selected projects and placeholders here, then gradually replace them with real work.',
	},
	items: [
		{
			slug: 'ue-gas-multiplayer',
			title: {
				zh: 'UE MOBA 原型 — 捕获推进',
				en: 'UE MOBA Prototype — Capture Push',
			},
			description: {
				zh: '基于 UE5 + GAS + EOS + Docker 的第三人称网络 MOBA 游戏原型，核心玩法为护送捕获器推进至敌方核心。',
				en: 'A third-person online MOBA prototype built with UE5, GAS, EOS, and Docker, centered on escorting a capturer into the enemy core.',
			},
			tags: [
				{ zh: 'Unreal Engine 5', en: 'Unreal Engine 5' },
				{ zh: 'GAS', en: 'GAS' },
				{ zh: 'EOS', en: 'EOS' },
				{ zh: 'Docker', en: 'Docker' },
			],
		},
		{
			slug: 'unity-factory-td',
			repositoryUrl: 'https://github.com/IdleWolfOwO/Circuit-Land.git',
			title: {
				zh: 'Unity｜工厂 + 塔防项目中的塔防玩法开发',
				en: 'Unity | Tower-Defense Gameplay Development for a Factory + TD Project',
			},
			description: {
				zh: '融合工厂建造与塔防玩法的团队项目，独立负责塔防模块功能实现，完成多类防御塔、攻击表现与能力系统衔接。',
				en: 'A team project combining factory building and tower-defense gameplay. Independently handled tower-defense module implementation, multiple tower types, attack presentation, and ability-system integration.',
			},
			tags: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: 'C#', en: 'C#' },
				{ zh: '塔防', en: 'Tower Defense' },
				{ zh: '轻量化能力系统', en: 'Lightweight Ability System' },
			],
		},
		{
			slug: 'unity-metroidvania-action',
			title: {
				zh: '类银河恶魔城横版通关',
				en: 'Metroidvania-Style Side-Scrolling Completion Demo',
			},
			description: {
				zh: '从零搭建横版动作游戏 Demo，包含角色动作、战斗技能、敌人 AI、成长系统和 JSON 存档流程。',
				en: 'Built a side-scrolling action game demo from scratch, including character actions, combat skills, enemy AI, progression systems, and JSON save flow.',
			},
			tags: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: 'C#', en: 'C#' },
				{ zh: '状态机', en: 'State Machine' },
				{ zh: '技能树', en: 'Skill Tree' },
				{ zh: 'JSON 存档', en: 'JSON Save' },
			],
		},
		{
			slug: 'unity-campus-career-sim',
			title: {
				zh: '校园生活模拟 · 职业生涯规划',
				en: 'Campus Life Simulation · Career Planning',
			},
			description: {
				zh: '校园生活模拟与职业生涯规划主题的 Unity 小游戏，负责部分编辑器工具开发，以及角色图鉴、结算、回顾等页面的界面搭建与流程逻辑。',
				en: 'A Unity mini-game themed around campus life simulation and career planning. Responsible for part of the editor tooling, plus UI construction and flow logic for character codex, settlement, review, and related pages.',
			},
			tags: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: 'C#', en: 'C#' },
				{ zh: 'ScriptableObject', en: 'ScriptableObject' },
				{ zh: 'Excel 读表', en: 'Excel Import' },
			],
		},
		{
			slug: 'ue-steam-networking-plugin',
			title: {
				zh: 'Steam 联机插件开发',
				en: 'Steam Networking Plugin Development',
			},
			description: {
				zh: '基于 Unreal Engine Online Subsystem 框架开发的 Steam 联机插件，支持会话创建、搜索与加入，并封装为可复用插件。',
				en: 'A Steam networking plugin built on Unreal Engine Online Subsystem, supporting session creation, search, and join, packaged as a reusable plugin.',
			},
			tags: [
				{ zh: 'Unreal Engine', en: 'Unreal Engine' },
				{ zh: 'C++', en: 'C++' },
				{ zh: 'Online Subsystem', en: 'Online Subsystem' },
				{ zh: 'Steam', en: 'Steam' },
			],
		},
		{
			slug: 'unity-cockpit-simulation-evaluation',
			title: {
				zh: '驾驶舱模拟交互评估系统',
				en: 'Cockpit Simulation Interaction Evaluation System',
			},
			description: {
				zh: '用于驾驶舱人机交互评估的模拟系统，参与部分功能开发，负责若干交互事件的逻辑实现。',
				en: 'A simulation system for cockpit human-computer interaction evaluation. Participated in part of the feature development and implemented logic for several interaction events.',
			},
			tags: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: 'C#', en: 'C#' },
				{ zh: '模拟仿真', en: 'Simulation' },
			],
		},
	] as ProjectSummary[],
};

export const aboutContent = {
	title: {
		zh: '关于我与这个网站',
		en: 'About Me and This Site',
	},
	description: {
		zh: '这里用于更完整地介绍你自己、当前关注方向，以及这个网站存在的意义。',
		en: 'Use this page for a fuller introduction, your current focus, and why this site exists.',
	},
	intro: {
		title: { zh: '简短介绍', en: 'Short Introduction' },
		text: {
			zh: '你好，我是柒年Lovksi。这个网站是我整理项目、记录学习、展示成长过程的地方。',
			en: 'Hello, I am 7-Lovski. This site is a place to organize projects, publish learning notes, and show steady growth.',
		},
	},
	focus: {
		title: { zh: '当前关注', en: 'Current Focus' },
		items: [
			{
				zh: '建立一个清晰、专业且长期可维护的个人网站',
				en: 'Building a clear, professional, and maintainable personal website',
			},
			{
				zh: '提升项目展示方式与写作结构',
				en: 'Improving project presentation and writing structure',
			},
			{
				zh: '通过完整的小项目持续学习',
				en: 'Learning continuously through small but complete projects',
			},
		],
	},
	why: {
		title: { zh: '为什么做这个网站', en: 'Why This Site Exists' },
		text: {
			zh: '这个网站的目标很简单：把分散的学习、项目和思考集中起来，让成长变得可见。',
			en: 'The goal of this site is simple: gather scattered learning, projects, and thoughts into one place so growth becomes visible.',
		},
	},
};

export const resumeContent = {
	title: {
		zh: '简历',
		en: 'Resume',
	},
	description: {
	},
	identity: {
		name: {
			zh: '王禹琛',
			en: 'Yuchen Wang',
		},
		role: {
			zh: '求职方向：游戏开发实习｜UE 客户端/Gameplay',
			en: 'Target Role: Game Dev Intern | UE Client/Gameplay',
		},
	},
	summaryTitle: {
		zh: '个人简介',
		en: 'Profile',
	},
	summary: {
		zh: '以 Unreal Engine 客户端 / Gameplay 开发为主要方向，具备 Unity 项目开发经验。独立完成过联机插件开发和多人项目实践，熟悉多人联机、玩法系统与项目开发流程。参与过多类型游戏合作项目开发，具备较强的自学能力、系统实现能力与团队协作意识。',
		en: 'Focused on Unreal Engine client-side and gameplay development, with hands-on Unity project experience. I have independently completed a networking plugin and practical multiplayer work, and I am familiar with multiplayer workflows, gameplay systems, and project development pipelines. I have also participated in multiple collaborative game projects, with strong self-learning ability, systems implementation skills, and teamwork awareness.',
	},
	skillsTitle: {
		zh: '技术栈与亮点',
		en: 'Tech Stack & Highlights',
	},
	skills: [
		{ zh: 'Unreal Engine', en: 'Unreal Engine' },
		{ zh: 'Unity', en: 'Unity' },
		{ zh: 'C++', en: 'C++' },
		{ zh: 'C#', en: 'C#' },
		{ zh: 'Gameplay 系统', en: 'Gameplay Systems' },
		{ zh: 'Gameplay UI', en: 'Gameplay UI' },
		{ zh: '多人联机', en: 'Multiplayer' },
		{
			zh: 'Online Subsystem（Steam / EOS 接入）',
			en: 'Online Subsystem (Steam / EOS Integration)',
		},
		{ zh: 'GAS', en: 'GAS' },
		{ zh: '状态机', en: 'State Machines' },
		{ zh: 'AI 行为', en: 'AI Behaviors' },
		{ zh: '动画混合 / IK', en: 'Animation Blending / IK' },
		{ zh: 'Dedicated Server / Docker', en: 'Dedicated Server / Docker' },
		{ zh: 'ScriptableObject', en: 'ScriptableObject' },
		{ zh: 'JSON 存档', en: 'JSON Save System' },
		{ zh: '编辑器工具开发', en: 'Editor Tooling' },
		{ zh: 'Git', en: 'Git' },
	],
	educationTitle: {
		zh: '教育背景',
		en: 'Education',
	},
	education: {
		school: {
			zh: '汕头大学',
			en: 'Shantou University',
		},
		degree: {
			zh: '计算机科学与技术，本科',
			en: 'B.S. in Computer Science and Technology',
		},
		details: [
			{
				zh: '预计 2028 年 6 月毕业',
				en: 'Expected graduation: Jun 2028',
			},
		],
	},
	societyTitle: {
		zh: '社团经历',
		en: 'Society Experience',
	},
	society: {
		organization: {
			zh: '汕头大学动漫与游戏技术协会',
			en: 'Animation and Game Technology Association, Shantou University',
		},
		role: {
			zh: '开发部部长',
			en: 'Head of Development',
		},
		details: [
			{
				zh: '参与社团开发方向的内容交流，并为新成员整理部分入门分享内容。',
				en: 'Participated in development-related knowledge sharing within the club and prepared onboarding-oriented introductory material for new members.',
			},
			{
				zh: '面向学弟学妹开展开发相关入门课程，帮助新成员了解基础开发流程与常见实践内容。',
				en: 'Delivered introductory development sessions for junior members to help them understand basic workflows and common hands-on practices.',
			},
		],
	},
	projectsTitle: {
		zh: '项目经历',
		en: 'Projects',
	},
	additionalProjectsTitle: {
		zh: '小型实现',
		en: 'Small Implementations',
	},
	projects: [
		{
			slug: 'ue-gas-multiplayer',
			title: {
				zh: '第三人称网络MOBA游戏原型 | 独立开发',
				en: 'Third-Person Online MOBA Game Prototype | Independent Developer',
			},
			stack: [
				{ zh: 'Unreal Engine 5', en: 'Unreal Engine 5' },
				{ zh: 'C++', en: 'C++' },
				{ zh: 'GAS', en: 'GAS' },
				{ zh: 'EOS', en: 'EOS' },
				{ zh: 'Docker', en: 'Docker' },
			],
			bullets: [
				{
					zh: '独立完成一款"捕获推进"玩法MOBA原型：护送地图中央捕获器至敌方核心，融合英雄对抗、小兵AI与装备经济体系。',
					en: 'Independently completed a capture-push MOBA prototype: players escort a central map capturer to the enemy core, combining hero combat, minion AI, and an equipment economy system.',
				},
				{
					zh: '基于 GAS 实现 Crunch（机器人战士）与 Phase（人类法师）及其假体变体（共享技能、差异数值与外观），技能涵盖位移、击退、击飞、减速、冻结、牵引等效果，配套商店、装备合成树与装备主动技能。',
					en: 'Implemented Crunch (robot warrior), Phase (human mage), and their prosthetic variants with GAS, sharing abilities while varying stats and visuals. Ability effects include dashes, knockback, launch, slow, freeze, and pull, supported by a shop, equipment synthesis tree, and active equipment skills.',
				},
				{
					zh: '小兵系统采用对象池管理并搭配行为树 AI；角色动画实现了状态切换混合、上下半身分离及 IK 地形自适应。',
					en: 'Managed the minion system with object pooling and behavior-tree AI. Implemented character animation features including state-transition blending, upper/lower body separation, and IK-based terrain adaptation.',
				},
				{
					zh: '基于 EOS + Online Subsystem 实现大厅登录、会话管理、房间角色选择的全流程联机；通过 Docker 部署专用服务器至云主机，支持广域网对战。',
					en: 'Built the full networking flow for lobby login, session management, and room-based character selection with EOS + Online Subsystem. Deployed a Dockerized dedicated server to a cloud host to support WAN matches.',
				},
			],
		},
		{
			slug: 'unity-factory-td',
			title: {
				zh: '工厂 + 塔防 | 塔防模块开发',
				en: 'Factory + Tower Defense | Tower-Defense Module Development',
			},
			stack: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: 'C#', en: 'C#' },
				{ zh: '能力系统', en: 'Ability System' },
				{ zh: '战斗表现', en: 'Combat Feedback' },
			],
			bullets: [
				{
					zh: '在团队项目中独立负责塔防模块，实现子弹、激光、卫星障碍物、防御冲击波等多类防御塔，完成索敌逻辑与攻击状态的切换处理。',
					en: 'Independently responsible for the tower-defense module in a team project, implementing multiple defensive towers such as projectiles, lasers, satellite obstacles, and defensive shockwaves, and completing switching between targeting logic and attack states.',
				},
				{
					zh: '尝试自研类 GAS 能力系统，评估复杂度与团队维护成本后推动启用轻量化替代方案，基于新方案重构发射与测试能力，并扩展过穿、分裂等战斗效果。',
					en: 'Attempted to build a GAS-like ability system, then after evaluating complexity and team maintenance cost, promoted enabling a lightweight alternative. Based on the new solution, refactored firing and testing abilities and extended combat effects such as penetration and split behavior.',
				},
				{
					zh: '积累了技术方案评估、在现有架构上进行玩法扩展与团队协作的实践经验。',
					en: 'Gained practical experience in technical solution evaluation, gameplay extension on an existing architecture, and team collaboration.',
				},
			],
		},
		{
			slug: 'unity-metroidvania-action',
			title: {
				zh: '类银河恶魔城横版通关 | 独立开发',
				en: 'Metroidvania-Style Side-Scrolling Completion Demo | Independent Developer',
			},
			stack: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: 'C#', en: 'C#' },
				{ zh: '状态机', en: 'State Machine' },
				{ zh: '技能树', en: 'Skill Tree' },
				{ zh: 'JSON 存档', en: 'JSON Save' },
			],
			bullets: [
				{
					zh: '一款从零搭建的横版动作游戏 Demo，角色拥有移动、跳跃、攀墙、冲刺、连击等基础动作，基于状态机统一管理 Player 与 Enemy 的行为逻辑。',
					en: 'A side-scrolling action game demo built from scratch. The character has basic actions such as movement, jumping, wall climbing, dashing, and combos, with Player and Enemy behavior logic unified through state machines.',
				},
				{
					zh: '战斗系统包含弹反、投剑、水晶、黑洞、影子分身等能力，支持黑洞+分身联动、水晶伤害/传送形态切换、投剑回旋/贯穿/弹跳三分支等多技能交互，附加冰/火/雷三系属性伤害。',
					en: 'The combat system includes parry, sword throw, crystal, black hole, shadow clone, and other abilities. It supports multi-skill interactions such as black hole + clone linkage, crystal damage/teleport form switching, and three sword-throw branches: spin, pierce, and bounce, with ice/fire/lightning elemental damage.',
				},
				{
					zh: '拥有多类敌人与双阶段精英怪、树形技能树、链表结构装备属性系统，以及 JSON 存档、检查点与场景切换，可从头推进至通关。',
					en: 'Includes multiple enemy types, a two-phase elite enemy, a tree-structured skill tree, a linked-list equipment stat system, JSON save, checkpoints, and scene transitions, allowing progression from start to completion.',
				},
			],
		},
		{
			slug: 'unity-campus-career-sim',
			title: {
				zh: '校园生活模拟 · 职业生涯规划 | 编辑器工具与 UI 开发',
				en: 'Unity | Campus Life Career Planning Simulation Game',
			},
			stack: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: 'C#', en: 'C#' },
				{ zh: 'ScriptableObject', en: 'ScriptableObject' },
				{ zh: 'Excel 读表', en: 'Excel Import' },
			],
			bullets: [
				{
					zh: '在团队项目中负责部分编辑器工具与 UI 功能，基于 ScriptableObject 制作枚举快速生成工具，减少手动创建和关联配置的重复工作。',
					en: 'In a team project, responsible for part of the editor tooling and UI features. Built an enum quick-generation tool based on ScriptableObject to reduce repeated manual creation and configuration linking.',
				},
				{
					zh: '完成 Excel 读取并写入 ScriptableObject 的读表工具，支持策划在 Excel 中维护数据后一键导入。',
					en: 'Completed an Excel import tool that reads data and writes it into ScriptableObject assets, allowing designers to maintain data in Excel and import it with one click.',
				},
				{
					zh: '实现角色图鉴、角色详情、结算、回顾等页面的界面搭建与流程逻辑，串联各页面间的跳转和数据传递。',
					en: 'Implemented UI construction and flow logic for character codex, character detail, settlement, and review pages, connecting page transitions and data passing between screens.',
				},
			],
		},
		{
			slug: 'ue-steam-networking-plugin',
			title: {
				zh: 'Steam 联机插件开发 | 独立开发',
				en: 'Steam Networking Plugin Development | Independent Developer',
			},
			stack: [
				{ zh: 'Unreal Engine', en: 'Unreal Engine' },
				{ zh: 'C++', en: 'C++' },
				{ zh: 'Online Subsystem', en: 'Online Subsystem' },
				{ zh: 'Steam', en: 'Steam' },
			],
			bullets: [
				{
					zh: '基于 UE 的 Online Subsystem 框架研究并实现 Steam 联机功能，独立完成插件开发，支持会话创建、搜索与加入。',
					en: 'Based on UE Online Subsystem, researched and implemented Steam networking functionality. Independently completed plugin development, supporting session creation, search, and join.',
				},
				{
					zh: '将联机逻辑封装为可复用插件，可直接集成到其他 UE 项目中，省去重复配置 Steam 模块的步骤。',
					en: 'Encapsulated networking logic as a reusable plugin that can be directly integrated into other UE projects, reducing repeated Steam module configuration work.',
				},
			],
		},
		{
			slug: 'unity-cockpit-simulation-evaluation',
			title: {
				zh: '驾驶舱模拟交互评估系统 | 部分功能开发',
				en: 'Cockpit Simulation Interaction Evaluation System | Partial Feature Development',
			},
			stack: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: 'C#', en: 'C#' },
				{ zh: '模拟仿真', en: 'Simulation' },
			],
			bullets: [
				{
					zh: '参与驾驶舱模拟交互评估系统的部分功能开发，负责多个交互事件的逻辑实现。',
					en: 'Participated in part of the feature development for a cockpit simulation interaction evaluation system, responsible for implementing logic for multiple interaction events.',
				},
			],
		},
	] as ResumeProject[],
};
