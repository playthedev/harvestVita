import type { Locale } from '../i18n/config';

export type CurrencyInfo = {
  code: string;
  symbol: string;
  label: string;
  rateFromInr: number;
  intlLocale: string;
};

/**
 * Currencies a visitor can be shown / pick from. Actual payment is always
 * charged in INR via Razorpay — these rates are display-only conversions.
 */
export const currencies: Record<string, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', label: 'Indian Rupee',  rateFromInr: 1,      intlLocale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', label: 'US Dollar',     rateFromInr: 0.012,  intlLocale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', label: 'Euro',          rateFromInr: 0.011,  intlLocale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', label: 'British Pound', rateFromInr: 0.0095, intlLocale: 'en-GB' },
  AED: { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham',  rateFromInr: 0.044,  intlLocale: 'ar-AE' },
};

export const currencyCodes = Object.keys(currencies);

/** Default display currency per site language, used when geo gives no better hint. */
const localeDefault: Record<Locale, string> = { en: 'USD', fr: 'EUR', de: 'EUR' };

/** Map a geo-IP country code to a display currency. */
const countryCurrency: Record<string, string> = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  AE: 'AED',
};

/**
 * Best-guess display currency from geo country + site locale.
 * India always resolves to INR. Falls back to the locale default.
 */
export function autoCurrencyCode(locale: Locale, country?: string | null): string {
  if (country && countryCurrency[country]) return countryCurrency[country];
  return localeDefault[locale] ?? 'USD';
}

/** Converts an INR amount to the given display currency and formats it. */
export function formatPrice(amountInInr: number, currencyCode: string): string {
  const c = currencies[currencyCode] ?? currencies.INR;
  const converted = amountInInr * c.rateFromInr;
  return new Intl.NumberFormat(c.intlLocale, {
    style: 'currency',
    currency: c.code,
    minimumFractionDigits: converted % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(converted);
}
