import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import CouponList from './Components/CouponList';
import AddCoupon from './Components/AddCoupon';
import ProductList from './Components/ProductList';
import AddProductForm from './Components/AddProductForm';
import EditProductForm from './Components/EditProductForm';
import Login from './Components/Login';
import Register from './Components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';




function App() {
  return (
    <Router>
  <div className="app-layout">
    <Navbar />
    <main className="content-area container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coupons" element={<CouponList />} />
        <Route path="/add-coupon" element={<AddCoupon />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<AddProductForm />} />
        <Route path="/products/edit/:id" element={<EditProductForm />} />
      </Routes>
    </main>
    <Footer />
    <ToastContainer position="top-right" autoClose={3000} />
  </div>
</Router>
  );
}

export default App;
