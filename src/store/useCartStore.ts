import { create } from "zustand";
import type { IdolItem } from "../types/item";

export interface CartItem extends IdolItem {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: IdolItem) => void;
  addItems: (item: IdolItem, quantity: number) => void;
  decrementItem: (id: number) => void;
  removeItem: (id: number) => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product) => {
    set((state) => {
      if (product.stock <= 0) return state;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
              : item
          ),
        };
      } else {
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
    });
  },

  addItems: (product, quantity) => {
    set((state) => {
      if (product.stock <= 0 || quantity <= 0) return state;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: Math.min(quantity, product.stock) }],
      };
    });
  },

  decrementItem: (id) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return state;

      if (existingItem.quantity <= 1) {
        return { items: state.items.filter((item) => item.id !== id) };
      }

      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  clearCart: () => set({ items: [] }),
}));