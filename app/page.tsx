import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ScrollJourney from './components/ScrollJourney';
import ProductsSection from './components/ProductsSection';
import WhySection from './components/WhySection';
import CTABand from './components/CTABand';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <ScrollJourney />
      <ProductsSection />
      <WhySection />
      <CTABand
        eyebrow="Start Here"
        title="Bring farm-fresh purity to your table."
        buttonLabel="Write to Us"
        buttonHref="/contact"
        bg="olive"
      />
    </>
  );
}
