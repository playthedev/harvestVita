import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import LoginForm from './LoginForm';
import { safeRedirect } from '../../lib/url';
import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import { localizedHref } from '../../lib/locale-path';

export const metadata: Metadata = {
  title: 'Sign In — HarvestVita',
};

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);

  const { redirect } = await searchParams;
  const redirectTo = safeRedirect(redirect);
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* Gold glow */}
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
        {/* Logo */}
        <Link href={localizedHref('/', locale)} className="flex justify-center mb-10">
          <Image src="/logo.png" alt="HarvestVita" width={160} height={64} className="h-14 w-auto brightness-0 invert" />
        </Link>

        <div className="bg-[#111111] border border-[#F5F0E8]/8 relative overflow-hidden">
          <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A84C] to-transparent" />

          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <p className="font-sans-harvest text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]">{dict.login.eyebrow}</p>
              </div>
              <h1 className="font-display font-bold text-[#F5F0E8] text-3xl leading-tight">{dict.login.title}</h1>
            </div>

            <LoginForm redirectTo={redirectTo} dict={dict} />

            <p className="mt-6 text-center font-serif text-sm text-[#F5F0E8]/40">
              {dict.login.noAccount}{' '}
              <Link href={`${localizedHref('/signup', locale)}?redirect=${encodeURIComponent(redirectTo)}`} className="text-[#C9A84C] hover:underline">
                {dict.login.createOne}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
