import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import CartClient from './CartClient';

export default async function CartPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);

  return <CartClient locale={locale} dict={dict} />;
}
