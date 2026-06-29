import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#3A1A3D] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: 'clamp(8rem, 22vw, 24rem)' }}
      >
        404
      </div>
      <div className="relative z-10 max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block h-px w-8 bg-[#C9A84C]" />
          <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
            Page Not Found
          </p>
          <span className="block h-px w-8 bg-[#C9A84C]" />
        </div>
        <h1
          className="font-display font-bold text-[#F5F0E8] leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          This page doesn&apos;t exist.
        </h1>
        <p className="font-serif text-[#F5F0E8]/50 mb-10 leading-relaxed">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 bg-[#C9A84C] text-[#2E1530] hover:bg-[#E2C47A] transition-colors"
          >
            Browse Products
          </Link>
          <Link
            href="/"
            className="font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 border border-[#F5F0E8]/20 text-[#F5F0E8]/70 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
