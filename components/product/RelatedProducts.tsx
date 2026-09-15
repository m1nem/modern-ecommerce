import { getRelatedProducts } from '@/data/products';
import { ProductCard } from './ProductCard';

export function RelatedProducts({ id }: { id: number }) {
  const related = getRelatedProducts(id, 4);
  if (related.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1480px] px-5 pt-16 pb-24 sm:px-8 lg:px-12">
      <h2 className="text-2xl font-medium tracking-tight text-ink-900 sm:text-3xl">You may also like</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {related.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
