export function normalizeRepositoryUrl(url: string): string {
	return url.endsWith('.git') ? url.slice(0, -4) : url;
}

export function getRepositoryName(url: string): string {
	const normalized = normalizeRepositoryUrl(url);
	const segments = normalized.split('/').filter(Boolean);
	return segments.length > 0 ? segments[segments.length - 1] : normalized;
}
