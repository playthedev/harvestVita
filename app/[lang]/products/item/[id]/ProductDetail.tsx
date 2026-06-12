'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, ProductCategory } from '../../../../lib/products';
import { useCart } from '../../../../lib/CartContext';
import ScrollReveal from '../../../../components/ScrollReveal';
import { toggleWishlist } from '../../../../lib/auth-actions';
import { localizedHref } from '../../../../lib/locale-path';
import type { Locale } from '../../../../i18n/config';
import type { Dictionary } from '../../../../i18n/dictionaries';

function Cross({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="7" y1="0" x2="7" y2="14" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export default function ProductDetail({
  product,
  category,
  related,
  initialWishlisted = false,
  locale,
  dict,
}: {
  product: Product;
  category?: ProductCategory;
  related: Product[];
  initialWishlisted?: boolean;
  locale: Locale;
  dict: Dictionary;
}) {
  const { addMany, items } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [wishPending, startWishTransition] = useTransition();
  const inCart = items.find((i) => i.id === product.id);

  const handleWishlist = () => {
    startWishTransition(async () => {
      const result = await toggleWishlist(product.id);
      setWishlisted(result.wishlisted);
    });
  };

  const handleAdd = () => {
    addMany(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      {/* ═══════════════ MAIN PRODUCT SECTION ═══════════════ */}
      <section className="relative bg-[#0A0A0A] pt-32 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        {/* Spotlight */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '60vw', height: '60vh',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)',
            filter: 'blur(8px)',
          }}
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
        <Cross className="absolute top-[100px] left-[5.128vw] z-10" />
        <Cross className="absolute top-[100px] right-[5.128vw] z-10" />
        <Cross className="absolute bottom-8 left-[5.128vw] z-10" />
        <Cross className="absolute bottom-8 right-[5.128vw] z-10" />

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-10 font-sans-harvest text-[10px] tracking-[0.2em] uppercase">
            <Link href={localizedHref('/', locale)} className="text-[#F5F0E8]/35 hover:text-[#C9A84C] transition-colors">{dict.products.item.breadcrumbHome}</Link>
            <span className="text-[#F5F0E8]/20">/</span>
            <Link href={localizedHref('/products', locale)} className="text-[#F5F0E8]/35 hover:text-[#C9A84C] transition-colors">{dict.products.item.breadcrumbShop}</Link>
            <span className="text-[#F5F0E8]/20">/</span>
            <span className="text-[#C9A84C]">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* ── IMAGE ── */}
            <div className="relative">
              {/* Decorative L-brackets */}
              <span className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C] z-10" />
              <span className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C] z-10" />
              <span className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#C9A84C] z-10" />
              <span className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C] z-10" />

              <div className="relative aspect-square overflow-hidden bg-[#161616] group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width:1024px) 90vw, 45vw"
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 to-transparent" />
                {product.badge && (
                  <span className="absolute top-5 left-5 font-sans-harvest text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 bg-[#C9A84C] text-[#0D0D0D]">
                    {product.badge}
                  </span>
                )}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/85 bg-[#0D0D0D]/60 backdrop-blur-sm px-3 py-1.5">
                    HarvestVita · {product.unit}
                  </p>
                </div>
              </div>

              {/* Trust badges row */}
              <div className="mt-6 grid grid-cols-3 gap-px bg-[#F5F0E8]/8">
                {[
                  { k: '100%', l: dict.products.item.trustBadges.pure },
                  { k: '0', l: dict.products.item.trustBadges.additives },
                  { k: '12mo', l: dict.products.item.trustBadges.shelfLife },
                ].map((b) => (
                  <div key={b.l} className="bg-[#0D0D0D] py-4 text-center">
                    <p className="font-display font-bold text-[#C9A84C] text-xl">{b.k}</p>
                    <p className="font-sans-harvest text-[9px] tracking-[0.2em] uppercase text-[#F5F0E8]/40 mt-0.5">{b.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── INFO ── */}
            <div className="lg:pt-4">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                  {product.category}
                </p>
                <span className="block h-px w-12 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              </div>

              {/* Title */}
              <h1 className="font-display font-bold text-[#F5F0E8] leading-[0.98] tracking-tight mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
                {product.name}
              </h1>

              <p className="font-serif text-[#F5F0E8]/65 leading-relaxed text-lg mb-8 max-w-xl">
                {product.short}
              </p>

              {/* Price block */}
              <div className="border-y border-[#F5F0E8]/10 py-6 mb-8 flex items-end gap-4">
                <span className="font-display font-bold text-[#C9A84C] leading-none" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                  ₹{product.price}
                </span>
                <div className="pb-2">
                  <p className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#F5F0E8]/40">{dict.products.item.perUnit.replace('{unit}', product.unit)}</p>
                  <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#C9A84C]/70 mt-1">{dict.products.item.inclusiveOfTaxes}</p>
                </div>
              </div>

              {/* Qty + CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 items-stretch">
                <div className="flex items-stretch border border-[#F5F0E8]/20">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 flex items-center justify-center text-[#F5F0E8]/60 hover:text-[#C9A84C] hover:bg-[#F5F0E8]/5 transition-colors text-lg"
                  >−</button>
                  <span className="w-14 flex items-center justify-center font-display font-bold text-[#F5F0E8] text-lg border-x border-[#F5F0E8]/20">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-12 flex items-center justify-center text-[#F5F0E8]/60 hover:text-[#C9A84C] hover:bg-[#F5F0E8]/5 transition-colors text-lg"
                  >+</button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`group flex-1 font-sans-harvest text-[11px] tracking-[0.22em] uppercase py-4 transition-all duration-300 flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-[#2D4A2D] text-[#F5F0E8]'
                      : 'bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A]'
                  }`}
                >
                  {added ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6L4 9L11 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {dict.products.item.addedToCart}
                    </>
                  ) : (
                    <>
                      {dict.products.item.addToCart.replace('{price}', (product.price * qty).toLocaleString('en-IN'))}
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>

                {/* Wishlist heart */}
                <button
                  onClick={handleWishlist}
                  disabled={wishPending}
                  aria-label={wishlisted ? dict.products.item.wishlistRemove : dict.products.item.wishlistAdd}
                  className={`w-14 flex items-center justify-center border transition-colors duration-200 ${
                    wishlisted
                      ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                      : 'border-[#F5F0E8]/20 text-[#F5F0E8]/50 hover:border-[#C9A84C] hover:text-[#C9A84C]'
                  } disabled:opacity-40`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'}>
                    <path d="M12 21C12 21 3 14.5 3 8.5C3 6 5 4 7.5 4C9.24 4 10.91 5.01 12 6.5C13.09 5.01 14.76 4 16.5 4C19 4 21 6 21 8.5C21 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {inCart && (
                <Link
                  href={localizedHref('/cart', locale)}
                  className="inline-flex items-center gap-2 font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#E2C47A] transition-colors mb-8 group"
                >
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                  {dict.products.item.alreadyInCart.replace('{count}', String(inCart.qty))}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              )}

              {/* Specs */}
              {category && (
                <div className="bg-[#161616] border border-[#F5F0E8]/8 p-6 relative overflow-hidden">
                  <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A84C] to-transparent" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
                    {dict.products.item.whatMakesIt}
                  </p>
                  <ul className="space-y-3">
                    {category.features.map((f, i) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="font-sans-harvest text-[9px] tracking-[0.2em] text-[#C9A84C]/60 pt-1 flex-shrink-0 w-5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-serif text-[#F5F0E8]/75 text-sm leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ USES BAND ═══════════════ */}
      {category && (
        <section className="bg-[#F5F0E8] py-20 md:py-28 relative overflow-hidden border-y border-[#1C1C1C]/5">
          <div
            aria-hidden
            className="absolute -top-6 right-[-4vw] font-display font-bold text-[#4A2545]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
            style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
          >
            USES
          </div>

          <div className="relative max-w-[1800px] mx-auto px-[5.128vw] grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-2 h-2 rounded-full bg-[#4A2545]" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545]">
                    {dict.products.item.howToUseLabel}
                  </p>
                </div>
                <h2 className="font-display font-bold text-[#1C1C1C] leading-[0.95] tracking-tight mb-6"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                  {dict.products.item.fromPantryLine1}<br />
                  <span className="italic text-[#4A2545]">{dict.products.item.fromPantryHighlight}</span>
                </h2>
                <p className="font-serif text-[#6B6456] leading-relaxed text-lg">
                  {dict.products.item.howToUseDesc}
                </p>
                <Link
                  href={localizedHref(`/products/${product.categorySlug}`, locale)}
                  className="mt-8 inline-flex items-center gap-2 font-sans-harvest text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] hover:text-[#1C1C1C] transition-colors group"
                >
                  {dict.products.item.readFullCategoryGuide}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </ScrollReveal>

            <ul className="space-y-0">
              {category.uses.map((use, i) => (
                <ScrollReveal key={use} delay={i * 0.05}>
                  <li className="group flex items-center gap-5 border-b border-[#1C1C1C]/8 py-4 hover:border-[#C9A84C]/40 transition-colors">
                    <span className="font-sans-harvest text-xs tracking-[0.2em] text-[#C9A84C] flex-shrink-0 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-lg md:text-xl text-[#1C1C1C] group-hover:text-[#4A2545] transition-colors flex-1">
                      {use}
                    </span>
                    <span className="text-[#C9A84C]/40 group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all">→</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ═══════════════ RELATED ═══════════════ */}
      {related.length > 0 && (
        <section className="bg-[#0D0D0D] py-20 md:py-28 relative overflow-hidden">
          <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
            <ScrollReveal>
              <div className="mb-12 flex items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="block w-2 h-2 rounded-full bg-[#C9A84C]" />
                    <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                      {dict.products.item.youMayAlsoLike}
                    </p>
                  </div>
                  <h2 className="font-display font-bold text-[#F5F0E8] leading-tight tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                    {dict.products.item.moreFromRange}
                  </h2>
                </div>
                <Link
                  href={localizedHref('/products', locale)}
                  className="hidden md:inline-flex items-center gap-2 font-sans-harvest text-xs tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#E2C47A] transition-colors group"
                >
                  {dict.products.item.viewAll}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#F5F0E8]/8">
              {related.map((r, i) => (
                <ScrollReveal key={r.id} delay={i * 0.05}>
                  <Link href={localizedHref(`/products/item/${r.id}`, locale)} className="group relative block bg-[#0D0D0D] hover:bg-[#161616] transition-colors overflow-hidden h-full">
                    <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#C9A84C] transition-all duration-700 z-20" />
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        sizes="(max-width:768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent" />
                    </div>
                    <div className="p-5">
                      <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#C9A84C]/70 mb-2">
                        {r.unit}
                      </p>
                      <h3 className="font-display text-base font-bold text-[#F5F0E8] mb-2 leading-snug group-hover:text-[#C9A84C] transition-colors">
                        {r.name}
                      </h3>
                      <p className="font-display font-bold text-[#C9A84C] text-lg">₹{r.price}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
