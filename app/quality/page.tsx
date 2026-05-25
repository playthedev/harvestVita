import type { Metadata } from 'next';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import ScrollReveal from '../components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Quality — HarvestVita',
  description:
    "Quality is not a promise — it's our baseline. Explore the standards and processes that define every product in the HarvestVita range.",
};

const standards = [
  { label: 'Clean Label', detail: 'Every product lists only what it contains. No hidden fillers, no undisclosed additives.' },
  { label: 'No Artificial Preservatives', detail: 'Natural preservation through dehydration, cold-pressing, and proper packaging.' },
  { label: 'Minimal Processing', detail: 'Gentle methods that maintain the original nutritional profile of every ingredient.' },
  { label: 'Batch Traceability', detail: "Every batch is tracked from farm to packaging so you always know what you're getting." },
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
    desc: "Hand-sorting and visual inspection at intake. Anything that doesn't meet the bar goes back, no exceptions.",
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
        stat={[
          { k: '5', l: 'Step Process' },
          { k: '6', l: 'Standards' },
        ]}
      />

      {/* Standards grid */}
      <section className="bg-[#2E1530] py-24 md:py-32 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[#F5F0E8]/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 20vw, 22rem)' }}
        >
          STANDARD
        </div>

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="mb-16 grid md:grid-cols-2 gap-12 items-end">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">
                    Six Standards
                  </p>
                </div>
                <h2 className="font-display font-bold text-[#F5F0E8] leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                  What clean-label<br />
                  <span className="italic text-[#C9A84C]">actually means.</span>
                </h2>
              </div>
              <p className="font-serif text-[#F5F0E8]/60 text-lg leading-relaxed">
                These aren&apos;t certifications hung on a wall. They&apos;re the working rules that
                shape every batch, every pack, every shipment.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F0E8]/8">
            {standards.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div className="group relative bg-[#2E1530] p-7 hover:bg-[#3A1A3D] transition-colors duration-300 h-full overflow-hidden">
                  <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700" />
                  <div className="flex items-center gap-3 mb-4">
                    <span className="block w-2 h-2 rounded-full bg-[#C9A84C]" />
                    <p className="font-sans-harvest text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]">
                      {String(i + 1).padStart(2, '0')} — {s.label}
                    </p>
                  </div>
                  <div className="h-px w-6 bg-[#C9A84C]/40 mb-4 group-hover:w-full transition-all duration-500" />
                  <p className="font-serif text-[#F5F0E8]/60 text-sm leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-[#F5F0E8] py-24 md:py-32 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-6 right-[-4vw] font-display font-bold text-[#4A2545]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        >
          Process
        </div>

        <div className="relative max-w-[1800px] mx-auto px-[5.128vw]">
          <ScrollReveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-2 h-2 rounded-full bg-[#4A2545]" />
                  <p className="font-sans-harvest text-[10px] tracking-[0.35em] uppercase text-[#4A2545]">
                    Process
                  </p>
                </div>
                <h2 className="font-display font-bold text-[#1C1C1C] leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                  Five steps,<br />
                  <span className="italic text-[#4A2545]">farm to pack.</span>
                </h2>
              </div>
              <p className="font-serif text-[#6B6456] text-base leading-relaxed max-w-sm">
                Each step is deliberate. Each step is logged. Each step protects the goodness of what reaches your kitchen.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-px bg-[#1C1C1C]/10 border-t border-b border-[#1C1C1C]/15">
            {process.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.05}>
                <div className="group relative bg-[#F5F0E8] grid md:grid-cols-12 gap-6 md:gap-8 p-8 md:p-10 hover:bg-[#EDE5D4] transition-colors overflow-hidden">
                  <span className="absolute top-0 left-0 h-full w-0 group-hover:w-1 bg-[#C9A84C] transition-all duration-500" />
                  <div className="md:col-span-2 flex items-baseline gap-2">
                    <span className="block w-2 h-2 rounded-full bg-[#C9A84C]" />
                    <p className="font-display text-5xl md:text-6xl font-bold text-[#C9A84C] group-hover:text-[#4A2545] transition-colors leading-none">
                      {step.num}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1C1C1C] group-hover:text-[#4A2545] transition-colors">
                      {step.title}
                    </h3>
                    <div className="mt-3 h-px w-8 bg-[#C9A84C] group-hover:w-20 transition-all duration-500" />
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-serif text-[#6B6456] text-lg leading-relaxed">
                      {step.desc}
                    </p>
                    <p className="mt-4 font-sans-harvest text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/60">
                      Step {step.num} of 05
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#EDE5D4] border-y border-[#1C1C1C]/10">
        <div className="max-w-[1800px] mx-auto px-[5.128vw] py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#1C1C1C]/10">
          {[
            { value: '100%', label: 'Natural Ingredients' },
            { value: '6+', label: 'Product Categories' },
            { value: '0', label: 'Artificial Additives' },
            { value: '∞', label: 'Commitment to Purity' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="md:px-10 first:md:pl-0 last:md:pr-0 text-center md:text-left group">
                <p className="font-display text-4xl md:text-6xl font-bold text-[#1C1C1C] mb-1 group-hover:text-[#4A2545] transition-colors leading-none">
                  {stat.value}
                </p>
                <p className="font-sans-harvest text-[10px] tracking-[0.25em] uppercase text-[#6B6456] mt-3">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
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
