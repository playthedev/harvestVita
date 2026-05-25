'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '../lib/products';
import ScrollReveal from './ScrollReveal';

const categoryImages: Record<string, string> = {
  'dehydrated-powders': 'https://images.unsplash.com/photo-1540914124281-342587941389?w=600&q=75',
  'vegetable-flakes':   'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=75',
  'cold-pressed-oils':  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=75',
  'heritage-flours':    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=75',
  'whole-spices':       'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=75',
  'spice-powders':      'https://images.unsplash.com/photo-1632168844625-ce2b19a68a0b?w=600&q=75',
};

export default function ProductsSection() {
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

      <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <ScrollReveal>
            <div>
              <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
                Product Range
              </p>
              <h2
                className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight max-w-2xl"
                style={{ fontSize: 'clamp(2.5rem, 5.729vw, 5.5rem)' }}
              >
                Six Categories.<br />
                <span className="text-[#C9A84C]">One Standard.</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-serif text-[#F5F0E8]/40 max-w-sm leading-relaxed text-sm md:text-base">
              Clean-label, minimally processed essentials. No artificial additives — ever.
            </p>
          </ScrollReveal>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F0E8]/8">
          {products.map((cat, i) => (
            <ScrollReveal key={cat.slug} delay={i * 0.06}>
              <Link
                href={`/products/${cat.slug}`}
                className="group block bg-[#0D0D0D] hover:bg-[#161616] transition-colors duration-300 h-full border border-transparent hover:border-[#C9A84C]/15 overflow-hidden"
              >
                {/* Product image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={categoryImages[cat.slug]}
                    alt={cat.title}
                    fill
                    sizes="(max-width:768px) 90vw, (max-width:1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <p className="font-sans-harvest text-[11px] tracking-[0.25em] text-[#C9A84C]">
                      {cat.num}
                    </p>
                    <div className="w-7 h-7 border border-[#F5F0E8]/15 group-hover:border-[#C9A84C]/50 transition-colors duration-300 flex items-center justify-center">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M1 10L10 1M10 1H2.5M10 1V8.5" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <h3
                    className="font-display font-bold text-[#F5F0E8] mb-3 leading-snug group-hover:text-[#C9A84C] transition-colors duration-300"
                    style={{ fontSize: 'clamp(1rem, 1.56vw, 1.35rem)' }}
                  >
                    {cat.title}
                  </h3>
                  <div className="h-px bg-[#F5F0E8]/8 mb-4 group-hover:bg-[#C9A84C]/30 transition-colors duration-300" />
                  <p className="font-serif text-[#F5F0E8]/40 text-sm leading-relaxed mb-6">
                    {cat.short}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-sans-harvest text-[9px] tracking-[0.12em] uppercase px-2 py-1 border border-[#F5F0E8]/10 text-[#F5F0E8]/30 group-hover:border-[#C9A84C]/25 group-hover:text-[#C9A84C]/60 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#F5F0E8]/8 pt-10">
            <p className="font-serif text-[#F5F0E8]/30 text-sm">
              Custom packaging &amp; bulk quantities available for B2B partners.
            </p>
            <Link
              href="/products"
              className="font-sans-harvest text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-200 whitespace-nowrap select-none"
            >
              View All Products
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
