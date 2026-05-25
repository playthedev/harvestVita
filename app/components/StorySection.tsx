'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const pillars = [
  { num: '01', title: 'Pure by Nature', desc: 'No additives, no artificial preservatives. Every ingredient is exactly what the label says.' },
  { num: '02', title: 'Farm Rooted', desc: 'Direct sourcing from trusted farms. Shorter supply chains — fresher, more nutritious produce.' },
  { num: '03', title: 'Thoughtful Processing', desc: 'Gentle dehydration, cold-pressing, stone-grinding — preserving nutrition and authentic taste.' },
  { num: '04', title: 'Modern Convenience', desc: 'Ready to use in everyday cooking. No compromise between health and ease.' },
];

export default function StorySection() {
  return (
    <section className="bg-[#F5F0E8] py-28 md:py-36 relative overflow-hidden">
      {/* Decorative oversized faint word */}
      <div
        aria-hidden
        className="absolute -top-10 right-[-4vw] font-display font-bold text-[#4A2545]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
        style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
      >
        Story
      </div>
      {/* Soft top gradient onto the cream */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.05), transparent)' }}
      />
      {/* Floating decorative leaf SVG */}
      <svg
        aria-hidden
        className="absolute top-20 left-6 w-16 h-16 opacity-30 animate-drift hidden md:block"
        viewBox="0 0 60 60" fill="none"
      >
        <path d="M30 5 C 14 18, 14 42, 30 55 C 46 42, 46 18, 30 5 Z" stroke="#2D4A2D" strokeWidth="1" />
        <line x1="30" y1="8" x2="30" y2="52" stroke="#2D4A2D" strokeWidth="0.8" />
      </svg>

      <div className="max-w-[1800px] mx-auto px-[5.128vw] relative">

        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-2 h-2 rounded-full bg-[#4A2545]" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545]">
              Our Story
            </p>
            <span className="block h-px w-12 bg-[#4A2545]/30" />
          </div>
        </ScrollReveal>

        {/* Large headline — Terminal style */}
        <ScrollReveal y={50}>
          <h2 className="font-display font-bold text-[#1C1C1C] leading-[0.95] tracking-tight mb-16 max-w-5xl"
            style={{ fontSize: 'clamp(2.5rem, 5.729vw, 5.5rem)' }}>
            Born from the belief that everyday food should be pure, nourishing, and honest.
          </h2>
        </ScrollReveal>

        {/* Three-col: story text | farm image | quote */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-24 items-start">
          <ScrollReveal delay={0.1} className="md:col-span-1">
            <div className="space-y-5">
              <p className="font-serif text-[#6B6456] leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}>
                HarvestVita is the expression of Amoohaa Farms&apos; commitment to natural, wholesome living.
                Every product is chosen with a simple purpose: to preserve nature&apos;s goodness while
                making it easy to use in modern life.
              </p>
              <p className="font-serif text-[#6B6456] leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}>
                From dehydrated fruits and vegetables to cold-pressed oils, khapali atta, and whole spices —
                the brand reflects a balance of tradition and convenience.
              </p>
            </div>
          </ScrollReveal>

          {/* Farm image */}
          <ScrollReveal delay={0.15} className="md:col-span-1">
            <div className="relative group">
              {/* Gold corner accents */}
              <span className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[#C9A84C] z-10" />
              <span className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-[#C9A84C] z-10" />
              <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-[#C9A84C] z-10" />
              <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#C9A84C] z-10" />
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80"
                  alt="Amoohaa Farms — golden wheat fields at harvest"
                  fill
                  sizes="(max-width:768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(46,21,48,0.55) 0%, transparent 55%)' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, transparent 60%)' }} />

                {/* Image caption pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/85 bg-[#1C1C1C]/40 backdrop-blur-sm px-3 py-1.5">
                    Amoohaa Farms — India
                  </p>
                  <span className="font-display italic text-[#C9A84C] text-sm">↗</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-1">
            <div className="space-y-6">
              <blockquote className="border-l-2 border-[#C9A84C] pl-6">
                <p className="font-display italic text-[#1C1C1C] leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)' }}>
                  &ldquo;Honest food, thoughtful processing, and ingredients that carry the richness of the farm to the heart of the home.&rdquo;
                </p>
              </blockquote>
              <Link
                href="/about"
                className="inline-block font-sans-harvest text-[11px] tracking-[0.15em] uppercase mt-2 px-6 py-3 border border-[#2D4A2D] text-[#2D4A2D] hover:bg-[#2D4A2D] hover:text-[#F5F0E8] transition-all duration-300 select-none"
              >
                Read Full Story
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Numbered pillars — like Terminal 01-06 */}
        <div className="border-t border-[#1C1C1C]/10 pt-14">
          <div className="flex items-center justify-between mb-8">
            <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C]/45">
              The Four Pillars
            </p>
            <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C]/45">
              01 — 04
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1C1C1C]/8">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 0.08}>
                <div className="group relative bg-[#F5F0E8] p-6 lg:p-8 hover:bg-[#EDE5D4] transition-all duration-300 h-full overflow-hidden">
                  {/* Hover accent diagonal sliver */}
                  <span className="absolute top-0 right-0 w-12 h-12 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/10 transition-colors duration-500"
                    style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                  <div className="relative flex items-center gap-3 mb-5">
                    <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <p className="font-sans-harvest text-[11px] tracking-[0.25em] text-[#C9A84C]">{p.num}</p>
                  </div>
                  <h3
                    className="font-display font-bold text-[#1C1C1C] mb-3 group-hover:text-[#4A2545] transition-colors duration-200"
                    style={{ fontSize: 'clamp(1.1rem, 1.56vw, 1.4rem)' }}
                  >
                    {p.title}
                  </h3>
                  <div className="h-px w-6 bg-[#C9A84C] mb-4 group-hover:w-full transition-all duration-500" />
                  <p className="font-serif text-[#6B6456] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
