import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <h1>Cart app</h1>
          <Link to="/" style={{ marginRight: "10px" }}>
            Products
          </Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
