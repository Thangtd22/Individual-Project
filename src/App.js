import { useEffect, useState } from "react";
import CreateProducts from "./components/CreateProducts";
import Products, { Category } from "./components/Products";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from "./components/ProductDetail";
import EditProduct from "./components/EditProduct";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(cartFromLocalStorage);
  useEffect(() => {
    fetchCategories();
    fetchProducts();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:9999/categories");
    setCategories(response.data);
  }
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:9999/products");
    setProducts(response.data);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage cart={cart}/>} >
          <Route path="/" element={<ProductList data={products} cart={cart} setCart={setCart} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productid" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Route>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/checkout" element={<CheckOut/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
