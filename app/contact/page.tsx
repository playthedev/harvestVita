import type { Metadata } from 'next';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — HarvestVita',
  description:
    'Get in touch with HarvestVita. Wholesale, retail partnerships, product enquiries, or general questions — we\'d love to hear from you.',
};

const channels = [
  {
    label: 'Email',
    value: 'hello@harvestvita.in',
    href: 'mailto:hello@harvestvita.in',
    desc: 'For general enquiries, partnership, and product information.',
  },
  {
    label: 'Phone',
    value: '+91 99999 99999',
    href: 'tel:+919999999999',
    desc: 'Reach us Monday to Saturday, 10 AM – 7 PM IST.',
  },
  {
    label: 'Visit',
    value: 'Amoohaa Farms, India',
    href: '#',
    desc: 'Schedule a farm visit by prior appointment.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's start a conversation."
        subtitle="Whether you're a retailer, a chef, a curious cook, or a future partner — we'd love to hear from you. Reach out and we'll get back within two working days."
        geometry="torus-knot"
        color="#C9A84C"
      />

      {/* Channels */}
      <section className="bg-[#F5F0E8] py-20 md:py-24 border-b border-[#1C1C1C]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-px bg-[#1C1C1C]/10">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="bg-[#F5F0E8] p-8 md:p-10 hover:bg-[#EDE5D4] transition-colors group"
            >
              <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                {c.label}
              </p>
              <p className="font-display text-2xl md:text-3xl font-bold text-[#1C1C1C] mb-3 group-hover:text-[#4A2545] transition-colors break-words">
                {c.value}
              </p>
              <div className="h-px w-8 bg-[#C9A84C] mb-4 group-hover:w-full transition-all duration-500" />
              <p className="font-serif text-[#6B6456] text-sm leading-relaxed">
                {c.desc}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="bg-[#1C1C1C] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="mb-12 text-center">
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
              Send a Message
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-tight">
              Tell us how we can help.
            </h2>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* B2B band */}
      <section className="bg-[#2E1530] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
              For Businesses
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F5F0E8] leading-tight mb-4">
              Wholesale, private label &amp; bulk orders.
            </h2>
            <p className="font-serif text-[#F5F0E8]/55 text-lg leading-relaxed">
              We work with retailers, restaurants, hotels, exporters, and private-label clients
              across the country. Reach out for catalogues, pricing, and custom packaging options.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:b2b@harvestvita.in"
              className="inline-block font-sans-harvest text-xs tracking-[0.2em] uppercase px-8 py-4 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200"
            >
              B2B Enquiries
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
