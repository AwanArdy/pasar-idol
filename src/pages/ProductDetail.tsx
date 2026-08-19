import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ITEMS } from "../data/items";
import { useCartStore } from "../store/useCartStore";
import { useToastStore } from "../store/useToastStore";
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Info,
  PackageCheck,
  Minus,
  Plus,
  ChevronRight,
  ZoomIn,
  X,
  Star,
  PenLine,
} from "lucide-react";
import { getGroupColors } from "../utils/groupColors";
import { formatRupiah } from "../utils/formatRupiah";
import { useScrollLock } from "../hooks/useScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { ProductCard } from "../components/ProductCard";
import { StarRating } from "../components/StarRating";
import { useReviewStore } from "../store/useReviewStore";
import type { IdolItem } from "../types/item";

export const ProductDetail = () => {
  const { id } = useParams();
  const product = ITEMS.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="px-4 py-20 text-center text-gray-500">Produk tidak ditemukan!</div>
    );
  }

  return <ProductDetailContent key={product.id} product={product} />;
};

const ProductDetailContent = ({ product }: { product: IdolItem }) => {
  const navigate = useNavigate();
  const addItems = useCartStore((state) => state.addItems);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const showToast = useToastStore((state) => state.showToast);
  const reviews = useReviewStore((state) => state.reviews);
  const addReview = useReviewStore((state) => state.addReview);
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const zoomRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  useScrollLock(zoomOpen || reviewOpen);
  useFocusTrap(zoomRef, zoomOpen);
  useFocusTrap(reviewRef, reviewOpen);

  useEffect(() => {
    if (!zoomOpen && !reviewOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomOpen(false);
        setReviewOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomOpen, reviewOpen]);

  const isOutOfStock = product.stock <= 0;

  const productReviews = reviews.filter((review) => review.productId === product.id);
  const avgRating =
    productReviews.length > 0
      ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
      : 0;

  const relatedProducts = ITEMS.filter(
    (item) => item.group === product.group && item.id !== product.id
  ).slice(0, 4);

  const badgeColorClass = getGroupColors(product.group);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItems(product, quantity);
    showToast(`${product.name} ×${quantity}`, "Ditambahkan ke keranjang", {
      label: "Lihat",
      onClick: toggleCart,
    });
  };

  const handleSubmitReview = () => {
    if (rating === 0) return;

    addReview({
      productId: product.id,
      rating,
      comment: comment.trim(),
      name: name.trim() || "Guest",
    });

    setReviewOpen(false);
    setRating(0);
    setComment("");
    setName("");
    showToast("Terima kasih!", "Ulasanmu berhasil ditambahkan");
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Official Merchandise",
      desc: "Dijamin 100% asli dari distributor resmi.",
    },
    {
      icon: Truck,
      title: "Pengiriman Aman",
      desc: "Extra bubble wrap dan kardus untuk setiap pengiriman.",
    },
    {
      icon: PackageCheck,
      title: "Kondisi Terjaga",
      desc: `Barang ${product.condition.toLowerCase()} dikemas dengan standar premium.`,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 pb-28 md:px-6 md:py-10 md:pb-10">
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
        <Link to="/" className="transition hover:text-purple-500">
          Beranda
        </Link>
        <ChevronRight size={12} />
        <Link to="/katalog" className="transition hover:text-purple-500">
          Katalog
        </Link>
        <ChevronRight size={12} />
        <Link
          to={`/search?q=${encodeURIComponent(product.group)}`}
          className="transition hover:text-purple-500"
        >
          {product.group}
        </Link>
        <ChevronRight size={12} />
        <span className="max-w-[160px] truncate font-medium text-gray-600 sm:max-w-xs">
          {product.name}
        </span>
      </nav>

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-500"
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-sm sm:p-5">
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-gray-100"
            aria-label="Perbesar gambar produk"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-110"
            />
            <span className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {product.condition}
            </span>
            <span className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">
              <ZoomIn size={18} />
            </span>
            {isOutOfStock && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-gray-800 shadow-lg">
                  Stok Habis
                </span>
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <span className={`${badgeColorClass} text-sm font-bold tracking-wider uppercase`}>
            {product.group}
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
              {formatRupiah(product.price)}
            </span>
            <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600">
              Kondisi: {product.condition}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                isOutOfStock ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600"
              }`}
            >
              {isOutOfStock ? "Stok Habis" : `Stok ${product.stock}`}
            </span>
          </div>

          <div className="mt-8 space-y-5 rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className="text-purple-500" size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Jumlah</span>
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-200 disabled:opacity-40"
                  disabled={quantity <= 1 || isOutOfStock}
                  aria-label="Kurangi jumlah"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-base font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, Math.min(99, q + 1)))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-200 disabled:opacity-40"
                  disabled={quantity >= product.stock || isOutOfStock}
                  aria-label="Tambah jumlah"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-purple-500 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:bg-gray-300"
            >
              <ShoppingCart size={20} />
              {isOutOfStock ? "Stok Habis" : `Tambah ${quantity > 1 ? `${quantity} ke Keranjang` : "ke Keranjang"}`}
            </button>
          </div>
        </div>
      </div>

      <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
          <Info size={18} className="text-purple-500" />
          Detail dan Deskripsi
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base whitespace-pre-line">
          {product.description || "Belum ada deskripsi untuk produk ini"}
        </p>
      </section>

      <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Star size={18} className="text-amber-400" />
            Ulasan Pembeli
          </h2>

          <button
            onClick={() => setReviewOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-purple-600 active:scale-95"
          >
            <PenLine size={15} />
            Tulis Ulasan
          </button>
        </div>

        {productReviews.length > 0 && (
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
            <span className="text-4xl font-extrabold tracking-tight text-gray-900">
              {avgRating.toFixed(1)}
            </span>
            <div>
              <StarRating value={Math.round(avgRating)} size={18} />
              <p className="mt-1 text-xs text-gray-500">
                Dari {productReviews.length} ulasan
              </p>
            </div>
          </div>
        )}

        {productReviews.length > 0 ? (
          <div className="space-y-5">
            {productReviews.map((review) => (
              <article key={review.id} className="border-b border-gray-100 pb-5 last:border-0">
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                      <p className="text-[11px] text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <StarRating value={review.rating} size={13} />
                </div>
                {review.comment && (
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.comment}</p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
            <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50">
              <PenLine size={24} className="text-purple-300" />
            </span>
            <p className="font-medium text-gray-600">Belum ada ulasan untuk produk ini.</p>
            <p className="mt-1 text-sm text-gray-400">
              Jadilah yang pertama memberikan ulasan!
            </p>
          </div>
        )}
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">
              Produk Lain dari {product.group}
            </h2>
            <Link
              to={`/search?q=${encodeURIComponent(product.group)}`}
              className="text-sm font-semibold text-purple-500 transition hover:text-purple-600"
            >
              Lihat semua
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-gray-100 bg-white/95 px-5 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md md:hidden">
        <div className="shrink-0">
          <p className="text-[11px] font-medium text-gray-400">Harga</p>
          <p className="text-lg font-extrabold tracking-tight text-gray-900">
            {formatRupiah(product.price)}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:bg-gray-300"
        >
          <ShoppingCart size={18} />
          {isOutOfStock
            ? "Stok Habis"
            : `Tambah ${quantity > 1 ? `${quantity} ke Keranjang` : "ke Keranjang"}`}
        </button>
      </div>

      {zoomOpen && (
        <div
          ref={zoomRef}
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setZoomOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau gambar"
        >
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Tutup pratinjau"
          >
            <X size={22} />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="animate-scale-in max-h-[85vh] max-w-full cursor-zoom-out rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    {reviewOpen && (
        <div
          ref={reviewRef}
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setReviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Tulis ulasan"
        >
          <div
            className="animate-scale-in w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <PenLine size={18} className="text-purple-500" />
                Tulis Ulasan
              </h3>
              <button
                onClick={() => setReviewOpen(false)}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
              <p className="text-xs font-medium text-gray-500">Produk</p>
              <p className="line-clamp-2 text-sm font-semibold text-gray-800">{product.name}</p>
            </div>

            <label className="mb-2 block text-xs font-bold text-gray-500 uppercase">
              Rating kamu
            </label>
            <div className="mb-5 flex justify-center rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
              <StarRating value={rating} onChange={setRating} size={30} />
            </div>

            <label className="mb-2 block text-xs font-bold text-gray-500 uppercase">
              Nama tampilan
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Akari"
              className="mb-4 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition placeholder:text-gray-400 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100"
            />

            <label className="mb-2 block text-xs font-bold text-gray-500 uppercase">
              Komentar
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bagaimana kualitas produknya?"
              className="mb-6 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition placeholder:text-gray-400 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100"
            />

            <button
              onClick={handleSubmitReview}
              disabled={rating === 0}
              className="w-full rounded-xl bg-purple-500 py-3.5 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
            >
              Kirim Ulasan
            </button>
          </div>
        </div>
      )}
    </main>
  );
};