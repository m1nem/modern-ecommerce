import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
export const metadata: Metadata = { title: 'Returns' };
export default function ReturnsPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Support" title="Returns & exchanges" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 px-5 text-[15px] leading-relaxed text-ink-600 sm:px-8 lg:px-12">
        <p>You have 30 days from delivery to return or exchange any unused item in its original packaging. Return shipping is on us within the United States.</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Email support@modernshop.com with your order number.</li>
          <li>We email a prepaid return label within one business day.</li>
          <li>Drop the parcel with any carrier on the label.</li>
          <li>Refunds are issued within three business days of receiving the return.</li>
        </ol>
      </div>
    </div>
  );
}
