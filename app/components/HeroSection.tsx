'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const WireframeTerrain = dynamic(
  () => import('./three/WireframeTerrain'),
  { ssr: false, loading: () => null }
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#1C1C1C] flex flex-col overflow-hidden">
      {/* 3D wireframe terrain canvas */}
      <div className="absolute inset-0 z-0">
        <WireframeTerrain />
      </div>

      {/* Gradient overlay for text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1C1C1C]/70 via-[#1C1C1C]/40 to-[#1C1C1C] pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent z-20" />

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="block h-px w-10 bg-[#C9A84C]" />
          <p className="font-sans-harvest text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]">
            By Amoohaa Farms
          </p>
          <span className="block h-px w-10 bg-[#C9A84C]" />
        </div>

        <h1 className="font-display font-bold text-[#F5F0E8] leading-[1.05] tracking-tight mb-6 max-w-5xl">
          <span className="block text-5xl sm:text-7xl lg:text-8xl">
            Nature&apos;s Goodness,
          </span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-[#C9A84C]">
            Preserved.
          </span>
        </h1>

        <p className="font-serif text-[#F5F0E8]/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          Pure, nourishing ingredients rooted in authenticity — from dehydrated fruits &amp; vegetables
          to cold-pressed oils, heritage flours, and whole spices.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/products"
            className="font-sans-harvest text-xs tracking-[0.2em] uppercase px-8 py-4 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200 w-full sm:w-auto text-center"
          >
            Explore Products
          </Link>
          <Link
            href="/about"
            className="font-sans-harvest text-xs tracking-[0.2em] uppercase px-8 py-4 border border-[#F5F0E8]/30 text-[#F5F0E8]/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200 w-full sm:w-auto text-center"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-20 pb-10 flex flex-col items-center gap-2">
        <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/40">
          Scroll
        </p>
        <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent" />
      </div>

      {/* Marquee */}
      <div className="relative z-20 border-t border-[#F5F0E8]/10 py-3 overflow-hidden bg-[#1C1C1C]/60 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(2)
            .fill([
              'Dehydrated Powders',
              'Vegetable Flakes',
              'Cold-Pressed Oils',
              'Khapali Atta',
              'Whole Spices',
              'Spice Powders',
              'Blended Flours',
              'Clean Label',
              'Farm to Home',
            ])
            .flat()
            .map((item, i) => (
              <span
                key={i}
                className="font-sans-harvest text-[10px] tracking-[0.25em] uppercase text-[#F5F0E8]/40 mx-8"
              >
                {item}
                <span className="mx-8 text-[#C9A84C]">·</span>
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
