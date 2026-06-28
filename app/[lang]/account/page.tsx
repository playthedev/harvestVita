import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '../../lib/session';
import { findUserById, getOrdersByUser } from '../../lib/user-store';
import { allProducts } from '../../lib/products';
import { signOut, saveAddress } from '../../lib/auth-actions';
import AddressForm from './AddressForm';
import { getDictionary } from '../../i18n/dictionaries';
import { isLocale, type Locale } from '../../i18n/config';
import { localizedHref } from '../../lib/locale-path';
import { formatPrice, autoCurrencyCode } from '../../lib/currency';

export const metadata: Metadata = { title: 'My Account — HarvestVita' };

export default async function AccountPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);
  const country = (await headers()).get('x-vercel-ip-country');
  const code = autoCurrencyCode(locale, country);

  const session = await getSession();
  if (!session) redirect(localizedHref('/login', locale));

  const user = await findUserById(session.userId);
  if (!user) redirect(localizedHref('/login', locale));

  const orders = await getOrdersByUser(user.id);
  const wishlistProducts = allProducts.filter((p) => user.wishlist.includes(p.id));

  return (
    <main className="min-h-screen bg-[#2E1530] pt-32 pb-24 px-[5.128vw] relative overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,240,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="font-sans-harvest text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]">{dict.account.eyebrow}</p>
            </div>
            <h1 className="font-display font-bold text-[#F5F0E8] leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {dict.account.greeting.split('{name}')[0]}
              <span className="italic text-[#C9A84C]">{user.name.split(' ')[0]}.</span>
            </h1>
            <p className="font-serif text-[#F5F0E8]/40 text-sm mt-1">{user.email}</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 border border-[#F5F0E8]/15 text-[#F5F0E8]/55 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200"
            >
              {dict.account.signOut}
            </button>
          </form>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Orders ── */}
          <div className="lg:col-span-2 space-y-6">
            <SectionHeading num="01" label={dict.account.orders.sectionLabel} />
            {orders.length === 0 ? (
              <div className="bg-[#2E1530] border border-[#F5F0E8]/8 p-8 text-center">
                <p className="font-serif text-[#F5F0E8]/40 text-sm mb-4">{dict.account.orders.empty}</p>
                <Link
                  href={localizedHref('/products', locale)}
                  className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 bg-[#C9A84C] text-[#2E1530] hover:bg-[#E2C47A] transition-colors inline-block"
                >
                  {dict.account.orders.startShopping}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-[#2E1530] border border-[#F5F0E8]/8 relative overflow-hidden">
                    <span className="absolute top-0 left-0 h-full w-0.5 bg-[#C9A84C]" />
                    <div className="p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-sans-harvest text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
                            {order.id}
                          </span>
                          <span className="font-sans-harvest text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border border-[#4A2545] text-[#4CAF50]">
                            {order.status}
                          </span>
                        </div>
                        <span className="font-display font-bold text-[#C9A84C]">
                          {formatPrice(order.total + order.shipping, code)}
                        </span>
                      </div>
                      <p className="font-sans-harvest text-[9px] tracking-[0.1em] uppercase text-[#F5F0E8]/30 mb-3">
                        {new Date(order.placed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {order.items.map((item) => (
                          <div key={item.id} className="relative w-12 h-12 bg-[#3A1A3D] overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A84C] text-[#2E1530] font-sans-harvest text-[8px] flex items-center justify-center font-bold">
                              {item.qty}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center ml-2">
                          <p className="font-serif text-[#F5F0E8]/45 text-xs">
                            {order.items.map((i) => i.name).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Wishlist ── */}
            <SectionHeading num="02" label={dict.account.wishlist.sectionLabel} />
            {wishlistProducts.length === 0 ? (
              <div className="bg-[#2E1530] border border-[#F5F0E8]/8 p-8 text-center">
                <p className="font-serif text-[#F5F0E8]/40 text-sm">{dict.account.wishlist.empty}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {wishlistProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={localizedHref(`/products/item/${p.id}`, locale)}
                    className="group bg-[#2E1530] border border-[#F5F0E8]/8 hover:border-[#C9A84C]/30 transition-colors flex gap-4 p-4"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-[#3A1A3D]">
                      <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-[#F5F0E8] text-sm leading-snug">{p.name}</p>
                      <p className="font-sans-harvest text-[9px] tracking-[0.1em] uppercase text-[#F5F0E8]/35 mt-0.5">{p.unit}</p>
                      <p className="font-display font-bold text-[#C9A84C] mt-1">{formatPrice(p.price, code)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── Saved Address ── */}
          <div>
            <SectionHeading num="03" label={dict.account.address.sectionLabel} />
            <div className="bg-[#2E1530] border border-[#F5F0E8]/8 p-6 relative overflow-hidden">
              <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <AddressForm saved={user.saved_address ?? undefined} action={saveAddress} dict={dict} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-display font-bold text-[#C9A84C] text-xl leading-none">{num}</span>
      <span className="block h-px flex-1 bg-[#F5F0E8]/8" />
      <p className="font-sans-harvest text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]">{label}</p>
    </div>
  );
}
