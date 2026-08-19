import { useWishlistStore } from "../store/useWishlistStore";
import { ProductCard } from "../components/ProductCard";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function Wishlist() {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-widest text-gray-400 uppercase">
        <Heart size={13} className="text-red-400" /> Favorit
      </p>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
          Wishlist Saya
        </h1>
        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
          {items.length} barang
        </span>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white py-20 text-gray-400">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
            <Heart size={30} className="text-purple-300" />
          </span>
          <p className="text-lg font-medium text-gray-500">Wishlist-mu masih kosong nih.</p>
          <p className="mt-1 text-sm">Tekan ikon hati di produk untuk menyimpannya.</p>
          <Link
            to="/katalog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-purple-200 transition hover:bg-purple-600 active:scale-95"
          >
            <ShoppingBag size={16} />
            Jelajahi Katalog
          </Link>
        </div>
      )}
    </div>
  );
}

export default Wishlist;