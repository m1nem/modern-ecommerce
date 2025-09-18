import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">Discover our complete collection</p>
        </div>
      </div>
      <ProductGrid products={products} />
      <Footer />
    </>
  );
}