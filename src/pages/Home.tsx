import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { CartDrawer } from '../components/CartDrawer';
import { ITEMS } from '../data/items';
import type { IdolItem } from '../types/item';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    { label: 'Semua', value: 'Semua' },
    { label: 'PhotoPack', value: 'PhotoPack' },
  //  { label: 'Single', value: 'Single' }, //
    { label: 'Lightstick', value: 'Lightstick' },
  //  { label: 'Merchandise', value: 'Merch' },
    { label: 'T-Shirt', value: 'T-Shirt' },
    { label: 'Towel', value: 'Towel'},
    { label: 'Acrylic', value: 'Acrylic' }
  ];

  const filteredItems = selectedCategory === 'Semua' 
    ? ITEMS 
    : ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <CartDrawer />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Hero */}
        <div className="bg-purple-500 rounded-2xl p-8 mb-10 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Lengkapi koleksi oshimu!</h2>
            <p className="opacity-90">Temukan photopack dan merchandise official di sini.</p>
          </div>
          {/* Hiasan background circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </div>

        {/* Filter Kategori */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat.value} 
              onClick={() => setSelectedCategory(cat.value)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${selectedCategory === cat.value
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-200 scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-500'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Produk */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item: IdolItem) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Barang di kategori ini belum tersedia :(</p>
            <button 
              onClick={() => setSelectedCategory('Semua')}
              className="mt-4 text-purple-500 hover:underline"
            >
              Kembali ke Semua
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
