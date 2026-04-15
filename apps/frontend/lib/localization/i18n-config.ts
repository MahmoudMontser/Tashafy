export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ar";

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
