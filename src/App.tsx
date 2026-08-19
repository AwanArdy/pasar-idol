import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { SearchResults } from "./pages/SearchResults";
import { Checkout } from "./pages/Checkout";
import { Profile } from "./pages/Profile";
import { Footer } from "./components/Footer";

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
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;