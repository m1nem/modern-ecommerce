import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
export const metadata: Metadata = { title: 'FAQ' };
const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping is 3-5 business days. Express options are available at checkout.' },
  { q: 'Is shipping free?', a: 'Free standard shipping on orders over $75. Orders under $75 ship for a flat $8.' },
  { q: 'What is your return policy?', a: 'You have 30 days to return any unused item in its original packaging.' },
  { q: 'How do I track my order?', a: 'A tracking link is emailed the moment your order leaves our warehouse.' },
  { q: 'Which payment methods do you accept?', a: 'All major credit and debit cards through Stripe Checkout.' },
];
export default function FaqPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Support" title="Frequently asked questions" />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-ink-200/70 border-y border-ink-200/70 px-5 sm:px-8 lg:px-12">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-medium text-ink-900">
              {f.q}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-500">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
