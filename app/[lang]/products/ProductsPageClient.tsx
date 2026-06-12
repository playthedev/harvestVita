'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { allProducts } from '../../lib/products';
import { useCart } from '../../lib/CartContext';
import ScrollReveal from '../../components/ScrollReveal';
import { localizedHref } from '../../lib/locale-path';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries';

const FloatingGeometry = dynamic(() => import('../../components/three/FloatingGeometry'), {
  ssr: false,
  loading: () => null,
});

function Cross({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="7" y1="0" x2="7" y2="14" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function AddToCartBtn({ productId, dict }: { productId: string; dict: Dictionary }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const product = allProducts.find((p) => p.id === productId)!;
  const inCart = items.some((i) => i.id === productId);

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
      className={`group/btn relative w-full mt-5 py-3 font-sans-harvest text-[10px] tracking-[0.22em] uppercase transition-all duration-300 overflow-hidden border ${
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
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 5.5L4 8.5L10 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {dict.products.list.added}
          </>
        ) : inCart ? (
          <>{dict.products.list.inCartAddMore}</>
        ) : (
          <>
            {dict.products.list.addToCart}
            <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
          </>
        )}
      </span>
    </button>
  );
}

export default function ProductsPageClient({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [active, setActive] = useState('All');
  const { count } = useCart();

  const filtered = active === 'All' ? allProducts : allProducts.filter((p) => p.category === active);
  const activeLabel = dict.products.list.categories.find((c) => c.value === active)?.label ?? active;
  const itemCountText = dict.products.list.itemCount
    .replace('{count}', String(filtered.length))
    .replace('{plural}', filtered.length !== 1 ? 's' : '');

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative bg-[#0A0A0A] pt-44 pb-24 md:pt-52 md:pb-32 overflow-hidden">
        {/* 3D Particles */}
        <div className="absolute inset-0 opacity-55">
          <FloatingGeometry color="#C9A84C" />
        </div>

        {/* Spotlight */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: '38%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '70vw', height: '60vh',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)',
            filter: 'blur(6px)',
          }}
        />

        {/* Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.15) 50%, rgba(10,10,10,0.92) 100%)' }}
        />

        {/* Grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Corner crosses */}
        <Cross className="absolute top-[110px] left-[5.128vw] z-10" />
        <Cross className="absolute top-[110px] right-[5.128vw] z-10" />
        <Cross className="absolute bottom-8 left-[5.128vw] z-10" />
        <Cross className="absolute bottom-8 right-[5.128vw] z-10" />

        {/* Vertical accent line */}
        <div className="absolute top-32 bottom-16 left-[5.128vw] z-[5] pointer-events-none flex flex-col items-center justify-center gap-3 opacity-30 hidden md:flex">
          <span className="block w-px flex-1 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
          <span className="block w-1 h-1 bg-[#C9A84C] rounded-full" />
        </div>

        {/* Giant background word */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.025] leading-none select-none pointer-events-none whitespace-nowrap z-[1]"
          style={{ fontSize: 'clamp(8rem, 22vw, 24rem)' }}
        >
          SHOP
        </div>

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
              {dict.products.list.eyebrow}
            </p>
            <span className="block h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          </div>

          <h1
            className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight max-w-5xl animate-fade-up"
            style={{ fontSize: 'clamp(3rem, 7.5vw, 7rem)', animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            {dict.products.list.titleLine1}<br />
            <span className="italic text-[#C9A84C]">{dict.products.list.titleHighlight}</span>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10 max-w-6xl">
            <p
              className="font-serif text-[#F5F0E8]/65 leading-relaxed max-w-2xl animate-fade-up"
              style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              {dict.products.list.subtitle}
            </p>
            <div className="flex gap-8 md:gap-10 flex-shrink-0">
              {[
                { k: String(allProducts.length), l: dict.products.list.stats.products },
                { k: '6', l: dict.products.list.stats.categories },
                { k: '0', l: dict.products.list.stats.additives },
              ].map((s) => (
                <div key={s.l} className="flex flex-col">
                  <span className="font-display font-bold text-[#C9A84C]" style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)' }}>
                    {s.k}
                  </span>
                  <span className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/40 mt-1">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FILTER BAR ═══════════════ */}
      <div className="sticky top-[64px] z-30 bg-[#0D0D0D]/95 backdrop-blur-md border-y border-[#C9A84C]/10">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] py-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70 flex-shrink-0 mr-2 hidden sm:block">
            {dict.products.list.filterLabel}
          </p>
          {dict.products.list.categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`flex-shrink-0 font-sans-harvest text-[10px] tracking-[0.22em] uppercase px-4 py-2.5 border transition-all duration-200 ${
                active === cat.value
                  ? 'bg-[#C9A84C] text-[#0D0D0D] border-[#C9A84C]'
                  : 'bg-transparent text-[#F5F0E8]/55 border-[#F5F0E8]/15 hover:border-[#C9A84C] hover:text-[#C9A84C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════ PRODUCTS GRID ═══════════════ */}
      <section className="bg-[#0D0D0D] py-20 md:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.02] leading-none select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 18vw, 20rem)' }}
        >
          RANGE
        </div>

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          {/* Top bar */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
                {activeLabel}
              </p>
              <span className="block h-px w-12 bg-[#C9A84C]/30" />
              <p className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#F5F0E8]/40">
                {itemCountText}
              </p>
            </div>
            {count > 0 && (
              <Link
                href={localizedHref('/cart', locale)}
                className="inline-flex items-center gap-2 font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#E2C47A] transition-colors group"
              >
                {dict.products.list.viewCart.replace('{count}', String(count))}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#F5F0E8]/8">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.03}>
                <div className="group relative bg-[#0D0D0D] hover:bg-[#161616] transition-colors duration-300 h-full flex flex-col border border-transparent hover:border-[#C9A84C]/20 overflow-hidden">
                  {/* Top sliver */}
                  <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700 z-20" />

                  {/* Image */}
                  <Link href={localizedHref(`/products/item/${product.id}`, locale)} className="block relative aspect-square overflow-hidden bg-[#161616]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 25vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/20 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 55%)' }} />
                    {product.badge && (
                      <span className="absolute top-3 left-3 font-sans-harvest text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 bg-[#C9A84C] text-[#0D0D0D]">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/80 bg-[#0D0D0D]/60 backdrop-blur-sm px-2.5 py-1">
                      {product.unit}
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-1 h-1 rounded-full bg-[#C9A84C]" />
                      <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#C9A84C]/70">
                        {product.category}
                      </p>
                    </div>
                    <Link href={localizedHref(`/products/item/${product.id}`, locale)}>
                      <h3 className="font-display font-bold text-[#F5F0E8] text-lg md:text-xl leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="h-px bg-[#F5F0E8]/8 mb-3 group-hover:bg-[#C9A84C]/30 transition-colors duration-300" />
                    <p className="font-serif text-[#F5F0E8]/45 text-sm leading-relaxed mb-4 flex-1">
                      {product.short}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-bold text-[#C9A84C] text-2xl">₹{product.price}</span>
                      <span className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/35">{dict.products.list.perUnit.replace('{unit}', product.unit)}</span>
                    </div>
                    <AddToCartBtn productId={product.id} dict={dict} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom B2B strip */}
          <ScrollReveal>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#F5F0E8]/8 pt-10">
              <p className="font-serif text-[#F5F0E8]/35 text-sm">
                {dict.products.list.bulkNote}
              </p>
              <Link
                href={localizedHref('/contact', locale)}
                className="font-sans-harvest text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-200 whitespace-nowrap"
              >
                {dict.products.list.talkToSales}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
