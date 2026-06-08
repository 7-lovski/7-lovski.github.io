export type Locale = 'bi' | 'zh' | 'en';

export const DEFAULT_LOCALE: Locale = 'zh';

const LOCALE_HREFLANGS: Record<Locale, string> = {
    zh: 'zh-CN',
    en: 'en',
    bi: 'zh-Hans',
};

export function getLocaleFromPath(pathname: string): Locale {
    if (pathname === '/bi' || pathname.startsWith('/bi/')) return 'bi';
    if (pathname === '/zh' || pathname.startsWith('/zh/')) return 'zh';
    if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
    return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
    if (pathname === '/bi' || pathname === '/zh' || pathname === '/en') return '/';
    if (pathname.startsWith('/bi/')) return pathname.replace(/^\/bi/, '') || '/';
    if (pathname.startsWith('/zh/')) return pathname.replace(/^\/zh/, '') || '/';
    if (pathname.startsWith('/en/')) return pathname.replace(/^\/en/, '') || '/';
    return pathname || '/';
}

export function withLocale(pathname: string, locale: Locale): string {
    const cleanPath = stripLocalePrefix(pathname);
    if (locale === DEFAULT_LOCALE) return cleanPath;
    return cleanPath === '/' ? `/${locale}/` : `/${locale}${cleanPath}`;
}

export function getContentPath(section: 'blog' | 'projects', slug: string, locale: Locale): string {
	return withLocale(`/${section}/${slug}/`, locale);
}

export function getAlternateLocaleLinks(pathname: string, site: URL | string): { hreflang: string; href: string }[] {
    const basePath = stripLocalePrefix(pathname);
    const siteUrl = site instanceof URL ? site : new URL(site);
    const localeLinks = (['zh', 'en', 'bi'] as Locale[]).map((locale) => ({
        hreflang: LOCALE_HREFLANGS[locale],
        href: new URL(withLocale(basePath, locale), siteUrl).toString(),
    }));

    return [
        ...localeLinks,
        {
            hreflang: 'x-default',
            href: new URL(withLocale(basePath, DEFAULT_LOCALE), siteUrl).toString(),
        },
    ];
}

export function shouldRenderLanguageContent(currentLocale: Locale, language: 'zh' | 'en'): boolean {
	return currentLocale === 'bi' || currentLocale === language;
}

export function getLanguageContentMode(
	currentLocale: Locale,
	language: 'zh' | 'en',
): 'hidden' | 'single' | 'primary' | 'secondary' {
	if (currentLocale === 'bi') {
		return language === 'zh' ? 'primary' : 'secondary';
	}

	if (currentLocale === language) {
		return 'single';
	}

	return 'hidden';
}

export function getLocaleLabel(locale: Locale): string | { primary: string; secondary?: string } {
    if (locale === 'zh') return '语言：中文';
    if (locale === 'en') return 'Language: English';
    return {
        primary: '语言：双语',
        secondary: 'Language: Bilingual',
    };
}

