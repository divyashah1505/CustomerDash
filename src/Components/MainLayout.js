import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import { useAuth } from '../context/AuthContext';
import './MainLayout.css';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);

  const fetchCartCount = async () => {
    const storedToken = localStorage.getItem('clothiq_token');
    if (!storedToken) {
      setCartCount(0);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/view-cart`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      if (response.data.success && response.data.data) {
        const items = response.data.data.items || [];
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();

    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setCartCount(0);
    navigate('/');
  };

  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" className="nav-brand">CLOTHIQ</Link>

          <div className="nav-links">
            {/* <Link to="/shop">Shop</Link> */}
            <Link to="/plans">Membership</Link>
            <Link to="/dashboard">Account</Link>
          </div>

          <div className="nav-actions">
            {user ? (
              <div className="user-dropdown-container" ref={dropdownRef}>
                <button
                  className="user-dropdown-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user.username} <span className="dropdown-arrow">▼</span>
                </button>

                {dropdownOpen && (
                  <div className="user-dropdown-menu">
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                    {/* <Link to="/dashboard/orders" onClick={() => setDropdownOpen(false)}>Order History</Link> */}
                    <button
                      onClick={() => { setDropdownOpen(false); handleLogout(); }}
                      className="logout-btn"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Sign In</Link>
            )}
            <Link to="/cart" className="cart-icon-container">
              <div className="cart-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>CLOTHIQ</h3>
            <p>Elevating everyday essentials for the modern man.</p>
          </div>
          <div className="footer-links">
            <div className="link-col">
              <h4>Shop</h4>
              <Link to="/shop">All Products</Link>
              <Link to="/shop?category=originals">Originals</Link>
              <Link to="/shop?category=luxe">Luxe Collection</Link>
            </div>
            <div className="link-col">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom container">
          <p>&copy; 2026 Clothiq. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
