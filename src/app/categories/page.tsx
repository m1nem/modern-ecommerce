import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { categories } from "@/data/products";

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/products?category=${c}`}
              className="group relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="relative h-32 mb-4">
                <img
                  src={`https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=${c}`}
                  alt={c}
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                {c}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}