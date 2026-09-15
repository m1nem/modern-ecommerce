import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { ProductDetail } from '@/components/product/ProductDetail';
import { RelatedProducts } from '@/components/product/RelatedProducts';

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return { title: 'Product not found' };
  return { title: product.name, description: product.description, openGraph: { title: product.name, description: product.description, images: [product.image] } };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();
  return (
    <div>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1480px] px-5 pt-8 sm:px-8 lg:px-12">
        <ol className="flex items-center gap-1.5 text-[12.5px] text-ink-500">
          <li><Link href="/" className="transition hover:text-ink-900">Home</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li><Link href="/products" className="transition hover:text-ink-900">Products</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li><Link href={`/products?category=${encodeURIComponent(product.category)}`} className="transition hover:text-ink-900">{product.category}</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li aria-current="page" className="text-ink-900">{product.name}</li>
        </ol>
      </nav>
      <ProductDetail product={product} />
      <RelatedProducts id={product.id} />
    </div>
  );
}
