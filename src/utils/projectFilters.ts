import type { ProjectCategory } from '../data/siteContent';

export type CategorizedProject = {
	categories: readonly ProjectCategory[];
};

/** Returns projects that belong to the selected project-page category. */
export function filterProjectsByCategory<TProject extends CategorizedProject>(
	projects: readonly TProject[],
	category: ProjectCategory | 'all',
): TProject[] {
	if (category === 'all') {
		return [...projects];
	}

	return projects.filter((project) => project.categories.includes(category));
}
