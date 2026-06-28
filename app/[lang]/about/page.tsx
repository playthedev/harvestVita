import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '../../components/PageHero';
import CTABand from '../../components/CTABand';
import ScrollReveal from '../../components/ScrollReveal';
import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import { localizedHref } from '../../lib/locale-path';

export const metadata: Metadata = {
  title: 'About — HarvestVita',
  description:
    'The story of HarvestVita by Amooha Farms Pvt Ltd. A commitment to honest food, thoughtful processing, and ingredients that carry the richness of the farm to your home.',
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  const { about } = dict;

  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        subtitle={about.hero.subtitle}
        geometry="dodecahedron"
        color="#C9A84C"
        stat={about.hero.stats}
      />

      {/* Long-form story */}
      <section className="bg-[#F5F0E8] py-24 md:py-32 relative overflow-hidden">
        {/* Decorative oversized word */}
        <div
          aria-hidden
          className="absolute -top-6 right-[-4vw] font-display font-bold text-[#161616]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        >
          {about.storySection.decorativeWord}
        </div>

        <div className="max-w-[1800px] mx-auto px-[5.128vw] relative">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-2 h-2 rounded-full bg-[#161616]" />
              <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#161616]">
                {about.storySection.label}
              </p>
              <span className="block h-px w-12 bg-[#161616]/30" />
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Long-form text */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal>
                <p className="font-display text-[#1C1C1C] leading-[1.15] tracking-tight font-bold"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                  {about.storySection.heading}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
                  {about.storySection.paragraph1}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
                  {about.storySection.paragraph2}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
                  {about.storySection.paragraph3}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <blockquote className="border-l-2 border-[#C9A84C] pl-6 my-10">
                  <p className="font-display italic text-[#1C1C1C] leading-relaxed"
                    style={{ fontSize: 'clamp(1.4rem, 2vw, 1.9rem)' }}>
                    &ldquo;{about.storySection.quote}&rdquo;
                  </p>
                  <footer className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#161616]/60 mt-4">
                    — {about.storySection.quoteAttribution}
                  </footer>
                </blockquote>
              </ScrollReveal>
            </div>

            {/* Right column — farm image + facts strip */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <ScrollReveal delay={0.1}>
                <div className="relative group">
                  <span className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[#C9A84C] z-10" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-[#C9A84C] z-10" />
                  <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-[#C9A84C] z-10" />
                  <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#C9A84C] z-10" />
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80"
                      alt={about.storySection.imageAlt}
                      fill
                      sizes="(max-width:1024px) 90vw, 40vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(46,21,48,0.55), transparent 55%)' }} />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/85 bg-[#1C1C1C]/40 backdrop-blur-sm px-3 py-1.5">
                        {about.storySection.imageCaption}
                      </p>
                      <span className="font-display italic text-[#C9A84C] text-sm">↗</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="border-t border-[#1C1C1C]/15 pt-6 grid grid-cols-3 gap-4">
                  {about.storySection.facts.map((s) => (
                    <div key={s.l}>
                      <p className="font-display font-bold text-[#161616] text-2xl leading-none">{s.k}</p>
                      <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#6B6456] mt-1.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#EDE5D4] py-24 md:py-32 border-y border-[#1C1C1C]/5 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] relative">
          <ScrollReveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-2 h-2 rounded-full bg-[#161616]" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#161616]">
                    {about.timeline.label}
                  </p>
                </div>
                <h2 className="font-display font-bold text-[#1C1C1C] leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                  {about.timeline.headingLine1} <span className="italic text-[#161616]">{about.timeline.headingHighlight}</span>
                </h2>
              </div>
              <p className="font-serif text-[#6B6456] text-base leading-relaxed max-w-sm">
                {about.timeline.subtitle}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1C1C1C]/10">
            {about.timeline.milestones.map((m, i) => (
              <ScrollReveal key={m.title} delay={i * 0.08}>
                <div className="group relative bg-[#EDE5D4] p-8 hover:bg-[#F5F0E8] transition-all duration-300 h-full overflow-hidden">
                  <span className="absolute top-0 right-0 w-12 h-12 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/10 transition-colors duration-500"
                    style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                  <div className="flex items-center gap-2 mb-4">
                    <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
                      {m.year}
                    </p>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1C1C1C] mb-3 group-hover:text-[#161616] transition-colors">
                    {m.title}
                  </h3>
                  <div className="h-px w-8 bg-[#C9A84C] mb-3 group-hover:w-full transition-all duration-500" />
                  <p className="font-serif text-[#6B6456] text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#0D0D0D] py-24 md:py-32 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                    {about.valuesSection.label}
                  </p>
                </div>
                <h2 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                  {about.valuesSection.headingLine1}<br />
                  <span className="italic text-[#C9A84C]">{about.valuesSection.headingHighlight}</span>
                </h2>
              </div>
              <p className="font-serif text-[#F5F0E8]/60 text-lg leading-relaxed">
                {about.valuesSection.subtitle}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F5F0E8]/8">
            {about.valuesSection.values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="group bg-[#0D0D0D] p-8 hover:bg-[#0A0A0A] transition-colors duration-300 h-full relative overflow-hidden">
                  <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700" />
                  <div className="flex items-center gap-2 mb-5">
                    <span className="block w-1 h-1 rounded-full bg-[#C9A84C]" />
                    <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
                      0{i + 1}
                    </p>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#F5F0E8] mb-3 group-hover:text-[#C9A84C] transition-colors">
                    {v.title}
                  </h3>
                  <div className="h-px w-6 bg-[#C9A84C]/40 mb-4 group-hover:w-full transition-all duration-500" />
                  <p className="font-serif text-[#F5F0E8]/60 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow={about.cta.eyebrow}
        title={about.cta.title}
        buttonLabel={about.cta.buttonLabel}
        buttonHref={localizedHref('/products', locale)}
        bg="olive"
      />
    </>
  );
}
