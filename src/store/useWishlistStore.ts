import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IdolItem } from "../types/item";

interface WishlistStore {
  items: IdolItem[];
  toggleWishlist: (item: IdolItem) => void;
  isWishlisted: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (item) => {
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          return {
            items: exists
              ? state.items.filter((i) => i.id !== item.id)
              : [...state.items, item],
          };
        });
      },

      isWishlisted: (id) => get().items.some((item) => item.id === id),
    }),
    { name: "idol_wishlist" }
  )
);