import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
export const metadata: Metadata = { title: 'Shipping Info' };
export default function ShippingPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Support" title="Shipping information" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 px-5 text-[15px] leading-relaxed text-ink-600 sm:px-8 lg:px-12">
        <p>Orders placed before 2pm local time are dispatched the same business day.</p>
        <div className="rounded-2xl border border-ink-200/70 bg-white p-6">
          <h2 className="text-[15px] font-medium text-ink-900">Rates</h2>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li className="flex justify-between border-b border-ink-200/70 pb-2.5"><span>Standard (3-5 business days)</span><span className="tabular-nums">Free over $75, else $8</span></li>
            <li className="flex justify-between"><span>Express (1-2 business days)</span><span className="tabular-nums">$14</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
