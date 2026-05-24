import Link from 'next/link';
import { products } from '../lib/products';

export default function ProductsSection() {
  return (
    <section className="bg-[#2D4A2D] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:mb-20">
          <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
            Product Range
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F0E8] leading-tight max-w-2xl">
              Six Categories.<br />One Standard.
            </h2>
            <p className="font-serif text-[#F5F0E8]/50 max-w-sm leading-relaxed">
              Every product in the HarvestVita range is clean-label, minimally processed, and
              free from artificial additives.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F0E8]/10">
          {products.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group bg-[#2D4A2D] p-8 md:p-10 hover:bg-[#3D6B3D] transition-colors duration-300 block"
            >
              <div className="flex items-start justify-between mb-6">
                <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
                  {cat.num}
                </p>
                <div className="w-8 h-8 border border-[#F5F0E8]/20 group-hover:border-[#C9A84C] transition-colors duration-300 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-[#F5F0E8] mb-3 leading-snug">
                {cat.title}
              </h3>
              <div className="h-px bg-[#F5F0E8]/10 mb-4 group-hover:bg-[#C9A84C]/40 transition-colors duration-300" />
              <p className="font-serif text-[#F5F0E8]/55 text-sm leading-relaxed mb-6">
                {cat.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border border-[#F5F0E8]/15 text-[#F5F0E8]/40 group-hover:border-[#C9A84C]/30 group-hover:text-[#C9A84C]/70 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#F5F0E8]/10 pt-10">
          <p className="font-serif text-[#F5F0E8]/40 text-sm">
            Custom packaging and bulk quantities available for B2B partners.
          </p>
          <Link
            href="/products"
            className="font-sans-harvest text-xs tracking-[0.2em] uppercase px-7 py-3.5 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-200 whitespace-nowrap"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
