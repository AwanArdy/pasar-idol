import { useState, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Wallet, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import type { Order } from "../types/order";

export const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("qris");

  const subTotal = getTotalPrice();
  const shippingCost = 15000;
  const adminFee = 2500;
  const total = subTotal + shippingCost + adminFee;

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      navigate("/");
    }
  }, [items, navigate, isSuccess]);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `TRX-${Date.now()}`,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        items: [...items],
        total: total,
        status: "Selesai",
        paymentMethod: paymentMethod === "qris" ? "QRIS" : "Virtual Account",
      };

      const existingOrders = JSON.parse(localStorage.getItem("idol_orders") || "[]");

      localStorage.setItem("idol_orders", JSON.stringify([newOrder, ...existingOrders]));

      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 3000);
  };

  const fieldClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100";

  return (
    <div className="relative px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-500"
        >
          <ArrowLeft size={18} /> Kembali ke Toko
        </button>
        <h1 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
          Checkout & Pembayaran
        </h1>

        <form onSubmit={handlePayment} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold">
                <MapPin className="text-purple-500" size={20} /> Alamat Pengiriman
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500">Nama Penerima</label>
                  <input required type="text" className={fieldClass} placeholder="Contoh: Akari" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500">Nomor HP</label>
                  <input required type="tel" className={fieldClass} placeholder="0812..." />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500">Alamat Lengkap</label>
                  <textarea
                    required
                    rows={3}
                    className={fieldClass}
                    placeholder="Jalan, No. Rumah, Kecamatan, Kota"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold">
                <CreditCard className="text-purple-500" size={20} /> Metode Pembayaran
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 transition ${
                    paymentMethod === "qris"
                      ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="qris"
                    className="hidden"
                    checked={paymentMethod === "qris"}
                    onChange={() => setPaymentMethod("qris")}
                  />
                  <Wallet
                    size={24}
                    className={paymentMethod === "qris" ? "text-purple-500" : "text-gray-400"}
                  />
                  <span className="text-sm font-semibold">QRIS</span>
                </label>

                <label
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 transition ${
                    paymentMethod === "va"
                      ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="va"
                    className="hidden"
                    checked={paymentMethod === "va"}
                    onChange={() => setPaymentMethod("va")}
                  />
                  <CreditCard
                    size={24}
                    className={paymentMethod === "va" ? "text-purple-500" : "text-gray-400"}
                  />
                  <span className="text-sm font-semibold">Virtual Account</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Ringkasan Pesanan</h2>

              <div className="custom-scrollbar mb-4 max-h-60 space-y-3 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <img
                      src={item.image}
                      className="h-12 w-12 shrink-0 rounded-lg bg-gray-100 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x {formatRupiah(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal Produk</span>
                  <span>{formatRupiah(subTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Pengiriman</span>
                  <span>{formatRupiah(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Layanan</span>
                  <span>{formatRupiah(adminFee)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-dashed border-gray-300 pt-3">
                  <span className="font-bold text-gray-900">Total Tagihan</span>
                  <span className="text-lg font-bold text-purple-600">{formatRupiah(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 py-3.5 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {(isProcessing || isSuccess) && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-scale-in w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
            {isProcessing ? (
              <div className="flex flex-col items-center py-6">
                <Loader2 size={48} className="mb-4 animate-spin text-purple-500" />
                <h3 className="text-xl font-bold text-gray-800">Memproses Pembayaran</h3>
                <p className="mt-2 text-sm text-gray-500">Mohon jangan tutup halaman ini...</p>
                <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="animate-progress-bar h-full bg-purple-500" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Pembayaran Berhasil!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Terima kasih sudah berbelanja. Paketmu akan segera kami siapkan.
                </p>

                <div className="mt-6 w-full">
                  <button
                    onClick={() => navigate("/")}
                    className="w-full rounded-xl bg-gray-900 py-3 font-medium text-white transition hover:bg-black"
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
