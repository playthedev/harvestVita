'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Locale } from '../i18n/config';
import { autoCurrencyCode, currencies } from './currency';

type CurrencyCtx = {
  /** Visitor country from geo-IP header (null outside Vercel). */
  country: string | null;
  /** Effective display currency code (manual override, else geo/locale auto). */
  code: string;
  /** Currency the visitor was auto-assigned before any manual choice. */
  autoCode: string;
  /** Manually select a display currency (persisted to localStorage). */
  setCode: (code: string) => void;
  /** True while no manual override is set. */
  isAuto: boolean;
};

const Ctx = createContext<CurrencyCtx | null>(null);
const STORAGE_KEY = 'hv_currency';

export function CurrencyProvider({
  country,
  locale,
  children,
}: {
  country: string | null;
  locale: Locale;
  children: ReactNode;
}) {
  const autoCode = autoCurrencyCode(locale, country);
  const [override, setOverride] = useState<string | null>(null);

  // Read saved choice after mount (server has no localStorage, so first
  // client render matches the server — avoids a hydration mismatch).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && currencies[saved]) setOverride(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setCode = (code: string) => {
    if (!currencies[code]) return;
    setOverride(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  };

  const code = override ?? autoCode;

  return (
    <Ctx.Provider value={{ country, code, autoCode, setCode, isAuto: override === null }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCurrency(): CurrencyCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    return { country: null, code: 'INR', autoCode: 'INR', setCode: () => {}, isAuto: true };
  }
  return ctx;
}

/** Backward-compatible accessor for the visitor's geo country code. */
export function useCountry(): string | null {
  return useCurrency().country;
}
