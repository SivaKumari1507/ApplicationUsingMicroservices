
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import CouponList from './Components/CouponList';
import AddCouponForm from './Components/AddCouponForm';
import ProductList from './Components/ProductList';
import AddProductForm from './Components/AddProductForm';
import EditProductForm from './Components/EditProductForm';
import ProductDetails from './Components/ProductDetails';
import Login from './Components/Login';
import Register from './Components/Register';
import CartPage from './Components/CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useAuth } from './Context/AuthContext';
import { getCart } from './services/cartService';

const App = () => {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user) return;

      const userId = user?.id || user?.email || user?.userId;
      try {
        const response = await getCart(userId);
        setCartCount(response.data.result.cartDetails.length);
      } catch (err) {
        console.error('Failed to fetch cart count:', err);
      }
    };

    fetchCartCount();
  }, [user]); // Runs whenever user logs in

  return (
    <Router>
      <div className="app-layout">
        <Navbar cartCount={cartCount} />
        <main className="content-area container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/coupons" element={<CouponList />} />
            <Route path="/add-coupon" element={<AddCouponForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProductForm />} />
            <Route path="/products/edit/:id" element={<EditProductForm />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={<CartPage setCartCount={setCartCount} />}
            />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </Router>
  );
};

export default App;
/* import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import CouponList from './Components/CouponList';
import AddCouponForm from './Components/AddCouponForm';
import ProductList from './Components/ProductList';
import AddProductForm from './Components/AddProductForm';
import EditProductForm from './Components/EditProductForm';
import ProductDetails from './Components/ProductDetails';
import Login from './Components/Login';
import Register from './Components/Register';
import CartPage from './Components/CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [userId] = useState('user123@gmail.com'); 
  const [cartCount, setCartCount] = useState(0);
  return (
    <Router>
      <div className="app-layout">
        <Navbar cartCount={cartCount} />
        <main className="content-area container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/coupons" element={<CouponList />} />
            <Route path="/add-coupon" element={<AddCouponForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProductForm />} />
            <Route path="/products/edit/:id" element={<EditProductForm />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={<CartPage userId={userId} setCartCount={setCartCount} />}
            />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </Router>
  );
};

export default App; */