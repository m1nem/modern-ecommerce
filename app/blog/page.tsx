import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
export const metadata: Metadata = { title: 'Journal' };
export default function BlogPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Journal" title="Notes from the studio" description="Short essays on design, sourcing, and building a slower store." />
      <div className="mx-auto mt-12 max-w-3xl px-5 sm:px-8 lg:px-12">
        <p className="rounded-2xl border border-ink-200/70 bg-white p-8 text-[15px] leading-relaxed text-ink-600">The ModernShop Journal is being written. In the meantime, browse the catalog.</p>
      </div>
    </div>
  );
}
