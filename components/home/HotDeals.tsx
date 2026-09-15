import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { discountPercent, formatPrice } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

const dealIds = [1, 3, 5, 7];

export function HotDeals() {
  const deals = products.filter((p) => dealIds.includes(p.id));
  return (
    <section className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">Limited time</p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">Hot Deals</h2>
            <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-500">
              Don&apos;t miss out on these limited-time offers.
            </p>
          </div>
          <Link href="/deals" className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink-700 hover:text-ink-900">
            View all deals
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
      <div className="no-scrollbar mt-12 flex gap-4 overflow-x-auto pb-2 sm:gap-6 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {deals.map((p, i) => {
          const pct = discountPercent(p.price, p.originalPrice);
          return (
            <Reveal key={p.id} delay={i * 0.06} className="min-w-[280px] flex-1 lg:min-w-0">
              <Link href={`/product/${p.id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white transition hover:border-ink-300 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.2)]">
                <div className="relative aspect-[5/4] overflow-hidden bg-ink-100">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 1024px) 60vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.05]" />
                  {pct > 0 && (
                    <span className="absolute left-3 top-3 rounded-full bg-[var(--color-sale)] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                      -{pct}%
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-500">{p.category}</p>
                  <p className="mt-2 text-[15px] font-medium text-ink-900">{p.name}</p>
                  <div className="mt-auto flex items-baseline gap-2 pt-5">
                    <span className="text-xl font-medium tabular-nums text-ink-900">{formatPrice(p.price)}</span>
                    {p.originalPrice && (
                      <span className="text-[12.5px] tabular-nums text-ink-400 line-through">{formatPrice(p.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
