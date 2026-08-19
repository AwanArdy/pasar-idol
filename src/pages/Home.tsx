import { ProductBrowser } from "../components/ProductBrowser";
import { ITEMS } from "../data/items";
import { Sparkles, ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const trustItems = [
    { icon: ShieldCheck, label: "100% Original" },
    { icon: Truck, label: "Extra Bubble Wrap" },
    { icon: Package, label: "Sealed & Aman" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <section className="relative overflow-hidden rounded-3xl bg-purple-500 px-6 py-10 text-white shadow-lg md:px-12 md:py-16">
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-sm">
            <Sparkles size={13} />
            Official Merchandise
          </p>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Lengkapi koleksi oshimu!
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-white/90 md:text-base">
            Temukan photopack dan merchandise official dari grup favoritmu dengan harga bersahabat.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/katalog"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-600 shadow-md transition hover:bg-purple-50 active:scale-95"
            >
              Jelajahi Katalog
              <ArrowRight size={16} />
            </Link>
            <span className="text-sm text-white/80">
              {ITEMS.length}+ produk tersedia
            </span>
          </div>
        </div>

        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-40 bottom-0 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-10 right-10 hidden h-32 w-32 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm md:block" />
        <div className="absolute right-28 bottom-16 hidden h-20 w-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm md:block" />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {trustItems.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
              <Icon size={18} className="text-purple-500" />
            </span>
            <span className="text-sm font-semibold text-gray-700">{label}</span>
          </div>
        ))}
      </section>

      <div id="katalog" className="mt-10 md:mt-12">
        <ProductBrowser />
      </div>

      <section className="mt-12 overflow-hidden rounded-3xl bg-white p-8 text-center shadow-sm md:p-10">
        <Link to="/profile" className="group inline-flex flex-col items-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 transition group-hover:bg-purple-100">
            <Sparkles size={26} className="text-purple-500" />
          </span>
          <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
            Sudah pernah checkout?
          </h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
            Cek riwayat pesanan dan status pengirimanmu di halaman profil.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-500 transition group-hover:gap-2.5">
            Buka Profil <ArrowRight size={15} />
          </span>
        </Link>
      </section>
    </main>
  );
}

export default Home;