import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LogIn from './Components/LOGIN/LogIn';
import SignUp from './Components/SIGNUP/SignUp';
import Home from './Components/HOME/Home';
import Shop from './Components/SHOP/Shop';
import Category from './Components/HOME/PopularCategories/Category';
import ProductDetail from './Components/PRODUCT/ProductDetail';
import Dashboard from './Components/DASHBOARD/Dashboard';
import Plans from './Components/PLANS/Plans';
import PaymentSuccess from './Components/PAYMENT/PaymentSuccess';
import Cart from './Components/CART/Cart';
import CheckoutWrapper from './Components/PAYMENT/CheckoutWrapper';
import ForgotPassword from './Components/PASSWORD/ForgotPassword';
import ResetPassword from './Components/PASSWORD/ResetPassword';
import MainLayout from './Components/MainLayout';
import loadingGif from './Components/IMAGES/giphy4.gif';
import { AuthProvider } from './context/AuthContext';
import AddAddress from "./Components/ADDRESS/AddAddress";
import ToastProvider from './Components/MODAL/Toast';

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <ToastProvider />
      <Router>
        {isLoading ? (
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={loadingGif} alt="Loading..." style={{ width: '100px', height: '100px' }} />
            <span style={{ marginTop: '1rem', fontWeight: 600 }}>
              Preparing your premium experience...
            </span>
          </div>
        ) : (
          <div className="app-container">
            <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/add-address" element={<AddAddress />} />
                {/* ✅ IMPORTANT CHANGE */}
                <Route path="/checkout" element={<CheckoutWrapper />} />

                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </div>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;