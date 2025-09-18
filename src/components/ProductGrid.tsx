'use client'
import React, { useState, useMemo } from 'react'
import { Product } from '@/data/products'
import ProductCard from './ProductCard'
import { Filter, Grid, List, ChevronDown } from 'lucide-react'

export default function ProductGrid({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState('relevant')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory)
    switch (sortBy) {
      case 'price-low': return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-high': return [...filtered].sort((a, b) => b.price - a.price)
      case 'newest': return [...filtered].sort((a, b) => (a.isNew && !b.isNew ? -1 : !a.isNew && b.isNew ? 1 : 0))
      case 'rating': return [...filtered].sort((a, b) => b.rating - a.rating)
      default: return filtered
    }
  }, [products, selectedCategory, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Filter className="h-5 w-5" /><span>Filters</span></button>
          <div className="relative">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="relevant">Most Relevant</option><option value="newest">Newest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none" />
          </div>
          <div className="flex border border-gray-300 rounded-lg">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}><Grid className="h-5 w-5" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}><List className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
      <div className="mb-6"><p className="text-gray-600">Showing {filteredAndSortedProducts.length} of {products.length} products</p></div>
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {filteredAndSortedProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {filteredAndSortedProducts.length === 0 && <div className="text-center py-12"><p className="text-gray-500 text-lg">No products found matching your criteria.</p></div>}
    </div>
  )
}
