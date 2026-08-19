# PasarIdol ◢

Frontend toko merchandise idol (photopack, lightstick, apparel, dan lainnya) berbasis React + Vite + Tailwind CSS. Demo toko fiksi untuk kolektor: jelajahi katalog, simpan wishlist, tambah ke keranjang, checkout, hingga lacak status pesanan — semuanya berjalan di browser (localStorage).

## Fitur

- **Beranda** — hero banner, trust strip, dan katalog produk
- **Katalog & Pencarian** — filter kategori & grup, urutkan harga, muat lebih banyak; pencarian real-time dengan saran
- **Detail Produk** — pemilih jumlah, zoom gambar, ulasan & rating bintang, produk terkait
- **Keranjang** — drawer dengan stepper jumlah & total otomatis
- **Wishlist** — simpan favorit (persist di `localStorage`)
- **Checkout** — alamat + validasi nomor HP, QRIS / Virtual Account, simulasi proses bayar
- **Profil** — statistik belanja, riwayat pesanan dengan stepper status (Diproses → Dikirim → Selesai) yang berubah mengikuti waktu

Semua data (pesanan, ulasan, wishlist) disimpan di `localStorage` dengan key `idol_orders`, `idol_reviews`, `idol_wishlist`.

## Teknologi

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Zustand (state management + persist)
- React Router v7
- lucide-react (ikon)

## Menjalankan

```bash
npm install
npm run dev        # development server
npm run build      # tsc + build produksi ke dist/
npm run lint       # eslint
npm run preview    # pratinjau hasil build
```

## Struktur

```
src/
  components/   Navbar, ProductCard, CartDrawer, ProductBrowser, Toasts, ...
  pages/        Home, Catalog, Wishlist, ProductDetail, SearchResults, Checkout, Profile
  store/        Zustand stores (cart, wishlist, reviews, toasts)
  data/         items.ts (30 produk demo, semua stok 46)
  types/        item.ts, order.ts
  hooks/        useScrollLock, useFocusTrap
  utils/        formatRupiah, groupColors
```