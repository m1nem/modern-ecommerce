import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
export const metadata: Metadata = { title: 'Privacy Policy' };
export default function PrivacyPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Legal" title="Privacy policy" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 px-5 text-[15px] leading-relaxed text-ink-600 sm:px-8 lg:px-12">
        <p>This is a demo storefront. Cart and wishlist state is stored locally in your browser using localStorage.</p>
        <p>Checkout is handled end-to-end by Stripe. Card details never reach our servers.</p>
      </div>
    </div>
  );
}
