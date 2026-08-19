import { Link } from "react-router-dom";
import type { IdolItem } from "../types/item";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { getGroupColors } from "../utils/groupColors";

interface Props {
  item: IdolItem;
}

export const ProductCard = ({ item }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(item);
  };

  const badgeColorClass = getGroupColors(item.group);

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
        </Link>

        <button
          onClick={handleAddToCart}
          className="absolute right-2.5 bottom-2.5 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-gray-900/90 text-white opacity-0 shadow-lg backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-purple-600 active:scale-90 sm:h-10 sm:w-10"
          aria-label={`Tambah ${item.name} ke keranjang`}
        >
          <ShoppingCart size={16} />
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
          <span className="text-sm font-bold tracking-tight text-gray-900 sm:text-base">
            {formatRupiah(item.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-2.5 py-2 text-xs font-medium text-white transition hover:bg-purple-600 active:scale-95 sm:hidden"
            aria-label={`Tambah ${item.name} ke keranjang`}
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};