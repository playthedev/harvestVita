import type { Metadata } from 'next';
import PageHero from '../../components/PageHero';
import CTABand from '../../components/CTABand';
import ScrollReveal from '../../components/ScrollReveal';
import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import { localizedHref } from '../../lib/locale-path';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  return {
    title: dict.myths.meta.title,
    description: dict.myths.meta.description,
  };
}

export default async function MythsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  const { myths } = dict;

  return (
    <>
      <PageHero
        eyebrow={myths.hero.eyebrow}
        title={myths.hero.title}
        subtitle={myths.hero.subtitle}
        geometry="dodecahedron"
        color="#C9A84C"
        stat={[{ k: String(myths.items.length), l: myths.hero.statLabel }]}
      />

      {/* Intro */}
      <section className="bg-[#F5F0E8] py-20 md:py-24 border-b border-[#1C1C1C]/5 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-6 right-[-4vw] font-display font-bold text-[#161616]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        >
          {myths.hero.eyebrow}
        </div>
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw] grid md:grid-cols-2 gap-10 md:gap-16 items-end">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-2 h-2 rounded-full bg-[#161616]" />
                <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#161616]">
                  {myths.intro.label}
                </p>
              </div>
              <h2 className="font-display font-bold text-[#1C1C1C] leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                {myths.intro.heading}
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
              {myths.intro.body}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Myth vs Fact list */}
      <section className="bg-[#0D0D0D] py-24 md:py-32 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="space-y-px bg-[#F5F0E8]/8 border-t border-b border-[#F5F0E8]/10">
            {myths.items.map((item, i) => (
              <ScrollReveal key={item.myth} delay={i * 0.05}>
                <div className="group relative bg-[#0D0D0D] grid md:grid-cols-12 gap-6 md:gap-10 p-8 md:p-10 hover:bg-[#0A0A0A] transition-colors overflow-hidden">
                  <span className="absolute top-0 left-0 h-full w-0 group-hover:w-1 bg-[#C9A84C] transition-all duration-500" />
                  <div className="md:col-span-1 flex items-start">
                    <p className="font-display text-4xl md:text-5xl font-bold text-[#C9A84C]/30 group-hover:text-[#C9A84C] transition-colors leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                  {/* Myth */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C46A6A]">
                        {myths.mythLabel}
                      </span>
                      <span className="block h-px w-8 bg-[#C46A6A]/40" />
                    </div>
                    <p className="font-display text-xl md:text-2xl font-bold text-[#F5F0E8]/85 leading-snug line-through decoration-[#C46A6A]/40 decoration-1">
                      {item.myth}
                    </p>
                  </div>
                  {/* Fact */}
                  <div className="md:col-span-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
                        {myths.factLabel}
                      </span>
                      <span className="block h-px w-8 bg-[#C9A84C]/40 group-hover:w-20 transition-all duration-500" />
                    </div>
                    <p className="font-serif text-[#F5F0E8]/70 text-base md:text-lg leading-relaxed">
                      {item.fact}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow={myths.cta.eyebrow}
        title={myths.cta.title}
        buttonLabel={myths.cta.buttonLabel}
        buttonHref={localizedHref('/contact', locale)}
        bg="olive"
      />
    </>
  );
}
