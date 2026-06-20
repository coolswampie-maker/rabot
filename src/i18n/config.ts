export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Map our URL locale to the Prisma `Locale` enum (RU | EN).
export function toDbLocale(locale: Locale): 'RU' | 'EN' {
  return locale === 'ru' ? 'RU' : 'EN';
}

export const localeNames: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
};
