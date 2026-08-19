import { useParams, useNavigate, Link } from "react-router-dom";
import { ITEMS } from "../data/items";
import { useCartStore } from "../store/useCartStore";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, Info, PackageCheck } from "lucide-react";
import { getGroupColors } from "../utils/groupColors";
import { ProductCard } from "../components/ProductCard";

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

  const relatedProducts = ITEMS.filter(
    (item) => item.group === product.group && item.id !== product.id
  ).slice(0, 4);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const badgeColorClass = getGroupColors(product.group);

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Official Merchandise",
      desc: "Dijamin 100% asli dari distributor resmi.",
    },
    {
      icon: Truck,
      title: "Pengiriman Aman",
      desc: "Extra bubble wrap dan kardus untuk setiap pengiriman.",
    },
    {
      icon: PackageCheck,
      title: "Kondisi Terjaga",
      desc: `Barang ${product.condition.toLowerCase()} dikemas dengan standar premium.`,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-500"
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-sm sm:p-5">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {product.condition}
            </span>
          </div>
        </div>

        <div className="flex flex-col rounded-3xl bg-white p-5 shadow-sm sm:p-8">
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

          <div className="mt-8 space-y-5 rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className="text-purple-500" size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => addItem(product)}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-purple-500 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-600 active:scale-[0.99]"
            >
              <ShoppingCart size={20} /> Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>

      <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
          <Info size={18} className="text-purple-500" />
          Detail dan Deskripsi
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base whitespace-pre-line">
          {product.description || "Belum ada deskripsi untuk produk ini"}
        </p>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">
              Produk Lain dari {product.group}
            </h2>
            <Link
              to={`/search?q=${encodeURIComponent(product.group)}`}
              className="text-sm font-semibold text-purple-500 transition hover:text-purple-600"
            >
              Lihat semua
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};