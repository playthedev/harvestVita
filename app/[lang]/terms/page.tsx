import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions — HarvestVita',
  description: 'Terms and conditions governing the use of HarvestVita website and purchase of products.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using the HarvestVita website (harvestvita.in) and placing orders, you agree to be bound by these Terms & Conditions. If you do not agree to any part of these terms, please do not use our website or services. These terms apply to all visitors, users, and customers.`,
  },
  {
    title: '2. About HarvestVita',
    body: `HarvestVita is a brand owned and operated by Amoohaa Farms, engaged in the sale of natural food products including dehydrated fruits and vegetables, cold-pressed oils, heritage flours, whole spices, and spice powders. Our registered address is Amoohaa Farms, India.`,
  },
  {
    title: '3. Products & Descriptions',
    body: `We make every effort to accurately describe our products, including ingredients, weights, and usage information. However, product packaging may vary slightly from images shown. All products are food items intended for consumption and must be stored as directed on packaging. HarvestVita reserves the right to discontinue or modify any product without prior notice.`,
  },
  {
    title: '4. Pricing & Payments',
    body: `All prices displayed on the website are in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Prices are subject to change without notice. Currently, Cash on Delivery (COD) is the accepted payment method. We reserve the right to cancel orders if payment cannot be confirmed.`,
  },
  {
    title: '5. Order Placement & Confirmation',
    body: `Placing an order on our website constitutes an offer to purchase. An order is confirmed only when you receive a confirmation email from us. We reserve the right to refuse or cancel any order at our discretion — including cases where the product is out of stock, pricing errors have occurred, or we suspect fraudulent activity.`,
  },
  {
    title: '6. Shipping & Delivery',
    body: `Orders are dispatched within 2–3 working days of confirmation. Delivery times vary by location and are estimated, not guaranteed. Risk of loss and title for products pass to you upon delivery. HarvestVita is not responsible for delays caused by courier partners, weather, or other circumstances beyond our control. Please refer to our Returns Policy for damaged or lost shipments.`,
  },
  {
    title: '7. Use of Website',
    body: `You agree to use this website only for lawful purposes. You must not reproduce, duplicate, copy, sell, or exploit any part of the website without our express written permission. Attempting to gain unauthorised access to any portion of the website or its related systems is prohibited.`,
  },
  {
    title: '8. Intellectual Property',
    body: `All content on this website — including text, images, logos, product photography, and design — is the intellectual property of HarvestVita / Amoohaa Farms and is protected by applicable copyright laws. Unauthorised use of any content is strictly prohibited.`,
  },
  {
    title: '9. Limitation of Liability',
    body: `HarvestVita shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or products. Our maximum liability shall not exceed the amount paid by you for the specific product giving rise to the claim. We do not warrant that the website will be uninterrupted or error-free.`,
  },
  {
    title: '10. Governing Law',
    body: `These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in India.`,
  },
  {
    title: '11. Changes to Terms',
    body: `HarvestVita reserves the right to update or modify these Terms & Conditions at any time without prior notice. Continued use of the website after changes are posted constitutes your acceptance of the revised terms. We recommend reviewing this page periodically.`,
  },
  {
    title: '12. Contact',
    body: `For any questions regarding these Terms & Conditions, please write to us at hello@harvestvita.in or reach us at +91 99999 99999.`,
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0A0A0A] pt-44 pb-20 md:pt-52 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">Legal</p>
          </div>
          <h1 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight mb-4" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
            Terms &amp; Conditions
          </h1>
          <p className="font-serif text-[#F5F0E8]/45 max-w-xl" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
            Please read these terms carefully before using our website or placing an order.
          </p>
          <p className="mt-4 font-sans-harvest text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/25">
            Last updated: May 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F5F0E8] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-[5.128vw]">
          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.title} className="border-b border-[#1C1C1C]/8 pb-10 last:border-0 last:pb-0">
                <h2 className="font-display font-bold text-[#1C1C1C] text-xl md:text-2xl mb-4">{s.title}</h2>
                <p className="font-serif text-[#6B6456] leading-relaxed text-base md:text-lg">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-[#1C1C1C]/10 flex flex-col sm:flex-row gap-4">
            <Link href="/privacy" className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1C1C1C] transition-colors">Privacy Policy →</Link>
            <Link href="/returns" className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1C1C1C] transition-colors">Return & Refund Policy →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
