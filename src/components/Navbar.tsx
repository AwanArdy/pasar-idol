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

  // Search
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IdolItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = ITEMS.filter(item =>
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

  // handle enter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/search?query=${query}`);
    }
  };

  const formatRupiah = (price: number) => new Intl.NumberFormat(
    'id-ID', 
    {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }
  ).format(price);

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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-800 flex-shrink-0">PasarIdol ◢</Link> 

        {/* Search Bar */}
        <div className="flex-1 max-w-lg relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400 group-focus-within:text-purple-600 transition" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowDropdown(true)}
              placeholder="Cari barang disini"
              className="w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:bg-white transition border-transparent focus:border-purple-300"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Live Search */}
          {showDropdown && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 overflow-hidden z-50 animate-fade-in-down">
              <div className="max-h-[70vh] overflow-y-auto">
                {results.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 p-3 hover:bg-purple-50 transition border-b border-gray-50 last:border-none"
                  >
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover bg-gray-200"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-purple-500">{item.group}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-600 whitespace-nowrap">
                      {formatRupiah(item.price)}
                    </span>
                  </Link>
                ))}
              </div>

              {results.length > 5 && (
                <div
                  onClick={() => {
                    setShowDropdown(false);
                    navigate(`/search?q=${query}`);
                  }}
                  className="bg-gray-50 p-3 text-center text-sm text-purple-600 font-medium cursor-pointer hover:bg-gray-100 transition"  
                >
                  Lihat {results.length} hasil pencarian "{query}"
                </div>
              )}
            </div>
          )}

          {showDropdown && results.length === 0 && query && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-center text-gray-500 text-sm">
              Tidak ditemukan hasil untuk "{query}"
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
        {/* Menu */}
        <button
          onClick={toggleCart}
          className="relative p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ShoppingBag size={24} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        {/* Profil */}
        <Link
          to="/profile"
          className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600 hover:text-purple-500"
          title="Profil Saya"
        >
          <User size={24} />
        </Link>
        </div>
      </div>
    </nav>
  );
}
