import type { Metadata } from 'next';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';

export const metadata: Metadata = {
  title: 'About — HarvestVita',
  description:
    'The story of HarvestVita by Amoohaa Farms. A commitment to honest food, thoughtful processing, and ingredients that carry the richness of the farm to your home.',
};

const milestones = [
  {
    year: 'Origin',
    title: 'Amoohaa Farms',
    desc: 'A farming initiative rooted in ethical agriculture, transparency, and respect for the land.',
  },
  {
    year: 'Idea',
    title: 'A pure pantry',
    desc: 'A growing awareness that modern kitchens were losing the goodness of real, traditional ingredients.',
  },
  {
    year: 'Launch',
    title: 'HarvestVita',
    desc: 'A clean-label brand built to bring authentic, minimally processed essentials back to the everyday table.',
  },
  {
    year: 'Today',
    title: 'Six categories. One standard.',
    desc: 'Powders, flakes, oils, flours, whole spices, and spice powders — all crafted with the same uncompromising care.',
  },
];

const values = [
  {
    title: 'Purity',
    desc: 'What\'s on the label is what\'s in the pack. Always.',
  },
  {
    title: 'Tradition',
    desc: 'Time-honoured methods — stone-grinding, cold-pressing, sun-drying — done right.',
  },
  {
    title: 'Convenience',
    desc: 'Ready for modern kitchens without sacrificing what makes food honest.',
  },
  {
    title: 'Traceability',
    desc: 'From the farm where it grew to the pack on your shelf.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Honest food, rooted in the farm."
        subtitle="HarvestVita is the expression of Amoohaa Farms' commitment to natural, wholesome living — built on the belief that everyday food should be pure, nourishing, and authentic."
        geometry="dodecahedron"
        color="#C9A84C"
      />

      {/* Long-form story */}
      <section className="bg-[#F5F0E8] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-6">
            <p className="font-serif text-[#1C1C1C] text-xl md:text-2xl leading-relaxed">
              HarvestVita was born from a simple observation: modern life has made it harder to bring
              real food to the everyday table.
            </p>
            <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
              Convenience used to come at the cost of nutrition. Pre-packaged shortcuts brought
              additives, preservatives, and a slow drift from what food was meant to be. We wanted
              to change that — to build a pantry where every ingredient was as honest as the soil
              it grew in.
            </p>
            <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
              From dehydrated fruits and vegetables in powder and flake form to cold-pressed oils,
              khapali atta, original spice powders, and whole spices, every product is chosen with
              a simple purpose: to preserve nature&apos;s goodness while making it easy to use in
              modern life. The brand reflects a balance of tradition and convenience — clean-label
              essentials that fit seamlessly into daily cooking and mindful eating.
            </p>
            <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
              At HarvestVita, quality is not treated as a promise but as a standard. Each product is
              developed with attention to purity, taste, and natural value, so customers can trust
              what they bring home for their families.
            </p>
            <blockquote className="border-l-2 border-[#C9A84C] pl-6 my-10">
              <p className="font-display italic text-[#1C1C1C] text-2xl md:text-3xl leading-relaxed">
                As part of Amoohaa Farms, HarvestVita stands for honest food, thoughtful processing,
                and ingredients that carry the richness of the farm to the heart of the home.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#EDE5D4] py-24 md:py-32 border-y border-[#1C1C1C]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545] mb-4">
              Journey
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight">
              From farm to brand.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1C1C1C]/10">
            {milestones.map((m) => (
              <div key={m.title} className="bg-[#EDE5D4] p-8">
                <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
                  {m.year}
                </p>
                <h3 className="font-display text-xl font-bold text-[#1C1C1C] mb-3">
                  {m.title}
                </h3>
                <div className="h-px w-8 bg-[#C9A84C] mb-3" />
                <p className="font-serif text-[#6B6456] text-sm leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#2E1530] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
            <div>
              <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
                What We Stand For
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-tight">
                Four values<br />guide every decision.
              </h2>
            </div>
            <p className="font-serif text-[#F5F0E8]/55 text-lg leading-relaxed">
              These aren&apos;t marketing words. They&apos;re the filters we use when we source,
              process, package, and ship every product that carries the HarvestVita name.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="border border-[#F5F0E8]/10 p-8 hover:border-[#C9A84C]/40 transition-colors duration-300"
              >
                <p className="font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                  0{i + 1}
                </p>
                <h3 className="font-display text-2xl font-bold text-[#F5F0E8] mb-3">
                  {v.title}
                </h3>
                <p className="font-serif text-[#F5F0E8]/55 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Explore"
        title="See what HarvestVita has on offer."
        buttonLabel="View Products"
        buttonHref="/products"
        bg="olive"
      />
    </>
  );
}
