'use client';

import dynamic from 'next/dynamic';

const FloatingGeometry = dynamic(() => import('./three/FloatingGeometry'), {
  ssr: false,
  loading: () => null,
});

type Geo = 'icosahedron' | 'dodecahedron' | 'torus-knot' | 'octahedron';

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  geometry = 'icosahedron',
  color = '#C9A84C',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  geometry?: Geo;
  color?: string;
}) {
  return (
    <section className="relative bg-[#0D0D0D] pt-44 pb-24 md:pt-52 md:pb-32 overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0 opacity-55">
        <FloatingGeometry geometry={geometry} color={color} scale={1.5} />
      </div>

      {/* Gradient overlays — matches home hero */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.65) 0%, rgba(13,13,13,0.1) 50%, rgba(13,13,13,0.85) 100%)' }} />

      <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
        <div className="flex items-center gap-3 mb-8">
          <span className="block h-px w-8 bg-[#C9A84C]" />
          <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
            {eyebrow}
          </p>
        </div>
        <h1
          className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight max-w-5xl"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 7rem)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-8 font-serif text-[#F5F0E8]/55 leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
