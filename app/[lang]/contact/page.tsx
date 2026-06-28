import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '../../components/PageHero';
import ContactForm from '../../components/ContactForm';
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
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  const t = dict.contact;

  const channelIcons = [
    (
      <svg key="email" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2.5" y="4.5" width="17" height="13" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 5L11 12L19 5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    (
      <svg key="phone" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 3.5C5 3.5 5 6 6.5 8.5C8 11 11 14 13.5 15.5C16 17 18.5 17 18.5 17L20 14L16 12L14 13.5C14 13.5 13 13 11.5 11.5C10 10 9.5 8.5 9.5 8.5L11 7.5L9 3.5L5 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="visit" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 19.5C11 19.5 5 13 5 9C5 5.68629 7.68629 3 11 3C14.3137 3 17 5.68629 17 9C17 13 11 19.5 11 19.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="11" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  ];

  const channelHrefs = ['mailto:letsconnect@harvestvita.in', 'tel:+919163969111', '#'];

  const channels = t.channels.map((c, i) => ({
    ...c,
    href: channelHrefs[i],
    icon: channelIcons[i],
  }));

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        geometry="torus-knot"
        color="#C9A84C"
        stat={[{ k: '< 2', l: t.hero.statLabel }]}
      />

      {/* Channels */}
      <section className="bg-[#F5F0E8] py-20 md:py-24 border-b border-[#1C1C1C]/5 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-6 right-[-4vw] font-display font-bold text-[#161616]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        >
          {t.channelsSection.bgWord}
        </div>

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-2 h-2 rounded-full bg-[#161616]" />
                <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#161616]">
                  {t.channelsSection.label}
                </p>
              </div>
              <h2 className="font-display font-bold text-[#1C1C1C] leading-[0.95] tracking-tight max-w-3xl"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                {t.channelsSection.heading}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-px bg-[#1C1C1C]/10">
            {channels.map((c, i) => (
              <ScrollReveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  className="group relative bg-[#F5F0E8] p-8 md:p-10 hover:bg-[#EDE5D4] transition-colors block h-full overflow-hidden"
                >
                  <span className="absolute top-0 left-0 h-full w-0 group-hover:w-1 bg-[#C9A84C] transition-all duration-500" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                      <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
                        {c.label}
                      </p>
                    </div>
                    <div className="text-[#161616] group-hover:text-[#C9A84C] transition-colors">
                      {c.icon}
                    </div>
                  </div>
                  <p className="font-display text-xl md:text-2xl font-bold text-[#1C1C1C] mb-3 group-hover:text-[#161616] transition-colors break-words">
                    {c.value}
                  </p>
                  <div className="h-px w-8 bg-[#C9A84C] mb-4 group-hover:w-full transition-all duration-500" />
                  <p className="font-serif text-[#6B6456] text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="contact-form" className="bg-[#1C1C1C] py-24 md:py-32 relative overflow-hidden scroll-mt-24">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-5xl mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="block h-px w-8 bg-[#C9A84C]" />
                <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                  {t.formSection.label}
                </p>
                <span className="block h-px w-8 bg-[#C9A84C]" />
              </div>
              <h2 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                {t.formSection.heading}
              </h2>
              <p className="mt-4 font-serif text-[#F5F0E8]/55 max-w-xl mx-auto">
                {t.formSection.subtitle}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Suspense fallback={<div className="h-96" />}>
              <ContactForm dict={dict} />
            </Suspense>
          </ScrollReveal>
        </div>
      </section>

      {/* B2B band */}
      <section className="bg-[#0D0D0D] py-20 md:py-24 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/2 right-[-4vw] -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.03] select-none pointer-events-none leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 12vw, 12rem)' }}
        >
          {t.b2b.bgWord}
        </div>
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw] grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                {t.b2b.label}
              </p>
            </div>
            <h2 className="font-display font-bold text-[#F5F0E8] leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              {t.b2b.headingLine1}<br />
              <span className="italic text-[#C9A84C]">{t.b2b.headingHighlight}</span>
            </h2>
            <p className="font-serif text-[#F5F0E8]/55 text-lg leading-relaxed">
              {t.b2b.body}
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href={`${localizedHref('/contact', locale)}?subject=b2b#contact-form`}
              className="group relative inline-flex items-center gap-2 font-sans-harvest text-xs tracking-[0.2em] uppercase px-8 py-4 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200"
            >
              {t.b2b.buttonLabel}
              <svg className="transition-transform duration-300 group-hover:translate-y-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1V11M6 11L1 6M6 11L11 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
