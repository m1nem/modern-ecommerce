import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

export default function HomePage() {
  const featuredProducts = products.slice(0, 8)
  const saleProducts = products.filter(p => p.isSale).slice(0, 4)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
              <p className="text-xl mb-8 text-primary-100">Shop the latest trends with unbeatable prices and fast shipping</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">Shop Now</Link>
                <Link href="/categories" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">Browse Categories</Link>
              </div>
            </div>
            <div className="relative h-96"><Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" alt="Hero" fill className="object-cover rounded-lg shadow-xl" /></div>
          </div>
        </div>
      </section>
      <section className="py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{['Electronics','Clothing','Home & Garden','Sports'].map(c => (
        <Link key={c} href={`/products?category=${c}`} className="group relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="relative h-32 mb-4"><Image src={`https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=${c}`} alt={c} fill className="object-cover rounded-lg" /></div><h3 className="font-semibold text-gray-900 group-hover:text-primary-600">{c}</h3></Link>))}</div></div></section>
      {saleProducts.length > 0 && <section className="py-16 bg-red-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><h2 className="text-3xl font-bold mb-4">Hot Deals</h2><p className="text-gray-600">Don&apos;t miss out on these limited-time offers!</p></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{saleProducts.map(p => <ProductCard key={p.id} product={p} />)}</div></div></section>}
      <section className="py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><h2 className="text-3xl font-bold mb-4">Featured Products</h2><p className="text-gray-600">Handpicked items just for you</p></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}</div><div className="text-center mt-12"><Link href="/products" className="btn-primary">View All Products</Link></div></div></section>
      <section className="py-16 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">{[
        ['Quality Guarantee','Only the best products from trusted brands'],
        ['Fast Shipping','Get your orders delivered quickly'],
        ['Secure Payment','Your payment information is safe with us']
      ].map(([t,d]) => (
        <div key={t}><div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div><h3 className="text-xl font-semibold mb-2">{t}</h3><p className="text-gray-600">{d}</p></div>
      ))}</div></div></section>
      <Footer />
    </div>
  )
}
