'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { state } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const cartItemsCount = state.items.reduce((t, i) => t + i.quantity, 0)
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">ModernShop</Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600">Products</Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600">Categories</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">About</Link>
          </nav>
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden p-2 text-gray-600 hover:text-primary-600"><Search className="h-6 w-6" /></button>
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary-600">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemsCount}</span>}
            </Link>
            <Link href="/profile" className="p-2 text-gray-600 hover:text-primary-600"><User className="h-6 w-6" /></Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-primary-600">{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
          </div>
        </div>
        {isSearchOpen && <div className="md:hidden py-4"><div className="relative"><input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" /><Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /></div></div>}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-gray-200"><nav className="flex flex-col space-y-4"><Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link><Link href="/products" className="text-gray-700 hover:text-primary-600">Products</Link><Link href="/categories" className="text-gray-700 hover:text-primary-600">Categories</Link><Link href="/about" className="text-gray-700 hover:text-primary-600">About</Link></nav></div>}
      </div>
    </header>
  )
}
