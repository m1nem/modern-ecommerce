import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getCategoryCount } from '@/data/products';
import type { CategoryName } from '@/types';
import { Reveal } from '@/components/ui/Reveal';

const items: {
  name: CategoryName;
  image: string;
  className: string;
  subtitle: string;
}[] = [
  {
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1000&h=800&fit=crop',
    className: 'col-span-2 row-span-2',
    subtitle: 'Phones, audio & wearables',
  },
  {
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&h=800&fit=crop',
    className: 'col-span-2 row-span-1',
    subtitle: 'Everyday essentials',
  },
  {
    name: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&h=800&fit=crop',
    className: 'col-span-2 row-span-1',
    subtitle: 'Furniture & decor',
  },
  {
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1000&h=800&fit=crop',
    className: 'col-span-2 sm:col-span-1',
    subtitle: 'Performance gear',
  },
  {
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&h=800&fit=crop',
    className: 'col-span-2 sm:col-span-1',
    subtitle: 'Skincare & wellness',
  },
  {
    name: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1000&h=800&fit=crop',
    className: 'col-span-2 sm:col-span-1',
    subtitle: 'Reads & reference',
  },
  {
    name: 'Toys',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1000&h=800&fit=crop',
    className: 'col-span-2 sm:col-span-1',
    subtitle: 'Play & discovery',
  },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">
              Browse
            </p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <Link
            href="/categories"
            className="hidden text-[13px] font-medium text-ink-700 underline-offset-4 transition hover:text-ink-900 hover:underline sm:inline"
          >
            All categories →
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[220px]">
        {items.map((item, i) => {
          const count = getCategoryCount(item.name);
          return (
            <Reveal key={item.name} delay={i * 0.04}>
              <Link
                href={`/products?category=${encodeURIComponent(item.name)}`}
                className={`group relative block h-full w-full overflow-hidden rounded-2xl bg-ink-100 ${item.className}`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/10 to-transparent" />
                <div className="relative flex h-full min-h-[180px] flex-col justify-end p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[15px] font-medium text-white">{item.name}</p>
                      <p className="mt-0.5 text-[11.5px] text-white/70">
                        {count} {count === 1 ? 'product' : 'products'}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/95 text-ink-900 transition group-hover:bg-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
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
