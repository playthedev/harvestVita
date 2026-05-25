import Image from 'next/image';
import Link from 'next/link';

const productLinks = [
  { label: 'Dehydrated Powders', href: '/products/dehydrated-powders' },
  { label: 'Vegetable Flakes', href: '/products/vegetable-flakes' },
  { label: 'Cold-Pressed Oils', href: '/products/cold-pressed-oils' },
  { label: 'Heritage Flours', href: '/products/heritage-flours' },
  { label: 'Whole Spices', href: '/products/whole-spices' },
  { label: 'Spice Powders', href: '/products/spice-powders' },
];

const companyLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Quality Standards', href: '/quality' },
  { label: 'All Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-[#F5F0E8] relative overflow-hidden">
      {/* ── Large footer title — Terminal Industries style ── */}
      <div className="border-t border-[#F5F0E8]/6 relative">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] pt-20 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-6">
              Get in touch
            </p>
            <Link href="/contact" className="block select-none" aria-label="Contact HarvestVita">
              <Image
                src="/logo.png"
                alt="HarvestVita"
                width={320}
                height={128}
                className="h-20 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-3 md:items-end mb-4">
            <p className="font-serif text-[#F5F0E8]/40 max-w-xs leading-relaxed text-sm md:text-right">
              Interested in wholesale, retail, or just want to know more? We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="font-sans-harvest text-[11px] tracking-[0.15em] uppercase px-6 py-3 bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E2C47A] transition-colors duration-200 w-fit select-none"
            >
              Write to Us
            </Link>
          </div>
        </div>
      </div>

      {/* ── Link columns ── */}
      <div className="border-t border-[#F5F0E8]/6">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4" aria-label="HarvestVita home">
              <Image
                src="/logo.png"
                alt="HarvestVita by Amoohaa Farms"
                width={160}
                height={64}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="font-serif text-[#F5F0E8]/35 text-sm leading-relaxed">
              Honest food. Thoughtful processing. Farm to home.
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
              Products
            </p>
            <ul className="flex flex-col gap-3">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@harvestvita.in"
                  className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200 break-all"
                >
                  hello@harvestvita.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919999999999"
                  className="font-serif text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors duration-200"
                >
                  +91 99999 99999
                </a>
              </li>
              <li className="font-serif text-sm text-[#F5F0E8]/30 leading-relaxed mt-1">
                Amoohaa Farms, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#F5F0E8]/6">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase text-[#F5F0E8]/20">
            &copy; {year} HarvestVita by Amoohaa Farms. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans-harvest text-[9px] tracking-[0.1em] uppercase text-[#F5F0E8]/20 hover:text-[#C9A84C] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
