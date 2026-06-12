'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../lib/CartContext';
import { localizedHref } from '../../lib/locale-path';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries';

function Cross({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="7" y1="0" x2="7" y2="14" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export default function CartClient({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { items, count, total, remove, updateQty } = useCart();
  const t = dict.cart;

  // ═══════════════ EMPTY CART ═══════════════
  if (count === 0) {
    return (
      <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-[5.128vw] pt-36 pb-24 overflow-hidden">
        {/* Spotlight */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '70vw', height: '60vh',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <Cross className="absolute top-[110px] left-[5.128vw]" />
        <Cross className="absolute top-[110px] right-[5.128vw]" />
        <Cross className="absolute bottom-8 left-[5.128vw]" />
        <Cross className="absolute bottom-8 right-[5.128vw]" />

        {/* Giant background word */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 22vw, 24rem)' }}
        >
          {t.empty.bgWord}
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 relative">
            <span className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[#C9A84C]" />
            <span className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-[#C9A84C]" />
            <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-[#C9A84C]" />
            <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#C9A84C]" />
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M2 2h4l3.6 14.4a1.5 1.5 0 0 0 1.5 1.2h11.4a1.5 1.5 0 0 0 1.45-1.14L27 7H7.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="25" r="1.5" fill="#C9A84C" />
              <circle cx="22" cy="25" r="1.5" fill="#C9A84C" />
            </svg>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="block h-px w-8 bg-[#C9A84C]" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">{t.empty.label}</p>
            <span className="block h-px w-8 bg-[#C9A84C]" />
          </div>

          <h1 className="font-display font-bold text-[#F5F0E8] leading-tight mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
            {t.empty.heading} <span className="italic text-[#C9A84C]">{t.empty.headingHighlight}</span>
          </h1>

          <p className="font-serif text-[#F5F0E8]/55 mb-10 leading-relaxed">
            {t.empty.body}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={localizedHref('/products', locale)}
              className="group inline-flex items-center justify-center gap-2 font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A] transition-colors duration-200"
            >
              {t.empty.browseShop}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={localizedHref('/', locale)}
              className="inline-flex items-center justify-center gap-2 font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 border border-[#F5F0E8]/20 text-[#F5F0E8]/70 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200"
            >
              {t.empty.backHome}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const shipping = total >= 499 ? 0 : 60;
  const orderTotal = total + shipping;

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative bg-[#0A0A0A] pt-36 md:pt-44 pb-14 md:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '60vw', height: '50vh',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 65%)',
            filter: 'blur(8px)',
          }}
        />

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <Cross className="absolute top-[90px] left-[5.128vw]" />
        <Cross className="absolute top-[90px] right-[5.128vw]" />

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
              {t.hero.label}
            </p>
            <span className="block h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>
                {t.hero.headingLine1} <span className="italic text-[#C9A84C]">{t.hero.headingHighlight}</span>
              </h1>
              <p className="mt-4 font-serif text-[#F5F0E8]/50">
                {t.hero.itemCount
                  .replace('{count}', String(count))
                  .replace(/{plural}/g, count !== 1 ? 's' : '')}
              </p>
            </div>
            <Link
              href={localizedHref('/products', locale)}
              className="font-sans-harvest text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] hover:text-[#E2C47A] transition-colors flex items-center gap-2 group"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              {t.hero.continueShopping}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ CART CONTENT ═══════════════ */}
      <section className="bg-[#0D0D0D] py-16 md:py-20 relative overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-14">
            {/* ── ITEMS ── */}
            <div>
              {/* Column heading */}
              <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center pb-4 border-b border-[#F5F0E8]/10 mb-4">
                <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/40">{t.columns.product}</p>
                <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/40 w-32 text-center">{t.columns.quantity}</p>
                <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/40 w-24 text-right">{t.columns.subtotal}</p>
                <span className="w-6" />
              </div>

              <div className="flex flex-col">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 md:gap-6 items-center py-6 border-b border-[#F5F0E8]/8 hover:bg-[#F5F0E8]/[0.015] transition-colors"
                  >
                    {/* Image */}
                    <Link href={localizedHref(`/products/item/${item.id}`, locale)} className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden bg-[#161616] block group/img">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover/img:scale-110" sizes="96px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 to-transparent" />
                    </Link>

                    {/* Name + meta */}
                    <div className="min-w-0">
                      <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#C9A84C]/70 mb-1">
                        {item.category}
                      </p>
                      <Link href={localizedHref(`/products/item/${item.id}`, locale)}>
                        <h3 className="font-display font-bold text-[#F5F0E8] text-base md:text-lg leading-snug hover:text-[#C9A84C] transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/35 mt-1">
                        ₹{item.price} / {item.unit}
                      </p>

                      {/* Mobile inline qty + price row */}
                      <div className="flex items-center justify-between mt-3 md:hidden">
                        <div className="flex items-center border border-[#F5F0E8]/20">
                          <button
                            onClick={() => item.qty === 1 ? remove(item.id) : updateQty(item.id, item.qty - 1)}
                            className="w-8 h-8 text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors"
                            aria-label={item.qty === 1 ? t.actions.remove : t.actions.decrease}
                          >−</button>
                          <span className="w-9 text-center font-sans-harvest text-sm text-[#F5F0E8]">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-8 h-8 text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors"
                            aria-label={t.actions.increase}
                          >+</button>
                        </div>
                        <span className="font-display font-bold text-[#C9A84C] text-lg">
                          ₹{(item.price * item.qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Qty controls (desktop) */}
                    <div className="hidden md:flex items-stretch border border-[#F5F0E8]/20 w-32">
                      <button
                        onClick={() => item.qty === 1 ? remove(item.id) : updateQty(item.id, item.qty - 1)}
                        className="flex-1 flex items-center justify-center text-[#F5F0E8]/60 hover:text-[#C9A84C] hover:bg-[#F5F0E8]/5 transition-colors text-lg h-10"
                        aria-label={item.qty === 1 ? t.actions.remove : t.actions.decrease}
                      >−</button>
                      <span className="flex-1 flex items-center justify-center font-display font-bold text-[#F5F0E8] border-x border-[#F5F0E8]/20">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="flex-1 flex items-center justify-center text-[#F5F0E8]/60 hover:text-[#C9A84C] hover:bg-[#F5F0E8]/5 transition-colors text-lg h-10"
                        aria-label={t.actions.increase}
                      >+</button>
                    </div>

                    {/* Subtotal (desktop) */}
                    <span className="hidden md:block font-display font-bold text-[#C9A84C] text-xl w-24 text-right">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => remove(item.id)}
                      className="text-[#F5F0E8]/30 hover:text-[#E2C47A] transition-colors p-2"
                      aria-label={t.actions.remove}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 4h10M6.5 4V2.5h3V4M5 4l.6 9.4a1 1 0 0 0 1 .9h2.8a1 1 0 0 0 1-.9L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo strip */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#F5F0E8]/8">
                {[
                  { icon: 'M2 8h12M2 4h12M2 12h8', ...t.promo[0] },
                  { icon: 'M8 1v14M1 8h14', ...t.promo[1] },
                  { icon: 'M2 8a6 6 0 1 1 12 0 6 6 0 0 1-12 0zM8 4v4l3 2', ...t.promo[2] },
                ].map((b) => (
                  <div key={b.heading} className="bg-[#0D0D0D] p-5 flex items-center gap-4">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                      <path d={b.icon} stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <div>
                      <p className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#F5F0E8]">{b.heading}</p>
                      <p className="font-sans-harvest text-[9px] tracking-[0.1em] text-[#F5F0E8]/40 mt-0.5">{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SUMMARY ── */}
            <div className="self-start">
              <div className="bg-[#0A0A0A] border border-[#F5F0E8]/8 sticky top-28 relative overflow-hidden">
                <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A84C] to-transparent" />
                {/* Decorative corner */}
                <span className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C]" />

                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                    <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                      {t.summary.label}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-[#F5F0E8]/10">
                    <div className="flex justify-between font-serif text-[#F5F0E8]/75 text-sm">
                      <span>{t.summary.subtotal.replace('{count}', String(count))}</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-serif text-[#F5F0E8]/75 text-sm">
                      <span>{t.summary.shipping}</span>
                      <span>{shipping === 0 ? <span className="text-[#C9A84C]">{t.summary.free}</span> : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && total < 499 && (
                      <div className="bg-[#161616] border border-[#C9A84C]/20 p-3 mt-4 flex items-start gap-3">
                        <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0 animate-pulse" />
                        <p className="font-sans-harvest text-[10px] tracking-[0.1em] text-[#F5F0E8]/60 leading-relaxed">
                          {(() => {
                            const amount = `₹${(499 - total).toLocaleString('en-IN')}`;
                            const [before, after] = t.summary.freeShippingNote.split('{amount}');
                            return (
                              <>
                                {before}<span className="text-[#C9A84C] font-bold">{amount}</span>{after}
                              </>
                            );
                          })()}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/40 mb-1">
                        {t.summary.orderTotal}
                      </p>
                      <p className="font-sans-harvest text-[8px] tracking-[0.1em] uppercase text-[#F5F0E8]/30">
                        {t.summary.taxNote}
                      </p>
                    </div>
                    <span className="font-display font-bold text-[#C9A84C] leading-none" style={{ fontSize: 'clamp(2rem, 3vw, 2.4rem)' }}>
                      ₹{orderTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <Link
                    href={localizedHref('/checkout', locale)}
                    className="group block w-full text-center font-sans-harvest text-[11px] tracking-[0.22em] uppercase py-4 bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A] transition-colors duration-200"
                  >
                    <span className="inline-flex items-center gap-2">
                      {t.summary.proceedToCheckout}
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </Link>

                  <div className="mt-5 flex items-center justify-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 5V3.5a3 3 0 0 1 6 0V5M2 5h8v6H2z" stroke="#C9A84C" strokeWidth="1" />
                    </svg>
                    <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/35">
                      {t.summary.secureBadge}
                    </p>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="border-t border-[#F5F0E8]/8 px-7 md:px-8 py-4 bg-[#0D0D0D]/50">
                  <p className="font-serif text-[#F5F0E8]/35 text-xs text-center leading-relaxed">
                    {(() => {
                      const [before, after] = t.summary.termsNote.split('{terms}');
                      return (
                        <>
                          {before}
                          <Link href={localizedHref('/terms', locale)} className="text-[#C9A84C] hover:underline">{t.summary.termsLink}</Link>
                          {after}
                        </>
                      );
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
