import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — HarvestVita',
  description: 'How HarvestVita collects, uses, and protects your personal information.',
};

const sections = [
  {
    title: '1. Introduction',
    body: `HarvestVita (a brand of Amoohaa Farms) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or purchase our products. By using our website, you consent to the practices described in this policy.`,
  },
  {
    title: '2. Information We Collect',
    body: `We collect information you provide directly to us — such as your name, email address, phone number, and delivery address when you place an order or contact us. We may also automatically collect certain technical information such as your IP address, browser type, pages visited, and referring URLs when you browse our website. We do not collect payment card details; all transactions are handled securely via Cash on Delivery.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `We use your information to: process and fulfil your orders; communicate with you about your purchases, shipping, and any issues; send you updates about new products or offers (only if you have opted in); improve our website and services; comply with applicable laws and regulations. We do not sell, rent, or share your personal information with third parties for their own marketing purposes.`,
  },
  {
    title: '4. Information Sharing',
    body: `We may share your information with trusted third-party service providers — such as courier and logistics partners — solely to fulfil your orders. These partners are bound by confidentiality obligations. We may also disclose information if required by law, court order, or government authority. In the event of a business transfer or acquisition, your information may be transferred as part of the transaction.`,
  },
  {
    title: '5. Cookies',
    body: `Our website may use cookies — small text files stored on your device — to improve your browsing experience, remember preferences, and analyse site traffic. You can control or disable cookies through your browser settings. Disabling cookies may affect certain functionality of the website.`,
  },
  {
    title: '6. Data Retention',
    body: `We retain your personal information for as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order records may be retained for up to 7 years as required by Indian accounting laws.`,
  },
  {
    title: '7. Data Security',
    body: `We take reasonable technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.`,
  },
  {
    title: '8. Your Rights',
    body: `You have the right to access, correct, or request deletion of your personal information held by us. To exercise these rights, please contact us at hello@harvestvita.in. We will respond to your request within 30 days. Please note that certain information may need to be retained for legal or operational reasons.`,
  },
  {
    title: '9. Children\'s Privacy',
    body: `Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.`,
  },
  {
    title: '10. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. The revised policy will be posted on this page with an updated date. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
  {
    title: '11. Contact Us',
    body: `If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at: hello@harvestvita.in | +91 99999 99999 | Amoohaa Farms, India.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-[#0A0A0A] pt-44 pb-20 md:pt-52 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">Legal</p>
          </div>
          <h1 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight mb-4" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
            Privacy Policy
          </h1>
          <p className="font-serif text-[#F5F0E8]/45 max-w-xl" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
            How we collect, use, and protect your personal information.
          </p>
          <p className="mt-4 font-sans-harvest text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/25">
            Last updated: May 2025
          </p>
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
            <Link href="/returns" className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1C1C1C] transition-colors">Return & Refund Policy →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
