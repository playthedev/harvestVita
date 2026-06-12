import { notFound } from 'next/navigation';
import { allProducts, getProductById, products as categories } from '../../../../lib/products';
import { getSession } from '../../../../lib/session';
import { findUserById } from '../../../../lib/user-store';
import ProductDetail from './ProductDetail';

export function generateStaticParams() {
  return allProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: 'Not found — HarvestVita' };
  return {
    title: `${product.name} — HarvestVita`,
    description: product.short,
  };
}

export default async function ProductItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.categorySlug);
  const related = allProducts
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, 4);

  const session = await getSession();
  const user = session ? await findUserById(session.userId) : null;
  const initialWishlisted = user ? user.wishlist.includes(product.id) : false;

  return <ProductDetail product={product} category={category} related={related} initialWishlisted={initialWishlisted} />;
}
