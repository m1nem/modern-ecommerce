'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, color?: string, size?: string) => void;
  updateQuantity: (productId: number, quantity: number, color?: string, size?: string) => void;
  clear: () => void;
  totalItems: () => number;
}

const sameLine = (a: CartItem, b: { productId: number; color?: string; size?: string }) =>
  a.productId === b.productId && a.color === b.color && a.size === b.size;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const qty = Math.max(1, Math.min(99, Math.floor(item.quantity || 1)));
        set((state) => {
          const existing = state.items.find((i) => sameLine(i, item));
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, item)
                  ? { ...i, quantity: Math.min(99, i.quantity + qty) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        });
      },
      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, { productId, color, size })),
        })),
      updateQuantity: (productId, quantity, color, size) => {
        const qty = Math.max(1, Math.min(99, Math.floor(quantity)));
        set((state) => ({
          items: state.items.map((i) =>
            sameLine(i, { productId, color, size }) ? { ...i, quantity: qty } : i
          ),
        }));
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'modernshop-cart' }
  )
);
