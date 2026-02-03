import { useState, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Wallet, Truck, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import type { Order } from "../types/order";

export const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('qris');

  const subTotal = getTotalPrice();
  const shippingCost = 15000;
  const adminFee = 2500;
  const total = subTotal + shippingCost + adminFee;

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      navigate('/');
    }
  }, [items, navigate, isSuccess]);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat(
      'id-ID',
      {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }
    ).format(price);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `TRX-${Date.now()}`,
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        }),
        items: [...items],
        total: total,
        status: 'Selesai',
        paymentMethod: paymentMethod === 'qris' ? 'QRIS' : 'Virtual Account'
      };

      const existingOrders = JSON.parse(localStorage.getItem('idol_orders') || '[]');

      localStorage.setItem('idol_orders', JSON.stringify([newOrder, ...existingOrders]))

      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-purple-500 mb-6 font-medium">
          <ArrowLeft size={20} /> Kembali ke Toko
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout & Pembayaran</h1>

        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI: FORM PENGIRIMAN --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Alamat */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <MapPin className="text-purple-500" size={20} /> Alamat Pengiriman
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Nama Penerima</label>
                  <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition" placeholder="Contoh: Akari" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Nomor HP</label>
                  <input required type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition" placeholder="0812..." />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-500">Alamat Lengkap</label>
                  <textarea required rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition" placeholder="Jalan, No. Rumah, Kecamatan, Kota" />
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <CreditCard className="text-purple-500" size={20} /> Metode Pembayaran
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Opsi QRIS */}
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition ${paymentMethod === 'qris' ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="qris" className="hidden" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} />
                  <Wallet size={24} className={paymentMethod === 'qris' ? 'text-purple-500' : 'text-gray-400'} />
                  <span className="text-sm font-semibold">QRIS</span>
                </label>

                {/* Opsi Virtual Account */}
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition ${paymentMethod === 'va' ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="va" className="hidden" checked={paymentMethod === 'va'} onChange={() => setPaymentMethod('va')} />
                  <CreditCard size={24} className={paymentMethod === 'va' ? 'text-purple-500' : 'text-gray-400'} />
                  <span className="text-sm font-semibold">Virtual Account</span>
                </label>
              </div>
            </div>
          </div>

          {/* --- KOLOM KANAN: RINGKASAN --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Ringkasan Pesanan</h2>
              
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <img src={item.image} className="w-12 h-12 rounded bg-gray-100 object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <p className="line-clamp-1 font-medium">{item.name}</p>
                      <p className="text-gray-500 text-xs">{item.quantity} x {formatRupiah(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
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
                <div className="flex justify-between border-t border-dashed border-gray-300 pt-3 mt-2">
                  <span className="font-bold text-gray-900">Total Tagihan</span>
                  <span className="font-bold text-purple-600 text-lg">{formatRupiah(total)}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
              </button>
            </div>
          </div>
        </form>

      </div>

      {(isProcessing || isSuccess) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in">
            
            {isProcessing ? (
              // Tampilan Loading
              <div className="flex flex-col items-center py-6">
                <Loader2 size={48} className="text-purple-500 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-gray-800">Memproses Pembayaran</h3>
                <p className="text-gray-500 text-sm mt-2">Mohon jangan tutup halaman ini...</p>
                <div className="mt-6 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-purple-500 animate-progress-bar"></div>
                </div>
              </div>
            ) : (
              // Tampilan Sukses
              <div className="flex flex-col items-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Pembayaran Berhasil!</h3>
                <p className="text-gray-500 text-sm mt-2">Terima kasih sudah berbelanja. Paketmu akan segera kami siapkan.</p>
                
                <div className="mt-6 space-y-3 w-full">
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-black transition"
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
  )
}
