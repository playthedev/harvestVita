import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ProductsSection from './components/ProductsSection';
import WhySection from './components/WhySection';
import CTABand from './components/CTABand';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StorySection />
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
