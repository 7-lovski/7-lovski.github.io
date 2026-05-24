type NarrativeProjectMedia =
	| { type: 'embed'; src: string }
	| { type: 'video'; src: string; poster?: string };

const narrativeProjectMedia = new Map<string, NarrativeProjectMedia>([
	[
		'ue-gas-multiplayer',
		{
			type: 'video',
			src: 'https://github.com/7-lovski/7-lovski.github.io/releases/download/Media/Crunch.mp4',
			poster: '/projects/ue-gas-multiplayer/Crunch-poster.png',
		},
	],
]);

export function getNarrativeMedia(pathname: string): NarrativeProjectMedia | undefined {
	return getNarrativeProjectMedia(pathname);
}

export function getProjectCoverSrc(slug: string | undefined): string | undefined {
	if (!slug) {
		return undefined;
	}

	const media = narrativeProjectMedia.get(slug);
	return media?.type === 'video' ? media.poster : undefined;
}

function getNarrativeProjectMedia(pathname: string): NarrativeProjectMedia | undefined {
	const normalizedPath = pathname.replace(/\/+$/, '');
	const slug = normalizedPath.split('/').filter(Boolean).at(-1);

	return slug ? narrativeProjectMedia.get(slug) : undefined;
}
