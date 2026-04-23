import test from 'node:test';
import assert from 'node:assert/strict';

test('normalizeRepositoryUrl removes .git suffix for browser-facing links', async () => {
	const module = await import('./projects.ts');

	assert.equal(typeof module.normalizeRepositoryUrl, 'function');
	assert.equal(
		module.normalizeRepositoryUrl('https://github.com/IdleWolfOwO/Circuit-Land.git'),
		'https://github.com/IdleWolfOwO/Circuit-Land',
	);
	assert.equal(
		module.normalizeRepositoryUrl('https://github.com/IdleWolfOwO/Circuit-Land'),
		'https://github.com/IdleWolfOwO/Circuit-Land',
	);
});

test('getRepositoryDisplayName returns a short GitHub-style label', async () => {
	const module = await import('./projects.ts');

	assert.equal(typeof module.getRepositoryDisplayName, 'function');
	assert.equal(
		module.getRepositoryDisplayName('https://github.com/IdleWolfOwO/Circuit-Land.git'),
		'GitHub · Circuit-Land',
	);
	assert.equal(
		module.getRepositoryDisplayName('https://github.com/example/my-repo'),
		'GitHub · my-repo',
	);
});
