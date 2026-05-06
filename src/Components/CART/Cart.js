import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { toast } from '../MODAL/Toast';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const storedToken = localStorage.getItem('clothiq_token');
    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/view-cart`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, variantId, newQuantity) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    const storedToken = localStorage.getItem('clothiq_token');
    try {
      const payload = {
        product: [{ productId, variantId, quantity: newQuantity }]
      };
      // Note: Re-using add-to-cart or a specific update-cart endpoint
      // Assuming add-to-cart with a specific quantity works as an update or increment
      await axios.post(`${BASE_URL}/add-to-cart`, payload, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      await fetchCart();
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    // Assuming there's a remove endpoint or we send quantity 0
    // For now, let's just log it or simulate if endpoint is unknown
    console.log("Removing item:", productId);
    // You would call DELETE /api/users/remove-from-cart/:productId here
  };

const handleCheckout = async () => {
  setIsProcessing(true);

  const storedToken = localStorage.getItem('clothiq_token');

  try {
    const response = await axios.post(
      `${BASE_URL}/initialize-order`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
    );

    if (response.data.success) {
      navigate('/checkout', {
        state: { checkoutData: response.data }
      });
    }

  } catch (error) {
    console.error("Checkout failed:", error);

    const msg = error.response?.data?.message;

    // ✅ THIS IS THE MAIN FIX
    if (msg === "Address Not Found") {
      toast.warn('Please add your delivery address first.');
      navigate('/add-address', { state: { from: '/cart' } });
    } else {
      toast.error(msg || 'Checkout failed. Please try again.');
    }

  } finally {
    setIsProcessing(false);
  }
};
  if (loading) {
    return (
      <div className="cart-loading text-center py-20">
        <div className="spinner"></div>
        <p>Fetching your selection...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-empty text-center py-20 container">
        <h2 className="mb-4">Your cart is empty</h2>
        <p className="text-secondary mb-8">Discover our premium collection and find your perfect fit.</p>
        <Link to="/shop" className="btn-pdp-cart" style={{ maxWidth: '300px', display: 'inline-block', textDecoration: 'none' }}>
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container section">
      <h1 className="cart-title">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items-list">
          <div className="cart-header-row">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {cart.items.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-image">
                  <img src={item.image || 'https://via.placeholder.com/100x125'} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price-unit">₹{item.price}</p>
                  {/* <button className="remove-btn" onClick={() => handleRemoveItem(item.productId)}>Remove</button> */}
                </div>
              </div>

              <div className="cart-item-quantity">
                <div className="quantity-controls small">
                  <button onClick={() => handleUpdateQuantity(item.productId, item.variantId, item.quantity - 1)} disabled={isUpdating}>−</button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={() => handleUpdateQuantity(item.productId, item.variantId, item.quantity + 1)} disabled={isUpdating}>+</button>
                </div>
              </div>

              <div className="cart-item-total">
                <span className="fw-600">₹{item.totalItemPrice}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-panel">
          <div className="summary-box">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cart.totalAmount}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cart.totalAmount}</span>
            </div>

            <button
              className={`btn-pdp-cart mt-6 ${isProcessing ? 'loading' : ''}`}
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <div className="secure-checkout-note mt-4">
              <span className="icon">🔒</span> Secure Checkout Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
