import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '../../../components/PageHero';
import CTABand from '../../../components/CTABand';
import ScrollReveal from '../../../components/ScrollReveal';
import { posts, getPostBySlug } from '../../../lib/blog';
import { getDictionary } from '../../../i18n/dictionaries';
import { isLocale, type Locale } from '../../../i18n/config';
import { localizedHref } from '../../../lib/locale-path';

const localeTags: Record<Locale, string> = { en: 'en-IN', fr: 'fr-FR', de: 'de-DE' };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not found — HarvestVita' };
  return {
    title: `${post.title} — HarvestVita`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { blog } = dict;
  const fmtDate = new Date(post.date).toLocaleDateString(localeTags[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        geometry="torus-knot"
        color="#C9A84C"
        stat={[
          { k: fmtDate, l: blog.article.byLine.replace('{author}', post.author) },
          { k: blog.listing.minRead.replace('{min}', String(post.readTime)), l: blog.hero.statLabel },
        ]}
      />

      {/* Article body */}
      <section className="bg-[#F5F0E8] py-20 md:py-28 relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-[5.128vw]">
          <ScrollReveal>
            <Link
              href={localizedHref('/blog', locale)}
              className="inline-flex items-center gap-2 font-sans-harvest text-[11px] tracking-[0.2em] uppercase text-[#6B6456] hover:text-[#C9A84C] transition-colors group mb-10"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              {blog.article.backToBlog}
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="relative group mb-12">
              <span className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[#C9A84C] z-10" />
              <span className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-[#C9A84C] z-10" />
              <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-[#C9A84C] z-10" />
              <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#C9A84C] z-10" />
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width:768px) 90vw, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>

          {post.body.map((para, i) => (
            <ScrollReveal key={i} delay={0.05 + i * 0.04}>
              <p
                className={`font-serif text-[#6B6456] leading-relaxed mb-6 ${
                  i === 0 ? 'text-xl md:text-2xl text-[#1C1C1C]' : 'text-lg'
                }`}
              >
                {para}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[#4A2545] py-20 md:py-28 relative overflow-hidden">
          <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
            <ScrollReveal>
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="block w-2 h-2 rounded-full bg-[#C9A84C]" />
                    <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                      {blog.article.relatedLabel}
                    </p>
                  </div>
                  <h2 className="font-display font-bold text-[#F5F0E8] leading-tight tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                    {blog.article.relatedHeading}
                  </h2>
                </div>
                <Link
                  href={localizedHref('/blog', locale)}
                  className="hidden md:inline-flex items-center gap-2 font-sans-harvest text-xs tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#E2C47A] transition-colors group"
                >
                  {blog.article.viewAll}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-px bg-[#F5F0E8]/10">
              {related.map((r, i) => (
                <ScrollReveal key={r.slug} delay={i * 0.07}>
                  <Link
                    href={localizedHref(`/blog/${r.slug}`, locale)}
                    className="group relative block bg-[#4A2545] overflow-hidden hover:bg-[#6B3A5E] transition-colors h-full"
                  >
                    <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700" />
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width:768px) 90vw, 33vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4A2545] via-[#4A2545]/30 to-transparent" />
                    </div>
                    <div className="p-8">
                      <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                        {r.category}
                      </p>
                      <h3 className="font-display text-lg font-bold text-[#F5F0E8] mb-3 leading-snug group-hover:text-[#C9A84C] transition-colors">
                        {r.title}
                      </h3>
                      <p className="font-serif text-[#F5F0E8]/55 text-sm leading-relaxed">
                        {r.excerpt}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
