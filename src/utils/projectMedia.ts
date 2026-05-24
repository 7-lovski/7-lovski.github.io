const narrativeProjectMedia = new Map<string, { video: string; poster?: string }>([
	[
		'ue-gas-multiplayer',
		{
			video: '/projects/ue-gas-multiplayer/Crunch.mp4',
			poster: '/projects/ue-gas-multiplayer/Crunch-poster.png',
		},
	],
]);

export function getNarrativeVideoSrc(pathname: string): string | undefined {
	return getNarrativeProjectMedia(pathname)?.video;
}

export function getNarrativeVideoPoster(pathname: string): string | undefined {
	return getNarrativeProjectMedia(pathname)?.poster;
}

function getNarrativeProjectMedia(pathname: string): { video: string; poster?: string } | undefined {
	const normalizedPath = pathname.replace(/\/+$/, '');
	const slug = normalizedPath.split('/').filter(Boolean).at(-1);

	return slug ? narrativeProjectMedia.get(slug) : undefined;
}
