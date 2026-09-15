import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { WishlistView } from '@/components/wishlist/WishlistView';
export const metadata: Metadata = { title: 'Wishlist' };
export default function WishlistPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Saved" title="Your wishlist" description="Products you've saved for later." />
      <div className="mt-8"><WishlistView /></div>
    </div>
  );
}
