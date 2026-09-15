'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useToastStore } from '@/store/toast-store';

export function CheckoutButton({ items }: { items: { productId: number; quantity: number }[] }) {
  const [loading, setLoading] = useState(false);
  const push = useToastStore((s) => s.push);
  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        push({ title: 'Checkout unavailable', description: data.error || 'Something went wrong.', variant: 'error' });
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      push({ title: 'Checkout unavailable', description: 'Could not reach the server.', variant: 'error' });
      setLoading(false);
    }
  };
  return (
    <button onClick={handleCheckout} disabled={loading}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-ink-900 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-60">
      {loading ? 'Redirecting...' : 'Proceed to checkout'}
      {!loading && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}
