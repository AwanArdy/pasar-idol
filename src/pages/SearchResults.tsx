import { useSearchParams } from "react-router-dom";
import { ITEMS } from "../data/items";
import { ProductCard } from "../components/ProductCard";
import { SearchX } from "lucide-react";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredItems = ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.group.toLowerCase().includes(query.toLowerCase())
  );

  return (
   <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Hasil pencarian untuk: <span className="text-pink-500">"{query}"</span>
      </h2>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <SearchX size={64} className="mb-4 text-gray-300" />
          <p className="text-lg">Maaf, tidak ada barang yang cocok.</p>
          <p className="text-sm">Coba kata kunci lain seperti nama grup atau member.</p>
        </div>
      )}
    </div> 
  )
}
