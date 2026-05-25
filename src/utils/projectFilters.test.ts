import test from 'node:test';
import assert from 'node:assert/strict';

test('project filters keep all projects for the all category', async () => {
	const module = await import('./projectFilters.ts');

	assert.deepEqual(
		module.filterProjectsByCategory(
			[
				{ slug: 'ue-project', categories: ['ue', 'solo'] },
				{ slug: 'unity-project', categories: ['unity', 'team'] },
			],
			'all',
		).map((project) => project.slug),
		['ue-project', 'unity-project'],
	);
});

test('project filters match engine and collaboration categories', async () => {
	const module = await import('./projectFilters.ts');

	const projects = [
		{ slug: 'ue-solo', categories: ['ue', 'solo'] },
		{ slug: 'unity-team', categories: ['unity', 'team'] },
		{ slug: 'unity-solo', categories: ['unity', 'solo'] },
	];

	assert.deepEqual(module.filterProjectsByCategory(projects, 'ue').map((project) => project.slug), ['ue-solo']);
	assert.deepEqual(module.filterProjectsByCategory(projects, 'unity').map((project) => project.slug), [
		'unity-team',
		'unity-solo',
	]);
	assert.deepEqual(module.filterProjectsByCategory(projects, 'solo').map((project) => project.slug), [
		'ue-solo',
		'unity-solo',
	]);
	assert.deepEqual(module.filterProjectsByCategory(projects, 'team').map((project) => project.slug), ['unity-team']);
});
