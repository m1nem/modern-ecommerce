import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-6">About ModernShop</h1>
        <p className="text-gray-600 mb-4">
              Your premier destination for quality products. We bring you the best
              selection of items with exceptional customer service and fast shipping.
        </p>
        <p className="text-gray-600">
              Founded in 2024, ModernShop combines modern design with unbeatable
              prices to create the ultimate shopping experience.
        </p>
      </div>
      <Footer />
    </>
  );
}