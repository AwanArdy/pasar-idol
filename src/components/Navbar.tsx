import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Search, X, User, TrendingUp } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { ITEMS } from "../data/items";
import type { IdolItem } from "../types/item";

export const Navbar = () => {
  const itemsInCart = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const totalItems = itemsInCart.reduce((acc, item) => acc + item.quantity, 0);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IdolItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.group.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const formatRupiah = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const groupedResults = (results: IdolItem[]) => {
    const groups: Record<string, IdolItem[]> = {};
    results.forEach((item) => {
      (groups[item.group] ||= []).push(item);
    });
    return Object.entries(groups);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-shadow duration-300 ${
        scrolled
          ? "border-gray-100 bg-white/90 shadow-sm shadow-gray-100/60 backdrop-blur-md"
          : "border-transparent bg-white/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3 md:flex-nowrap md:gap-x-6">
          <Link
            to="/"
            className="shrink-0 text-lg font-extrabold tracking-tight text-purple-800 sm:text-xl"
          >
            PasarIdol <span className="text-purple-500">◢</span>
          </Link>

          <div
            className="relative order-3 w-full basis-full md:order-none md:basis-auto md:flex-1 md:max-w-xl md:mx-auto"
            ref={searchRef}
          >
            <form onSubmit={handleSearchSubmit} className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                <Search
                  size={18}
                  className="text-gray-400 transition group-focus-within:text-purple-600"
                />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setShowDropdown(true)}
                placeholder="Cari barang, grup, atau member"
                className="w-full rounded-full border border-transparent bg-gray-100 py-2.5 pl-10 pr-10 text-sm transition placeholder:text-gray-400 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 transition hover:text-gray-600"
                  aria-label="Hapus pencarian"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {showDropdown && results.length > 0 && (
              <div className="animate-fade-in-down absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/70">
                <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {groupedResults(results).map(([group, items]) => (
                    <div key={group} className="p-1.5">
                      <p className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        {group}
                      </p>
                      {items.slice(0, 5).map((item) => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-purple-50"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-11 w-11 shrink-0 rounded-lg bg-gray-100 object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-purple-500">{item.condition}</p>
                          </div>
                          <span className="shrink-0 text-xs font-semibold text-gray-600">
                            {formatRupiah(item.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>

                {results.length > 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                    }}
                    className="flex w-full items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 p-3 text-center text-sm font-medium text-purple-600 transition hover:bg-gray-100"
                  >
                    <TrendingUp size={15} />
                    Lihat {results.length} hasil pencarian "{query}"
                  </button>
                )}
              </div>
            )}

            {showDropdown && results.length === 0 && query && (
              <div className="animate-fade-in-down absolute top-full right-0 left-0 mt-2 rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-500 shadow-xl shadow-gray-100/70">
                <p className="font-medium text-gray-700">Tidak ditemukan hasil untuk "{query}"</p>
                <p className="mt-1 text-xs text-gray-400">Coba kata kunci lain, ya!</p>
              </div>
            )}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              onClick={toggleCart}
              className="relative rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-purple-600"
              aria-label="Keranjang belanja"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-500 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              to="/profile"
              className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-purple-500"
              title="Profil Saya"
              aria-label="Profil Saya"
            >
              <User size={22} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};