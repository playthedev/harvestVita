import { getSession } from '../../lib/session';
import { findUserById } from '../../lib/user-store';
import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import CheckoutClient from './CheckoutClient';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);

  const session = await getSession();
  const user = session ? await findUserById(session.userId) : null;

  return (
    <CheckoutClient
      userId={session?.userId ?? null}
      userName={user?.name ?? null}
      userEmail={user?.email ?? null}
      savedAddress={user?.saved_address ?? null}
      locale={locale}
      dict={dict}
    />
  );
}
