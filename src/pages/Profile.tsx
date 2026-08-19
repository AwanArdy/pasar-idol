import { useState, useEffect } from "react";
import type { Order } from "../types/order";
import { User, Package, Calendar, Clock, ChevronRight, LogOut } from "lucide-react";
import { getGroupColors } from "../utils/groupColors";

export const Profile = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("idol_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-purple-100">
              <User size={40} className="text-purple-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Guest User</h2>
            <p className="mb-6 text-sm text-gray-500">Idol Collector sejak 2024</p>

            <div className="space-y-2 text-left">
              <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-3 text-sm font-medium text-purple-700">
                <Package size={18} />
                <span>Riwayat Belanja</span>
              </div>
              <button
                onClick={() => alert("Fitur logout belum tersedia untuk Guest")}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-sm text-gray-600 transition hover:bg-gray-50"
              >
                <LogOut size={18} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
            <Clock className="text-purple-500" /> Riwayat Pesanan
          </h1>

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <Package size={56} className="mx-auto mb-4 text-gray-200" />
              <h3 className="text-lg font-bold text-gray-800">Belum ada pesanan</h3>
              <p className="mt-1 text-gray-500">Yuk mulai koleksi merchandise idolamu!</p>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <span className="mb-0.5 block text-xs text-gray-500">Tanggal</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar size={14} /> {order.date}
                        </span>
                      </div>
                      <div>
                        <span className="mb-0.5 block text-xs text-gray-500">No. Order</span>
                        <span className="font-medium text-gray-800">{order.id}</span>
                      </div>
                      <div>
                        <span className="mb-0.5 block text-xs text-gray-500">Status</span>
                        <span className="font-bold text-green-600">{order.status}</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-right text-xs text-gray-500">Total Belanja</span>
                      <span className="text-lg font-bold text-purple-600">
                        {formatRupiah(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => {
                        const badgeClass = getGroupColors(item.group);

                        return (
                          <div key={item.id} className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded-xl border border-gray-100 bg-gray-100 object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <span
                                className={`mb-1 inline-block rounded-md border border-gray-100 px-1.5 py-0.5 text-[10px] font-bold ${badgeClass}`}
                              >
                                {item.group}
                              </span>
                              <h4 className="line-clamp-1 text-sm font-medium text-gray-800">
                                {item.name}
                              </h4>
                              <p className="mt-1 text-xs text-gray-500">
                                {item.quantity} barang x {formatRupiah(item.price)}
                              </p>
                            </div>

                            <button className="hidden rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium transition hover:bg-gray-50 md:block">
                              Beri Ulasan
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-dashed border-gray-200 pt-4">
                      <span className="text-xs text-gray-500">
                        Metode Bayar: {order.paymentMethod}
                      </span>
                      <button className="flex items-center gap-1 text-sm font-medium text-purple-500 hover:underline">
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
  );
};
