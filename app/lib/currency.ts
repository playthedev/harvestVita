import type { Locale } from '../i18n/config';

/** Currency shown to visitors per locale. Actual payment is always charged in INR via Razorpay. */
export const localeCurrency: Record<Locale, { code: string; symbol: string; rateFromInr: number }> = {
  en: { code: 'USD', symbol: '$', rateFromInr: 0.012 },
  fr: { code: 'EUR', symbol: '€', rateFromInr: 0.011 },
  de: { code: 'EUR', symbol: '€', rateFromInr: 0.011 },
};

const inr = { code: 'INR', rateFromInr: 1 };

/**
 * Converts an INR amount to the visitor's currency and formats it for display.
 * Visitors located in India always see INR, regardless of the selected site language.
 */
export function formatPrice(amountInInr: number, locale: Locale, country?: string | null): string {
  const { code, rateFromInr } = country === 'IN' ? inr : localeCurrency[locale];
  const converted = amountInInr * rateFromInr;
  return new Intl.NumberFormat(country === 'IN' ? 'en-IN' : locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: converted % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(converted);
}
