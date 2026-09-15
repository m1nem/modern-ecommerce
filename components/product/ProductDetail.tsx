'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Heart, Minus, Plus, Truck, RefreshCcw, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Product } from '@/types';
import { discountPercent, formatPrice, cn } from '@/lib/utils';
import { StarRating } from '@/components/ui/StarRating';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useToastStore } from '@/store/toast-store';
import { useMounted } from '@/lib/use-mounted';

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors?.[0]?.name);
  const [size, setSize] = useState(product.sizes?.[1] ?? product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'features' | 'shipping' | 'returns'>('features');
  const mounted = useMounted();
  const addItem = useCartStore((s) => s.addItem);
  const wishIds = useWishlistStore((s) => s.ids);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const push = useToastStore((s) => s.push);
  const wishlisted = mounted && wishIds.includes(product.id);
  const discount = discountPercent(product.price, product.originalPrice);
  const gallery = product.gallery.length ? product.gallery : [product.image];

  return (
    <div className="mx-auto grid max-w-[1480px] gap-10 px-5 pb-24 pt-8 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12 lg:pt-12">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-ink-100">
          <AnimatePresence mode="wait">
            <motion.div key={activeImage} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
              <Image src={gallery[activeImage]} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        {gallery.length > 1 && (
          <div className="mt-4 flex gap-3">
            {gallery.map((src, i) => (
              <button key={i} onClick={() => setActiveImage(i)} aria-label={`View image ${i + 1}`}
                className={cn('relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-100 ring-2 transition', activeImage === i ? 'ring-ink-900' : 'ring-transparent hover:ring-ink-300')}>
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">{product.category}</p>
        <h1 className="mt-3 text-[32px] font-medium leading-[1.1] tracking-tight text-ink-900 sm:text-[40px]">{product.name}</h1>
        <div className="mt-4 flex items-center gap-3">
          <StarRating rating={product.rating} size={14} />
          <span className="text-[13px] text-ink-500"><span className="font-medium text-ink-900">{product.rating.toFixed(1)}</span> - {product.reviews} reviews</span>
        </div>
        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-[28px] font-medium tabular-nums text-ink-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className="text-base tabular-nums text-ink-400 line-through">{formatPrice(product.originalPrice)}</span>
              {discount > 0 && <span className="rounded-full bg-[var(--color-sale)]/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-[var(--color-sale)]">Save {discount}%</span>}
            </>
          )}
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-ink-600">{product.longDescription}</p>
        {product.colors && product.colors.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Color</span>
              <span className="text-[13px] text-ink-700">{color}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c.name)} aria-label={c.name} aria-pressed={color === c.name}
                  className={cn('relative flex h-9 w-9 items-center justify-center rounded-full ring-1 transition', color === c.name ? 'ring-2 ring-ink-900' : 'ring-ink-200 hover:ring-ink-400')}>
                  <span className="h-6 w-6 rounded-full ring-1 ring-inset ring-black/10" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>
        )}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Size</span>
              <span className="text-[13px] text-ink-700">{size}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} aria-pressed={size === s}
                  className={cn('h-10 min-w-[52px] rounded-lg border px-3 text-[13px] font-medium transition', size === s ? 'border-ink-900 bg-ink-900 text-white' : 'border-ink-200 bg-white text-ink-800 hover:border-ink-400')}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-6 flex items-center gap-2 text-[13px]">
          {product.stock > 5 ? (
            <><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /><span className="text-emerald-700">In stock</span><span className="text-ink-400">- Ships within 24h</span></>
          ) : (
            <><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /><span className="text-amber-700">Only {product.stock} left</span></>
          )}
        </div>
        <div className="mt-8 flex items-stretch gap-3">
          <div className="flex h-13 items-center rounded-full border border-ink-200 bg-white">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex h-13 w-11 items-center justify-center rounded-l-full text-ink-700 transition hover:bg-ink-50"><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity" className="flex h-13 w-11 items-center justify-center rounded-r-full text-ink-700 transition hover:bg-ink-50"><Plus className="h-4 w-4" /></button>
          </div>
          <button onClick={() => { addItem({ productId: product.id, quantity: qty, color, size }); push({ title: 'Added to cart', description: `${product.name} x ${qty}`, variant: 'success' }); }}
            className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 text-sm font-medium text-white transition hover:bg-ink-800 active:scale-[0.99]">
            Add to cart
          </button>
          <button onClick={() => { const added = toggleWish(product.id); push({ title: added ? 'Added to wishlist' : 'Removed from wishlist', variant: 'success' }); }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={cn('flex h-13 w-13 shrink-0 items-center justify-center rounded-full border transition', wishlisted ? 'border-[var(--color-sale)] bg-[var(--color-sale)]/5 text-[var(--color-sale)]' : 'border-ink-200 bg-white text-ink-700 hover:border-ink-400')}>
            <Heart className={cn('h-4 w-4', wishlisted && 'fill-current')} strokeWidth={1.6} />
          </button>
        </div>
        <p className="mt-4 text-[12px] text-ink-400">SKU {product.sku}</p>
        <div className="mt-10 border-t border-ink-200/70 pt-6">
          <div className="flex gap-6">
            {([['features', 'Features'], ['shipping', 'Shipping'], ['returns', 'Returns']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)}
                className={cn('relative pb-3 text-[13.5px] font-medium transition', tab === key ? 'text-ink-900' : 'text-ink-500 hover:text-ink-800')}>
                {label}
                {tab === key && <motion.span layoutId="detail-tab" className="absolute -bottom-[1px] left-0 right-0 h-[2px] rounded-full bg-ink-900" />}
              </button>
            ))}
          </div>
          <div className="pt-5 text-[14px] leading-relaxed text-ink-600">
            {tab === 'features' && (
              <ul className="space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} /><span>{f}</span></li>
                ))}
              </ul>
            )}
            {tab === 'shipping' && (
              <div className="space-y-3">
                <p className="flex items-center gap-2.5 text-ink-800"><Truck className="h-4 w-4" /> Free standard shipping on orders over $75.</p>
                <p className="text-ink-500">Standard delivery: 3-5 business days. Express: 1-2 business days at checkout.</p>
              </div>
            )}
            {tab === 'returns' && (
              <div className="space-y-3">
                <p className="flex items-center gap-2.5 text-ink-800"><RefreshCcw className="h-4 w-4" /> 30-day return window.</p>
                <p className="text-ink-500">Return shipping is on us for unused items in original packaging.</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-ink-200/70 pt-6">
          {[{ Icon: Truck, label: 'Free over $75' }, { Icon: ShieldCheck, label: '2-year warranty' }, { Icon: RefreshCcw, label: '30-day returns' }].map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <Icon className="h-4 w-4 text-ink-600" strokeWidth={1.6} />
              <span className="text-[11.5px] text-ink-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
