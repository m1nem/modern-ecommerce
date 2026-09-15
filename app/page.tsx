import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { HotDeals } from '@/components/home/HotDeals';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Benefits } from '@/components/home/Benefits';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <CategoryGrid />
      <HotDeals />
      <FeaturedProducts />
    </>
  );
}
