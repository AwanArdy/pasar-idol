import { useState, useEffect } from "react";
import type { Order } from "../types/order";
import { User, Package, Calendar, Clock, ChevronRight, LogOut } from "lucide-react";
import { getGroupColors } from "../utils/groupColors";

export const Profile = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('idol_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100 sticky top-24">
            <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <User size={40} className="text-purple-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Guest User</h2>
            <p className="text-sm text-gray-500 mb-6">Idol Collector sejak 2024</p>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                <Package size={18} />
                <span>Riwayat Belanja</span>
              </div>
              <button 
                onClick={() => alert("Fitur logout belum tersedia untuk Guest")}
                className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition"
              >
                <LogOut size={18} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="text-purple-500" /> Riwayat Pesanan
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <Package size={64} className="mx-auto text-gray-200 mb-4" />
              <h3 className="text-lg font-bold text-gray-800">Belum ada pesanan</h3>
              <p className="text-gray-500">Yuk mulai koleksi merchandise idolamu!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                  
                  {/* Header Order */}
                  <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 block text-xs">Tanggal</span>
                        <span className="font-medium flex items-center gap-1">
                          <Calendar size={14} /> {order.date}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">No. Order</span>
                        <span className="font-medium text-gray-800">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Status</span>
                        <span className="font-bold text-green-600">{order.status}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs block text-right">Total Belanja</span>
                      <span className="font-bold text-purple-600 text-lg">{formatRupiah(order.total)}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => {
                         const badgeClass = getGroupColors(item.group);
                         
                         return (
                          <div key={item.id} className="flex gap-4 items-center">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover bg-gray-100 border border-gray-100" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${badgeClass} font-bold`}>
                                  {item.group}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                              <p className="text-gray-500 text-xs mt-1">{item.quantity} barang x {formatRupiah(item.price)}</p>
                            </div>
                            
                            <button className="hidden md:block px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition">
                              Beri Ulasan
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                       <span className="text-xs text-gray-500">Metode Bayar: {order.paymentMethod}</span>
                       <button className="text-purple-500 text-sm font-medium flex items-center gap-1 hover:underline">
                         Lihat Detail Transaksi <ChevronRight size={16} />
                       </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
