import { X, Trash2, ShoppingBag, Minus, Plus } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const navigate = useNavigate();

  const { isOpen, toggleCart, items, addItem, decrementItem, removeItem, getTotalPrice } =
    useCartStore();

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

        <div className="flex-1 space-y-4 overflow-y-auto p-5 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-50">
                <ShoppingBag size={32} className="text-purple-300" />
              </div>
              <p className="font-medium text-gray-600">Keranjangmu masih kosong nih.</p>
              <p className="mt-1 text-sm text-gray-400">Yuk cari merch oshi mu!</p>
              <button
                onClick={toggleCart}
                className="mt-6 rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-purple-200 transition hover:bg-purple-600 active:scale-95"
              >
                Mulai Belanja
              </button>
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
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 text-gray-300 transition hover:text-red-500"
                      aria-label={`Hapus ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-medium text-purple-500">
                    {formatRupiah(item.price)}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1">
                      <button
                        onClick={() => decrementItem(item.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-200"
                        aria-label={`Kurangi jumlah ${item.name}`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addItem(item)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-200"
                        aria-label={`Tambah jumlah ${item.name}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
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
              className="w-full rounded-xl bg-purple-500 py-3 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-600 active:scale-[0.99]"
            >
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
};