import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import ProductsPageClient from './ProductsPageClient';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);

  return <ProductsPageClient locale={locale} dict={dict} />;
}
