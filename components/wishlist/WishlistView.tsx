'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartStore } from '@/store/cart-store';
import { useToastStore } from '@/store/toast-store';
import { useMounted } from '@/lib/use-mounted';
import { getProductById } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';

export function WishlistView() {
  const mounted = useMounted();
  const ids = useWishlistStore((s) => s.ids);
  const remove = useWishlistStore((s) => s.remove);
  const addItem = useCartStore((s) => s.addItem);
  const push = useToastStore((s) => s.push);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-[1480px] px-5 py-24 sm:px-8 lg:px-12">
        <div className="animate-pulse space-y-4"><div className="h-8 w-40 rounded bg-ink-100" /><div className="h-40 rounded-2xl bg-ink-100" /></div>
      </div>
    );
  }

  const products = ids.map((id) => getProductById(id)).filter(Boolean);

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <EmptyState icon={<Heart className="h-6 w-6" />} title="Your wishlist is empty" description="Tap the heart on any product to save it for later." action={{ label: 'Browse products', href: '/products' }} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1480px] px-5 pb-24 sm:px-8 lg:px-12">
      <p className="text-sm text-ink-500">{products.length} {products.length === 1 ? 'item' : 'items'} saved</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {products.map((p) => (
            <motion.li key={p!.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}
              className="group relative flex gap-4 rounded-2xl border border-ink-200/70 bg-white p-3">
              <Link href={`/product/${p!.id}`} className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-ink-100">
                <Image src={p!.image} alt={p!.name} fill sizes="112px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1 pr-8">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">{p!.category}</p>
                  <Link href={`/product/${p!.id}`}><h3 className="mt-1 truncate text-[14.5px] font-medium text-ink-900">{p!.name}</h3></Link>
                  <p className="mt-1 text-[15px] font-medium tabular-nums text-ink-900">{formatPrice(p!.price)}</p>
                </div>
                <button onClick={() => { addItem({ productId: p!.id, quantity: 1, color: p!.colors?.[0]?.name, size: p!.sizes?.[0] }); push({ title: 'Added to cart', description: p!.name, variant: 'success' }); }}
                  className="mt-3 inline-flex h-9 w-fit items-center gap-1.5 rounded-full bg-ink-900 px-3.5 text-[12.5px] font-medium text-white transition hover:bg-ink-800">
                  <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
                </button>
              </div>
              <button onClick={() => { remove(p!.id); push({ title: 'Removed from wishlist' }); }} aria-label="Remove from wishlist"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-100 hover:text-ink-900">
                <X className="h-4 w-4" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
