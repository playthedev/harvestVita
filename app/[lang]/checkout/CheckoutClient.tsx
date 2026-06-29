'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useCart } from '../../lib/CartContext';
import type { Address } from '../../lib/user-store';
import { localizedHref } from '../../lib/locale-path';
import { formatPrice } from '../../lib/currency';
import { calcShipping } from '../../lib/shipping';
import { useCurrency } from '../../lib/CurrencyContext';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries';

// Razorpay types
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  config?: { display: { blocks: Record<string, { name: string; instruments: { method: string }[] }>; sequence: string[]; preferences: { show_default_blocks: boolean } } };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
interface RazorpayInstance {
  open: () => void;
}

type FormState = Record<string, string>;

function Cross({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="7" y1="0" x2="7" y2="14" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

type Field = { label: string; name: keyof Address; type?: string; placeholder: string; half?: boolean; optional?: boolean };

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

type Props = {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  savedAddress: Address | null;
  locale: Locale;
  dict: Dictionary;
};

type FieldErrors = Partial<Record<keyof Address | 'phoneNumber', string>>;

function validateAddress(form: FormState, phoneNumber: string, errors: Dictionary['checkout']['errors']): FieldErrors {
  const errs: FieldErrors = {};
  if (!form.name?.trim() || form.name.trim().length < 2)
    errs.name = errors.nameRequired;
  if (!phoneNumber.trim() || !/^\d{5,15}$/.test(phoneNumber.replace(/[\s-]/g, '')))
    errs.phoneNumber = errors.phoneInvalid;
  if (!form.address1?.trim() || form.address1.trim().length < 5)
    errs.address1 = errors.address1Invalid;
  if (!form.city?.trim() || form.city.trim().length < 2)
    errs.city = errors.cityRequired;
  if (!form.pin?.trim() || !/^\d{6}$/.test(form.pin.trim()))
    errs.pin = errors.pinInvalid;
  if (!form.state?.trim() || form.state.trim().length < 2)
    errs.state = errors.stateRequired;
  return errs;
}

export default function CheckoutClient({ userId, userName, userEmail, savedAddress, locale, dict }: Props) {
  const { items, total, count, clear } = useCart();
  const { code } = useCurrency();
  const t = dict.checkout;

  const fields: Field[] = [
    { label: t.form.fields.name.label, name: 'name', placeholder: t.form.fields.name.placeholder },
    { label: t.form.fields.address1.label, name: 'address1', placeholder: t.form.fields.address1.placeholder },
    { label: t.form.fields.address2.label, name: 'address2', placeholder: t.form.fields.address2.placeholder, optional: true },
    { label: t.form.fields.city.label, name: 'city', placeholder: t.form.fields.city.placeholder, half: true },
    { label: t.form.fields.pin.label, name: 'pin', placeholder: t.form.fields.pin.placeholder, half: true },
    { label: t.form.fields.state.label, name: 'state', placeholder: t.form.fields.state.placeholder },
  ];

  const FRIENDLY_ERRORS: Record<string, string> = {
    'Could not initialise payment.': t.errors.couldNotInitPayment,
    'Payment verification failed.': t.errors.verificationFailed,
    'Payment was cancelled. You can try again.': t.errors.paymentCancelled,
    'Something went wrong. Please try again.': t.errors.generic,
  };

  const friendlyError = (msg: string): string => FRIENDLY_ERRORS[msg] ?? msg;

  // Parse saved phone into dial code + number if possible
  const parseSavedPhone = () => {
    const saved = savedAddress?.phone ?? '';
    const match = COUNTRY_CODES.find((c) => saved.startsWith(c.dial));
    if (match) return { dialCode: match.dial, phoneNumber: saved.slice(match.dial.length).trim() };
    return { dialCode: '+91', phoneNumber: saved };
  };
  const { dialCode: initDial, phoneNumber: initNumber } = parseSavedPhone();

  const [form, setForm] = useState<FormState>(() => ({
    name: savedAddress?.name ?? '',
    address1: savedAddress?.address1 ?? '',
    address2: savedAddress?.address2 ?? '',
    city: savedAddress?.city ?? '',
    pin: savedAddress?.pin ?? '',
    state: savedAddress?.state ?? '',
  }));
  const [dialCode, setDialCode] = useState(initDial);
  const [phoneNumber, setPhoneNumber] = useState(initNumber);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const shipping = calcShipping(total);
  const orderTotal = total + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof Address]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    if (fieldErrors.phoneNumber) {
      setFieldErrors((prev) => ({ ...prev, phoneNumber: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side field validation
    const errs = validateAddress(form, phoneNumber, t.errors);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      const firstField = Object.keys(errs)[0];
      document.querySelector<HTMLInputElement>(`[name="${firstField}"]`)?.focus();
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    const fullPhone = `${dialCode} ${phoneNumber.trim()}`;

    const address: Address = {
      name: form.name,
      phone: fullPhone,
      address1: form.address1,
      address2: form.address2?.trim() || undefined,
      city: form.city,
      pin: form.pin,
      state: form.state,
    };

    try {
      // ── Step 1: Create Razorpay order on our server ──────────────────────
      const createRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
          address,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        setError(friendlyError(createData.error ?? 'Could not initialise payment.'));
        setSubmitting(false);
        return;
      }

      const { orderId: rzpOrderId, amount, currency, keyId } = createData as {
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
      };

      // ── Step 2: Open Razorpay modal ───────────────────────────────────────
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: 'HarvestVita',
        description: 'By Amooha Farms Pvt Ltd',
        image: 'https://harvestvita.in/logo.png',
        order_id: rzpOrderId,
        prefill: {
          name: userName ?? '',
          email: userEmail ?? '',
          contact: `${dialCode}${phoneNumber.replace(/[\s\-]/g, '')}`,
        },
        theme: { color: '#C9A84C' },
        config: {
          display: {
            blocks: {
              upi:   { name: 'Pay via UPI',        instruments: [{ method: 'upi' }] },
              card:  { name: 'Pay via Card',        instruments: [{ method: 'card' }] },
              nb:    { name: 'Net Banking',         instruments: [{ method: 'netbanking' }] },
              wallet:{ name: 'Wallets',             instruments: [{ method: 'wallet' }] },
            },
            sequence: ['block.upi', 'block.card', 'block.nb', 'block.wallet'],
            preferences: { show_default_blocks: false },
          },
        },
        handler: async (response: RazorpayResponse) => {
          // ── Step 3: Verify signature on our server ───────────────────────
          const verifyRes = await fetch('/api/checkout/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok || !verifyData.ok) {
            setError(friendlyError(verifyData.error ?? 'Payment verification failed.'));
            setSubmitting(false);
            return;
          }

          clear();
          setPlacedOrderId(verifyData.orderId);
          setSubmitting(false);
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setError(friendlyError('Payment was cancelled. You can try again.'));
          },
        },
      });

      rzp.open();
    } catch (err) {
      console.error('[checkout] unexpected error:', err);
      setError(friendlyError('Something went wrong. Please try again.'));
      setSubmitting(false);
    }
  };

  // ═══════════════ NOT LOGGED IN ═══════════════
  if (!userId) {
    return (
      <section className="relative min-h-screen bg-[#3A1A3D] flex flex-col items-center justify-center px-[5.128vw] pt-36 pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <Cross className="absolute top-[110px] left-[5.128vw]" />
        <Cross className="absolute top-[110px] right-[5.128vw]" />
        <div className="text-center max-w-md relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 relative">
            <span className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C]" />
            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C]" />
            <span className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-[#C9A84C]" />
            <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C]" />
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="11" r="5" stroke="#C9A84C" strokeWidth="1.5" />
              <path d="M6 27c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="block h-px w-8 bg-[#C9A84C]" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">{t.notLoggedIn.badge}</p>
            <span className="block h-px w-8 bg-[#C9A84C]" />
          </div>
          <h1 className="font-display font-bold text-[#F5F0E8] text-3xl mb-4 leading-tight">
            {t.notLoggedIn.headingLine1}<br /><span className="italic text-[#C9A84C]">{t.notLoggedIn.headingHighlight}</span>
          </h1>
          <p className="font-serif text-[#F5F0E8]/55 mb-10 leading-relaxed">
            {t.notLoggedIn.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`${localizedHref('/signup', locale)}?redirect=/checkout`}
              className="group font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 bg-[#C9A84C] text-[#2E1530] hover:bg-[#E2C47A] transition-colors inline-flex items-center justify-center gap-2"
            >
              {t.notLoggedIn.createAccount} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={`${localizedHref('/login', locale)}?redirect=/checkout`}
              className="font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 border border-[#F5F0E8]/20 text-[#F5F0E8]/70 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              {t.notLoggedIn.signIn}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ═══════════════ EMPTY ═══════════════
  if (count === 0 && !placedOrderId) {
    return (
      <section className="relative min-h-screen bg-[#3A1A3D] flex flex-col items-center justify-center px-[5.128vw] pt-36 pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <Cross className="absolute top-[110px] left-[5.128vw]" />
        <Cross className="absolute top-[110px] right-[5.128vw]" />
        <div className="text-center max-w-md relative z-10">
          <h1 className="font-display font-bold text-[#F5F0E8] text-4xl mb-4">{t.empty.heading}</h1>
          <p className="font-serif text-[#F5F0E8]/55 mb-8">{t.empty.body}</p>
          <Link href={localizedHref('/products', locale)} className="font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 bg-[#C9A84C] text-[#2E1530] hover:bg-[#E2C47A] transition-colors">
            {t.empty.backToShop}
          </Link>
        </div>
      </section>
    );
  }

  // ═══════════════ ORDER PLACED ═══════════════
  if (placedOrderId) {
    return (
      <section className="relative min-h-screen bg-[#3A1A3D] flex flex-col items-center justify-center px-[5.128vw] pt-36 pb-24 overflow-hidden">
        <div aria-hidden className="absolute pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70vw', height: '70vh', background: 'radial-gradient(ellipse at center, rgba(45,74,45,0.20) 0%, rgba(201,168,76,0.08) 30%, transparent 70%)', filter: 'blur(10px)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <Cross className="absolute top-[110px] left-[5.128vw]" />
        <Cross className="absolute top-[110px] right-[5.128vw]" />
        <Cross className="absolute bottom-8 left-[5.128vw]" />
        <Cross className="absolute bottom-8 right-[5.128vw]" />
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.025] leading-none select-none pointer-events-none whitespace-nowrap" style={{ fontSize: 'clamp(8rem, 22vw, 24rem)' }}>{t.success.bgWord}</div>

        <div className="relative z-10 text-center max-w-xl">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-10 relative">
            <span className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]" />
            <span className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C]" />
            <span className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#C9A84C]" />
            <span className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]" />
            <div className="w-14 h-14 rounded-full bg-[#4A2545] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l7 7L23 7" stroke="#F5F0E8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="block h-px w-12 bg-[#C9A84C]" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">{t.success.badge}</p>
            <span className="block h-px w-12 bg-[#C9A84C]" />
          </div>
          <h1 className="font-display font-bold text-[#F5F0E8] leading-[0.95] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t.success.headingLine1}<br /><span className="italic text-[#C9A84C]">{t.success.headingHighlight}</span>
          </h1>
          <p className="font-serif text-[#F5F0E8]/60 text-lg leading-relaxed mb-10 max-w-md mx-auto">
            {t.success.body}
          </p>
          <div className="inline-flex items-center gap-3 bg-[#4A2545] border border-[#F5F0E8]/10 px-5 py-3 mb-10">
            <span className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/35">{t.success.orderIdLabel}</span>
            <span className="block h-3 w-px bg-[#F5F0E8]/15" />
            <span className="font-sans-harvest text-xs tracking-[0.15em] text-[#C9A84C]">{placedOrderId}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localizedHref('/products', locale)} className="group font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 bg-[#C9A84C] text-[#2E1530] hover:bg-[#E2C47A] transition-colors duration-200 inline-flex items-center justify-center gap-2">
              {t.success.continueShopping} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            {userId && (
              <Link href={localizedHref('/account', locale)} className="font-sans-harvest text-[11px] tracking-[0.22em] uppercase px-8 py-4 border border-[#F5F0E8]/20 text-[#F5F0E8]/70 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200">
                {t.success.viewOrders}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ═══════════════ CHECKOUT FORM ═══════════════
  return (
    <>
      {/* Load Razorpay SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section className="relative bg-[#3A1A3D] pt-36 md:pt-44 pb-14 md:pb-20 overflow-hidden">
        <div aria-hidden className="absolute pointer-events-none" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '50vh', background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 65%)', filter: 'blur(8px)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <Cross className="absolute top-[90px] left-[5.128vw]" />
        <Cross className="absolute top-[90px] right-[5.128vw]" />
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">{t.hero.label}</p>
            <span className="block h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>
              {t.hero.headingLine1} <span className="italic text-[#C9A84C]">{t.hero.headingHighlight}</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-[#2E1530] py-16 md:py-20 relative overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-14">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display font-bold text-[#C9A84C] text-2xl leading-none">01</span>
                  <span className="block h-px flex-1 bg-[#F5F0E8]/10" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">{t.form.sectionShipping}</p>
                </div>
                {savedAddress && (
                  <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#C9A84C]/60 mb-4 flex items-center gap-2">
                    <span className="block w-1 h-1 rounded-full bg-[#C9A84C]" />
                    {t.form.prefilledNote}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-5">
                  {fields.map((f) => {
                    const fieldErr = fieldErrors[f.name];
                    return (
                      <div key={f.name} className={f.half ? '' : 'col-span-2'}>
                        <label className={`block font-sans-harvest text-[10px] tracking-[0.22em] uppercase mb-2 ${fieldErr ? 'text-red-400' : 'text-[#F5F0E8]/50'}`}>
                          {f.label}
                        </label>
                        <input
                          type={f.type || 'text'}
                          name={f.name}
                          placeholder={f.placeholder}
                          value={form[f.name] || ''}
                          onChange={handleChange}
                          className={`w-full bg-[#3A1A3D] border px-4 py-3.5 font-serif text-[#F5F0E8] placeholder-[#F5F0E8]/25 focus:outline-none transition-colors ${
                            fieldErr
                              ? 'border-red-400 focus:border-red-400'
                              : 'border-[#F5F0E8]/15 focus:border-[#C9A84C] hover:border-[#F5F0E8]/30'
                          }`}
                        />
                        {fieldErr && (
                          <p className="mt-1.5 font-serif text-xs text-red-400 flex items-center gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
                              <circle cx="5" cy="5" r="4.5" stroke="#f87171" />
                              <path d="M5 3v2.5M5 7h.01" stroke="#f87171" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                            {fieldErr}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {/* Phone with country code dropdown */}
                  <div className="col-span-2">
                    <label className={`block font-sans-harvest text-[10px] tracking-[0.22em] uppercase mb-2 ${fieldErrors.phoneNumber ? 'text-red-400' : 'text-[#F5F0E8]/50'}`}>
                      {t.form.fields.phone.label}
                    </label>
                    <div className={`flex border transition-colors ${fieldErrors.phoneNumber ? 'border-red-400' : 'border-[#F5F0E8]/15 focus-within:border-[#C9A84C] hover:border-[#F5F0E8]/30'}`}>
                      <select
                        value={dialCode}
                        onChange={(e) => setDialCode(e.target.value)}
                        className="bg-[#4A2545] text-[#F5F0E8] font-serif text-sm px-3 py-3.5 border-r border-[#F5F0E8]/10 focus:outline-none cursor-pointer flex-shrink-0"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.dial}>
                            {c.flag} {c.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder={t.form.fields.phone.placeholder}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className="flex-1 bg-[#3A1A3D] px-4 py-3.5 font-serif text-[#F5F0E8] placeholder-[#F5F0E8]/25 focus:outline-none"
                      />
                    </div>
                    {fieldErrors.phoneNumber ? (
                      <p className="mt-1.5 font-serif text-xs text-red-400 flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
                          <circle cx="5" cy="5" r="4.5" stroke="#f87171" />
                          <path d="M5 3v2.5M5 7h.01" stroke="#f87171" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                        {fieldErrors.phoneNumber}
                      </p>
                    ) : (
                      <p className="mt-1.5 font-sans-harvest text-[9px] tracking-[0.1em] uppercase text-[#F5F0E8]/25">
                        {t.form.phoneNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display font-bold text-[#C9A84C] text-2xl leading-none">02</span>
                  <span className="block h-px flex-1 bg-[#F5F0E8]/10" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">{t.form.sectionPayment}</p>
                </div>
                <div className="bg-[#3A1A3D] border border-[#C9A84C] p-6 flex items-start gap-5 relative overflow-hidden">
                  <span className="absolute top-0 left-0 h-full w-1 bg-[#C9A84C]" />
                  <div className="w-5 h-5 rounded-full border-2 border-[#C9A84C] flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="block w-2 h-2 rounded-full bg-[#C9A84C]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="font-sans-harvest text-[11px] tracking-[0.18em] uppercase text-[#F5F0E8]">{t.form.payment.onlinePayment}</p>
                      <span className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#C9A84C] px-2 py-0.5 border border-[#C9A84C]/40">{t.form.payment.secureBadge}</span>
                    </div>
                    <p className="font-serif text-[#F5F0E8]/55 text-sm mt-2 leading-relaxed">
                      {t.form.payment.methodsNote}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5V3.5a3 3 0 0 1 6 0V5M2 5h8v6H2z" stroke="#C9A84C" strokeWidth="1" /></svg>
                      <p className="font-sans-harvest text-[9px] tracking-[0.12em] uppercase text-[#C9A84C]/60">{t.form.payment.sslNote}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#F5F0E8]/8">
                <p className="font-serif text-xs text-[#F5F0E8]/40 leading-relaxed mb-6">
                  {(() => {
                    const parts = t.form.legalNote.split(/(\{terms\}|\{privacy\}|\{returns\})/g);
                    return parts.map((part, i) => {
                      if (part === '{terms}') return <Link key={i} href={localizedHref('/terms', locale)} className="text-[#C9A84C] hover:underline">{t.form.legalLinks.terms}</Link>;
                      if (part === '{privacy}') return <Link key={i} href={localizedHref('/privacy', locale)} className="text-[#C9A84C] hover:underline">{t.form.legalLinks.privacy}</Link>;
                      if (part === '{returns}') return <Link key={i} href={localizedHref('/returns', locale)} className="text-[#C9A84C] hover:underline">{t.form.legalLinks.returns}</Link>;
                      return <span key={i}>{part}</span>;
                    });
                  })()}
                </p>
                {error && (
                  <div className="mb-6 border border-red-400/30 bg-red-400/5 px-4 py-4 flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" stroke="#f87171" />
                      <path d="M8 5v3.5M8 10.5h.01" stroke="#f87171" strokeWidth="1.25" strokeLinecap="round" />
                    </svg>
                    <div>
                      <p className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-red-400 mb-1">{t.form.paymentErrorLabel}</p>
                      <p className="font-serif text-red-300 text-sm leading-relaxed">{error}</p>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full font-sans-harvest text-[11px] tracking-[0.25em] uppercase py-5 bg-[#C9A84C] text-[#2E1530] hover:bg-[#E2C47A] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? t.form.submitting : (
                    <>
                      {t.form.payButton.replace('{amount}', `₹${orderTotal.toLocaleString('en-IN')}`)}
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5V3.5a3 3 0 0 1 6 0V5M2 5h8v6H2z" stroke="#C9A84C" strokeWidth="1" /></svg>
                  <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/35">{t.form.secureCheckoutNote}</p>
                </div>
              </div>
            </form>

            {/* SUMMARY */}
            <div className="self-start">
              <div className="bg-[#3A1A3D] border border-[#F5F0E8]/8 sticky top-28 relative overflow-hidden">
                <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A84C] to-transparent" />
                <span className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C]" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                    <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">{t.summary.label}</p>
                    <span className="font-sans-harvest text-[9px] tracking-[0.2em] uppercase text-[#F5F0E8]/40 ml-auto">{t.summary.itemCount.replace('{count}', String(count))}</span>
                  </div>
                  <div className="space-y-4 mb-5 max-h-[300px] overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-start">
                        <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden bg-[#4A2545]">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A84C] text-[#2E1530] font-sans-harvest text-[9px] flex items-center justify-center font-bold">{item.qty}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-bold text-[#F5F0E8] text-sm leading-snug truncate">{item.name}</p>
                          <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/35 mt-0.5">{item.unit}</p>
                        </div>
                        <span className="font-display font-bold text-[#C9A84C] text-sm flex-shrink-0">{formatPrice(item.price * item.qty, code)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-5 pt-5 border-t border-[#F5F0E8]/10">
                    <div className="flex justify-between font-serif text-sm text-[#F5F0E8]/65"><span>{t.summary.subtotal}</span><span>{formatPrice(total, code)}</span></div>
                    <div className="flex justify-between font-serif text-sm text-[#F5F0E8]/65"><span>{t.summary.shipping}</span><span>{shipping === 0 ? <span className="text-[#C9A84C]">{t.summary.free}</span> : formatPrice(shipping, code)}</span></div>
                  </div>
                  <div className="flex justify-between items-end pt-5 border-t border-[#F5F0E8]/10">
                    <div>
                      <p className="font-sans-harvest text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/40">{t.summary.total}</p>
                      <p className="font-sans-harvest text-[8px] tracking-[0.1em] uppercase text-[#F5F0E8]/30 mt-0.5">{t.summary.taxNote}</p>
                    </div>
                    <span className="font-display font-bold text-[#C9A84C] leading-none" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)' }}>₹{orderTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {code !== 'INR' && (
                    <p className="font-sans-harvest text-[8px] tracking-[0.1em] uppercase text-[#F5F0E8]/30 mt-2 text-right">
                      {t.summary.estimateNote.replace('{currency}', code)}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-px bg-[#F5F0E8]/8 border-t border-[#F5F0E8]/10">
                  {t.summary.badges.map((b) => (
                    <div key={b.l} className="bg-[#3A1A3D] py-4 text-center">
                      <p className="font-display font-bold text-[#C9A84C] text-sm">{b.k}</p>
                      <p className="font-sans-harvest text-[8px] tracking-[0.15em] uppercase text-[#F5F0E8]/35 mt-0.5">{b.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
