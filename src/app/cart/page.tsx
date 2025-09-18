'use client'
import React from 'react'
import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { state, dispatch } = useCart()
  const updateQuantity = (id: string, qty: number) => {
    if (qty === 0) dispatch({ type: 'REMOVE_ITEM', payload: id })
    else dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: qty } })
  }
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id })

  if (state.items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-8">Start shopping to add items to your cart!</p>
      <a href="/products" className="btn-primary">Continue Shopping</a>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0"><Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" /></div>
                <div className="flex-1"><h3 className="text-lg font-semibold">{item.name}</h3><p className="text-gray-600">${item.price}</p></div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-lg hover:bg-gray-100"><Minus className="h-4 w-4" /></button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-lg hover:bg-gray-100"><Plus className="h-4 w-4" /></button>
                </div>
                <div className="text-right"><p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p><button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 mt-2"><Trash2 className="h-5 w-5" /></button></div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1"><div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24"><h2 className="text-xl font-semibold mb-4">Order Summary</h2><div className="space-y-2 mb-4"><div className="flex justify-between"><span>Subtotal</span><span>${state.total.toFixed(2)}</span></div><div className="flex justify-between"><span>Shipping</span><span>Free</span></div><div className="flex justify-between"><span>Tax</span><span>${(state.total * 0.08).toFixed(2)}</span></div></div><div className="border-t pt-4 mb-6"><div className="flex justify-between text-lg font-semibold"><span>Total</span><span>${(state.total * 1.08).toFixed(2)}</span></div></div><button className="w-full btn-primary mb-4">Proceed to Checkout</button><button onClick={() => dispatch({ type: 'CLEAR_CART' })} className="w-full btn-secondary">Clear Cart</button></div></div>
      </div>
    </div>
  )
}
