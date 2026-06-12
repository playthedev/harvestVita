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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'border-b border-[#C9A84C]/15 py-3'
          : 'py-5'
      }`}
      style={{
        background: scrolled
          ? 'rgba(5, 5, 5, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(30px)' : 'none',
      }}
      suppressHydrationWarning
    >
      <div className="max-w-[1800px] mx-auto px-[5.128vw] flex items-center justify-between">
        {/* Logo */}
        <Link href={localizedHref('/', locale)} className="flex items-center select-none" aria-label="HarvestVita home">
          <Image
            src="/logo.png"
            alt="HarvestVita by Amoohaa Farms"
            width={200}
            height={80}
            className="h-20 w-auto object-contain brightness-0 invert"
            style={{ width: 'auto' }}
            priority
          />
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
          <Link
            href={localizedHref('/contact', locale)}
            className="font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2 border border-[#F5F0E8]/25 text-[#F5F0E8]/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200 rounded-sm select-none"
          >
            {dict.nav.enquire}
          </Link>
          <Link
            href={localizedHref('/products', locale)}
            className="font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200 rounded-sm select-none"
          >
            {dict.nav.shop}
          </Link>

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
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C9A84C] text-[#0D0D0D] font-sans-harvest text-[8px] flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </Link>

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
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-[34rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-[#C9A84C]/15 px-[5.128vw] py-6 flex flex-col gap-5" style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(30px)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizedHref(link.href, locale)}
              className={`font-sans-harvest text-sm tracking-[0.1em] uppercase transition-colors duration-200 ${isActive(link.href) ? 'text-[#C9A84C]' : 'text-[#F5F0E8]/75 hover:text-[#F5F0E8]'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <Link href={localizedHref('/contact', locale)} className="flex-1 text-center font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 border border-[#F5F0E8]/25 text-[#F5F0E8]/80">
              {dict.nav.enquire}
            </Link>
            <Link href={localizedHref('/products', locale)} className="flex-1 text-center font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 bg-[#C9A84C] text-[#1C1C1C]">
              {dict.nav.shop}
            </Link>
            <Link
              href={userName ? localizedHref('/account', locale) : localizedHref('/login', locale)}
              className="relative flex items-center justify-center px-4 py-2.5 border border-[#F5F0E8]/25 text-[#F5F0E8]/80"
              aria-label={userName ? dict.nav.myAccount : dict.nav.signIn}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {userName && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A84C]" />
              )}
            </Link>
            <Link href={localizedHref('/cart', locale)} className="relative flex items-center justify-center px-4 py-2.5 border border-[#F5F0E8]/25 text-[#F5F0E8]/80">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M1 1h3l2.4 9.6a1 1 0 0 0 1 .8h7.6a1 1 0 0 0 .97-.76L18 5H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="17" r="1" fill="currentColor" />
                <circle cx="15" cy="17" r="1" fill="currentColor" />
              </svg>
              {showBadge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A84C] text-[#0D0D0D] font-sans-harvest text-[8px] flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
          <LanguageSwitcher locale={locale} label={dict.nav.language} variant="mobile" />
        </div>
      </div>
    </header>
  );
}
