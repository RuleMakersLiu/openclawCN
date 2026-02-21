import { en } from "./en.ts";
import { zh } from "./zh.ts";

export type LocaleKey = keyof typeof en;
export type Locale = "en" | "zh";

const STORAGE_KEY = "openclaw-locale";

const bundles: Record<Locale, Record<string, string>> = { en, zh };

let currentLocale: Locale = "en";

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale): void {
  currentLocale = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // ignore
  }
}

export function initLocale(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh") {
      currentLocale = stored;
      return;
    }
  } catch {
    // ignore
  }
  // Auto-detect from browser
  const lang = typeof navigator !== "undefined" ? navigator.language : "en";
  if (lang.startsWith("zh")) {
    currentLocale = "zh";
  }
}

/**
 * Translate a key. Returns the key itself if no translation found.
 * Supports simple {0}, {1} placeholders.
 */
export function t(key: string, ...args: (string | number)[]): string {
  const bundle = bundles[currentLocale] ?? bundles.en;
  let text = bundle[key] ?? bundles.en[key] ?? key;
  for (let i = 0; i < args.length; i++) {
    text = text.replace(`{${i}}`, String(args[i]));
  }
  return text;
}
