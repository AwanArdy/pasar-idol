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
  // const toggleCart = useCartStore((state) => state.toggleCart);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(item);
  };

  const badgeColorClass = getGroupColors(item.group);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Link to={`/product/${item.id}`} className="relative aspect-square overflow-hidden bg-gray-100">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {item.condition}
          </span>
        </Link>
      </div>

      {/* Info Produk */}
      <div className="p-4 flex flex-col grow">
        <p className={`text-[10px] ${badgeColorClass} font-bold mb-1`}>{item.group}</p>
        
        <Link to={`/product/${item.id}`}>
          <h3 className="font-medium text-gray-800 line-clamp-2 mb-2">
            {item.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            {formatRupiah(item.price)}
          </span>
          {/* Update Tombol Beli */}
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 text-sm bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition active:scale-95"
          >
            <ShoppingCart size={16} />
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};
