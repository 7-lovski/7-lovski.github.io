import type { Locale } from './i18n';

export type LocalizedField =
    | string
    | {
    zh: string;
    en: string;
};

export function getLocalizedField(value: LocalizedField, locale: Locale): string {
    if (typeof value === 'string') return value;

    if (locale === 'zh') return value.zh;
    if (locale === 'en') return value.en;

    return value.zh === value.en ? value.zh : `${value.zh} / ${value.en}`;
}
