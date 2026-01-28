import { create } from "zustand";
import type { IdolItem } from "../types/item";
  
export interface CartItem extends IdolItem {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: IdolItem) => void;
  removeItem: (id: number) => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
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
}));
