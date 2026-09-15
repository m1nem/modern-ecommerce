import Link from 'next/link';
import { XCircle } from 'lucide-react';
export const metadata = { title: 'Checkout cancelled' };
export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-[640px] px-5 pb-24 pt-24 text-center sm:px-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink-100 text-ink-700"><XCircle className="h-6 w-6" strokeWidth={1.8} /></div>
      <h1 className="mt-6 text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">Checkout cancelled</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-500">No charge was made. Your cart is right where you left it.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/cart" className="inline-flex h-12 items-center justify-center rounded-full bg-ink-900 px-6 text-sm font-medium text-white transition hover:bg-ink-800">Return to cart</Link>
        <Link href="/products" className="inline-flex h-12 items-center justify-center rounded-full border border-ink-200 bg-white px-6 text-sm font-medium text-ink-900 transition hover:border-ink-300">Keep browsing</Link>
      </div>
    </div>
  );
}
