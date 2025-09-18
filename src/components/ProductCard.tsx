'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/data/products'

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart()
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({ type: 'ADD_ITEM', payload: product })
  }
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {product.isNew && <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">New</span>}
        {product.isSale && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Sale</span>}
      </div>
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"><Heart className="h-4 w-4 text-gray-600" /></button>
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"><Eye className="h-4 w-4 text-gray-600" /></button>
      </div>
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}><h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600">{product.name}</h3></Link>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>}
          </div>
          {!product.inStock && <span className="text-sm text-red-600 font-medium">Out of Stock</span>}
        </div>
        <button onClick={handleAddToCart} disabled={!product.inStock} className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg ${product.inStock ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
          <ShoppingCart className="h-5 w-5" /><span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  )
}
