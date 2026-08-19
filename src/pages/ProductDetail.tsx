import { useParams, useNavigate } from "react-router-dom";
import { ITEMS } from "../data/items";
import { useCartStore } from "../store/useCartStore";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, Info } from "lucide-react";
import { getGroupColors } from "../utils/groupColors";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const product = ITEMS.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="px-4 py-20 text-center text-gray-500">Produk tidak ditemukan!</div>
    );
  }

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const badgeColorClass = getGroupColors(product.group);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-500"
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className={`${badgeColorClass} text-sm font-bold tracking-wider uppercase`}>
              {product.group}
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                {formatRupiah(product.price)}
              </span>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600">
                Kondisi: {product.condition}
              </span>
            </div>

            <div className="mt-8 space-y-4 border-y border-gray-100 py-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 text-purple-500" size={20} />
                <div>
                  <p className="text-sm font-semibold">Official Merchandise</p>
                  <p className="text-xs text-gray-500">
                    Dijamin 100% asli dari distributor resmi.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 text-purple-500" size={20} />
                <div>
                  <p className="text-sm font-semibold">Pengiriman Aman</p>
                  <p className="text-xs text-gray-500">
                    Extra bubble wrap dan kardus untuk setiap pengiriman.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 md:mt-auto">
              <button
                onClick={() => addItem(product)}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-purple-500 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-600"
              >
                <ShoppingCart size={20} /> Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>

        <section className="mt-8 border-t border-gray-100 pt-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
            <Info size={18} />
            Detail dan Deskripsi
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base whitespace-pre-line">
            {product.description || "Belum ada deskripsi untuk produk ini"}
          </p>
        </section>
      </div>
    </main>
  );
};
