'use client';

import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    // Placeholder: replace with real submission endpoint
    try {
      await new Promise((r) => setTimeout(r, 900));
      setState('success');
      setForm({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
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
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Full name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+91 ..."
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="General Enquiry" className="bg-[#1C1C1C]">General Enquiry</option>
            <option value="Wholesale / B2B" className="bg-[#1C1C1C]">Wholesale / B2B</option>
            <option value="Private Label" className="bg-[#1C1C1C]">Private Label</option>
            <option value="Press / Media" className="bg-[#1C1C1C]">Press / Media</option>
            <option value="Other" className="bg-[#1C1C1C]">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          placeholder="Tell us more..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between pt-4">
        <p className="font-serif text-[#F5F0E8]/40 text-xs">
          We respect your privacy. Your details will only be used to reply to your enquiry.
        </p>
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="font-sans-harvest text-xs tracking-[0.2em] uppercase px-8 py-4 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {state === 'submitting' ? 'Sending...' : state === 'success' ? 'Sent ✓' : 'Send Message'}
        </button>
      </div>

      {state === 'success' && (
        <p className="font-serif text-[#C9A84C] text-sm text-center pt-2">
          Thank you. We&apos;ll get back to you within two working days.
        </p>
      )}
      {state === 'error' && (
        <p className="font-serif text-red-400 text-sm text-center pt-2">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
