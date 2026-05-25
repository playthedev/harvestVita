'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WireframeTerrain = dynamic(
  () => import('./three/WireframeTerrain'),
  { ssr: false, loading: () => null }
);

/* ── SVG wheat/plant that travels across the viewport ── */
function WheatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Main stalk */}
      <line x1="40" y1="155" x2="40" y2="10" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" />
      {/* Wheat grains — left */}
      {[30, 55, 78, 100].map((y, i) => (
        <ellipse
          key={`l${i}`}
          cx={30}
          cy={y}
          rx="11"
          ry="7"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1.6"
          transform={`rotate(-20 30 ${y})`}
        />
      ))}
      {/* Wheat grains — right */}
      {[18, 43, 66, 90].map((y, i) => (
        <ellipse
          key={`r${i}`}
          cx={50}
          cy={y}
          rx="11"
          ry="7"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1.6"
          transform={`rotate(20 50 ${y})`}
        />
      ))}
      {/* Top grain */}
      <ellipse cx="40" cy="10" rx="7" ry="5" fill="none" stroke="#C9A84C" strokeWidth="1.6" />
      {/* Leaf left */}
      <path d="M40 90 Q18 72 22 55" stroke="#2D4A2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Leaf right */}
      <path d="M40 70 Q62 52 58 35" stroke="#2D4A2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ── Corner cross decoration (from Terminal Industries) ── */
function Cross({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="7" y1="0" x2="7" y2="14" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export default function HeroSection() {
  const wheatRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── entrance animations ──
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
        .fromTo(titleRef.current?.children ?? [], { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12 }, '-=0.3')
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

      // ── wheat travelling across the screen on scroll ──
      if (wheatRef.current) {
        gsap.fromTo(
          wheatRef.current,
          { x: '-12vw', rotate: -8, opacity: 0 },
          {
            x: '108vw',
            rotate: 6,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
        // fade in after a moment
        gsap.to(wheatRef.current, { opacity: 0.85, duration: 0.6, delay: 0.8 });
      }

      // ── hero title parallax on scroll ──
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-[#0D0D0D] flex flex-col overflow-hidden"
    >
      {/* Farm background photo — very dark overlay keeps it subtle */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=70"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Dark overlay so it reads as near-black */}
      <div className="absolute inset-0 z-[1] bg-[#0D0D0D]/78 pointer-events-none" />

      {/* 3D canvas on top of photo */}
      <div className="absolute inset-0 z-[2] opacity-55">
        <WireframeTerrain />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.05) 50%, rgba(13,13,13,0.92) 100%)' }} />

      {/* Corner crosses — Terminal Industries style */}
      <Cross className="absolute top-[72px] left-[5.128vw] z-[10]" />
      <Cross className="absolute top-[72px] right-[5.128vw] z-[10]" />
      <Cross className="absolute bottom-[54px] left-[5.128vw] z-[10]" />
      <Cross className="absolute bottom-[54px] right-[5.128vw] z-[10]" />

      {/* Travelling wheat stalk */}
      <div
        ref={wheatRef}
        className="absolute z-[10] pointer-events-none"
        style={{ bottom: '22%', opacity: 0, width: '54px' }}
      >
        <WheatIcon className="w-full h-auto drop-shadow-lg" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-[10] flex-1 flex flex-col justify-center px-[5.128vw] pt-36 pb-28 max-w-[1800px] mx-auto w-full">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-10 opacity-0">
          <span className="block h-px w-8 bg-[#C9A84C]" />
          <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
            By Amoohaa Farms
          </p>
        </div>

        {/* Main headline — large, tight, like Terminal */}
        <div ref={titleRef} className="overflow-hidden mb-8">
          <div className="font-display font-bold text-[#F5F0E8] leading-[0.92] tracking-[-0.02em] overflow-hidden" style={{ fontSize: 'clamp(3.5rem, 10.256vw, 10rem)' }}>
            <span className="block opacity-0">Nature&apos;s</span>
          </div>
          <div className="font-display font-bold leading-[0.92] tracking-[-0.02em] overflow-hidden" style={{ fontSize: 'clamp(3.5rem, 10.256vw, 10rem)', color: '#C9A84C' }}>
            <span className="block opacity-0">Goodness,</span>
          </div>
          <div className="font-display font-bold text-[#F5F0E8] leading-[0.92] tracking-[-0.02em] overflow-hidden" style={{ fontSize: 'clamp(3.5rem, 10.256vw, 10rem)' }}>
            <span className="block opacity-0">Preserved.</span>
          </div>
        </div>

        {/* Subtitle + CTA row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-4">
          <p
            ref={subtitleRef}
            className="font-serif text-[#F5F0E8]/65 leading-relaxed max-w-md opacity-0"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.3rem)' }}
          >
            Pure, nourishing ingredients — dehydrated fruits &amp; vegetables, cold-pressed oils, heritage flours, and whole spices. From farm to your table.
          </p>
          <div ref={ctaRef} className="flex gap-3 opacity-0 flex-shrink-0">
            <Link
              href="/products"
              className="font-sans-harvest text-[11px] tracking-[0.15em] uppercase px-6 py-3 bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A] transition-colors duration-200 select-none"
            >
              Explore Range
            </Link>
            <Link
              href="/about"
              className="font-sans-harvest text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-[#F5F0E8]/25 text-[#F5F0E8]/75 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200 select-none"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-[10] pb-8 flex items-center justify-center gap-3 px-[5.128vw]">
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/30">Scroll</p>
          <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/50 to-transparent" />
        </div>
      </div>

      {/* ── Marquee ticker ── */}
      <div
        ref={tickerRef}
        className="relative z-[10] border-t border-[#F5F0E8]/8 py-3 overflow-hidden"
        style={{ background: 'rgba(13,13,13,0.7)', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {Array(2).fill([
            'Dehydrated Powders', 'Vegetable Flakes', 'Cold-Pressed Oils',
            'Khapali Atta', 'Whole Spices', 'Spice Powders', 'Blended Flours',
            'Clean Label', 'Farm to Home', 'No Additives',
          ]).flat().map((item, i) => (
            <span key={i} className="font-sans-harvest text-[10px] tracking-[0.22em] uppercase text-[#F5F0E8]/30 mx-6">
              {item}
              <span className="mx-6 text-[#C9A84C] opacity-60">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
