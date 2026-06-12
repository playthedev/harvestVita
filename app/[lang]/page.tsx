import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import ScrollJourney from '../components/ScrollJourney';
import ProductsSection from '../components/ProductsSection';
import WhySection from '../components/WhySection';
import CTABand from '../components/CTABand';
import { getDictionary } from '../i18n/dictionaries';
import { isLocale, type Locale } from '../i18n/config';
import { localizedHref } from '../lib/locale-path';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection locale={locale} dict={dict} />
      <StorySection locale={locale} dict={dict} />
      <ScrollJourney dict={dict} />
      <ProductsSection locale={locale} dict={dict} />
      <WhySection dict={dict} />
      <CTABand
        eyebrow={dict.home.cta.eyebrow}
        title={dict.home.cta.title}
        buttonLabel={dict.home.cta.buttonLabel}
        buttonHref={localizedHref('/contact', locale)}
        bg="olive"
      />
    </>
  );
}
