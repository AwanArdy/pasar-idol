import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: number;
  rating: number;
  comment: string;
  name: string;
  date: string;
}

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: [],

      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: `RV-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          date: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        };
        set((state) => ({ reviews: [newReview, ...state.reviews] }));
      },
    }),
    { name: "idol_reviews" }
  )
);