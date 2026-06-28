'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../lib/CartContext';
import { useIsMounted } from '../lib/useIsMounted';
import { localizedHref, stripLocale } from '../lib/locale-path';
import { locales, type Locale } from '../i18n/config';
import type { Dictionary } from '../i18n/dictionaries';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';

export default function HeaderClient({
  userName,
  locale,
  dict,
}: {
  userName: string | null;
  locale: Locale;
  dict: Dictionary;
}) {
  const navLinks = [
    { label: dict.nav.about, href: '/about' },
    { label: dict.nav.products, href: '/products' },
    { label: dict.nav.quality, href: '/quality' },
    { label: dict.nav.myths, href: '/myths' },
    { label: dict.nav.blog, href: '/blog' },
    { label: dict.nav.contact, href: '/contact' },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setMenuOpen(false);
      prevPath.current = pathname;
    }
  }, [pathname]);

  const { count } = useCart();
  // Cart hydrates from localStorage on the client, so the server-rendered count
  // is always 0. Only show the badge after mount to avoid a hydration mismatch.
  const mounted = useIsMounted();
  const showBadge = mounted && count > 0;

  const localPath = stripLocale(pathname, locales);
  const isActive = (href: string) =>
    href === '/' ? localPath === '/' : localPath.startsWith(href);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'border-b border-[#C9A84C]/15 py-2'
          : 'py-3'
      }`}
      style={{
        background: 'rgba(46,21,48, 0.92)',
        backdropFilter: 'blur(30px)',
      }}
      suppressHydrationWarning
    >
      <div className="max-w-[1800px] mx-auto px-[5.128vw] flex items-center justify-between">
        {/* Logo */}
        <Link href={localizedHref('/', locale)} className="flex items-center select-none group" aria-label="HarvestVita home">
          <span className="inline-flex items-center rounded-xl bg-[#F5F0E8] px-3 md:px-4 py-1.5 md:py-2 shadow-lg shadow-black/25 ring-1 ring-[#C9A84C]/25 group-hover:ring-[#C9A84C]/50 transition-all duration-300">
            <Image
              src="/logo.png"
              alt="HarvestVita by Amooha Farms Pvt Ltd"
              width={1368}
              height={1020}
              quality={100}
              unoptimized
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
              style={{ width: 'auto' }}
              priority
            />
          </span>
        </Link>

        {/* Desktop Nav — center */}
        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizedHref(link.href, locale)}
              className={`font-sans-harvest text-[13px] tracking-[0.04em] transition-colors duration-200 relative select-none ${
                isActive(link.href)
                  ? 'text-[#C9A84C]'
                  : 'text-[#F5F0E8]/75 hover:text-[#F5F0E8]'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#C9A84C] opacity-70" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Account / Login */}
          <Link
            href={userName ? localizedHref('/account', locale) : localizedHref('/login', locale)}
            className="flex items-center gap-1.5 font-sans-harvest text-[11px] tracking-[0.1em] uppercase text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors p-2"
            aria-label={userName ? dict.nav.myAccount : dict.nav.signIn}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {userName && (
              <span className="hidden lg:inline">{userName.split(' ')[0]}</span>
            )}
          </Link>

          <Link href={localizedHref('/cart', locale)} className="relative p-2 text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors" aria-label={dict.nav.cart}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M1 1h3l2.4 9.6a1 1 0 0 0 1 .8h7.6a1 1 0 0 0 .97-.76L18 5H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8" cy="17" r="1" fill="currentColor" />
              <circle cx="15" cy="17" r="1" fill="currentColor" />
            </svg>
            {showBadge && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C9A84C] text-[#2E1530] font-sans-harvest text-[8px] flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </Link>

          <CurrencySwitcher label={dict.nav.currency} />
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label={dict.nav.toggleMenu}
        >
          <span className={`block w-5 h-[1.5px] bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-[44rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-[#C9A84C]/15 px-[5.128vw] py-5" style={{ background: 'rgba(46,21,48,0.97)', backdropFilter: 'blur(30px)' }}>
          {/* Nav links */}
          <nav className="flex flex-col divide-y divide-[#F5F0E8]/8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={localizedHref(link.href, locale)}
                className={`flex items-center justify-between py-3.5 font-sans-harvest text-sm tracking-[0.12em] uppercase transition-colors duration-200 ${isActive(link.href) ? 'text-[#C9A84C]' : 'text-[#F5F0E8]/80 hover:text-[#F5F0E8]'}`}
              >
                {link.label}
                <span className={`transition-transform ${isActive(link.href) ? 'text-[#C9A84C]' : 'text-[#C9A84C]/40'}`}>→</span>
              </Link>
            ))}
          </nav>

          {/* Primary actions */}
          <div className="flex items-stretch gap-3 mt-5">
            <Link
              href={userName ? localizedHref('/account', locale) : localizedHref('/login', locale)}
              className="relative flex-1 inline-flex items-center justify-center gap-2 py-3 border border-[#F5F0E8]/20 text-[#F5F0E8]/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors rounded-sm font-sans-harvest text-[11px] tracking-[0.18em] uppercase"
              aria-label={userName ? dict.nav.myAccount : dict.nav.signIn}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {userName ? userName.split(' ')[0] : dict.nav.signIn}
            </Link>
            <Link
              href={localizedHref('/cart', locale)}
              className="relative flex-1 inline-flex items-center justify-center gap-2 py-3 border border-[#F5F0E8]/20 text-[#F5F0E8]/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors rounded-sm font-sans-harvest text-[11px] tracking-[0.18em] uppercase"
              aria-label={dict.nav.cart}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M1 1h3l2.4 9.6a1 1 0 0 0 1 .8h7.6a1 1 0 0 0 .97-.76L18 5H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="17" r="1" fill="currentColor" />
                <circle cx="15" cy="17" r="1" fill="currentColor" />
              </svg>
              {dict.nav.cart}
              {showBadge && (
                <span className="ml-0.5 min-w-4 h-4 px-1 rounded-full bg-[#C9A84C] text-[#2E1530] font-sans-harvest text-[8px] flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Preferences */}
          <div className="mt-5 pt-5 border-t border-[#F5F0E8]/8 flex flex-col gap-5">
            <div>
              <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-2.5">
                {dict.nav.currency}
              </p>
              <CurrencySwitcher label={dict.nav.currency} variant="mobile" />
            </div>
            <div>
              <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-2.5">
                {dict.nav.language}
              </p>
              <LanguageSwitcher locale={locale} label={dict.nav.language} variant="mobile" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
