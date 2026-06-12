'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '../i18n/config';
import { stripLocale } from '../lib/locale-path';

export default function LanguageSwitcher({
  locale,
  label,
  variant = 'desktop',
}: {
  locale: Locale;
  label: string;
  variant?: 'desktop' | 'mobile';
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    const rest = stripLocale(pathname, locales);
    const target = rest === '/' ? `/${next}` : `/${next}${rest}`;
    router.push(target);
  };

  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-2 mt-2" role="group" aria-label={label}>
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => switchTo(l)}
            className={`flex-1 text-center font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-3 py-2.5 border transition-colors duration-200 ${
              l === locale
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-[#F5F0E8]/25 text-[#F5F0E8]/80 hover:border-[#C9A84C] hover:text-[#C9A84C]'
            }`}
          >
            {l.toUpperCase()}
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
        {locale.toUpperCase()}
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
          className="absolute right-0 top-full mt-2 min-w-[140px] border border-[#C9A84C]/20 bg-[#0D0D0D] shadow-xl z-50 overflow-hidden"
        >
          {locales.map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={l === locale}
              onClick={() => switchTo(l)}
              className={`w-full text-left font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 transition-colors duration-150 ${
                l === locale
                  ? 'text-[#C9A84C] bg-[#C9A84C]/10'
                  : 'text-[#F5F0E8]/75 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5'
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
