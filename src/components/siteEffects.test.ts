import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const componentDir = dirname(fileURLToPath(import.meta.url));

test('global visual effects are mounted from the shared header', async () => {
	const header = await readFile(join(componentDir, 'Header.astro'), 'utf8');

	assert.match(header, /import MagneticCursor/);
	assert.match(header, /import SiteWavyLines/);
	assert.match(header, /<MagneticCursor\s*\/>/);
	assert.match(header, /<SiteWavyLines\s*\/>/);
});

test('wavy line background keeps motion and pointer safeguards', async () => {
	const wavyLines = await readFile(join(componentDir, 'SiteWavyLines.astro'), 'utf8');

	assert.match(wavyLines, /prefers-reduced-motion: reduce/);
	assert.match(wavyLines, /pointer-events:\s*none/);
	assert.match(wavyLines, /requestAnimationFrame/);
	assert.match(wavyLines, /document\.visibilityState/);
});

test('magnetic cursor works on the header layer', async () => {
	const header = await readFile(join(componentDir, 'Header.astro'), 'utf8');
	const magneticCursor = await readFile(join(componentDir, 'MagneticCursor.astro'), 'utf8');

	assert.doesNotMatch(header, /data-no-magnetic-cursor/);
	assert.doesNotMatch(magneticCursor, /closest\('\[data-no-magnetic-cursor\]'\)/);
	assert.match(magneticCursor, /z-index:\s*40/);
});

test('wavy line background is visible across wide screens', async () => {
	const wavyLines = await readFile(join(componentDir, 'SiteWavyLines.astro'), 'utf8');

	assert.doesNotMatch(wavyLines, /lineCountLimit/);
	assert.match(wavyLines, /path\.setAttribute\('stroke',\s*'rgba\(31,\s*61,\s*109,\s*0\.18\)'\)/);
	assert.match(wavyLines, /path\.setAttribute\('stroke-width',\s*'0\.72'\)/);
	assert.match(wavyLines, /stroke:\s*rgba\(31,\s*61,\s*109,\s*0\.18\)/);
	assert.match(wavyLines, /--wavy-opacity,\s*0\.9/);
});

test('wavy line background uses dense contour fields', async () => {
	const wavyLines = await readFile(join(componentDir, 'SiteWavyLines.astro'), 'utf8');

	assert.match(wavyLines, /const xGap = 10/);
	assert.match(wavyLines, /const yGap = 18/);
	assert.match(wavyLines, /const flowFields = \[/);
	assert.match(wavyLines, /field\.strength/);
	assert.match(wavyLines, /smoothInfluence/);
	assert.match(wavyLines, /pointerRadius = 180/);
});
