'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Dictionary } from '../i18n/dictionaries';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const searchParams = useSearchParams();
  const isB2B = searchParams.get('subject') === 'b2b';

  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState(() => ({
    name: '',
    email: '',
    phone: '',
    subject: isB2B ? t.fields.subject.options.wholesale : t.fields.subject.options.general,
    message: '',
  }));

  // Scroll to the form when arriving with ?subject=b2b. This is a side
  // effect on an external system (window scroll), not a state update —
  // safe to run in useEffect.
  useEffect(() => {
    if (!isB2B) return;
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [isB2B]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setState('success');
      setForm({ name: '', email: '', phone: '', subject: t.fields.subject.options.general, message: '' });
    } catch {
      setState('error');
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-[#F5F0E8]/20 py-3 px-1 font-serif text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C] focus:outline-none transition-colors';
  const labelClass =
    'block font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/80 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t.fields.name.label}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder={t.fields.name.placeholder}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t.fields.email.label}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder={t.fields.email.placeholder}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t.fields.phone.label} <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder={t.fields.phone.placeholder}
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>
            {t.fields.subject.label}
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value={t.fields.subject.options.general} className="bg-[#1C1C1C]">{t.fields.subject.options.general}</option>
            <option value={t.fields.subject.options.wholesale} className="bg-[#1C1C1C]">{t.fields.subject.options.wholesale}</option>
            <option value={t.fields.subject.options.privateLabel} className="bg-[#1C1C1C]">{t.fields.subject.options.privateLabel}</option>
            <option value={t.fields.subject.options.press} className="bg-[#1C1C1C]">{t.fields.subject.options.press}</option>
            <option value={t.fields.subject.options.other} className="bg-[#1C1C1C]">{t.fields.subject.options.other}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t.fields.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          placeholder={t.fields.message.placeholder}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between pt-4">
        <p className="font-serif text-[#F5F0E8]/40 text-xs">
          {t.privacyNote}
        </p>
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="font-sans-harvest text-xs tracking-[0.2em] uppercase px-8 py-4 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {state === 'submitting' ? t.submitting : state === 'success' ? t.submitted : t.submit}
        </button>
      </div>

      {state === 'success' && (
        <p className="font-serif text-[#C9A84C] text-sm text-center pt-2">
          {t.success}
        </p>
      )}
      {state === 'error' && (
        <p className="font-serif text-red-400 text-sm text-center pt-2">
          {t.error}
        </p>
      )}
    </form>
  );
}
