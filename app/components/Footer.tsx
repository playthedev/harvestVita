import Image from 'next/image';
import Link from 'next/link';

import { products } from '../lib/products';
import { localizedHref } from '../lib/locale-path';
import type { Locale } from '../i18n/config';
import type { Dictionary } from '../i18n/dictionaries';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/harvestvita',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/harvestvita',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 8h2.5V4.5H14c-2.2 0-4 1.8-4 4V11H7.5v3.5H10V21h3.5v-6.5H16L16.5 11H13.5V8.5c0-.28.22-.5.5-.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/amoohaa-farms',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@harvestvita',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.5" y="6" width="19" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const productLinks = products.map((p) => ({
    label: p.title.replace('Dehydrated Fruit & Vegetable Powders', 'Dehydrated Powders'),
    href: `/products/${p.slug}`,
  }));

  const companyLinks = [
    { label: dict.footer.ourStory, href: '/about' },
    { label: dict.footer.qualityStandards, href: '/quality' },
    { label: dict.footer.allProducts, href: '/products' },
    { label: dict.footer.myths, href: '/myths' },
    { label: dict.footer.blog, href: '/blog' },
    { label: dict.nav.contact, href: '/contact' },
  ];

  const legalLinks = [
    { label: dict.footer.termsConditions, href: '/terms' },
    { label: dict.footer.privacyPolicy, href: '/privacy' },
    { label: dict.footer.returnsPolicy, href: '/returns' },
  ];

  return (
    <footer className="bg-[#2E1530] text-[#F5F0E8] relative overflow-hidden">
      {/* ── Link columns ── */}
      <div className="border-t border-[#F5F0E8]/6">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href={localizedHref('/', locale)} className="inline-flex items-center rounded-xl bg-[#F5F0E8] px-4 py-3 mb-4 shadow-lg shadow-black/25 ring-1 ring-[#C9A84C]/25 hover:ring-[#C9A84C]/50 transition-all duration-300 select-none" aria-label="HarvestVita home">
              <Image
                src="/logo.png"
                alt="HarvestVita by Amooha Farms Pvt Ltd"
                width={1368}
                height={1020}
                quality={100}
                unoptimized
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="font-serif text-[#F5F0E8]/45 text-sm leading-relaxed">
              {dict.footer.tagline}<br />{dict.footer.taglineLine2}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70">
                {dict.footer.byAmoohaa}
              </p>
            </div>

            {/* Social handles */}
            <div className="mt-7">
              <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-3">
                {dict.footer.followUs}
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 inline-flex items-center justify-center border border-[#F5F0E8]/15 text-[#F5F0E8]/55 hover:text-[#2E1530] hover:bg-[#C9A84C] hover:border-[#C9A84C] transition-colors duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
              {dict.footer.products}
            </p>
            <ul className="flex flex-col gap-3">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={localizedHref(item.href, locale)}
                    className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
              {dict.footer.company}
            </p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={localizedHref(item.href, locale)}
                    className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
              {dict.footer.contact}
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:letsconnect@harvestvita.in"
                  className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200 break-all"
                >
                  letsconnect@harvestvita.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919163969111"
                  className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200"
                >
                  +91 91639 69111 / +91 93399 98587
                </a>
              </li>
              <li className="font-serif text-sm text-[#F5F0E8]/30 leading-relaxed mt-1">
                {dict.footer.address}
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
              {dict.footer.legal}
            </p>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={localizedHref(item.href, locale)}
                    className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#F5F0E8]/6">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] py-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-center">
          <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/20">
            &copy; {year} HarvestVita by Amooha Farms Pvt Ltd. {dict.footer.rights}
          </p>
          <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/20">
            Built by{' '}
            <a
              href="https://nexmogen.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors duration-200"
            >
              Nexmogen
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
