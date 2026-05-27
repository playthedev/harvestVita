'use client';

import { useActionState, useState } from 'react';
import type { Address } from '../lib/user-store';
import type { AuthState } from '../lib/auth-actions';

type Props = {
  saved?: Address;
  action: (_prev: AuthState, formData: FormData) => Promise<AuthState>;
};

type CountryCode = { code: string; dial: string; flag: string };

const COUNTRY_CODES: CountryCode[] = [
  { code: 'IN', dial: '+91',  flag: '🇮🇳' },
  { code: 'US', dial: '+1',   flag: '🇺🇸' },
  { code: 'GB', dial: '+44',  flag: '🇬🇧' },
  { code: 'AE', dial: '+971', flag: '🇦🇪' },
  { code: 'SG', dial: '+65',  flag: '🇸🇬' },
  { code: 'AU', dial: '+61',  flag: '🇦🇺' },
  { code: 'CA', dial: '+1',   flag: '🇨🇦' },
  { code: 'NZ', dial: '+64',  flag: '🇳🇿' },
  { code: 'MY', dial: '+60',  flag: '🇲🇾' },
  { code: 'DE', dial: '+49',  flag: '🇩🇪' },
  { code: 'FR', dial: '+33',  flag: '🇫🇷' },
  { code: 'SA', dial: '+966', flag: '🇸🇦' },
  { code: 'QA', dial: '+974', flag: '🇶🇦' },
  { code: 'KW', dial: '+965', flag: '🇰🇼' },
  { code: 'BH', dial: '+973', flag: '🇧🇭' },
  { code: 'OM', dial: '+968', flag: '🇴🇲' },
];

