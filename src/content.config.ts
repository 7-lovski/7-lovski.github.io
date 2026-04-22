import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedText = z.union([
	z.string(),
	z.object({
		zh: z.string(),
		en: z.string(),
	}),
]);

const localizedTag = z.union([
	z.string(),
	z.object({
		zh: z.string(),
		en: z.string(),
	}),
]);

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: localizedText,
			description: localizedText,
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(localizedTag).optional(),
		}),
});

export const collections = { blog };
