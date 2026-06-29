import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import CTABand from '../../components/CTABand';
import ScrollReveal from '../../components/ScrollReveal';
import { posts } from '../../lib/blog';
import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import { localizedHref } from '../../lib/locale-path';

const localeTags: Record<Locale, string> = { en: 'en-IN', fr: 'fr-FR', de: 'de-DE' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  return {
    title: dict.blog.meta.title,
    description: dict.blog.meta.description,
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  const { blog } = dict;

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(localeTags[locale], { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <PageHero
        eyebrow={blog.hero.eyebrow}
        title={blog.hero.title}
        subtitle={blog.hero.subtitle}
        geometry="torus-knot"
        color="#C9A84C"
        stat={[{ k: String(posts.length), l: blog.hero.statLabel }]}
      />

      <section className="bg-[#F5F0E8] py-24 md:py-32 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-6 right-[-4vw] font-display font-bold text-[#161616]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        >
          {blog.hero.eyebrow}
        </div>

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-2 h-2 rounded-full bg-[#161616]" />
                <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#161616]">
                  {blog.listing.label}
                </p>
              </div>
              <h2 className="font-display font-bold text-[#1C1C1C] leading-[0.95] tracking-tight max-w-3xl"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                {blog.listing.heading}
              </h2>
            </div>
          </ScrollReveal>

          {sorted.length === 0 ? (
            <p className="font-serif text-[#6B6456] text-lg">{blog.listing.empty}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1C1C]/10">
              {sorted.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.06}>
                  <Link
                    href={localizedHref(`/blog/${post.slug}`, locale)}
                    className="group relative flex flex-col h-full bg-[#F5F0E8] hover:bg-[#EDE5D4] transition-colors overflow-hidden"
                  >
                    <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700 z-10" />
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width:768px) 90vw, 33vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/30 to-transparent" />
                      <span className="absolute top-4 left-4 font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8] bg-[#1C1C1C]/55 backdrop-blur-sm px-3 py-1.5">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-7 md:p-8">
                      <div className="flex items-center gap-3 mb-4 font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
                        <span>{fmtDate(post.date)}</span>
                        <span className="block w-1 h-1 rounded-full bg-[#C9A84C]/50" />
                        <span>{blog.listing.minRead.replace('{min}', String(post.readTime))}</span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-[#1C1C1C] leading-snug group-hover:text-[#161616] transition-colors">
                        {post.title}
                      </h3>
                      <div className="mt-3 h-px w-8 bg-[#C9A84C] group-hover:w-20 transition-all duration-500" />
                      <p className="mt-4 font-serif text-[#6B6456] text-sm leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 font-sans-harvest text-[11px] tracking-[0.2em] uppercase text-[#161616] group-hover:text-[#C9A84C] transition-colors">
                        {blog.listing.readMore}
                        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        eyebrow={blog.cta.eyebrow}
        title={blog.cta.title}
        buttonLabel={blog.cta.buttonLabel}
        buttonHref={localizedHref('/products', locale)}
        bg="dark"
      />
    </>
  );
}
