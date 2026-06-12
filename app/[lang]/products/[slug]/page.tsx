import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '../../../components/PageHero';
import CTABand from '../../../components/CTABand';
import ScrollReveal from '../../../components/ScrollReveal';
import { products, getProductBySlug } from '../../../lib/products';
import { getDictionary } from '../../../i18n/dictionaries';
import { isLocale, type Locale } from '../../../i18n/config';
import { localizedHref } from '../../../lib/locale-path';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not found — HarvestVita' };
  return {
    title: `${product.title} — HarvestVita`,
    description: product.short,
  };
}

const categoryImages: Record<string, string> = {
  'dehydrated-powders': 'https://images.unsplash.com/photo-1540914124281-342587941389?w=1200&q=80',
  'vegetable-flakes':   'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&q=80',
  'cold-pressed-oils':  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
  'heritage-flours':    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
  'whole-spices':       'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80',
  'spice-powders':      'https://images.unsplash.com/photo-1632168844625-ce2b19a68a0b?w=1200&q=80',
};

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={dict.products.category.categoryEyebrow.replace('{num}', product.num)}
        title={product.title}
        subtitle={product.short}
        geometry={product.geometry}
        color={product.color}
        stat={[
          { k: String(product.items.length), l: dict.products.category.skuLabel },
          { k: String(product.features.length), l: dict.products.category.standardsLabel },
        ]}
      />

      {/* Long description + features + lead image */}
      <section className="bg-[#F5F0E8] py-24 md:py-32 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-6 right-[-4vw] font-display font-bold text-[#4A2545]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        >
          {product.num}
        </div>

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw] grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: long copy + image */}
          <div className="lg:col-span-8 space-y-8">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <span className="block w-2 h-2 rounded-full bg-[#4A2545]" />
                <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545]">
                  {dict.products.category.aboutLabel}
                </p>
                <span className="block h-px w-12 bg-[#4A2545]/30" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="relative group">
                <span className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[#C9A84C] z-10" />
                <span className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-[#C9A84C] z-10" />
                <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-[#C9A84C] z-10" />
                <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#C9A84C] z-10" />
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={categoryImages[product.slug]}
                    alt={product.title}
                    fill
                    sizes="(max-width:1024px) 90vw, 60vw"
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(46,21,48,0.4))' }} />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/90 bg-[#1C1C1C]/50 backdrop-blur-sm px-3 py-1.5">
                      {dict.products.category.categoryBadge.replace('{num}', product.num)}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            {product.longDesc.map((para, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.05}>
                <p
                  className={`font-serif text-[#6B6456] leading-relaxed ${
                    i === 0 ? 'text-xl md:text-2xl text-[#1C1C1C]' : 'text-lg'
                  }`}
                >
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: features sticky aside */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <ScrollReveal delay={0.1}>
              <div className="relative bg-[#1C1C1C] p-8 md:p-10 overflow-hidden">
                <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A84C] to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                    {dict.products.category.whatMakesIt}
                  </p>
                </div>
                <ul className="space-y-5">
                  {product.features.map((f, i) => (
                    <li key={f} className="flex gap-4 group">
                      <span className="font-sans-harvest text-[10px] tracking-[0.25em] text-[#C9A84C]/70 pt-1.5 flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <span className="font-serif text-[#F5F0E8]/85 text-sm leading-relaxed block">{f}</span>
                        <span className="block h-px w-6 bg-[#C9A84C]/30 mt-3 group-hover:w-full transition-all duration-500" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      {/* Product items grid */}
      <section className="bg-[#EDE5D4] border-y border-[#1C1C1C]/5 py-24 md:py-32 relative overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="block w-2 h-2 rounded-full bg-[#4A2545]" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545]">
                    {dict.products.category.inThisRange}
                  </p>
                </div>
                <h2 className="font-display font-bold text-[#1C1C1C] leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                  {dict.products.category.availableProducts}
                </h2>
              </div>
              <p className="font-serif text-[#6B6456] max-w-md">
                {dict.products.category.availableProductsDesc}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-[#1C1C1C]/10">
            {product.items.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.03}>
                <div className="group relative bg-[#EDE5D4] p-6 md:p-7 hover:bg-[#F5F0E8] transition-colors min-h-[150px] flex flex-col justify-between overflow-hidden">
                  <span className="absolute top-0 left-0 h-full w-0 group-hover:w-1 bg-[#C9A84C] transition-all duration-500" />
                  <div className="flex items-center gap-2">
                    <span className="block w-1 h-1 rounded-full bg-[#C9A84C]" />
                    <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#C9A84C]">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-sm md:text-base font-bold text-[#1C1C1C] leading-snug group-hover:text-[#4A2545] transition-colors">
                      {item}
                    </p>
                    <div className="mt-2 h-px w-6 bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Uses */}
      <section className="bg-[#2E1530] py-24 md:py-32 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw] grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                  {dict.products.category.howToUseLabel}
                </p>
              </div>
              <h2 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                {dict.products.category.fromKitchenLine1}<br />
                <span className="italic text-[#C9A84C]">{dict.products.category.fromKitchenHighlight}</span>
              </h2>
              <p className="font-serif text-[#F5F0E8]/55 text-lg leading-relaxed">
                {dict.products.category.howToUseDesc}
              </p>
            </div>
          </ScrollReveal>
          <ul className="space-y-1">
            {product.uses.map((use, i) => (
              <ScrollReveal key={use} delay={i * 0.05}>
                <li className="group flex items-center gap-5 border-b border-[#F5F0E8]/10 py-4 hover:border-[#C9A84C]/40 transition-colors">
                  <span className="font-sans-harvest text-xs tracking-[0.2em] text-[#C9A84C] flex-shrink-0 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-xl md:text-2xl text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors flex-1">
                    {use}
                  </span>
                  <span className="text-[#C9A84C]/40 group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all">→</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Related */}
      <section className="bg-[#2D4A2D] py-20 md:py-28 relative overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="block w-2 h-2 rounded-full bg-[#C9A84C]" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                    {dict.products.category.continueExploring}
                  </p>
                </div>
                <h2 className="font-display font-bold text-[#F5F0E8] leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                  {dict.products.category.otherCategories}
                </h2>
              </div>
              <Link
                href={localizedHref('/products', locale)}
                className="hidden md:inline-flex items-center gap-2 font-sans-harvest text-xs tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#E2C47A] transition-colors group"
              >
                {dict.products.category.viewAll}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-px bg-[#F5F0E8]/10">
            {related.map((r, i) => (
              <ScrollReveal key={r.slug} delay={i * 0.07}>
                <Link
                  href={localizedHref(`/products/${r.slug}`, locale)}
                  className="group relative block bg-[#2D4A2D] overflow-hidden hover:bg-[#3D6B3D] transition-colors h-full"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700" />
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={categoryImages[r.slug]}
                      alt={r.title}
                      fill
                      sizes="(max-width:768px) 90vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A2D] via-[#2D4A2D]/30 to-transparent" />
                  </div>
                  <div className="p-8">
                    <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                      {r.num}
                    </p>
                    <h3 className="font-display text-lg font-bold text-[#F5F0E8] mb-3 leading-snug group-hover:text-[#C9A84C] transition-colors">
                      {r.title}
                    </h3>
                    <p className="font-serif text-[#F5F0E8]/55 text-sm leading-relaxed">
                      {r.short}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow={dict.products.category.ctaEyebrow}
        title={dict.products.category.ctaTitle}
        buttonLabel={dict.products.category.ctaButton}
        buttonHref={localizedHref('/contact', locale)}
        bg="dark"
      />
    </>
  );
}
