'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Filter, X, Search as SearchIcon, LayoutGrid, List } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { products, getCategories } from '@/data/products';
import type { CategoryName } from '@/types';
import { ProductCard } from './ProductCard';
import { ProductListItem } from './ProductListItem';
import { cn, discountPercent, formatPrice } from '@/lib/utils';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews' | 'discount' | 'newest';
const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'discount', label: 'Biggest Discount' },
  { value: 'newest', label: 'Newest' },
];
const categories: ('All' | CategoryName)[] = ['All', ...getCategories()];
const PRICE_MIN = 0;
const PRICE_MAX = 700;

export function ProductsBrowser({ initialCategory = 'All', initialSearch = '' }: { initialCategory?: string; initialSearch?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortKey>('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    if (search.trim()) params.set('q', search.trim());
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [category, search, pathname, router]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      if (q && ![p.name, p.category, p.description].some((v) => v.toLowerCase().includes(q))) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'reviews': return b.reviews - a.reviews;
        case 'discount': return discountPercent(b.price, b.originalPrice) - discountPercent(a.price, a.originalPrice);
        case 'newest': return b.id - a.id;
        default: return a.id - b.id;
      }
    });
    return list;
  }, [category, search, minPrice, maxPrice, sort]);

  const reset = () => { setCategory('All'); setSearch(''); setMinPrice(PRICE_MIN); setMaxPrice(PRICE_MAX); setSort('featured'); };
  const activeCount = (category !== 'All' ? 1 : 0) + (search.trim() ? 1 : 0) + (minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX ? 1 : 0);

  const panel = (
    <div className="space-y-8">
      <div className="lg:hidden">
        <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Search</label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="h-10 w-full rounded-full border border-ink-200 bg-white pl-10 pr-4 text-[13.5px] focus:border-ink-900 focus:outline-none" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Category</p>
        <ul className="space-y-1">
          {categories.map((c) => (
            <li key={c}>
              <button onClick={() => setCategory(c)} className={cn('w-full rounded-lg px-3 py-2 text-left text-[13.5px] transition', category === c ? 'bg-ink-900 text-white' : 'text-ink-700 hover:bg-ink-100')}>{c}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Price range</p>
        <div className="flex items-center gap-2">
          <input type="number" min={0} value={minPrice} onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value) || 0))} aria-label="Minimum price" className="h-10 w-full rounded-lg border border-ink-200 bg-white px-3 text-[13.5px] tabular-nums focus:border-ink-900 focus:outline-none" />
          <span className="text-ink-400">-</span>
          <input type="number" min={0} value={maxPrice} onChange={(e) => setMaxPrice(Math.max(0, Number(e.target.value) || 0))} aria-label="Maximum price" className="h-10 w-full rounded-lg border border-ink-200 bg-white px-3 text-[13.5px] tabular-nums focus:border-ink-900 focus:outline-none" />
        </div>
        <p className="mt-3 text-[12px] text-ink-500 tabular-nums">{formatPrice(minPrice)} - {formatPrice(maxPrice)}</p>
      </div>
      <button onClick={reset} className="w-full rounded-full border border-ink-200 bg-white py-2.5 text-[13px] font-medium text-ink-800 transition hover:border-ink-300">Reset filters</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1480px] px-5 pb-24 pt-10 sm:px-8 lg:px-12">
      <div className="sticky top-[68px] z-30 -mx-5 mb-6 border-b border-ink-200/70 bg-cream/85 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex items-center gap-3">
          <button onClick={() => setDrawer(true)} className="flex h-10 items-center gap-2 rounded-full border border-ink-200 bg-white px-4 text-[13px] font-medium text-ink-800 transition hover:border-ink-300 lg:hidden">
            <Filter className="h-3.5 w-3.5" /> Filters
            {activeCount > 0 && <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-900 px-1.5 text-[10px] text-white">{activeCount}</span>}
          </button>
          <div className="relative hidden flex-1 lg:block">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search this collection..." className="h-10 w-full max-w-md rounded-full border border-ink-200 bg-white pl-10 pr-4 text-[13.5px] placeholder:text-ink-400 focus:border-ink-900 focus:outline-none" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-full border border-ink-200 bg-white p-1 lg:flex">
              <button aria-label="Grid view" onClick={() => setView('grid')} className={cn('flex h-8 w-8 items-center justify-center rounded-full transition', view === 'grid' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100')}><LayoutGrid className="h-3.5 w-3.5" /></button>
              <button aria-label="List view" onClick={() => setView('list')} className={cn('flex h-8 w-8 items-center justify-center rounded-full transition', view === 'list' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100')}><List className="h-3.5 w-3.5" /></button>
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-10 cursor-pointer appearance-none rounded-full border border-ink-200 bg-white pl-4 pr-8 text-[13px] font-medium text-ink-800 focus:border-ink-900 focus:outline-none">
              {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{panel}</aside>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[13px] text-ink-500">Showing <span className="font-medium text-ink-900">{filtered.length}</span> of <span className="font-medium text-ink-900">{products.length}</span> products</p>
            {activeCount > 0 && <button onClick={reset} className="text-[12.5px] font-medium text-ink-500 underline-offset-4 transition hover:text-ink-900 hover:underline">Reset filters</button>}
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-ink-200/70 bg-white py-24 text-center">
              <p className="text-lg font-medium text-ink-900">No products match those filters</p>
              <p className="mt-2 text-sm text-ink-500">Try widening the price range or clearing the search.</p>
              <button onClick={reset} className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink-900 px-6 text-sm font-medium text-white transition hover:bg-ink-800">Clear filters</button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">{filtered.map((p) => <ProductListItem key={p.id} product={p} />)}</div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 34 }} role="dialog" aria-modal="true" aria-label="Filters"
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream p-6 pb-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium tracking-tight">Filters</h2>
                <button onClick={() => setDrawer(false)} aria-label="Close filters" className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100"><X className="h-4 w-4" /></button>
              </div>
              {panel}
              <button onClick={() => setDrawer(false)} className="mt-6 h-12 w-full rounded-full bg-ink-900 text-sm font-medium text-white">Show {filtered.length} products</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
