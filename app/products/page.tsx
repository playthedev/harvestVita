import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import ScrollReveal from '../components/ScrollReveal';
import { products } from '../lib/products';

export const metadata: Metadata = {
  title: 'Products — HarvestVita',
  description:
    'Explore the HarvestVita range: dehydrated powders & flakes, cold-pressed oils, heritage flours, whole spices, and spice powders. Clean-label, minimally processed essentials.',
};

const categoryImages: Record<string, string> = {
  'dehydrated-powders': 'https://images.unsplash.com/photo-1540914124281-342587941389?w=900&q=80',
  'vegetable-flakes':   'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=900&q=80',
  'cold-pressed-oils':  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=80',
  'heritage-flours':    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80',
  'whole-spices':       'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=80',
  'spice-powders':      'https://images.unsplash.com/photo-1632168844625-ce2b19a68a0b?w=900&q=80',
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Range"
        title="Six categories. One uncompromising standard."
        subtitle="Every product in the HarvestVita range is clean-label, minimally processed, and free from artificial additives. Built for modern kitchens that refuse to compromise."
        geometry="torus-knot"
        color="#C9A84C"
        stat={[
          { k: '6', l: 'Categories' },
          { k: '40+', l: 'SKUs' },
        ]}
      />

      {/* Intro band — three quick value props */}
      <section className="bg-[#F5F0E8] border-b border-[#1C1C1C]/8 py-14">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] grid md:grid-cols-3 gap-10 md:gap-px md:bg-[#1C1C1C]/10">
          {[
            { eyebrow: 'Single-Origin', title: 'Traceable to source', desc: 'Every batch traces back to the farm and harvest it came from.' },
            { eyebrow: 'Minimally Processed', title: 'Nutrition preserved', desc: 'Gentle methods that maintain the goodness of every ingredient.' },
            { eyebrow: 'No Additives', title: 'What you see is what you get', desc: 'No fillers, no anti-caking agents, no artificial colours — ever.' },
          ].map((b, i) => (
            <ScrollReveal key={b.eyebrow} delay={i * 0.08}>
              <div className="bg-[#F5F0E8] md:px-8 md:py-2 group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
                    {b.eyebrow}
                  </p>
                </div>
                <h3 className="font-display text-xl font-bold text-[#1C1C1C] mb-2 group-hover:text-[#2D4A2D] transition-colors">
                  {b.title}
                </h3>
                <p className="font-serif text-[#6B6456] text-sm leading-relaxed">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="bg-[#0D0D0D] py-24 md:py-32 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 20vw, 22rem)' }}
          aria-hidden>
          RANGE
        </div>

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                    The Full Range
                  </p>
                </div>
                <h2 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                  Pantry essentials,<br />
                  <span className="italic text-[#C9A84C]">made the honest way.</span>
                </h2>
              </div>
              <p className="font-serif text-[#F5F0E8]/45 max-w-sm leading-relaxed text-sm md:text-base">
                Pick a category to see what&apos;s inside, how it&apos;s made, and how it can fit into the way you cook.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F0E8]/8">
            {products.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 0.06}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="group relative block bg-[#0D0D0D] hover:bg-[#161616] transition-colors duration-300 h-full border border-transparent hover:border-[#C9A84C]/20 overflow-hidden"
                >
                  {/* top sliver */}
                  <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700 z-20" />
                  {/* image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={categoryImages[cat.slug]}
                      alt={cat.title}
                      fill
                      sizes="(max-width:768px) 90vw, (max-width:1024px) 45vw, 30vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, transparent 55%)' }} />
                    <div className="absolute bottom-3 left-3 font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/85 bg-[#0D0D0D]/60 backdrop-blur-sm px-2.5 py-1">
                      {cat.num} — Category
                    </div>
                  </div>
                  {/* body */}
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className="block w-1 h-1 rounded-full bg-[#C9A84C]" />
                        <p className="font-sans-harvest text-[11px] tracking-[0.25em] text-[#C9A84C]">{cat.num}</p>
                      </div>
                      <div className="w-9 h-9 border border-[#F5F0E8]/15 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C] transition-all duration-300 flex items-center justify-center">
                        <svg className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M1 10L10 1M10 1H2.5M10 1V8.5" stroke="currentColor" className="text-[#C9A84C] group-hover:text-[#0D0D0D]" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F5F0E8] mb-3 leading-snug group-hover:text-[#C9A84C] transition-colors">
                      {cat.title}
                    </h3>
                    <div className="h-px bg-[#F5F0E8]/8 mb-4 group-hover:bg-[#C9A84C]/30 transition-colors duration-300" />
                    <p className="font-serif text-[#F5F0E8]/45 text-sm leading-relaxed mb-6">
                      {cat.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cat.items.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="font-sans-harvest text-[9px] tracking-[0.12em] uppercase px-2 py-1 border border-[#F5F0E8]/10 text-[#F5F0E8]/40 group-hover:border-[#C9A84C]/25 group-hover:text-[#C9A84C]/70 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/70 group-hover:text-[#C9A84C] transition-colors flex items-center gap-2">
                      Explore Category
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom B2B strip */}
          <ScrollReveal>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#F5F0E8]/8 pt-10">
              <p className="font-serif text-[#F5F0E8]/35 text-sm">
                Custom packaging &amp; bulk quantities available for B2B partners.
              </p>
              <Link
                href="/contact"
                className="font-sans-harvest text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-200 whitespace-nowrap select-none"
              >
                Talk to Sales
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABand
        eyebrow="B2B & Wholesale"
        title="Looking for bulk or private label?"
        buttonLabel="Contact Sales"
        buttonHref="/contact"
        bg="plum"
      />
    </>
  );
}
