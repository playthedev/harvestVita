import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import OtpForm from './OtpForm';
import { safeRedirect } from '../../../lib/url';

export const metadata: Metadata = {
  title: 'Verify Email — HarvestVita',
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; redirectTo?: string }>;
}) {
  const { email, redirectTo } = await searchParams;

  if (!email) redirect('/signup');

  const safeTo = safeRedirect(redirectTo);
  const masked = email.replace(/(.{2})[^@]+(@.+)/, '$1***$2');

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '60vw', height: '50vh',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex justify-center mb-10">
          <Image src="/logo.png" alt="HarvestVita" width={160} height={64} className="h-14 w-auto brightness-0 invert" />
        </Link>

        <div className="bg-[#111111] border border-[#F5F0E8]/8 relative overflow-hidden">
          <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A84C] to-transparent" />

          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <p className="font-sans-harvest text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]">Email Verification</p>
              </div>
              <h1 className="font-display font-bold text-[#F5F0E8] text-3xl leading-tight">Check your inbox.</h1>
              <p className="mt-2 font-serif text-sm text-[#F5F0E8]/45 leading-relaxed">
                We sent a 6-digit code to <span className="text-[#F5F0E8]/70">{masked}</span>. It expires in 10 minutes.
              </p>
            </div>

            <OtpForm email={email} redirectTo={safeTo} />

            <p className="mt-6 text-center font-serif text-sm text-[#F5F0E8]/40">
              Wrong email?{' '}
              <Link href="/signup" className="text-[#C9A84C] hover:underline">
                Start over
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
