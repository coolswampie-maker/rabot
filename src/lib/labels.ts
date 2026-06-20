import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;

export const publicationTypeLabel: Record<string, Bi> = {
  WORKING_PAPER: { ru: 'Working paper', en: 'Working paper' },
  JOURNAL_ARTICLE: { ru: 'Статья', en: 'Article' },
  BOOK: { ru: 'Книга', en: 'Book' },
  REPORT: { ru: 'Отчёт', en: 'Report' },
  CONFERENCE_PAPER: { ru: 'Доклад', en: 'Conference paper' },
};

export const postTypeLabel: Record<string, Bi> = {
  NEWS: { ru: 'Новость', en: 'News' },
  ARTICLE: { ru: 'Статья', en: 'Article' },
  EVENT: { ru: 'Событие', en: 'Event' },
  EXPERT_COMMENT: { ru: 'Экспертное мнение', en: 'Expert comment' },
};

export function pubLabel(type: string, locale: Locale): string {
  return publicationTypeLabel[type]?.[locale] ?? type;
}
