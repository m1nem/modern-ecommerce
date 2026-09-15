import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ProductsBrowser } from '@/components/product/ProductsBrowser';

export const metadata: Metadata = { title: 'All Products', description: 'Discover our complete collection of curated products.' };

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const { category, q } = await searchParams;
  return (
    <>
      <PageHeader eyebrow="Shop" title="All Products" description="Discover our complete collection - filter by category, price, and rating." />
      <ProductsBrowser initialCategory={category || 'All'} initialSearch={q || ''} />
    </>
  );
}
