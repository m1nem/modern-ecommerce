'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { discountPercent, formatPrice, cn } from '@/lib/utils';
import { StarRating } from '@/components/ui/StarRating';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useToastStore } from '@/store/toast-store';
import { useMounted } from '@/lib/use-mounted';

export function ProductListItem({ product }: { product: Product }) {
  const mounted = useMounted();
  const addItem = useCartStore((s) => s.addItem);
  const wishIds = useWishlistStore((s) => s.ids);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const push = useToastStore((s) => s.push);
  const wishlisted = mounted && wishIds.includes(product.id);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <article className="group grid grid-cols-[120px_1fr] gap-4 rounded-2xl border border-ink-200/70 bg-white p-3 transition hover:border-ink-300 sm:grid-cols-[160px_1fr] sm:p-4">
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden rounded-xl bg-ink-100">
        <Image src={product.image} alt={product.name} fill sizes="160px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">{product.category}</p>
            <Link href={`/product/${product.id}`}>
              <h3 className="mt-1 truncate text-[15.5px] font-medium text-ink-900">{product.name}</h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-[13px] text-ink-500">{product.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-[12px] text-ink-500">({product.reviews})</span>
            </div>
          </div>
          <button
            onClick={() => { const added = toggleWish(product.id); push({ title: added ? 'Added to wishlist' : 'Removed from wishlist', variant: 'success' }); }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-ink-100"
          >
            <Heart className={cn('h-4 w-4', wishlisted ? 'fill-[var(--color-sale)] text-[var(--color-sale)]' : 'text-ink-700')} strokeWidth={1.6} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[17px] font-medium tabular-nums text-ink-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-[12.5px] tabular-nums text-ink-400 line-through">{formatPrice(product.originalPrice)}</span>
                {discount > 0 && <span className="rounded-full bg-[var(--color-sale)]/10 px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wider text-[var(--color-sale)]">-{discount}%</span>}
              </>
            )}
          </div>
          <button
            onClick={() => { addItem({ productId: product.id, quantity: 1, color: product.colors?.[0]?.name, size: product.sizes?.[0] }); push({ title: 'Added to cart', description: product.name, variant: 'success' }); }}
            className="flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-[13px] font-medium text-white transition hover:bg-ink-800"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
