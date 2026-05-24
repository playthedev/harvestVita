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
    <footer className="bg-[#1C1C1C] text-[#F5F0E8] relative z-10">
      {/* CTA Band */}
      <div className="border-b border-[#C9A84C]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-sans-harvest text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              Get in touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-tight">
              Bring Farm-Fresh<br />Purity to Your Table.
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="font-serif text-[#F5F0E8]/60 leading-relaxed md:text-right max-w-sm">
              Interested in wholesale, retail partnerships, or simply want to know more? We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="font-sans-harvest text-xs tracking-[0.2em] uppercase px-8 py-4 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200 w-fit"
            >
              Write to Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-1">
            By Amoohaa Farms
          </p>
          <p className="font-display text-2xl font-bold text-[#F5F0E8] mb-4">HarvestVita</p>
          <p className="font-serif text-[#F5F0E8]/50 text-sm leading-relaxed">
            Honest food. Thoughtful processing. The richness of the farm, delivered to your home.
          </p>
        </div>

        <div>
          <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
            Products
          </p>
          <ul className="flex flex-col gap-3">
            {productLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-serif text-sm text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
            Company
          </p>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-serif text-sm text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
            Contact
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="mailto:hello@harvestvita.in"
                className="font-serif text-sm text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors duration-200 break-all"
              >
                hello@harvestvita.in
              </a>
            </li>
            <li>
              <a
                href="tel:+919999999999"
                className="font-serif text-sm text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors duration-200"
              >
                +91 99999 99999
              </a>
            </li>
            <li className="font-serif text-sm text-[#F5F0E8]/50 leading-relaxed mt-1">
              Amoohaa Farms,<br />India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#F5F0E8]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans-harvest text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/30">
            &copy; {year} HarvestVita by Amoohaa Farms. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans-harvest text-[10px] tracking-[0.1em] uppercase text-[#F5F0E8]/30 hover:text-[#C9A84C] transition-colors duration-200"
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
