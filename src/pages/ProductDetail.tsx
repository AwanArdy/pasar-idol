import { useParams, useNavigate } from "react-router-dom";
import { ITEMS } from "../data/items";
import { useCartStore } from "../store/useCartStore";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import { getGroupColors } from "../utils/groupColors";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const product = ITEMS.find((item) => item.id === Number(id));

  if (!product) {
    return <div className="text-center py-20">Produk tidak ditemukan!</div>
  }

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat(
      'id-ID', 
      { 
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(price);
  }

  const badgeColorClass = getGroupColors(product.group);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-pink-500 mb-6 transition"
      >
        <ArrowLeft size={20} /> Kembali
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 rounded-3xl shadow-sm">
        {/* Gambar Produk */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informasi Produk */}
        <div className="flex flex-col">
          <span className={`${badgeColorClass} font-bold tracking-wider uppercase text-sm`}>{product.group}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mt-4">
            <span className="text-3xl font-extrabold text-gray-900">{formatRupiah(product.price)}</span>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
              Kondisi: {product.condition}
            </span>
          </div>

          <div className="mt-8 space-y-4 border-y py-6 border-gray-100">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="text-green-500" />
              <div>
                <p className="font-semibold text-sm">Official Merchandise</p>
                <p className="text-xs text-gray-500">Dijamin 100% asli dari distributor resmi.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Truck className="text-blue-500" />
              <div>
                <p className="font-semibold text-sm">Pengiriman Aman</p>
                <p className="text-xs text-gray-500">Extra bubble wrap dan kardus untuk setiap pengiriman.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 flex gap-4">
            <button 
              onClick={() => addItem(product)}
              className="flex-1 bg-purple-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-3 shadow-lg shadow-pink-200"
            >
              <ShoppingCart size={20} /> Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
