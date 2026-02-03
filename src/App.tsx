import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import { ProductDetail } from "./pages/ProductDetail";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { SearchResults } from "./pages/SearchResults";
import { Checkout } from "./pages/Checkout";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-20 font-sans">
        <CartDrawer />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
