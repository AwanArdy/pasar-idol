import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const navigate = useNavigate();

  const { isOpen, toggleCart, items, removeItem, getTotalPrice } = useCartStore();

  const handleCheckout = () => {
    toggleCart();
    navigate("/checkout");
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
      />

      <div className="animate-slide-in absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Keranjang Belanja</h2>
            <p className="text-xs text-gray-500">
              {items.length === 0
                ? "Belum ada barang"
                : `${items.reduce((acc, item) => acc + item.quantity, 0)} barang`}
            </p>
          </div>
          <button
            onClick={toggleCart}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
            aria-label="Tutup keranjang"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <ShoppingBag size={28} className="text-gray-300" />
              </div>
              <p className="font-medium text-gray-500">Keranjangmu masih kosong nih.</p>
              <p className="mt-1 text-sm">Yuk cari merch oshi mu!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl bg-gray-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">{item.name}</h3>
                  <p className="mt-1 text-sm font-medium text-purple-500">{formatRupiah(item.price)}</p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                      Qty: {item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 transition hover:text-red-500"
                      aria-label={`Hapus ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Total</span>
              <span className="text-xl font-bold text-purple-600">{formatRupiah(getTotalPrice())}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full rounded-xl bg-purple-500 py-3 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-600"
            >
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
