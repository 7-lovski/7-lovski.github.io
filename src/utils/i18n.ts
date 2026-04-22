export type Locale = 'bi' | 'zh' | 'en';

export const DEFAULT_LOCALE: Locale = 'bi';

export function getLocaleFromPath(pathname: string): Locale {
    if (pathname === '/zh' || pathname.startsWith('/zh/')) return 'zh';
    if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
    return 'bi';
}

export function stripLocalePrefix(pathname: string): string {
    if (pathname === '/zh' || pathname === '/en') return '/';
    if (pathname.startsWith('/zh/')) return pathname.replace(/^\/zh/, '') || '/';
    if (pathname.startsWith('/en/')) return pathname.replace(/^\/en/, '') || '/';
    return pathname || '/';
}

export function withLocale(pathname: string, locale: Locale): string {
    const cleanPath = stripLocalePrefix(pathname);
    if (locale === 'bi') return cleanPath;
    return cleanPath === '/' ? `/${locale}/` : `/${locale}${cleanPath}`;
}

export function getLocaleLabel(locale: Locale): string | { primary: string; secondary?: string } {
    if (locale === 'zh') return '语言：中文';
    if (locale === 'en') return 'Language: English';
    return {
        primary: '语言：双语',
        secondary: 'Language: Bilingual',
    };
}

