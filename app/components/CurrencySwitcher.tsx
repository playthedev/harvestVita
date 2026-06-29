'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../lib/CurrencyContext';
import { currencies, currencyCodes } from '../lib/currency';

export default function CurrencySwitcher({
  label = 'Currency',
  variant = 'desktop',
}: {
  label?: string;
  variant?: 'desktop' | 'mobile';
}) {
  const { code, setCode } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const choose = (next: string) => {
    setOpen(false);
    setCode(next);
  };

  if (variant === 'mobile') {
    return (
      <div className="flex flex-wrap items-center gap-2 mt-2" role="group" aria-label={label}>
        {currencyCodes.map((c) => (
          <button
            key={c}
            onClick={() => choose(c)}
            className={`text-center font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-3 py-2.5 border transition-colors duration-200 ${
              c === code
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-[#F5F0E8]/25 text-[#F5F0E8]/80 hover:border-[#C9A84C] hover:text-[#C9A84C]'
            }`}
          >
            {currencies[c].symbol} {c}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="flex items-center gap-1.5 font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-3 py-2 border border-[#F5F0E8]/25 text-[#F5F0E8]/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200 rounded-sm select-none"
      >
        <span aria-hidden>{currencies[code]?.symbol}</span>
        {code}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1.5 3L5 6.5L8.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[200px] border border-[#C9A84C]/20 bg-[#2E1530] shadow-xl z-50 overflow-hidden"
        >
          {currencyCodes.map((c) => (
            <button
              key={c}
              role="option"
              aria-selected={c === code}
              onClick={() => choose(c)}
              className={`w-full text-left font-sans-harvest text-[11px] tracking-[0.08em] uppercase px-4 py-2.5 flex items-center justify-between gap-3 transition-colors duration-150 ${
                c === code
                  ? 'text-[#C9A84C] bg-[#C9A84C]/10'
                  : 'text-[#F5F0E8]/75 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-4 text-center" aria-hidden>{currencies[c].symbol}</span>
                {c}
              </span>
              <span className="text-[9px] tracking-[0.04em] normal-case opacity-60">{currencies[c].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
