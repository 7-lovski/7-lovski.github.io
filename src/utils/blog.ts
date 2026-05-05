import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export async function getBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
	return getCollection('blog');
}
