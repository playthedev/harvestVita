import Link from 'next/link';

export default function CTABand({
  eyebrow = 'Get in touch',
  title = 'Ready to taste the difference?',
  buttonLabel = 'Contact Us',
  buttonHref = '/contact',
  bg = 'plum',
}: {
  eyebrow?: string;
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  bg?: 'plum' | 'olive' | 'dark';
}) {
  const bgClass =
    bg === 'plum'
      ? 'bg-[#0D0D0D]'
      : bg === 'olive'
      ? 'bg-[#4A2545]'
      : 'bg-[#2E1530]';

  return (
    <section className={`${bgClass} py-20 md:py-28 border-t border-[#F5F0E8]/6`}>
      <div className="max-w-[1800px] mx-auto px-[5.128vw] grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-tight">
            {title}
          </h2>
        </div>
        <div className="md:justify-self-end">
          <Link
            href={buttonHref}
            className="inline-block font-sans-harvest text-xs tracking-[0.2em] uppercase px-8 py-4 bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#E2C47A] transition-colors duration-200"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
