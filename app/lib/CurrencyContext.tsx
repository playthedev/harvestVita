'use client';

import { createContext, useContext, ReactNode } from 'react';

const CountryContext = createContext<string | null>(null);

export function CurrencyProvider({ country, children }: { country: string | null; children: ReactNode }) {
  return <CountryContext.Provider value={country}>{children}</CountryContext.Provider>;
}

/** The visitor's country code (e.g. 'IN'), derived from the Vercel geo-IP header. Null outside Vercel. */
export function useCountry(): string | null {
  return useContext(CountryContext);
}
