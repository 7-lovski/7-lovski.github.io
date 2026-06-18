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

test('header chrome lets the wavy background reach the top edge', async () => {
	const header = await readFile(join(componentDir, 'Header.astro'), 'utf8');

	assert.match(header, /\.site-header\s*{[\s\S]*?background:\s*transparent/);
	assert.match(header, /\.site-header\.is-scrolled\s*{[\s\S]*?background:\s*transparent/);
	assert.doesNotMatch(header, /\.site-header\s*{[\s\S]*?background:\s*linear-gradient/);
});

test('wavy line background is visible across wide screens', async () => {
	const wavyLines = await readFile(join(componentDir, 'SiteWavyLines.astro'), 'utf8');

	assert.doesNotMatch(wavyLines, /lineCountLimit/);
	assert.match(wavyLines, /path\.setAttribute\('stroke',\s*'rgba\(31,\s*61,\s*109,\s*0\.28\)'\)/);
	assert.match(wavyLines, /path\.setAttribute\('stroke-width',\s*'0\.82'\)/);
	assert.match(wavyLines, /stroke:\s*rgba\(31,\s*61,\s*109,\s*0\.28\)/);
	assert.match(wavyLines, /--wavy-opacity,\s*1/);
	assert.match(wavyLines, /z-index:\s*1/);
	assert.match(wavyLines, /inset:\s*-2px -24px -2px -2px/);
	assert.match(wavyLines, /const viewportWidth = window\.innerWidth/);
	assert.match(wavyLines, /const canvasBleedX = 32/);
	assert.match(wavyLines, /const width = viewportWidth \+ canvasBleedX \* 2/);
	assert.match(wavyLines, /const lineOverflowX = 96/);
	assert.match(wavyLines, /const lineStartX = -canvasBleedX - xGap/);
	assert.match(wavyLines, /const lineEndX = width \+ canvasBleedX \+ lineOverflowX/);
	assert.match(wavyLines, /const lineCount = Math\.ceil\(\(lineEndX - lineStartX\) \/ xGap\) \+ 1/);
	assert.match(wavyLines, /const baseX = lineStartX \+ lineIndex \* xGap/);
});

test('wavy line background uses dense contour fields', async () => {
	const wavyLines = await readFile(join(componentDir, 'SiteWavyLines.astro'), 'utf8');

	assert.match(wavyLines, /const xGap = 10/);
	assert.match(wavyLines, /const yGap = 18/);
	assert.match(wavyLines, /const flowFields = \[/);
	assert.match(wavyLines, /field\.strength/);
	assert.match(wavyLines, /smoothInfluence/);
	assert.match(wavyLines, /pointerRadius = 180/);
	assert.match(wavyLines, /any-pointer: fine/);
	assert.match(wavyLines, /any-hover: hover/);
});

test('table of contents does not scroll the mobile page while highlighting', async () => {
	const toc = await readFile(join(componentDir, 'TableOfContents.astro'), 'utf8');

	assert.match(toc, /function canScrollTocLinkIntoView/);
	assert.match(toc, /window\.matchMedia\('\(min-width: 1040px\)'\)/);
	assert.match(toc, /if \(!wasActive && canScrollTocLinkIntoView\(\)\)/);
});
