import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import OtpForm from './OtpForm';
import { safeRedirect } from '../../../lib/url';
import { getDictionary } from '../../../i18n/dictionaries';
import { isLocale, type Locale } from '../../../i18n/config';
import { localizedHref } from '../../../lib/locale-path';

export const metadata: Metadata = {
  title: 'Verify Email — HarvestVita',
};

export default async function VerifyPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ email?: string; redirectTo?: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);

  const { email, redirectTo } = await searchParams;

  if (!email) redirect(localizedHref('/signup', locale));

  const safeTo = safeRedirect(redirectTo);
  const masked = email.replace(/(.{2})[^@]+(@.+)/, '$1***$2');

  return (
    <main className="min-h-screen bg-[#3A1A3D] flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
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

        <div className="bg-[#2E1530] border border-[#F5F0E8]/8 relative overflow-hidden">
          <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A84C] to-transparent" />

          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <p className="font-sans-harvest text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]">{dict.signup.verify.eyebrow}</p>
              </div>
              <h1 className="font-display font-bold text-[#F5F0E8] text-3xl leading-tight">{dict.signup.verify.title}</h1>
              <p className="mt-2 font-serif text-sm text-[#F5F0E8]/45 leading-relaxed">
                {dict.signup.verify.subtitle.split('{email}')[0]}
                <span className="text-[#F5F0E8]/70">{masked}</span>
                {dict.signup.verify.subtitle.split('{email}')[1]}
              </p>
            </div>

            <OtpForm email={email} redirectTo={safeTo} dict={dict} />

            <p className="mt-6 text-center font-serif text-sm text-[#F5F0E8]/40">
              {dict.signup.verify.wrongEmail}{' '}
              <Link href={localizedHref('/signup', locale)} className="text-[#C9A84C] hover:underline">
                {dict.signup.verify.startOver}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
