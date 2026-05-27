'use client';

import { useActionState } from 'react';
import { signIn } from '../lib/auth-actions';
import type { AuthState } from '../lib/auth-actions';

const initial: AuthState = {};

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, action, pending] = useActionState(signIn, initial);

  const inputClass =
    'w-full bg-[#0A0A0A] border border-[#F5F0E8]/15 px-4 py-3.5 font-serif text-[#F5F0E8] placeholder-[#F5F0E8]/25 focus:outline-none focus:border-[#C9A84C] hover:border-[#F5F0E8]/30 transition-colors text-sm';
  const labelClass =
    'block font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/80 mb-2';
  const errorClass = 'mt-1.5 font-serif text-xs text-red-400';

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        {state.errors?.email && <p className={errorClass}>{state.errors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>Password</label>
        <input id="password" name="password" type="password" required placeholder="••••••••" className={inputClass} />
        {state.errors?.password && <p className={errorClass}>{state.errors.password[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full font-sans-harvest text-[11px] tracking-[0.22em] uppercase py-4 bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {pending ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}
