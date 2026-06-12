'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import type { Dictionary } from '../i18n/dictionaries';

gsap.registerPlugin(ScrollTrigger);

export default function WhySection({ dict }: { dict: Dictionary }) {
  const w = dict.home.why;
  const reasons = w.reasons;
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll<HTMLElement>('[data-why-item]');
      if (!items) return;

      items.forEach((item) => {
        const others = Array.from(items).filter((el) => el !== item);
        const highlight = () => {
          gsap.to(others, { opacity: 0.25, duration: 0.4 });
          gsap.to(item, { opacity: 1, duration: 0.4 });
        };
        ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          onEnter: highlight,
          onEnterBack: highlight,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#2E1530] py-28 md:py-36">
      <div className="max-w-[1800px] mx-auto px-[5.128vw]">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
              {w.eyebrow}
            </p>
            <h2
              className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight max-w-3xl"
              style={{ fontSize: 'clamp(2.5rem, 5.729vw, 5.5rem)' }}
            >
              {w.headingLine1}<br />
              <span className="text-[#C9A84C]">{w.headingHighlight}</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Two-col layout: reasons list + sticky label */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: large sticky decorative number */}
          <div className="hidden lg:block sticky top-1/3 self-start">
            <div
              className="font-display font-bold text-[#F5F0E8]/[0.04] select-none pointer-events-none leading-none"
              style={{ fontSize: 'clamp(10rem, 20vw, 22rem)' }}
              aria-hidden
            >
              WHY
            </div>
            <div className="mt-8 border-l-2 border-[#C9A84C]/30 pl-6">
              <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/60 mb-3">
                {w.sixReasons}
              </p>
              <p className="font-serif text-[#F5F0E8]/40 text-sm leading-relaxed max-w-xs">
                {w.sixReasonsDesc}
              </p>
            </div>
          </div>

          {/* Right: scrollable list */}
          <div ref={listRef} className="space-y-0">
            {reasons.map((r, i) => (
              <div
                key={r.num}
                data-why-item
                className="border-b border-[#F5F0E8]/8 py-8 group"
                style={{ opacity: i === 0 ? 1 : 0.25 }}
              >
                <div className="flex items-start gap-6">
                  <p className="font-sans-harvest text-[11px] tracking-[0.25em] text-[#C9A84C] flex-shrink-0 pt-1">
                    {r.num}
                  </p>
                  <div>
                    <h3
                      className="font-display font-bold text-[#F5F0E8] mb-3"
                      style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)' }}
                    >
                      {r.head}
                    </h3>
                    <p className="font-serif text-[#F5F0E8]/50 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)' }}>
                      {r.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
