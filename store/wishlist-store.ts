'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  ids: number[];
  toggle: (id: number) => boolean;
  add: (id: number) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const exists = get().ids.includes(id);
        set((state) => ({
          ids: exists ? state.ids.filter((x) => x !== id) : [...state.ids, id],
        }));
        return !exists;
      },
      add: (id) => set((state) => (state.ids.includes(id) ? state : { ids: [...state.ids, id] })),
      remove: (id) => set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: 'modernshop-wishlist' }
  )
);
