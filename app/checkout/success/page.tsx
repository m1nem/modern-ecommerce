import Link from 'next/link';
import { Check } from 'lucide-react';
import { redirect } from 'next/navigation';
import { isStripeConfigured, getStripe } from '@/lib/stripe';

export const metadata = { title: 'Order confirmed' };

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let paid = false;
  let reference = session_id ?? '';
  if (session_id && isStripeConfigured()) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      paid = session.payment_status === 'paid' || session.status === 'complete';
      reference = session.id;
    } catch { paid = false; }
  }
  if (!paid) redirect('/checkout/cancel');
  return (
    <div className="mx-auto max-w-[640px] px-5 pb-24 pt-24 text-center sm:px-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Check className="h-6 w-6" strokeWidth={2.4} /></div>
      <h1 className="mt-6 text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">Order confirmed</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-500">Thanks for your order - a receipt has been emailed to you.</p>
      {reference && <p className="mt-3 text-[12.5px] text-ink-400">Reference <span className="font-mono text-ink-700">{reference}</span></p>}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/products" className="inline-flex h-12 items-center justify-center rounded-full bg-ink-900 px-6 text-sm font-medium text-white transition hover:bg-ink-800">Continue shopping</Link>
        <Link href="/profile" className="inline-flex h-12 items-center justify-center rounded-full border border-ink-200 bg-white px-6 text-sm font-medium text-ink-900 transition hover:border-ink-300">View account</Link>
      </div>
    </div>
  );
}
