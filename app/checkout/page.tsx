import { getSession } from '../lib/session';
import { findUserById } from '../lib/user-store';
import CheckoutClient from './CheckoutClient';

export default async function CheckoutPage() {
  const session = await getSession();
  const user = session ? await findUserById(session.userId) : null;

  return (
    <CheckoutClient
      userId={session?.userId ?? null}
      userName={user?.name ?? null}
      userEmail={user?.email ?? null}
      savedAddress={user?.saved_address ?? null}
    />
  );
}
