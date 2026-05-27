import { getSession } from '../lib/session';
import HeaderClient from './HeaderClient';

export default async function HeaderAuth() {
  const session = await getSession();
  return <HeaderClient userName={session?.name ?? null} />;
}
