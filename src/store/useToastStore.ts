import { create } from "zustand";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: number;
  message: string;
  submessage?: string;
  action?: ToastAction;
}

interface ToastStore {
  toasts: Toast[];
  showToast: (message: string, submessage?: string, action?: ToastAction) => void;
  dismissToast: (id: number) => void;
}

let toastId = 0;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  showToast: (message, submessage, action) => {
    const id = ++toastId;

    set((state) => ({
      toasts: [...state.toasts.slice(-2), { id, message, submessage, action }],
    }));

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },

  dismissToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));