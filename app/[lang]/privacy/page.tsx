import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import { localizedHref } from '../../lib/locale-path';

export const metadata: Metadata = {
  title: 'Privacy Policy — HarvestVita',
  description: 'How HarvestVita collects, uses, and protects your personal information.',
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  const { privacy } = dict;

  return (
    <>
      <section className="bg-[#0A0A0A] pt-44 pb-20 md:pt-52 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">{privacy.eyebrow}</p>
          </div>
          <h1 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight mb-4" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
            {privacy.title}
          </h1>
          <p className="font-serif text-[#F5F0E8]/45 max-w-xl" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
            {privacy.subtitle}
          </p>
          <p className="mt-4 font-sans-harvest text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/25">
            {privacy.lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-[#F5F0E8] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-[5.128vw]">
          <div className="space-y-12">
            {privacy.sections.map((s) => (
              <div key={s.title} className="border-b border-[#1C1C1C]/8 pb-10 last:border-0 last:pb-0">
                <h2 className="font-display font-bold text-[#1C1C1C] text-xl md:text-2xl mb-4">{s.title}</h2>
                <p className="font-serif text-[#6B6456] leading-relaxed text-base md:text-lg">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-[#1C1C1C]/10 flex flex-col sm:flex-row gap-4">
            <Link href={localizedHref('/terms', locale)} className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1C1C1C] transition-colors">{privacy.footerLinks.terms}</Link>
            <Link href={localizedHref('/returns', locale)} className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1C1C1C] transition-colors">{privacy.footerLinks.returns}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
