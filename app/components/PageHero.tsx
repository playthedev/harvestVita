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
    <section className="relative bg-[#1C1C1C] pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0 opacity-60">
        <FloatingGeometry geometry={geometry} color={color} scale={1.5} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C]/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="block h-px w-10 bg-[#C9A84C]" />
          <p className="font-sans-harvest text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]">
            {eyebrow}
          </p>
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] leading-[1.05] tracking-tight max-w-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-8 font-serif text-lg md:text-xl text-[#F5F0E8]/60 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
