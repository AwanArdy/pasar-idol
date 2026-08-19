import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Toasts } from "./components/Toasts";

const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ProductDetail = lazy(() =>
  import("./pages/ProductDetail").then((m) => ({ default: m.ProductDetail }))
);
const SearchResults = lazy(() =>
  import("./pages/SearchResults").then((m) => ({ default: m.SearchResults }))
);
const Checkout = lazy(() =>
  import("./pages/Checkout").then((m) => ({ default: m.Checkout }))
);
const Profile = lazy(() =>
  import("./pages/Profile").then((m) => ({ default: m.Profile }))
);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-dvh flex-col bg-gray-50 font-sans text-gray-900">
        <CartDrawer />
        <Toasts />
        <Navbar />

        <main className="flex-1">
          <Suspense
            fallback={
              <div className="flex min-h-[60dvh] items-center justify-center">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-purple-500" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/katalog" element={<Catalog />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;