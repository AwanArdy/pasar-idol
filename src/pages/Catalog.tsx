import { ProductBrowser } from "../components/ProductBrowser";
import { LayoutGrid } from "lucide-react";

function Catalog() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <div className="mb-6">
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-widest text-gray-400 uppercase">
          <LayoutGrid size={13} /> Katalog
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
          Semua Produk
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Jelajahi semua merchandise official dari ketiga grup.
        </p>
      </div>

      <ProductBrowser />
    </main>
  );
}

export default Catalog;