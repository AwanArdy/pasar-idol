import { CheckCircle2, X } from "lucide-react";
import { useToastStore } from "../store/useToastStore";

export const Toasts = () => {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed top-20 right-4 left-4 z-[90] flex flex-col items-center gap-2 sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-scale-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/70"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={18} className="text-green-600" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-800">{toast.message}</p>
            {toast.submessage && (
              <p className="truncate text-xs text-gray-500">{toast.submessage}</p>
            )}
          </div>
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                dismissToast(toast.id);
              }}
              className="shrink-0 text-xs font-bold text-purple-500 transition hover:text-purple-600"
            >
              {toast.action.label}
            </button>
          )}
          <button
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 text-gray-300 transition hover:text-gray-500"
            aria-label="Tutup notifikasi"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};