import { readdir } from 'node:fs/promises';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

const blogDirectory = new URL('../content/blog/', import.meta.url);

async function hasBlogSourceFiles() {
	try {
		const files = await readdir(blogDirectory);
		return files.some((file) => file.endsWith('.md') || file.endsWith('.mdx'));
	} catch {
		return false;
	}
}

export async function getBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
	if (!(await hasBlogSourceFiles())) return [];
	return getCollection('blog');
}
