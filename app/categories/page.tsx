import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { getCategories, getCategoryCount } from '@/data/products';
import type { CategoryName } from '@/types';

export const metadata: Metadata = { title: 'Categories', description: 'Shop by category.' };

const imageByCategory: Record<CategoryName | 'All', string> = {
  All: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
  Electronics: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&h=800&fit=crop',
  Clothing: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&h=800&fit=crop',
  'Home & Garden': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop',
  Sports: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=800&fit=crop',
  Books: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=800&fit=crop',
  Beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop',
  Toys: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1200&h=800&fit=crop',
};
const descriptions: Record<CategoryName | 'All', string> = {
  All: 'Browse every product in the ModernShop catalog.',
  Electronics: 'Audio, wearables, and everyday tech.',
  Clothing: 'Everyday essentials, thoughtfully made.',
  'Home & Garden': 'Furniture, decor, and kitchen.',
  Sports: 'Performance gear for training days.',
  Books: 'Reads, reference, and gift editions.',
  Beauty: 'Skincare, wellness, and daily rituals.',
  Toys: 'Play, discovery, and quiet wonder.',
};

export default function CategoriesPage() {
  const cats: (CategoryName | 'All')[] = ['All', ...getCategories()];
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Browse" title="Shop by Category" description="Find exactly what you're looking for - or wander and discover something new." />
      <div className="mx-auto mt-12 grid max-w-[1480px] gap-4 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
        {cats.map((c, i) => {
          const count = getCategoryCount(c);
          return (
            <Link key={c} href={c === 'All' ? '/products' : `/products?category=${encodeURIComponent(c)}`}
              className={`group relative overflow-hidden rounded-2xl bg-ink-100 ${i === 0 ? 'lg:col-span-2 aspect-[16/8]' : 'aspect-[16/10]'}`}>
              <Image src={imageByCategory[c]} alt={c} fill sizes={i === 0 ? '100vw' : '(max-width: 1024px) 100vw, 50vw'} className="object-cover transition duration-700 group-hover:scale-[1.04]" priority={i < 2} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/65 via-ink-900/15 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6 lg:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight text-white lg:text-3xl">{c}</h2>
                    <p className="mt-1.5 text-[13.5px] text-white/70">{descriptions[c]}</p>
                    <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">{count} {count === 1 ? 'product' : 'products'}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink-900 transition group-hover:scale-105"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
