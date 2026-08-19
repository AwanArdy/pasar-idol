import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ITEMS } from "../data/items";
import { ArrowUpDown, ChevronDown } from "lucide-react";

type SortOption = "relevance" | "price-asc" | "price-desc";

const CATEGORIES = ["Semua", ...Array.from(new Set(ITEMS.map((item) => item.category)))];
const GROUPS = ["Semua Grup", ...Array.from(new Set(ITEMS.map((item) => item.group)))];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Paling Relevan" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
];

const PAGE_SIZE = 8;

export const ProductBrowser = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedGroup, setSelectedGroup] = useState<string>("Semua Grup");
  const [sort, setSort] = useState<SortOption>("relevance");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredItems = useMemo(() => {
    let items = [...ITEMS];

    if (selectedCategory !== "Semua") {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (selectedGroup !== "Semua Grup") {
      items = items.filter((item) => item.group === selectedGroup);
    }
    if (sort === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [selectedCategory, selectedGroup, sort]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const isFiltered = selectedCategory !== "Semua" || selectedGroup !== "Semua Grup";

  const applyCategory = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const applyGroup = (group: string) => {
    setSelectedGroup(group);
    setVisibleCount(PAGE_SIZE);
  };

  const applySort = (value: SortOption) => {
    setSort(value);
    setVisibleCount(PAGE_SIZE);
  };

  const resetFilters = () => {
    setSelectedCategory("Semua");
    setSelectedGroup("Semua Grup");
    setSort("relevance");
    setVisibleCount(PAGE_SIZE);
  };

  const chipClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
      active
        ? "scale-[1.02] bg-purple-500 text-white shadow-md shadow-purple-200"
        : "border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-500"
    }`;

  return (
    <div>
      <div className="scrollbar-hide sticky top-[112px] z-40 -mx-4 mb-6 space-y-3 bg-gray-50/90 px-4 py-3 backdrop-blur-sm md:top-[73px] md:mx-0 md:px-0">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => applyCategory(cat)}
              className={chipClass(selectedCategory === cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="scrollbar-hide flex min-w-0 flex-1 gap-2 overflow-x-auto">
            {GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => applyGroup(group)}
                className={chipClass(selectedGroup === group)}
              >
                {group}
              </button>
            ))}
          </div>

          <label className="relative flex shrink-0 items-center">
            <ArrowUpDown
              size={15}
              className="pointer-events-none absolute left-3 text-gray-400"
            />
            <select
              value={sort}
              onChange={(e) => applySort(e.target.value as SortOption)}
              className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2 pr-8 pl-9 text-sm font-medium text-gray-600 transition focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100"
              aria-label="Urutkan produk"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">
          {selectedCategory === "Semua" ? "Katalog Produk" : `Kategori ${selectedCategory}`}
        </h2>
        <span className="text-xs font-medium text-gray-400">{filteredItems.length} barang</span>
      </div>

      {filteredItems.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:gap-6">
            {visibleItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          {filteredItems.length > visibleCount && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:border-purple-300 hover:text-purple-600 active:scale-95"
              >
                Muat Lebih Banyak
                <ChevronDown size={16} />
              </button>
              <span className="text-xs text-gray-400">
                Menampilkan {Math.min(visibleCount, filteredItems.length)} dari{" "}
                {filteredItems.length} barang
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-400">
            {isFiltered
              ? "Tidak ada barang yang cocok dengan filter kamu :("
              : "Barang di kategori ini belum tersedia :("}
          </p>
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="mt-4 font-medium text-purple-500 hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
};