import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Search, X, User } from "lucide-react";
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

  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

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

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-3 md:grid-cols-[auto_1fr_auto]">
          <Link
            to="/"
            className="shrink-0 text-lg font-extrabold tracking-tight text-purple-800 sm:text-xl"
          >
            PasarIdol <span className="text-purple-500">◢</span>
          </Link>

          <div
            className="order-3 col-span-2 w-full md:order-none md:col-span-1 md:mx-auto md:max-w-lg"
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
              <div className="animate-fade-in-down absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                <div className="max-h-[70vh] overflow-y-auto">
                  {results.slice(0, 5).map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 border-b border-gray-50 p-3 transition last:border-none hover:bg-purple-50"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg bg-gray-200 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-purple-500">{item.group}</p>
                      </div>
                      <span className="whitespace-nowrap text-xs font-semibold text-gray-600">
                        {formatRupiah(item.price)}
                      </span>
                    </Link>
                  ))}
                </div>

                {results.length > 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                    }}
                    className="w-full bg-gray-50 p-3 text-center text-sm font-medium text-purple-600 transition hover:bg-gray-100"
                  >
                    Lihat {results.length} hasil pencarian "{query}"
                  </button>
                )}
              </div>
            )}

            {showDropdown && results.length === 0 && query && (
              <div className="animate-fade-in-down absolute top-full right-0 left-0 mt-2 rounded-2xl border border-gray-100 bg-white p-4 text-center text-sm text-gray-500 shadow-lg">
                Tidak ditemukan hasil untuk "{query}"
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-1">
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
