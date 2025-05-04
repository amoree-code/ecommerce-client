import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Router>
        <Routes>
          <Route path="/" element={!user ? <Register /> : <Home />} />
          <Route
            path="/products/:category"
            element={!user ? <Register /> : <ProductList />}
          />
          <Route
            path="/product/:id"
            element={!user ? <Register /> : <Product />}
          />

          <Route path="/cart" element={!user ? <Register /> : <Cart />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          {/* <Route path="/login" element={user ? <Home /> : <Login />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
