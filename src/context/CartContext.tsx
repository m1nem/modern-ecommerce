'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface Product {
  id: string; name: string; price: number; image: string; category: string; description: string
}
interface CartItem extends Product { quantity: number }
interface CartState { items: CartItem[]; total: number }

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> }>({
  state: { items: [], total: 0 }, dispatch: () => null,
})

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i), total: state.total + action.payload.price }
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }], total: state.total + action.payload.price }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload), total: state.total - (state.items.find(i => i.id === action.payload)?.price || 0) * (state.items.find(i => i.id === action.payload)?.quantity || 0) }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(i => i.id === action.payload.id); if (!item) return state
      const diff = action.payload.quantity - item.quantity
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i), total: state.total + item.price * diff }
    }
    case 'CLEAR_CART': return { items: [], total: 0 }
    default: return state
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}
export const useCart = () => {
  const c = useContext(CartContext); if (!c) throw new Error('useCart must be used within CartProvider'); return c
}
