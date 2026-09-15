'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '@/store/cart-store';
import { useToastStore } from '@/store/toast-store';
import { useMounted } from '@/lib/use-mounted';
import { getProductById } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { CheckoutButton } from '@/components/checkout/CheckoutButton';

const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_FLAT = 8;

export function CartView() {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const push = useToastStore((s) => s.push);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-[1480px] px-5 py-24 sm:px-8 lg:px-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-40 rounded bg-ink-100" />
          <div className="h-40 rounded-2xl bg-ink-100" />
        </div>
      </div>
    );
  }

  const lines = items.map((i) => ({ ...i, product: getProductById(i.productId)! })).filter((i) => Boolean(i.product));

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <EmptyState icon={<ShoppingBag className="h-6 w-6" />} title="Your cart is empty" description="Start shopping to add items to your cart!" action={{ label: 'Continue shopping', href: '/products' }} />
      </div>
    );
  }

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;
  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);

  return (
    <div className="mx-auto grid max-w-[1480px] gap-10 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[1fr_400px] lg:gap-16 lg:px-12">
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">Your cart</h1>
            <p className="mt-2 text-sm text-ink-500">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={() => { clear(); push({ title: 'Cart cleared' }); }}
            className="text-[12.5px] font-medium text-ink-500 underline-offset-4 transition hover:text-ink-900 hover:underline">
            Clear cart
          </button>
        </div>
        <ul className="mt-8 divide-y divide-ink-200/70 border-y border-ink-200/70">
          <AnimatePresence initial={false}>
            {lines.map((l) => (
              <motion.li key={`${l.productId}-${l.color}-${l.size}`} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="flex gap-4 py-5">
                <Link href={`/product/${l.productId}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-100 sm:h-28 sm:w-28">
                  <Image src={l.product.image} alt={l.product.name} fill sizes="112px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">{l.product.category}</p>
                      <Link href={`/product/${l.productId}`}><h3 className="mt-1 truncate text-[15px] font-medium text-ink-900">{l.product.name}</h3></Link>
                      <p className="mt-0.5 text-[12px] text-ink-500">{[l.color, l.size].filter(Boolean).join(' - ')}</p>
                    </div>
                    <button onClick={() => removeItem(l.productId, l.color, l.size)} aria-label="Remove from cart"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-100 hover:text-[var(--color-sale)]">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex h-10 items-center rounded-full border border-ink-200 bg-white">
                      <button onClick={() => updateQuantity(l.productId, l.quantity - 1, l.color, l.size)} aria-label="Decrease quantity" className="flex h-10 w-9 items-center justify-center rounded-l-full text-ink-700 transition hover:bg-ink-50"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-7 text-center text-[13px] font-medium tabular-nums">{l.quantity}</span>
                      <button onClick={() => updateQuantity(l.productId, l.quantity + 1, l.color, l.size)} aria-label="Increase quantity" className="flex h-10 w-9 items-center justify-center rounded-r-full text-ink-700 transition hover:bg-ink-50"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="text-[15px] font-medium tabular-nums text-ink-900">{formatPrice(l.product.price * l.quantity)}</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <Link href="/products" className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-ink-700 underline-offset-4 transition hover:text-ink-900 hover:underline">
          ← Continue shopping
        </Link>
      </div>
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-3xl border border-ink-200/70 bg-white p-6">
          <h2 className="text-lg font-medium tracking-tight text-ink-900">Order summary</h2>
          <dl className="mt-6 space-y-3.5 text-[14px]">
            <div className="flex justify-between"><dt className="text-ink-500">Subtotal</dt><dd className="tabular-nums text-ink-900">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">Shipping</dt><dd className="tabular-nums text-ink-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="rounded-lg bg-ink-50 px-3 py-2 text-[12px] text-ink-600">Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} for free shipping.</p>
            )}
            <div className="flex justify-between border-t border-ink-200/70 pt-4">
              <dt className="text-[15px] font-medium text-ink-900">Estimated total</dt>
              <dd className="text-[15px] font-medium tabular-nums text-ink-900">{formatPrice(total)}</dd>
            </div>
          </dl>
          <div className="mt-6"><CheckoutButton items={lines.map((l) => ({ productId: l.productId, quantity: l.quantity }))} /></div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-ink-500"><Lock className="h-3 w-3" /> Secure checkout powered by Stripe</p>
        </div>
      </aside>
    </div>
  );
}
