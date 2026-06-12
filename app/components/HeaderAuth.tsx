import { getSession } from '../lib/session';
import HeaderClient from './HeaderClient';
import type { Locale } from '../i18n/config';
import type { Dictionary } from '../i18n/dictionaries';

export default async function HeaderAuth({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const session = await getSession();
  return <HeaderClient userName={session?.name ?? null} locale={locale} dict={dict} />;
}
