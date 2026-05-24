const narrativeProjectMedia = new Map<string, { embed: string }>([
	[
		'ue-gas-multiplayer',
		{
			embed: 'https://player.bilibili.com/player.html?bvid=BV1HqGL6jEhx&autoplay=0',
		},
	],
]);

export function getNarrativeEmbedSrc(pathname: string): string | undefined {
	return getNarrativeProjectMedia(pathname)?.embed;
}

function getNarrativeProjectMedia(pathname: string): { embed: string } | undefined {
	const normalizedPath = pathname.replace(/\/+$/, '');
	const slug = normalizedPath.split('/').filter(Boolean).at(-1);

	return slug ? narrativeProjectMedia.get(slug) : undefined;
}
