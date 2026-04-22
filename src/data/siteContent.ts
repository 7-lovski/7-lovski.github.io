export type DualText = {
	zh: string;
	en: string;
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
			name: {
				zh: '个人网站改版',
				en: 'Portfolio Site Refresh',
			},
			description: {
				zh: '一个更清晰、更专业的个人网站，用来整合项目、博客和简历内容。',
				en: 'A cleaner and more professional personal site that brings projects, blog posts, and resume content together.',
			},
			stack: ['Astro', 'CSS', 'Content Design'],
		},
		{
			name: {
				zh: '学习笔记发布系统',
				en: 'Learning Notes System',
			},
			description: {
				zh: '把零散笔记整理成结构化文章，让学习记录更容易沉淀与分享。',
				en: 'A lightweight publishing workflow for turning scattered notes into clear, readable posts.',
			},
			stack: ['Markdown', 'GitHub Pages', 'Astro'],
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
			title: { zh: '个人网站改版', en: 'Portfolio Site Refresh' },
			description: {
				zh: '一个用于整合项目、博客与简历内容的个人站点改版练习。',
				en: 'A personal site refresh for bringing projects, blog posts, and resume content together.',
			},
			tags: [
				{ zh: 'Astro', en: 'Astro' },
				{ zh: '界面', en: 'UI' },
				{ zh: '内容', en: 'Content' },
			]
		},
		{
			title: { zh: '学习笔记发布系统', en: 'Learning Notes System' },
			description: {
				zh: '把零散笔记整理成结构化文章，形成可持续输出的记录系统。',
				en: 'A workflow for turning scattered notes into structured posts and sustainable output.',
			},
			tags: [
				{ zh: 'Markdown', en: 'Markdown' },
				{ zh: '写作', en: 'Writing' },
				{ zh: '结构', en: 'Structure' },
			]
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
			]
		},
	],
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
			zh: '你好，我是洛屿柒秋。这个网站是我整理项目、记录学习、展示成长过程的地方。',
			en: 'Hello, I am Luo Yu Qi Qiu. This site is a place to organize projects, publish learning notes, and show steady growth.',
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
		zh: '简历概览',
		en: 'Resume Overview',
	},
	description: {
		zh: '先用网页形式整理简历结构，后面再逐步替换成真实经历。',
		en: 'Start with a web resume structure here, then replace the placeholders with real experience.',
	},
	sections: [
		{
			title: { zh: '个人简介', en: 'Profile' },
			body: {
				zh: '这里放一段简短介绍：你是谁、在学什么、想做什么。',
				en: 'Put a short introduction here: who you are, what you are learning, and what you want to build.',
			},
		},
		{
			title: { zh: '技能', en: 'Skills' },
			body: {
				zh: '前端开发、静态网站搭建、Git 工作流、项目式学习。',
				en: 'Frontend development, static site building, Git workflow, and project-based learning.',
			},
		},
		{
			title: { zh: '经历', en: 'Experience' },
			body: {
				zh: '这里先放占位内容，后续可以替换成课程项目、合作经历或实习内容。',
				en: 'Start with placeholder copy here, then replace it with coursework, collaborations, or internship experience.',
			},
		},
		{
			title: { zh: '教育与学习', en: 'Education and Learning' },
			body: {
				zh: '记录当前学习方向、课程、长期积累与成长轨迹。',
				en: 'Record your current learning direction, courses, long-term practice, and growth path.',
			},
		},
	],
};

