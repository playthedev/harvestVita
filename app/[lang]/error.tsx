'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to monitoring service in production (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative z-10 max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block h-px w-8 bg-[#C9A84C]" />
          <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
            Something went wrong
          </p>
          <span className="block h-px w-8 bg-[#C9A84C]" />
        </div>
        <h1
          className="font-display font-bold text-[#F5F0E8] leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          An unexpected error occurred.
        </h1>
        <p className="font-serif text-[#F5F0E8]/50 mb-10 leading-relaxed">
          We&apos;re sorry about that. You can try again or go back to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A] transition-colors"
          >
            Try Again
          </button>
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
