import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ITEMS } from "../data/items";
import { ProductCard } from "../components/ProductCard";
import { SearchX, ArrowUpDown } from "lucide-react";

type SortOption = "relevance" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Paling Relevan" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
];

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("query") || "";
  const [sort, setSort] = useState<SortOption>("relevance");

  const filteredItems = useMemo(() => {
    const items = ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.group.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <p className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
        Pencarian
      </p>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">
          Hasil untuk <span className="text-purple-500">"{query}"</span>
        </h2>
        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
          {filteredItems.length} barang
        </span>
      </div>

      {filteredItems.length > 0 && (
        <div className="mb-5 flex justify-end">
          <label className="relative flex items-center">
            <ArrowUpDown size={15} className="pointer-events-none absolute left-3 text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2 pr-8 pl-9 text-sm font-medium text-gray-600 transition focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100"
              aria-label="Urutkan hasil pencarian"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white py-20 text-gray-400">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
            <SearchX size={32} className="text-purple-300" />
          </span>
          <p className="text-lg font-medium text-gray-500">Maaf, tidak ada barang yang cocok.</p>
          <p className="mt-1 text-sm">Coba kata kunci lain seperti nama grup atau member.</p>
        </div>
      )}
    </div>
  );
};