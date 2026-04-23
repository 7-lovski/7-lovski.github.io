export type DualText = {
	zh: string;
	en: string;
};

export type ResumeProject = {
	slug?: string;
	title: DualText;
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
				zh: 'UE｜基于 GAS 与联机能力的第三人称多人项目',
				en: 'UE | Third-Person Multiplayer Project with GAS and Networking',
			},
			description: {
				zh: '从零搭建 Unreal Engine 第三人称多人项目，独立完成核心玩法、角色系统与多人联机功能开发。',
				en: 'Built a third-person multiplayer project in Unreal Engine from scratch and independently developed its core gameplay, character systems, and multiplayer functionality.',
			},
			stack: ['Unreal Engine', 'GAS', 'Multiplayer', 'EOS'],
		},
		{
			slug: 'unity-factory-td',
			name: {
				zh: 'Unity｜工厂 + 塔防项目中的塔防玩法开发',
				en: 'Unity | Tower-Defense Gameplay Development for a Factory + TD Project',
			},
			description: {
				zh: '负责项目中塔防模块的功能实现，完成多类防御塔玩法开发，并参与能力系统方案调整。',
				en: 'Owned the tower-defense module implementation, built multiple defensive tower behaviors, and contributed to ability-system iteration.',
			},
			stack: ['Unity', 'Tower Defense', 'Ability System', 'Combat Feedback'],
		},
		{
			name: {
				zh: '交互式练习项目',
				en: 'Interactive Practice Project',
			},
			description: {
				zh: '一个预留给未来作品展示的项目卡片，用来逐步补充真实内容。',
				en: 'A placeholder project card reserved for future demos, experiments, and real work samples.',
			},
			stack: ['Prototype', 'UI', 'Iteration'],
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
				zh: 'UE｜基于 GAS 与联机能力的第三人称多人项目',
				en: 'UE | Third-Person Multiplayer Project with GAS and Networking',
			},
			description: {
				zh: '从零搭建 Unreal Engine 第三人称多人项目，独立完成核心玩法、角色系统与多人联机功能开发。',
				en: 'Built a third-person multiplayer project in Unreal Engine from scratch and independently developed its core gameplay, character systems, and multiplayer functionality.',
			},
			tags: [
				{ zh: 'Unreal Engine', en: 'Unreal Engine' },
				{ zh: 'GAS', en: 'GAS' },
				{ zh: '多人联机', en: 'Multiplayer' },
				{ zh: 'EOS', en: 'EOS' },
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
				zh: '负责项目中塔防模块的功能实现，完成多类防御塔玩法开发，并参与能力系统方案调整。',
				en: 'Owned the tower-defense module implementation, built multiple defensive tower behaviors, and contributed to ability-system iteration.',
			},
			tags: [
				{ zh: 'Unity', en: 'Unity' },
				{ zh: '塔防', en: 'Tower Defense' },
				{ zh: '能力系统', en: 'Ability System' },
				{ zh: '战斗表现', en: 'Combat Feel' },
			],
		},
		{
			title: { zh: '交互练习项目', en: 'Interactive Practice Project' },
			description: {
				zh: '预留给未来作品、实验或小型工具展示的项目卡片。',
				en: 'A placeholder slot for future demos, experiments, or small tools worth showing.',
			},
			tags: [
				{ zh: '原型', en: 'Prototype' },
				{ zh: '迭代', en: 'Iteration' },
				{ zh: '学习', en: 'Learning' },
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
				zh: 'UE｜基于 GAS 与联机能力的第三人称多人项目',
				en: 'UE | Third-Person Multiplayer Project with GAS and Networking',
			},
			bullets: [
				{
					zh: '从零搭建 Unreal Engine 第三人称多人项目，独立完成核心玩法、角色系统与多人联机功能开发。',
					en: 'Built a third-person multiplayer project in Unreal Engine from scratch and independently developed its core gameplay, character systems, and multiplayer functionality.',
				},
				{
					zh: '基于 GAS 实现角色属性、普通攻击、技能配表、升级系统及相关 UI，完成近战角色 Crunch 与远程角色 Phase 的战斗能力设计与落地。',
					en: 'Implemented character attributes, basic attacks, skill configuration, progression, and related UI with GAS, including combat kits for the melee character Crunch and the ranged character Phase.',
				},
				{
					zh: '完成角色移动、动画混合、IK 脚步自适应、远程瞄准判定、小兵与 AI 行为、对象池、商店与装备合成，以及核心运送/捕获玩法等系统开发。',
					en: 'Developed character movement, animation blending, IK foot adaptation, ranged aiming logic, minions and AI behaviors, object pooling, shop and equipment crafting, and the project’s escort-and-capture core gameplay loop.',
				},
				{
					zh: '实现角色选择、房间、本地联机与基于 Epic Online Services（EOS）的联机流程，并使用 Docker 配置 Linux 专用服务器与云端接口，支持多角色多人游玩。',
					en: 'Implemented character selection, room flow, local multiplayer, and networking based on Epic Online Services (EOS), then configured Linux dedicated servers and cloud-facing interfaces with Docker to support multi-character multiplayer sessions.',
				},
			],
		},
		{
			slug: 'unity-factory-td',
			title: {
				zh: 'Unity｜工厂 + 塔防项目中的塔防玩法开发',
				en: 'Unity | Tower-Defense Gameplay Development for a Factory + TD Project',
			},
			bullets: [
				{
					zh: '负责项目中塔防模块的功能实现，完成多类防御塔玩法开发。',
					en: 'Owned the implementation of the tower-defense module and developed multiple tower gameplay behaviors.',
				},
				{
					zh: '实现子弹、激光、卫星障碍物、防御冲击波等塔类功能，并完成索敌与常态逻辑切换。',
					en: 'Implemented tower features including projectile firing, lasers, satellite obstacles, defensive shockwaves, and state switching between targeting and idle behaviors.',
				},
				{
					zh: '参与能力系统方案设计与调整，基于项目组轻量化能力系统重构发射与测试能力。',
					en: 'Participated in ability-system design decisions and refactored firing and testing abilities on top of the team’s lightweight ability framework.',
				},
				{
					zh: '完成子弹过穿、分裂等效果开发，补充塔防模块的战斗表现与功能扩展。',
					en: 'Added projectile penetration and split effects to expand combat feedback and tower-defense behavior coverage.',
				},
			],
		},
		{
			title: {
				zh: 'Unity｜类银河恶魔城横版通关项目',
				en: 'Unity | Metroidvania-Style Side-Scrolling Action Project',
			},
			bullets: [
				{
					zh: '从零搭建横版通关项目，完成角色基础移动、动画表现及基于状态机的 Entity 通用逻辑管理。',
					en: 'Built a side-scrolling action project from scratch, including character movement, animation presentation, and a state-machine-driven Entity base logic structure.',
				},
				{
					zh: '实现跳跃、攀墙、冲刺、连击、弹反、投剑、法术水晶、影子分身等角色能力，并扩展冰/火/雷三类法术伤害与效果。',
					en: 'Implemented abilities such as jumping, wall climbing, dashing, combo attacks, parry, sword throwing, crystal-based spells, and shadow clones, together with ice, fire, and lightning damage types and effects.',
				},
				{
					zh: '完成多类普通敌人与双阶段精英敌人开发，支持基础地图内的战斗与行为测试。',
					en: 'Developed multiple standard enemies and a two-phase elite enemy to support combat and behavior testing inside a prototype map.',
				},
				{
					zh: '开发链表结构属性集合、树形技能树、装备与属性系统、JSON 存档读写及简单加密、检查点、场景切换和设置功能，完善项目整体流程。',
					en: 'Built a linked-list-based attribute collection, tree-structured skill tree, equipment and stat systems, JSON save/load with simple obfuscation, checkpoints, scene transitions, and settings to complete the overall gameplay flow.',
				},
			],
		},
		{
			title: {
				zh: 'Unity｜校园生活模拟职业生涯规划小游戏',
				en: 'Unity | Campus Life Career Planning Simulation Game',
			},
			bullets: [
				{
					zh: '参与校园生活模拟职业生涯规划小游戏开发，负责部分编辑器工具、界面功能与流程逻辑实现。',
					en: 'Contributed to a campus-life career planning simulation project, focusing on editor tooling, interface features, and flow logic implementation.',
				},
				{
					zh: '开发基于 ScriptableObject 的配置辅助工具，包括枚举生成工具与自动写入 SO 数据的读表工具。',
					en: 'Created ScriptableObject-based content tools, including an enum-driven generator and a data-table import tool for automatically writing into SO assets.',
				},
				{
					zh: '完成角色图鉴、角色详情、结算、回顾等界面及相关判断逻辑开发。',
					en: 'Implemented character codex, character detail, settlement, and review screens together with their supporting decision logic.',
				},
				{
					zh: '支持项目配置流程与前端展示衔接，补充玩法结果展示与信息回顾模块。',
					en: 'Connected content configuration workflows with front-end presentation and completed result-display and review modules.',
				},
			],
		},
		{
			title: {
				zh: 'UE｜基于 Online Subsystem 的 Steam 联机插件开发',
				en: 'UE | Steam Networking Plugin Based on Online Subsystem',
			},
			bullets: [
				{
					zh: '基于 Unreal Engine Online Subsystem 研究并实现 Steam 联机功能，独立完成相关插件开发。',
					en: 'Researched and implemented Steam networking through Unreal Engine Online Subsystem and independently completed the related plugin.',
				},
				{
					zh: '梳理多人联机场景下控制器与属性复制在服务器和客户端之间的关系，验证基础联机同步逻辑。',
					en: 'Studied how controllers and replicated attributes interact between server and clients in multiplayer scenarios, and validated the core synchronization logic.',
				},
				{
					zh: '实现基于 Steam 服务的角色关卡传送流程，并完成功能封装与插件化整理，便于后续复用。',
					en: 'Implemented character-level travel through Steam services and packaged the workflow into a reusable plugin for future use.',
				},
			],
		},
		{
			title: {
				zh: 'Unity｜驾驶舱模拟交互评估系统',
				en: 'Unity | Cockpit Interaction Evaluation Simulation System',
			},
			bullets: [
				{
					zh: '参与驾驶舱模拟交互评估系统的部分功能开发。',
					en: 'Participated in part of the feature development for a cockpit interaction evaluation simulation system.',
				},
				{
					zh: '完成火车经过事件与道路收窄事件的实现，并补充对应交互逻辑。',
					en: 'Implemented the passing-train event and road-narrowing event, together with their related interaction logic.',
				},
				{
					zh: '参与仿真场景内事件功能的基础构建与验证，积累早期项目开发经验。',
					en: 'Helped build and verify scenario events inside the simulation environment, gaining early project-development experience.',
				},
			],
		},
	] as ResumeProject[],
};
