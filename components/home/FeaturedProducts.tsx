import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">Featured</p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">Featured products</h2>
            <p className="mt-3 max-w-md text-[14.5px] text-ink-500">Handpicked items just for you.</p>
          </div>
          <Link href="/products" className="group hidden items-center gap-2 text-[13px] font-medium text-ink-700 hover:text-ink-900 sm:inline-flex">
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i, 3) * 0.05}>
            <ProductCard product={p} priority={i < 2} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex sm:hidden">
        <Link href="/products" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink-200 bg-white text-sm font-medium text-ink-900">
          View all products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
