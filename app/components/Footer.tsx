import Image from 'next/image';
import Link from 'next/link';

import { products } from '../lib/products';

const productLinks = products.map((p) => ({
  label: p.title.replace('Dehydrated Fruit & Vegetable Powders', 'Dehydrated Powders'),
  href: `/products/${p.slug}`,
}));

const companyLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Quality Standards', href: '/quality' },
  { label: 'All Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Return & Refund Policy', href: '/returns' },
];

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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-[#F5F0E8] relative overflow-hidden">
      {/* ── Large footer title — Terminal Industries style ── */}
      {/* <div className="border-t border-[#F5F0E8]/6 relative">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] pt-20 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-6">
              Get in touch
            </p>
            <Link href="/contact" className="block select-none" aria-label="Contact HarvestVita">
              <Image
                src="/logo.png"
                alt="HarvestVita"
                width={360}
                height={144}
                className="h-28 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-3 md:items-end mb-4">
            <p className="font-serif text-[#F5F0E8]/40 max-w-xs leading-relaxed text-sm md:text-right">
              Interested in wholesale, retail, or just want to know more? We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="font-sans-harvest text-[11px] tracking-[0.15em] uppercase px-6 py-3 bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A] transition-colors duration-200 w-fit select-none"
            >
              Write to Us
            </Link>
          </div>
        </div>
      </div> */}

      {/* ── Link columns ── */}
      <div className="border-t border-[#F5F0E8]/6">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-5 select-none" aria-label="HarvestVita home">
              <Image
                src="/logo.png"
                alt="HarvestVita by Amoohaa Farms"
                width={200}
                height={80}
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="font-serif text-[#F5F0E8]/45 text-sm leading-relaxed">
              Honest food. Thoughtful processing.<br />Farm to home.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70">
                By Amoohaa Farms
              </p>
            </div>

            {/* Social handles */}
            <div className="mt-7">
              <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 inline-flex items-center justify-center border border-[#F5F0E8]/15 text-[#F5F0E8]/55 hover:text-[#0D0D0D] hover:bg-[#C9A84C] hover:border-[#C9A84C] transition-colors duration-200"
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
              Products
            </p>
            <ul className="flex flex-col gap-3">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
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
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
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
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@harvestvita.in"
                  className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200 break-all"
                >
                  hello@harvestvita.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919999999999"
                  className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200"
                >
                  +91 99999 99999
                </a>
              </li>
              <li className="font-serif text-sm text-[#F5F0E8]/30 leading-relaxed mt-1">
                Amoohaa Farms, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#F5F0E8]/6">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/20">
            &copy; {year} HarvestVita by Amoohaa Farms. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-sans-harvest text-[9px] tracking-[0.1em] uppercase text-[#F5F0E8]/20 hover:text-[#C9A84C] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
