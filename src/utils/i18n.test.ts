import test from 'node:test';
import assert from 'node:assert/strict';

test('getContentPath builds localized detail paths for blog and projects', async () => {
	const module = await import('./i18n.ts');

	assert.equal(typeof module.getContentPath, 'function');
	assert.equal(module.getContentPath('blog', 'using-mdx', 'bi'), '/blog/using-mdx/');
	assert.equal(module.getContentPath('blog', 'using-mdx', 'zh'), '/zh/blog/using-mdx/');
	assert.equal(module.getContentPath('projects', 'ue-gas-multiplayer', 'en'), '/en/projects/ue-gas-multiplayer/');
});

test('shouldRenderLanguageContent shows matching language blocks and bilingual blocks', async () => {
	const module = await import('./i18n.ts');

	assert.equal(typeof module.shouldRenderLanguageContent, 'function');
	assert.equal(module.shouldRenderLanguageContent('zh', 'zh'), true);
	assert.equal(module.shouldRenderLanguageContent('zh', 'en'), false);
	assert.equal(module.shouldRenderLanguageContent('en', 'en'), true);
	assert.equal(module.shouldRenderLanguageContent('bi', 'zh'), true);
	assert.equal(module.shouldRenderLanguageContent('bi', 'en'), true);
});

test('getLanguageContentMode marks bilingual content as primary and secondary', async () => {
	const module = await import('./i18n.ts');

	assert.equal(typeof module.getLanguageContentMode, 'function');
	assert.equal(module.getLanguageContentMode('zh', 'zh'), 'single');
	assert.equal(module.getLanguageContentMode('zh', 'en'), 'hidden');
	assert.equal(module.getLanguageContentMode('en', 'en'), 'single');
	assert.equal(module.getLanguageContentMode('bi', 'zh'), 'primary');
	assert.equal(module.getLanguageContentMode('bi', 'en'), 'secondary');
});
