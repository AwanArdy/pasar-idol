import { Link, useNavigate } from "react-router-dom";
import type { IdolItem } from "../types/item";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useToastStore } from "../store/useToastStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { getGroupColors } from "../utils/groupColors";
import { formatRupiah } from "../utils/formatRupiah";

interface Props {
  item: IdolItem;
}

export const ProductCard = ({ item }: Props) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const showToast = useToastStore((state) => state.showToast);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) =>
    state.items.some((i) => i.id === item.id)
  );

  const handleAddToCart = () => {
    if (item.stock <= 0) return;
    addItem(item);
    showToast(item.name, "Ditambahkan ke keranjang", {
      label: "Lihat",
      onClick: toggleCart,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(item);
    const wasWishlisted = isWishlisted;
    showToast(
      item.name,
      wasWishlisted ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
      wasWishlisted
        ? undefined
        : { label: "Lihat", onClick: () => navigate("/wishlist") }
    );
  };

  const badgeColorClass = getGroupColors(item.group);
  const isOutOfStock = item.stock <= 0;

  return (
    <article className="group card-hover flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/product/${item.id}`} className="block h-full w-full">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
          <span className="absolute top-2.5 left-2.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {item.condition}
          </span>
          {isOutOfStock && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-gray-800 shadow-lg">
                Stok Habis
              </span>
            </span>
          )}
        </Link>

        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            className="absolute right-2.5 bottom-2.5 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-gray-900/90 text-white opacity-0 shadow-lg backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-purple-600 active:scale-90 sm:h-10 sm:w-10 sm:translate-y-0 sm:opacity-100 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            aria-label={`Tambah ${item.name} ke keranjang`}
          >
            <ShoppingCart size={16} />
          </button>
        )}

        <button
          onClick={handleToggleWishlist}
          className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:scale-110 active:scale-90"
          aria-label={isWishlisted ? `Hapus ${item.name} dari favorit` : `Tambah ${item.name} ke favorit`}
        >
          <Heart
            size={15}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            }
          />
        </button>
      </div>

      <div className="flex grow flex-col p-3.5 sm:p-4">
        <p className={`mb-1 text-[10px] font-bold tracking-wide uppercase ${badgeColorClass}`}>
          {item.group}
        </p>

        <Link to={`/product/${item.id}`}>
          <h3 className="mb-3 line-clamp-2 min-h-10 text-sm leading-snug font-medium text-gray-800 transition group-hover:text-purple-600 sm:text-[15px]">
            {item.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="min-w-0">
            <span className="block text-sm font-bold tracking-tight text-gray-900 sm:text-base">
              {formatRupiah(item.price)}
            </span>
            <span
              className={`mt-0.5 block text-[11px] font-medium ${
                isOutOfStock ? "text-red-500" : "text-gray-400"
              }`}
            >
              {isOutOfStock ? "Stok habis" : `Stok ${item.stock}`}
            </span>
          </div>
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-2.5 py-2 text-xs font-medium text-white transition hover:bg-purple-600 active:scale-95 md:hidden"
              aria-label={`Tambah ${item.name} ke keranjang`}
            >
              <ShoppingCart size={15} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};