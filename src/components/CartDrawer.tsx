import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export const CartDrawer = () => {
  const {
    isOpen,
    toggleCart,
    items,
    removeItem,
    getTotalPrice
  } = useCartStore();

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop (Background gelap) */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col animate-slide-in">
        
        {/* Header */}
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Keranjang Belanja</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-200 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p>Keranjangmu masih kosong nih.</p>
              <p className="text-sm">Yuk cari merch oshi mu!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                  <p className="text-purple-500 text-sm font-medium mt-1">{formatRupiah(item.price)}</p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Total */}
        {items.length > 0 && (
          <div className="p-5 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total</span>
              <span className="text-xl font-bold text-purple-600">{formatRupiah(getTotalPrice())}</span>
            </div>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-200">
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
