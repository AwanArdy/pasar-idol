import { useSearchParams } from "react-router-dom";
import { ITEMS } from "../data/items";
import { ProductCard } from "../components/ProductCard";
import { SearchX } from "lucide-react";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("query") || "";

  const filteredItems = ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.group.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <p className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
        Pencarian
      </p>
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-800">
        Hasil untuk <span className="text-purple-500">"{query}"</span>
      </h2>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white py-20 text-gray-400">
          <SearchX size={56} className="mb-4 text-gray-300" />
          <p className="text-lg font-medium text-gray-500">Maaf, tidak ada barang yang cocok.</p>
          <p className="mt-1 text-sm">Coba kata kunci lain seperti nama grup atau member.</p>
        </div>
      )}
    </div>
  );
};
