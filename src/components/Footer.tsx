import { Link } from "react-router-dom";
import { ShoppingBag, ShieldCheck, Truck, RefreshCcw } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "100% Original" },
  { icon: Truck, label: "Pengiriman Aman" },
  { icon: RefreshCcw, label: "Garansi Mutu" },
];

export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-8 grid grid-cols-1 gap-6 border-b border-gray-100 pb-8 sm:grid-cols-3">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2.5 text-sm text-gray-600">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50">
                <Icon size={18} className="text-purple-500" />
              </span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link
            to="/"
            className="shrink-0 text-lg font-extrabold tracking-tight text-purple-800 sm:text-xl"
          >
            PasarIdol <span className="text-purple-500">◢</span>
          </Link>
          <p className="flex items-center gap-1.5 text-xs text-gray-400">
            <ShoppingBag size={14} />
            © {new Date().getFullYear()} PasarIdol. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};