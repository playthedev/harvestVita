import type { Metadata } from 'next';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';

export const metadata: Metadata = {
  title: 'Quality — HarvestVita',
  description:
    'Quality is not a promise — it\'s our baseline. Explore the standards and processes that define every product in the HarvestVita range.',
};

const standards = [
  { label: 'Clean Label', detail: 'Every product lists only what it contains. No hidden fillers, no undisclosed additives.' },
  { label: 'No Artificial Preservatives', detail: 'Natural preservation through dehydration, cold-pressing, and proper packaging.' },
  { label: 'Minimal Processing', detail: 'Gentle methods that maintain the original nutritional profile of every ingredient.' },
  { label: 'Batch Traceability', detail: 'Every batch is tracked from farm to packaging so you always know what you\'re getting.' },
  { label: 'No Added Colours', detail: 'The colour in HarvestVita products comes only from the ingredient itself.' },
  { label: 'No Anti-Caking Agents', detail: 'Our powders and flours are pure — store them right and they stay that way naturally.' },
];

const process = [
  {
    num: '01',
    title: 'Sourcing',
    desc: 'Direct relationships with farms that share our standards. Soil health, ethical practices, and seasonal availability shape every harvest.',
  },
  {
    num: '02',
    title: 'Inspection',
    desc: 'Hand-sorting and visual inspection at intake. Anything that doesn\'t meet the bar goes back, no exceptions.',
  },
  {
    num: '03',
    title: 'Processing',
    desc: 'Cold-pressing, low-temperature dehydration, and stone-grinding — methods chosen to preserve nutrition, not to maximise yield.',
  },
  {
    num: '04',
    title: 'Packaging',
    desc: 'Food-grade, light-protective packaging. Sealed for freshness with minimal headspace to extend shelf life naturally.',
  },
  {
    num: '05',
    title: 'Traceability',
    desc: 'Batch codes that connect every pack back to the farm, the harvest, and the day it was made.',
  },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Standard"
        title="Quality is not a promise. It's our baseline."
        subtitle="Every HarvestVita product is developed with attention to purity, taste, and natural value — so customers can trust what they bring home for their families."
        geometry="octahedron"
        color="#C9A84C"
      />

      {/* Standards grid */}
      <section className="bg-[#2E1530] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 grid md:grid-cols-2 gap-12 items-end">
            <div>
              <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
                Six Standards
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-tight">
                What clean-label<br />actually means.
              </h2>
            </div>
            <p className="font-serif text-[#F5F0E8]/55 text-lg leading-relaxed">
              These aren&apos;t certifications hung on a wall. They&apos;re the working rules that
              shape every batch, every pack, every shipment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((s) => (
              <div
                key={s.label}
                className="border border-[#F5F0E8]/10 p-7 hover:border-[#C9A84C]/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
                    {s.label}
                  </p>
                </div>
                <p className="font-serif text-[#F5F0E8]/55 text-sm leading-relaxed">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-[#F5F0E8] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545] mb-4">
              Process
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight max-w-3xl">
              Five steps from farm to pack.
            </h2>
          </div>
          <div className="space-y-px bg-[#1C1C1C]/10">
            {process.map((step) => (
              <div
                key={step.num}
                className="bg-[#F5F0E8] grid md:grid-cols-12 gap-6 p-8 md:p-10 hover:bg-[#EDE5D4] transition-colors group"
              >
                <div className="md:col-span-2">
                  <p className="font-display text-5xl md:text-6xl font-bold text-[#C9A84C] group-hover:text-[#4A2545] transition-colors">
                    {step.num}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1C1C1C]">
                    {step.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#EDE5D4] border-y border-[#1C1C1C]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#1C1C1C]/10">
          {[
            { value: '100%', label: 'Natural Ingredients' },
            { value: '6+', label: 'Product Categories' },
            { value: '0', label: 'Artificial Additives' },
            { value: '∞', label: 'Commitment to Purity' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="md:px-10 first:pl-0 last:pr-0 text-center md:text-left"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-1">
                {stat.value}
              </p>
              <p className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#6B6456]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        eyebrow="Have Questions?"
        title="Talk to us about sourcing & quality."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        bg="olive"
      />
    </>
  );
}
