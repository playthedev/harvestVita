'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ScrollFrames3D = dynamic(() => import('./three/ScrollFrames3D'), {
  ssr: false,
  loading: () => null,
});

/* ─────────────────────────────────────────────────────────────
 * A tall section that pins a 3D canvas while the user scrolls.
 * As scroll progresses, the 3D scene morphs through 4 frames:
 *   Seed → Wheat → Oil Droplet → Spice Jar
 * Captions on the side fade in/out at matching offsets.
 * ────────────────────────────────────────────────────────── */

const frames = [
  {
    eyebrow: 'Frame 01 — Origin',
    title: 'It starts with a single seed.',
    body:
      'Every product we make begins on Amoohaa Farms — chosen seeds, healthy soil, and the patience of a season.',
    accent: '#C9A84C',
  },
  {
    eyebrow: 'Frame 02 — Harvest',
    title: 'Hand-picked, sun-ripened, fully formed.',
    body:
      'Heritage grains, fragrant spices, and field-fresh produce are gathered at their peak — never rushed for shelf life.',
    accent: '#C9A84C',
  },
  {
    eyebrow: 'Frame 03 — Press',
    title: 'Cold-pressed, slowly extracted.',
    body:
      'Wooden ghani extraction below 50°C keeps every essential oil, antioxidant, and aroma intact — no heat, no solvents.',
    accent: '#C9A84C',
  },
  {
    eyebrow: 'Frame 04 — Your Table',
    title: 'Sealed pure. Ready to nourish.',
    body:
      'Stone-ground flours, single-origin spice powders, and clean oils — packed straight from the farm to your kitchen.',
    accent: '#C9A84C',
  },
];

export default function ScrollJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const captionsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepLabelRef = useRef<HTMLSpanElement>(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const captions = captionsRef.current;
      const progressBar = progressBarRef.current;
      const stepLabel = stepLabelRef.current;
      if (!section || !captions || !progressBar) return;

      const captionEls = Array.from(
        captions.querySelectorAll<HTMLElement>('[data-caption]')
      );

      // pre-set caption opacity (first visible, rest hidden)
      captionEls.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          scrollProgressRef.current = p;
          // progress bar
          gsap.set(progressBar, { scaleX: p });
          // step label (01/04 etc.)
          const idx = Math.min(frames.length - 1, Math.floor(p * frames.length));
          if (stepLabel) stepLabel.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;

          // caption visibility
          captionEls.forEach((el, i) => {
            const segStart = i / frames.length;
            const segEnd = (i + 1) / frames.length;
            const mid = (segStart + segEnd) / 2;
            const dist = Math.abs(p - mid);
            const span = (segEnd - segStart) / 2 + 0.04;
            const visibility = Math.max(0, 1 - dist / span);
            gsap.set(el, {
              opacity: visibility,
              y: (1 - visibility) * 20,
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0A] h-screen overflow-hidden"
    >
      {/* Background atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, rgba(10,10,10,0) 60%)',
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* 3D canvas — full bleed */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 z-[2]"
      >
        <ScrollFrames3D scrollRef={scrollProgressRef} />
      </div>

      {/* Vignette overlay so text reads cleanly */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 35%, rgba(10,10,10,0.2) 65%, rgba(10,10,10,0.85) 100%), linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.7) 100%)',
        }}
      />

      {/* Corner ticks */}
      <div className="absolute top-8 left-[5.128vw] z-[10] flex items-center gap-3">
        <span className="block w-2 h-2 bg-[#C9A84C] rounded-full animate-pulse" />
        <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
          The Journey
        </p>
      </div>
      <div className="absolute top-8 right-[5.128vw] z-[10] flex items-center gap-3">
        <span
          ref={stepLabelRef}
          className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#F5F0E8]/40"
        >
          01 / 04
        </span>
      </div>

      {/* Captions — overlaid on the canvas, two-column feel */}
      <div
        ref={captionsRef}
        className="absolute inset-0 z-[10] flex items-center px-[5.128vw] pointer-events-none"
      >
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="relative h-[50vh] max-w-xl">
            {frames.map((f) => (
              <div
                key={f.eyebrow}
                data-caption
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: 0 }}
                suppressHydrationWarning
              >
                <p
                  className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase mb-5"
                  style={{ color: f.accent }}
                >
                  {f.eyebrow}
                </p>
                <h3
                  className="font-display font-bold text-[#F5F0E8] leading-[1.05] tracking-tight mb-5"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {f.title}
                </h3>
                <p
                  className="font-serif text-[#F5F0E8]/55 leading-relaxed max-w-md"
                  style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)' }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-12 left-[5.128vw] right-[5.128vw] z-[10]">
        <div className="flex items-center justify-between mb-3">
          <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/35">
            Seed → Harvest → Press → Pack
          </p>
          <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/35">
            Scroll to advance
          </p>
        </div>
        <div className="relative h-px w-full bg-[#F5F0E8]/10">
          <div
            ref={progressBarRef}
            className="absolute inset-y-0 left-0 w-full bg-[#C9A84C] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        {/* Four notches */}
        <div className="relative mt-1 flex justify-between">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block w-px h-1.5 bg-[#F5F0E8]/20" />
          ))}
        </div>
      </div>
    </section>
  );
}
