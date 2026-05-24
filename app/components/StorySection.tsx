import Link from 'next/link';

export default function StorySection() {
  const pillars = [
    { num: '01', title: 'Pure by Nature', desc: 'No additives, no artificial preservatives. Every ingredient is exactly what it says on the label.' },
    { num: '02', title: 'Farm Rooted', desc: 'Sourced directly from trusted farms. Shorter supply chains mean fresher produce.' },
    { num: '03', title: 'Thoughtful Processing', desc: 'Gentle dehydration, cold-pressing, and stone-grinding preserve nutrition and taste.' },
    { num: '04', title: 'Modern Convenience', desc: 'Ready to use in everyday cooking — no compromise between health and ease.' },
  ];

  return (
    <section className="bg-[#F5F0E8] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:mb-20">
          <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545] mb-4">
            Our Story
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1C] leading-tight max-w-3xl">
            Born from the belief that everyday food should be pure.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16">
          <div className="space-y-5">
            <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
              HarvestVita is the expression of Amoohaa Farms&apos; commitment to natural, wholesome living.
              Born from the idea that everyday foods should be pure, nourishing, and rooted in
              authenticity.
            </p>
            <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
              From dehydrated fruits and vegetables to cold-pressed oils, khapali atta, and whole spices
              — every product is chosen with a simple purpose: to preserve nature&apos;s goodness while
              making it easy to use in modern life.
            </p>
          </div>
          <div className="space-y-5">
            <blockquote className="border-l-2 border-[#C9A84C] pl-5">
              <p className="font-display italic text-[#1C1C1C] text-xl leading-relaxed">
                &ldquo;Honest food, thoughtful processing, and ingredients that carry the richness of the farm to the heart of the home.&rdquo;
              </p>
            </blockquote>
            <Link
              href="/about"
              className="inline-block font-sans-harvest text-xs tracking-[0.2em] uppercase mt-4 px-7 py-3.5 border border-[#2D4A2D] text-[#2D4A2D] hover:bg-[#2D4A2D] hover:text-[#F5F0E8] transition-all duration-200"
            >
              Read Full Story
            </Link>
          </div>
        </div>

        <div className="border-t border-[#1C1C1C]/10 pt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p) => (
            <div key={p.num} className="group">
              <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                {p.num}
              </p>
              <h3 className="font-display text-xl font-bold text-[#1C1C1C] mb-3 group-hover:text-[#4A2545] transition-colors duration-200">
                {p.title}
              </h3>
              <div className="h-px w-8 bg-[#C9A84C] mb-4 group-hover:w-full transition-all duration-500" />
              <p className="font-serif text-[#6B6456] text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
