'use client';

import { useActionState, useState } from 'react';
import { initiateSignup } from '../../lib/auth-actions';
import type { AuthState } from '../../lib/auth-actions';
import type { Dictionary } from '../../i18n/dictionaries';

const initial: AuthState = {};

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.1 10.1 0 0 1 12 20c-6.4 0-10-8-10-8a18.1 18.1 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.4 0 10 8 10 8a18.1 18.1 0 0 1-2.16 3.19"/>
      <line x1="2" y1="2" x2="22" y2="22"/>
    </svg>
  );
}

export default function SignupForm({ redirectTo, dict }: { redirectTo: string; dict: Dictionary }) {
  const [state, action, pending] = useActionState(initiateSignup, initial);
  const [showPassword, setShowPassword] = useState(false);
  const t = dict.signup.form;

  const inputClass =
    'w-full bg-[#3A1A3D] border border-[#F5F0E8]/15 px-4 py-3.5 font-serif text-[#F5F0E8] placeholder-[#F5F0E8]/25 focus:outline-none focus:border-[#C9A84C] hover:border-[#F5F0E8]/30 transition-colors text-sm';
  const labelClass =
    'block font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/80 mb-2';
  const errorClass = 'mt-1.5 font-serif text-xs text-red-400';

  function translateError(msg: string): string {
    return t.errors[msg as keyof typeof t.errors] ?? msg;
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div>
        <label htmlFor="name" className={labelClass}>{t.fullNameLabel}</label>
        <input id="name" name="name" type="text" required placeholder={t.fullNamePlaceholder} className={inputClass} />
        {state.errors?.name && <p className={errorClass}>{translateError(state.errors.name[0])}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>{t.emailLabel}</label>
        <input id="email" name="email" type="email" required placeholder={t.emailPlaceholder} className={inputClass} />
        {state.errors?.email && <p className={errorClass}>{translateError(state.errors.email[0])}</p>}
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>{t.passwordLabel}</label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder={t.passwordPlaceholder}
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? t.hidePassword : t.showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F0E8]/30 hover:text-[#C9A84C] transition-colors"
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        {state.errors?.password && <p className={errorClass}>{translateError(state.errors.password[0])}</p>}
        <p className="mt-1.5 font-sans-harvest text-[9px] tracking-[0.1em] uppercase text-[#F5F0E8]/25">
          {t.passwordHint}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full font-sans-harvest text-[11px] tracking-[0.22em] uppercase py-4 bg-[#C9A84C] text-[#2E1530] hover:bg-[#E2C47A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {pending ? t.sendingCode : t.continue}
      </button>
    </form>
  );
}
