import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import type { Order } from "../types/order";
import {
  User,
  Package,
  Calendar,
  Clock,
  LogOut,
  ShoppingBag,
  Wallet,
  Receipt,
} from "lucide-react";
import { getGroupColors } from "../utils/groupColors";
import { formatRupiah } from "../utils/formatRupiah";

const ORDER_STEPS = ["Diproses", "Dikirim", "Selesai"] as const;

const getDisplayStatus = (order: Order): (typeof ORDER_STEPS)[number] => {
  const timestamp = Number(order.id.replace("TRX-", ""));
  if (!Number.isFinite(timestamp)) return "Selesai";

  const ageMinutes = (Date.now() - timestamp) / 60000;
  if (ageMinutes < 2) return "Diproses";
  if (ageMinutes < 5) return "Dikirim";
  return "Selesai";
};

export const Profile = () => {
  const [orders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem("idol_orders");
      return savedOrders ? (JSON.parse(savedOrders) as Order[]) : [];
    } catch {
      return [];
    }
  });

  const totalItems = orders.reduce(
    (acc, order) => acc + order.items.reduce((a, item) => a + item.quantity, 0),
    0
  );
  const totalSpending = orders.reduce((acc, order) => acc + order.total, 0);

  const stats = [
    {
      icon: ShoppingBag,
      label: "Total Pesanan",
      value: orders.length,
    },
    {
      icon: Package,
      label: "Total Barang",
      value: totalItems,
    },
    {
      icon: Wallet,
      label: "Total Belanja",
      value: formatRupiah(totalSpending),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <div className="relative mx-auto mb-4 h-24 w-24">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-100 ring-4 ring-purple-50">
                <User size={40} className="text-purple-500" />
              </div>
              <span className="absolute right-0 bottom-0 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
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

          {orders.length > 0 && (
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                    <Icon size={19} className="text-purple-500" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-gray-400 uppercase">{label}</p>
                    <p className="truncate text-base font-extrabold text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
                <Package size={32} className="text-purple-300" />
              </span>
              <h3 className="text-lg font-bold text-gray-800">Belum ada pesanan</h3>
              <p className="mt-1 text-gray-500">Yuk mulai koleksi merchandise idolamu!</p>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => {
                const status = getDisplayStatus(order);
                const statusChipClass =
                  status === "Selesai"
                    ? "bg-green-50 text-green-600"
                    : status === "Dikirim"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-amber-50 text-amber-600";
                const statusDotClass =
                  status === "Selesai"
                    ? "bg-green-500"
                    : status === "Dikirim"
                      ? "bg-blue-500"
                      : "bg-amber-500";

                return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50 px-5 py-4 md:px-6">
                    <div className="flex flex-wrap gap-4 text-sm sm:gap-6">
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
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusChipClass}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusDotClass}`} />
                          {status}
                        </span>
                      </div>
                      <div className="flex items-center self-end">
                        {ORDER_STEPS.map((step, i) => {
                          const currentStep = ORDER_STEPS.indexOf(status);
                          const done = i <= currentStep;

                          return (
                            <Fragment key={step}>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full transition ${
                                    done ? "bg-purple-500" : "bg-gray-200"
                                  }`}
                                />
                                <span
                                  className={`text-[11px] font-medium whitespace-nowrap ${
                                    done ? "text-gray-800" : "text-gray-400"
                                  }`}
                                >
                                  {step}
                                </span>
                              </div>
                              {i < ORDER_STEPS.length - 1 && (
                                <span
                                  className={`mx-1.5 h-px w-5 ${
                                    i < currentStep ? "bg-purple-400" : "bg-gray-200"
                                  }`}
                                />
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <span className="block text-right text-xs text-gray-500">Total Belanja</span>
                      <span className="text-lg font-bold text-purple-600">
                        {formatRupiah(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
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

                            <Link
                              to={`/product/${item.id}`}
                              className="hidden rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 md:block"
                            >
                              Beri Ulasan
                            </Link>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-gray-200 pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Receipt size={14} />
                        Metode Bayar: {order.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};