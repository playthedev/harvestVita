'use client';

import dynamic from 'next/dynamic';

const FloatingGeometry = dynamic(() => import('./three/FloatingGeometry'), {
  ssr: false,
  loading: () => null,
});

type Geo = 'icosahedron' | 'dodecahedron' | 'torus-knot' | 'octahedron';

/* Corner cross decoration (consistent with home hero) */
function Cross({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="7" y1="0" x2="7" y2="14" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  geometry = 'icosahedron',
  color = '#C9A84C',
  stat,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  geometry?: Geo;
  color?: string;
  stat?: { k: string; l: string }[];
}) {
  return (
    <section className="relative bg-[#0A0A0A] pt-44 pb-24 md:pt-52 md:pb-32 overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0 opacity-55">
        <FloatingGeometry geometry={geometry} color={color} scale={1.5} />
      </div>

      {/* Soft gold spotlight */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '38%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '60vh',
          background:
            'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />

      {/* Gradient overlays — matches home hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.15) 50%, rgba(10,10,10,0.92) 100%)',
        }}
      />

      {/* Subtle grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Corner crosses */}
      <Cross className="absolute top-[110px] left-[5.128vw] z-10" />
      <Cross className="absolute top-[110px] right-[5.128vw] z-10" />
      <Cross className="absolute bottom-8 left-[5.128vw] z-10" />
      <Cross className="absolute bottom-8 right-[5.128vw] z-10" />

      {/* Vertical accent line, left edge */}
      <div className="absolute top-32 bottom-16 left-[5.128vw] z-[5] pointer-events-none flex flex-col items-center justify-center gap-3 opacity-30 hidden md:flex">
        <span className="block w-px flex-1 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
        <span className="block w-1 h-1 bg-[#C9A84C] rounded-full" />
      </div>

      <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 animate-fade-up">
          <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
            {eyebrow}
          </p>
          <span className="block h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />
        </div>

        {/* Title */}
        <h1
          className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight max-w-5xl animate-fade-up"
          style={{
            fontSize: 'clamp(3rem, 7.5vw, 7rem)',
            animationDelay: '0.1s',
            animationFillMode: 'both',
          }}
        >
          {title}
        </h1>

        {/* Subtitle + side meta */}
        {subtitle && (
          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10 max-w-6xl">
            <p
              className="font-serif text-[#F5F0E8]/65 leading-relaxed max-w-2xl animate-fade-up"
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                animationDelay: '0.2s',
                animationFillMode: 'both',
              }}
            >
              {subtitle}
            </p>
            {stat && stat.length > 0 && (
              <div className="flex gap-8 md:gap-10 flex-shrink-0">
                {stat.map((s) => (
                  <div key={s.l} className="flex flex-col">
                    <span
                      className="font-display font-bold text-[#C9A84C]"
                      style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)' }}
                    >
                      {s.k}
                    </span>
                    <span className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/40 mt-1">
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
