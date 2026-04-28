import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getLocalizedField } from '../utils/content';
import { getBlogPosts } from '../utils/blog';

export async function GET(context) {
	const posts = await getBlogPosts();
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
