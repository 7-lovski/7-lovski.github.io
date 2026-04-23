import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getLocalizedField } from '../utils/content';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: getLocalizedField(post.data.title, 'zh'),
			description: getLocalizedField(post.data.description, 'zh'),
			pubDate: post.data.pubDate,
			updatedDate: post.data.updatedDate,
			link: `/blog/${post.id}/`,
		})),
	});
}
