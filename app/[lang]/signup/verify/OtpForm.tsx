'use client';

import { useActionState, useRef, useEffect, useCallback } from 'react';
import { verifyOtp, resendOtp } from '../../../lib/auth-actions';
import type { AuthState } from '../../../lib/auth-actions';
import type { Dictionary } from '../../../i18n/dictionaries';

const initial: AuthState = {};

export default function OtpForm({
  email,
  redirectTo,
  dict,
}: {
  email: string;
  redirectTo: string;
  dict: Dictionary;
}) {
  const [verifyState, verifyAction, verifyPending] = useActionState(verifyOtp, initial);
  const [resendState, resendAction, resendPending] = useActionState(resendOtp, initial);
  const t = dict.signup.verify;

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const inputClass =
    'w-12 h-14 text-center bg-[#3A1A3D] border border-[#F5F0E8]/15 font-serif text-xl text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] hover:border-[#F5F0E8]/30 transition-colors caret-transparent';

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  // Auto-focus first input on mount
  useEffect(() => {
    focusInput(0);
  }, [focusInput]);

  function getOtpValue(): string {
    return inputRefs.current.map((el) => el?.value ?? '').join('');
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      const el = inputRefs.current[index];
      if (el && el.value === '' && index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      focusInput(index + 1);
    }
  }

  function handleInput(index: number, e: React.FormEvent<HTMLInputElement>) {
    const el = e.currentTarget;
    const val = el.value.replace(/\D/g, '').slice(-1); // only last digit
    el.value = val;
    if (val && index < 5) focusInput(index + 1);
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    digits.forEach((d, i) => {
      if (inputRefs.current[i]) inputRefs.current[i]!.value = d;
    });
    focusInput(Math.min(digits.length, 5));
  }

  // The "Incorrect code. {remaining} attempt(s) remaining." message carries a
  // dynamic count from the server, so match it by pattern and re-render from dict.
  function translateOtpMessage(msg: string | undefined | null): string | undefined | null {
    if (!msg) return msg;
    const incorrectMatch = msg.match(/^Incorrect code\. (\d+) attempts? remaining\.$/);
    if (incorrectMatch) {
      const remaining = incorrectMatch[1];
      return t.incorrectCode
        .replace('{remaining}', remaining)
        .replace(/\{plural\}/g, remaining === '1' ? '' : 's');
    }
    return t.errors[msg as keyof typeof t.errors] ?? msg;
  }

  const errorMsg = translateOtpMessage(verifyState.errors?.otp?.[0] ?? verifyState.message);
  const successMsg = translateOtpMessage(resendState.message);
  const resendError = translateOtpMessage(
    resendState.errors?.otp?.[0] ?? (resendState.message?.startsWith('Could') ? resendState.message : null)
  );

  return (
    <div className="space-y-6">
      {/* Verify form */}
      <form
        action={(fd) => {
          fd.set('otp', getOtpValue());
          return verifyAction(fd);
        }}
        className="space-y-6"
      >
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div>
          <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/80 mb-4">
            {t.codeLabel}
          </p>
          <div className="flex gap-2 justify-between">
            {Array.from({ length: 6 }, (_, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                pattern="\d"
                maxLength={1}
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                className={inputClass}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onInput={(e) => handleInput(i, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>

          {errorMsg && (
            <p className="mt-3 font-serif text-xs text-red-400">{errorMsg}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={verifyPending}
          className="w-full font-sans-harvest text-[11px] tracking-[0.22em] uppercase py-4 bg-[#C9A84C] text-[#2E1530] hover:bg-[#E2C47A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {verifyPending ? t.verifying : t.verify}
        </button>
      </form>

      {/* Resend form */}
      <form action={resendAction} className="text-center">
        <input type="hidden" name="email" value={email} />
        {successMsg && !resendError && (
          <p className="mb-3 font-serif text-xs text-[#C9A84C]">{successMsg}</p>
        )}
        {resendError && (
          <p className="mb-3 font-serif text-xs text-red-400">{resendError}</p>
        )}
        <button
          type="submit"
          disabled={resendPending}
          className="font-sans-harvest text-[9px] tracking-[0.2em] uppercase text-[#F5F0E8]/40 hover:text-[#C9A84C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {resendPending ? t.resending : t.resend}
        </button>
      </form>
    </div>
  );
}
