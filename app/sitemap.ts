import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const now = new Date();
  const staticRoutes = ['', '/products', '/categories', '/about', '/cart', '/wishlist', '/profile', '/deals'].map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.6 }));
  const productRoutes = products.map((p) => ({ url: `${base}/product/${p.id}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 }));
  return [...staticRoutes, ...productRoutes];
}
