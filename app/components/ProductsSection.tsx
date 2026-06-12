'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allProducts } from '../lib/products';
import { useCart } from '../lib/CartContext';
import ScrollReveal from './ScrollReveal';
import { localizedHref } from '../lib/locale-path';
import type { Locale } from '../i18n/config';
import type { Dictionary } from '../i18n/dictionaries';

// Featured selection — bestsellers + new arrivals across categories
const featured = allProducts.filter((p) => p.badge).slice(0, 6);

function AddBtn({ id, dict }: { id: string; dict: Dictionary }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const product = allProducts.find((p) => p.id === id)!;
  const inCart = items.some((i) => i.id === id);
  const p = dict.home.products;

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handle}
      className={`group/btn relative w-full mt-5 py-3 font-sans-harvest text-[10px] tracking-[0.22em] uppercase transition-all duration-300 border ${
        inCart
          ? 'bg-[#2D4A2D] text-[#F5F0E8] border-[#2D4A2D]'
          : added
          ? 'bg-[#C9A84C] text-[#0D0D0D] border-[#C9A84C]'
          : 'bg-transparent text-[#C9A84C] border-[#C9A84C]/40 hover:border-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D]'
      }`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {added ? (
          <>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 5.5L4 8.5L10 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {p.added}
          </>
        ) : inCart ? (
          <>{p.inCartAddMore}</>
        ) : (
          <>
            {p.addToCart}
            <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
          </>
        )}
      </span>
    </button>
  );
}

export default function ProductsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = dict.home.products;
  return (
    <section className="bg-[#0D0D0D] py-28 md:py-36 relative overflow-hidden">
      {/* Faint background text — Terminal Industries style */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: 'clamp(8rem, 20vw, 22rem)' }}
        aria-hidden
      >
        PURE
      </div>

      {/* Radial gold spotlight */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.02) 40%, transparent 75%)',
        }}
      />

      {/* Top horizontal dotted line */}
      <div
        className="absolute top-16 left-[5.128vw] right-[5.128vw] h-px pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(to right, rgba(245,240,232,0.18) 0, rgba(245,240,232,0.18) 4px, transparent 4px, transparent 10px)',
        }}
      />

      <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                  {p.eyebrow}
                </p>
                <span className="block h-px w-12 bg-[#C9A84C]/30" />
              </div>
              <h2
                className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight max-w-2xl"
                style={{ fontSize: 'clamp(2.5rem, 5.729vw, 5.5rem)' }}
              >
                {p.headingLine1}<br />
                <span className="text-[#C9A84C] italic font-display">{p.headingItalic}</span>{' '}
                <span className="text-[#C9A84C]">{p.headingHighlight}</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-serif text-[#F5F0E8]/40 max-w-sm leading-relaxed text-sm md:text-base">
              {p.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F0E8]/8">
          {featured.map((prod, i) => (
            <ScrollReveal key={prod.id} delay={i * 0.06}>
              <div className="group relative bg-[#0D0D0D] hover:bg-[#161616] transition-colors duration-300 h-full flex flex-col border border-transparent hover:border-[#C9A84C]/20 overflow-hidden">
                {/* Top sliver */}
                <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700 z-20" />

                {/* Image */}
                <Link
                  href={localizedHref(`/products/item/${prod.id}`, locale)}
                  className="block relative w-full aspect-[4/3] overflow-hidden bg-[#161616]"
                >
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, transparent 55%)' }}
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 font-sans-harvest text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 bg-[#C9A84C] text-[#0D0D0D]">
                      {prod.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/80 bg-[#0D0D0D]/60 backdrop-blur-sm px-2.5 py-1">
                    {prod.unit}
                  </div>
                </Link>

                {/* Body */}
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="block w-1 h-1 rounded-full bg-[#C9A84C]" />
                    <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#C9A84C]/70">
                      {prod.category}
                    </p>
                  </div>
                  <Link href={localizedHref(`/products/item/${prod.id}`, locale)}>
                    <h3 className="font-display font-bold text-[#F5F0E8] mb-2 leading-snug group-hover:text-[#C9A84C] transition-colors"
                      style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)' }}>
                      {prod.name}
                    </h3>
                  </Link>
                  <div className="h-px bg-[#F5F0E8]/8 mb-4 group-hover:bg-[#C9A84C]/30 transition-colors duration-300" />
                  <p className="font-serif text-[#F5F0E8]/45 text-sm leading-relaxed mb-5 flex-1">
                    {prod.short}
                  </p>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-[#C9A84C] text-2xl">₹{prod.price}</span>
                    <span className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/35">
                      / {prod.unit}
                    </span>
                  </div>

                  <AddBtn id={prod.id} dict={dict} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#F5F0E8]/8 pt-10">
            <p className="font-serif text-[#F5F0E8]/30 text-sm">
              {p.bulkNote.replace('{count}', String(allProducts.length))}
            </p>
            <Link
              href={localizedHref('/products', locale)}
              className="group font-sans-harvest text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-200 whitespace-nowrap select-none inline-flex items-center gap-2"
            >
              {p.shopAll}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
