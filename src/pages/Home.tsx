import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ITEMS } from "../data/items";
import type { IdolItem } from "../types/item";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    { label: "Semua", value: "Semua" },
    { label: "PhotoPack", value: "PhotoPack" },
    { label: "Lightstick", value: "Lightstick" },
    { label: "T-Shirt", value: "T-Shirt" },
    { label: "Towel", value: "Towel" },
    { label: "Acrylic", value: "Acrylic" },
  ];

  const filteredItems =
    selectedCategory === "Semua"
      ? ITEMS
      : ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="relative mb-10 overflow-hidden rounded-3xl bg-purple-500 px-6 py-10 text-white shadow-lg md:px-10 md:py-14">
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            Official Merchandise
          </p>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Lengkapi koleksi oshimu!
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-white/90 md:text-base">
            Temukan photopack dan merchandise official di sini.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-16 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </section>

      <div className="scrollbar-hide sticky top-[57px] z-40 -mx-4 mb-8 flex gap-2 overflow-x-auto bg-gray-50/90 px-4 py-3 backdrop-blur-sm md:top-[65px]">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat.value
                ? "scale-[1.02] bg-purple-500 text-white shadow-md shadow-purple-200"
                : "border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-500"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filteredItems.map((item: IdolItem) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-400">Barang di kategori ini belum tersedia :(</p>
          <button
            onClick={() => setSelectedCategory("Semua")}
            className="mt-4 font-medium text-purple-500 hover:underline"
          >
            Kembali ke Semua
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;
