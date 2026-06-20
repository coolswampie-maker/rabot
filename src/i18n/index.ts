import 'server-only';
import type { Locale } from './config';
import type { Dictionary } from './dictionaries/ru';

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  ru: () => import('./dictionaries/ru'),
  en: () => import('./dictionaries/en'),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await loaders[locale]();
  return mod.default;
}

export type { Dictionary };
