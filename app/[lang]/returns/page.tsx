import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Return, Refund & Cancellation Policy — HarvestVita',
  description: 'HarvestVita\'s policy on returns, refunds, and order cancellations.',
};

const sections = [
  {
    title: '1. Our Commitment',
    body: `At HarvestVita, we take pride in the quality of every product we send. If something is not right with your order, we want to make it right. This policy outlines the circumstances under which returns, refunds, and cancellations are accepted, and the process for each.`,
  },
  {
    title: '2. Cancellation Policy',
    body: `You may cancel your order within 24 hours of placing it, provided it has not yet been dispatched. To cancel, email us at hello@harvestvita.in or call +91 99999 99999 with your order details. If the order has already been dispatched, cancellation is not possible and the return process would apply instead. Since we currently operate on Cash on Delivery, no payment is charged at the time of ordering — so there is no amount to refund for pre-dispatch cancellations.`,
  },
  {
    title: '3. Return Eligibility',
    body: `We accept return requests in the following cases: (a) the product delivered is damaged or broken; (b) the product delivered is incorrect (wrong item or wrong quantity); (c) the product is near or past its expiry date at the time of delivery. We do not accept returns for: products that have been opened, used, or tampered with; products where the seal has been broken; products returned due to personal taste or preference; items damaged due to improper storage after delivery.`,
  },
  {
    title: '4. How to Raise a Return Request',
    body: `If you wish to return a product, please contact us within 48 hours of receiving the delivery at hello@harvestvita.in. Include your order details, a description of the issue, and clear photographs of the product and its packaging. Our team will review your request and respond within 2 working days. Once a return is approved, we will arrange for a pickup or advise you on shipping the product back. Do not return any item without prior approval from our team.`,
  },
  {
    title: '5. Refund Policy',
    body: `Since all orders are currently Cash on Delivery, a refund will be issued only in cases where a return has been approved and the product has been received back by us in its original, unopened condition. Refunds will be processed via bank transfer (NEFT/IMPS) to the account details you provide. Refunds will be initiated within 5–7 working days of us receiving the returned product. Shipping charges (if any) are non-refundable unless the return is due to our error (wrong or damaged item).`,
  },
  {
    title: '6. Damaged or Tampered Delivery',
    body: `If your order arrives with visible damage to the outer packaging, please photograph it before accepting delivery and report it to us immediately at hello@harvestvita.in. If the product inside is damaged or the tamper-evident seal is broken upon arrival, you may refuse delivery and it will be returned to us. Once reported with photographic evidence, we will either resend the product or issue a full refund at no cost to you.`,
  },
  {
    title: '7. Non-Returnable Items',
    body: `Certain categories of products cannot be returned under any circumstances: (a) opened or partially consumed food products; (b) products that have been stored incorrectly after delivery; (c) products returned beyond 48 hours of delivery without prior approval. HarvestVita reserves the right to reject return requests that do not meet the conditions set out in this policy.`,
  },
  {
    title: '8. Exceptions & Discretion',
    body: `HarvestVita reserves the right to make exceptions to this policy at its sole discretion in cases of genuine hardship or extenuating circumstances. Such exceptions are on a case-by-case basis and do not set a precedent for future requests.`,
  },
  {
    title: '9. Contact for Returns & Refunds',
    body: `For all return, refund, and cancellation requests, reach us at: Email: hello@harvestvita.in | Phone: +91 99999 99999 (Mon–Sat, 10 AM – 7 PM IST). Please have your order number and product details ready when contacting us.`,
  },
];

export default function ReturnsPage() {
  return (
    <>
      <section className="bg-[#0A0A0A] pt-44 pb-20 md:pt-52 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">Legal</p>
          </div>
          <h1 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight mb-4" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
            Return, Refund &amp;<br />Cancellation Policy
          </h1>
          <p className="font-serif text-[#F5F0E8]/45 max-w-xl" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
            We stand behind every product. Here&apos;s how we handle returns, refunds, and cancellations.
          </p>
          <p className="mt-4 font-sans-harvest text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/25">
            Last updated: May 2025
          </p>
        </div>
      </section>

      {/* Quick summary cards */}
      <section className="bg-[#2D4A2D] py-12">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] grid md:grid-cols-3 gap-px bg-[#F5F0E8]/10">
          {[
            { label: 'Cancellations', value: 'Within 24 hrs', note: 'Before dispatch only' },
            { label: 'Return Window', value: '48 hours', note: 'From date of delivery' },
            { label: 'Refund Timeline', value: '5–7 days', note: 'After product received back' },
          ].map((c) => (
            <div key={c.label} className="bg-[#2D4A2D] px-8 py-8">
              <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">{c.label}</p>
              <p className="font-display font-bold text-[#F5F0E8] text-2xl md:text-3xl mb-1">{c.value}</p>
              <p className="font-serif text-[#F5F0E8]/45 text-sm">{c.note}</p>
            </div>
          ))}
        </div>
      </section>

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
            <Link href="/terms" className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1C1C1C] transition-colors">Terms & Conditions →</Link>
            <Link href="/privacy" className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1C1C1C] transition-colors">Privacy Policy →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
