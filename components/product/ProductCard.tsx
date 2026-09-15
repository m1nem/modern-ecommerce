'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { Product } from '@/types';
import { discountPercent, formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useToastStore } from '@/store/toast-store';
import { useMounted } from '@/lib/use-mounted';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const mounted = useMounted();
  const addItem = useCartStore((s) => s.addItem);
  const wishIds = useWishlistStore((s) => s.ids);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const push = useToastStore((s) => s.push);

  const wishlisted = mounted && wishIds.includes(product.id);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <article className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-ink-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badges.includes('Sale') && discount > 0 && (
              <span className="rounded-full bg-[var(--color-sale)] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                −{discount}%
              </span>
            )}
            {product.badges.includes('New') && (
              <span className="rounded-full bg-white/95 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-900 backdrop-blur">
                New
              </span>
            )}
          </div>

          {/* wishlist */}
          <button
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const added = toggleWish(product.id);
              push({
                title: added ? 'Added to wishlist' : 'Removed from wishlist',
                description: product.name,
                variant: 'success',
              });
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white"
          >
            <Heart
              className={cn(
                'h-4 w-4 transition',
                wishlisted ? 'fill-[var(--color-sale)] text-[var(--color-sale)]' : 'text-ink-700'
              )}
              strokeWidth={1.6}
            />
          </button>

          {/* quick add */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({
                  productId: product.id,
                  quantity: 1,
                  color: product.colors?.[0]?.name,
                  size: product.sizes?.[0],
                });
                push({ title: 'Added to cart', description: product.name, variant: 'success' });
              }}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-ink-900 text-[13px] font-medium text-white transition hover:bg-ink-800 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" /> Quick add
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-ink-500">
              <Star className="h-3 w-3 fill-ink-900 text-ink-900" />
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-ink-400">({product.reviews})</span>
            </div>
          </div>
          <h3 className="text-[14.5px] font-medium leading-snug text-ink-900">
            {product.name}
          </h3>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-[15px] font-medium tabular-nums text-ink-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[12.5px] text-ink-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
