import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
export const metadata: Metadata = { title: 'Deals' };
export default function DealsPage() {
  const deals = products.filter((p) => p.originalPrice && p.originalPrice > p.price);
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Limited time" title="Hot Deals" description="Don't miss out on these limited-time offers." />
      <div className="mx-auto mt-12 max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
