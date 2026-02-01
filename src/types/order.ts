import type { CartItem } from "../store/useCartStore";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Diproses' | 'Dikirim' | 'Selesai';
  paymentMethod: string;
}