function parseSavedPhone(phone: string | undefined): { dial: string; number: string } {
  if (!phone) return { dial: '+91', number: '' };
  const match = COUNTRY_CODES.find((c) => phone.startsWith(c.dial));
  if (match) return { dial: match.dial, number: phone.slice(match.dial.length).trim() };
  return { dial: '+91', number: phone };
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const FRIENDLY: Record<string, string> = {
  name: 'Please enter the recipient\'s full name (at least 2 characters).',
  phone: 'Please enter a valid phone number.',
  address1: 'Please enter your street address (at least 5 characters).',
  city: 'Please enter your city.',
  pin: 'Please enter a valid 6-digit PIN code.',
  state: 'Please select your state.',
};

export default function AddressForm({ saved, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  const { dial: initDial, number: initNumber } = parseSavedPhone(saved?.phone);
  const [dialCode, setDialCode] = useState(initDial);
  const [phoneNumber, setPhoneNumber] = useState(initNumber);

  const inputBase =
    'w-full bg-[#0A0A0A] border px-3 py-2.5 font-serif text-[#F5F0E8] text-sm placeholder-[#F5F0E8]/25 focus:outline-none transition-colors';
  const inputOk = 'border-[#F5F0E8]/12 hover:border-[#F5F0E8]/25 focus:border-[#C9A84C]';
  const inputErr = 'border-red-500/60 focus:border-red-400';
  const labelClass = 'block font-sans-harvest text-[9px] tracking-[0.25em] uppercase mb-1.5';
  const labelOk = 'text-[#C9A84C]/70';
  const labelErrCls = 'text-red-400/80';
  const errorMsg = 'mt-1.5 font-serif text-xs text-red-400';

  function fieldErr(name: string): string | undefined {
    return state.errors?.[name]?.[0]
      ? (FRIENDLY[name] ?? state.errors[name]![0])
      : undefined;
  }

  const isSuccess = !state.errors && state.message === 'Address saved.';

  return (
    <form
      action={(fd) => {
        fd.set('phone', `${dialCode}${phoneNumber.replace(/[\s-]/g, '')}`);
        return formAction(fd);
      }}
      className="space-y-4"
      noValidate
    >
      {/* Full Name */}
      <div>
        <label className={`${labelClass} ${fieldErr('name') ? labelErrCls : labelOk}`}>
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          name="name"
          required
          placeholder="Recipient name"
          defaultValue={saved?.name ?? ''}
          autoComplete="name"
          className={`${inputBase} ${fieldErr('name') ? inputErr : inputOk}`}
        />
        {fieldErr('name') && <p className={errorMsg}>{fieldErr('name')}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className={`${labelClass} ${fieldErr('phone') ? labelErrCls : labelOk}`}>
          Phone <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-2">
          <select
            value={dialCode}
            onChange={(e) => setDialCode(e.target.value)}
            className="bg-[#0A0A0A] border border-[#F5F0E8]/12 hover:border-[#F5F0E8]/25 focus:border-[#C9A84C] focus:outline-none font-serif text-[#F5F0E8] text-sm px-2 py-2.5 transition-colors flex-shrink-0"
            style={{ minWidth: '5.5rem' }}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.dial}>
                {c.flag} {c.dial}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="98765 43210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d\s-]/g, ''))}
            autoComplete="tel-national"
            className={`${inputBase} flex-1 ${fieldErr('phone') ? inputErr : inputOk}`}
          />
        </div>
        {fieldErr('phone') && <p className={errorMsg}>{fieldErr('phone')}</p>}
      </div>

      {/* Address Line 1 */}
      <div>
        <label className={`${labelClass} ${fieldErr('address1') ? labelErrCls : labelOk}`}>
          Address Line 1 <span className="text-red-400">*</span>
        </label>
        <input
          name="address1"
          required
          placeholder="House / Flat, Street"
          defaultValue={saved?.address1 ?? ''}
          autoComplete="address-line1"
          className={`${inputBase} ${fieldErr('address1') ? inputErr : inputOk}`}
        />
        {fieldErr('address1') && <p className={errorMsg}>{fieldErr('address1')}</p>}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className={`${labelClass} ${labelOk}`}>Address Line 2</label>
        <input
          name="address2"
          placeholder="Area, Locality (optional)"
          defaultValue={saved?.address2 ?? ''}
          autoComplete="address-line2"
          className={`${inputBase} ${inputOk}`}
        />
      </div>

      {/* City + PIN */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={`${labelClass} ${fieldErr('city') ? labelErrCls : labelOk}`}>
            City <span className="text-red-400">*</span>
          </label>
          <input
            name="city"
            required
            placeholder="City"
            defaultValue={saved?.city ?? ''}
            autoComplete="address-level2"
            className={`${inputBase} ${fieldErr('city') ? inputErr : inputOk}`}
          />
          {fieldErr('city') && <p className={errorMsg}>{fieldErr('city')}</p>}
        </div>
        <div>
          <label className={`${labelClass} ${fieldErr('pin') ? labelErrCls : labelOk}`}>
            PIN Code <span className="text-red-400">*</span>
          </label>
          <input
            name="pin"
            required
            placeholder="400001"
            defaultValue={saved?.pin ?? ''}
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
            className={`${inputBase} ${fieldErr('pin') ? inputErr : inputOk}`}
          />
          {fieldErr('pin') && <p className={errorMsg}>{fieldErr('pin')}</p>}
        </div>
      </div>

      {/* State */}
      <div>
        <label className={`${labelClass} ${fieldErr('state') ? labelErrCls : labelOk}`}>
          State <span className="text-red-400">*</span>
        </label>
        <select
          name="state"
          required
          defaultValue={saved?.state ?? ''}
          autoComplete="address-level1"
          className={`${inputBase} ${fieldErr('state') ? inputErr : inputOk}`}
        >
          <option value="" disabled>Select state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {fieldErr('state') && <p className={errorMsg}>{fieldErr('state')}</p>}
      </div>

      {/* Success / generic error banner */}
      {isSuccess && (
        <div className="flex items-center gap-2 bg-[#1a2e1a] border border-[#2D4A2D]/60 px-3 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#4CAF50]">
            Address saved successfully.
          </p>
        </div>
      )}
      {!isSuccess && state.message && !state.errors && (
        <p className="font-serif text-xs text-red-400 bg-red-500/8 border border-red-500/20 px-3 py-2.5">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full font-sans-harvest text-[10px] tracking-[0.2em] uppercase py-3 bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A] transition-colors disabled:opacity-50 mt-1"
      >
        {pending ? 'Saving…' : saved ? 'Update Address' : 'Save Address'}
      </button>
    </form>
  );
}
