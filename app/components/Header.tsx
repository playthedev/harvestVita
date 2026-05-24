'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Quality', href: '/quality' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when route changes (after initial mount)
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      setMenuOpen(false);
      prevPath.current = pathname;
    }
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1C1C1C]/95 backdrop-blur-md border-b border-[#C9A84C]/20 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
            By Amoohaa Farms
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-[#F5F0E8]">
            HarvestVita
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-sans-harvest text-xs tracking-[0.15em] uppercase transition-colors duration-200 relative ${
                isActive(link.href)
                  ? 'text-[#C9A84C]'
                  : 'text-[#F5F0E8]/80 hover:text-[#C9A84C]'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#C9A84C]" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="font-sans-harvest text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-200"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#F5F0E8] transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#F5F0E8] transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#F5F0E8] transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#1C1C1C]/98 backdrop-blur-md border-t border-[#C9A84C]/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-sans-harvest text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-[#C9A84C]'
                  : 'text-[#F5F0E8]/80 hover:text-[#C9A84C]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="font-sans-harvest text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-[#C9A84C] text-[#C9A84C] text-center hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-200 mt-2"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </header>
  );
}
