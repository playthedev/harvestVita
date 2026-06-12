import 'server-only';
import type { Locale } from '../config';

const dictionaries = {
  en: () => import('./en').then((m) => m.default),
  fr: () => import('./fr').then((m) => m.default),
  de: () => import('./de').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
