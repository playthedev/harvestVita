import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '../../components/PageHero';
import CTABand from '../../components/CTABand';
import { products, getProductBySlug } from '../../lib/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not found — HarvestVita' };
  return {
    title: `${product.title} — HarvestVita`,
    description: product.short,
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // related = other categories
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Category ${product.num}`}
        title={product.title}
        subtitle={product.short}
        geometry={product.geometry}
        color={product.color}
      />

      {/* Long description + features */}
      <section className="bg-[#F5F0E8] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-12">
          {/* Left: long copy */}
          <div className="lg:col-span-2 space-y-6">
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545]">
              About this Category
            </p>
            {product.longDesc.map((para, i) => (
              <p
                key={i}
                className={`font-serif text-[#6B6456] leading-relaxed ${
                  i === 0 ? 'text-xl md:text-2xl text-[#1C1C1C]' : 'text-lg'
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Right: features */}
          <aside className="bg-[#1C1C1C] p-8 md:p-10 self-start">
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-6">
              What Makes It
            </p>
            <ul className="space-y-5">
              {product.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0" />
                  <span className="font-serif text-[#F5F0E8]/80 text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Product items grid */}
      <section className="bg-[#EDE5D4] border-y border-[#1C1C1C]/5 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545] mb-3">
                In This Range
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1C1C]">
                Available Products
              </h2>
            </div>
            <p className="font-serif text-[#6B6456] max-w-md">
              All variants available in retail, wholesale, and custom packaging on request.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-[#1C1C1C]/10">
            {product.items.map((item, i) => (
              <div
                key={item}
                className="bg-[#EDE5D4] p-6 md:p-8 hover:bg-[#F5F0E8] transition-colors group min-h-[140px] flex flex-col justify-between"
              >
                <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="font-display text-sm md:text-base font-bold text-[#1C1C1C] leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uses */}
      <section className="bg-[#2E1530] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
              How to Use
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-tight mb-6">
              From kitchen<br />to creation.
            </h2>
            <p className="font-serif text-[#F5F0E8]/55 text-lg leading-relaxed">
              Versatile, easy to incorporate, and built to fit into the way you already cook.
            </p>
          </div>
          <ul className="space-y-3">
            {product.uses.map((use, i) => (
              <li
                key={use}
                className="flex items-center gap-5 border-b border-[#F5F0E8]/10 pb-4 group hover:border-[#C9A84C]/40 transition-colors"
              >
                <span className="font-sans-harvest text-xs tracking-[0.2em] text-[#C9A84C]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl md:text-2xl text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">
                  {use}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related */}
      <section className="bg-[#2D4A2D] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-3">
                Continue Exploring
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F5F0E8]">
                Other Categories
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-block font-sans-harvest text-xs tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#E2C47A] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#F5F0E8]/10">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/products/${r.slug}`}
                className="group bg-[#2D4A2D] p-8 hover:bg-[#3D6B3D] transition-colors"
              >
                <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                  {r.num}
                </p>
                <h3 className="font-display text-lg font-bold text-[#F5F0E8] mb-3 leading-snug group-hover:text-[#C9A84C] transition-colors">
                  {r.title}
                </h3>
                <p className="font-serif text-[#F5F0E8]/50 text-sm leading-relaxed">
                  {r.short}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Order or Enquire"
        title="Bring this range to your kitchen."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        bg="dark"
      />
    </>
  );
}
