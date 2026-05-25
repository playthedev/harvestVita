'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

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
    >
      <div className="max-w-[1800px] mx-auto px-[5.128vw] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center select-none" aria-label="HarvestVita home">
          <Image
            src="/logo.png"
            alt="HarvestVita by Amoohaa Farms"
            width={140}
            height={56}
            className="h-10 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop Nav — center */}
        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
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
            href="/contact"
            className="font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2 border border-[#F5F0E8]/25 text-[#F5F0E8]/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200 rounded-sm select-none"
          >
            Enquire
          </Link>
          <Link
            href="/products"
            className="font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200 rounded-sm select-none"
          >
            Products
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-[#C9A84C]/15 px-[5.128vw] py-6 flex flex-col gap-5" style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(30px)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-sans-harvest text-sm tracking-[0.1em] uppercase transition-colors duration-200 ${isActive(link.href) ? 'text-[#C9A84C]' : 'text-[#F5F0E8]/75 hover:text-[#F5F0E8]'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <Link href="/contact" className="flex-1 text-center font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 border border-[#F5F0E8]/25 text-[#F5F0E8]/80">
              Enquire
            </Link>
            <Link href="/products" className="flex-1 text-center font-sans-harvest text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 bg-[#C9A84C] text-[#1C1C1C]">
              Products
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
