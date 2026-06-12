import type { MetadataRoute } from 'next';
import { products, allProducts } from './lib/products';
import { locales } from './i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harvestvita.in';

function alternates(path: string): Record<string, string> {
  return Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    '',
    '/about',
    '/products',
    '/quality',
    '/contact',
    '/terms',
    '/privacy',
    '/returns',
  ];

  const productPaths = [
    ...products.map((p) => `/products/${p.slug}`),
    ...allProducts.map((p) => `/products/item/${p.id}`),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: { languages: alternates(path) },
      });
    }
    for (const path of productPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: path.includes('/item/') ? 0.6 : 0.8,
        alternates: { languages: alternates(path) },
      });
    }
  }

  return entries;
}
