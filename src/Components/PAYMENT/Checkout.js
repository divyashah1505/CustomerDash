import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { FiCreditCard } from 'react-icons/fi';
import { BASE_URL } from '../../config/config';
import './Checkout.css';

// ✅ Stripe Public Key (keep only ONE instance in project)
const stripePromise = loadStripe(
  'pk_test_51SzGQG1lo7Nq3ghv7JDAf30SqlJ7sG80j6DiWV1LDR1Pkt1hQvdVB9L05nuu8qWNtzi2OzxBpYsLTIIxvBB7KJUJ004GG57avG'
);

/* =========================
   Checkout Form
========================= */
const CheckoutForm = ({ clientSecret, orderData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe not ready");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setError("Card input not loaded");
        setProcessing(false);
        return;
      }

      const { error, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Customer',
            },
          },
        });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // ✅ Call backend to verify and process order instantly
        const storedToken = localStorage.getItem('clothiq_token');
        const config = storedToken ? { headers: { Authorization: `Bearer ${storedToken}` } } : {};

        try {
          await axios.post(`${BASE_URL}/madePayment`, {
            paymentIntentId: paymentIntent.id,
            orderId: orderData.order?._id,
          }, config);

          window.dispatchEvent(new Event('cartUpdated'));
        } catch (apiErr) {
          console.error("Backend verification error:", apiErr);
          // Proceed to success page anyway, as webhook will eventually handle it
        }

        navigate('/payment-success', {
          state: { orderId: orderData.order?._id }
        });
      }

    } catch (err) {
      console.error("Payment Error:", err);
      setError("Payment failed. Try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="premium-checkout-form">
      <div className="card-element-container">
        <label>Card Details</label>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#111',
                '::placeholder': { color: '#888' },
              },
              invalid: { color: '#fa755a' },
            },
          }}
        />
      </div>

      {error && <div className="payment-error">{error}</div>}

      <button
        disabled={!stripe || processing}
        className="btn-pdp-cart mt-6"
      >
        {processing ? "Processing..." : `Pay ₹${orderData.finalPayable}`}
      </button>
    </form>
  );
};

/* =========================
   Checkout Page
========================= */
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutDataFromState = location.state?.checkoutData;

  const [checkoutData, setCheckoutData] = useState(checkoutDataFromState);
  const [wallet, setWallet] = useState({ totalWithdraw_amount: 0 });
  const [useWallet, setUseWallet] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      const storedToken = localStorage.getItem('clothiq_token');
      try {
        const response = await axios.get(`${BASE_URL}/get-wallet`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
        if (response.data && response.data.success) {
          setWallet(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch wallet:', error);
      }
    };
    fetchWallet();
  }, []);

  const handleWalletToggle = async (e) => {
    const newValue = e.target.checked;
    setUseWallet(newValue);

    // We need to re-initialize order to get new clientSecret with wallet deduction
    setIsUpdating(true);
    const storedToken = localStorage.getItem('clothiq_token');
    try {
      const response = await axios.post(
        `${BASE_URL}/initialize-order`,
        {
          useWallet: newValue,
          addressId: checkoutData?.order?.addressId // Keep same address
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (response.data.success) {
        setCheckoutData(response.data);
      }
    } catch (error) {
      console.error("Re-initialization failed:", error);
      setUseWallet(!newValue); // revert
    } finally {
      setIsUpdating(false);
    }
  };

  console.log("Checkout Data:", checkoutData);

  // ❌ prevent crash
  if (!checkoutData || !checkoutData.clientSecret) {
    return (
      <div className="container py-20 text-center">
        <h2>Invalid Session</h2>
        <p>Please go back to cart and try again.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page container section">
      <h1 className="checkout-title">Secure Checkout</h1>

      <div className="checkout-layout">

        {/* ===== Stripe Payment (LEFT) ===== */}
        <div className="checkout-payment-panel">
          <div className="payment-card">
            <h3>Payment Method</h3>

            {/* Wallet Toggle Section */}
            {wallet.totalWithdraw_amount > 0 && (
              <div className="wallet-checkout-toggle">
                <div className="wallet-toggle-info">
                  <FiCreditCard size={18} />
                  <div>
                    <div className="toggle-label">Use Wallet Balance</div>
                    <div className="toggle-balance">Available: ₹{wallet.totalWithdraw_amount}</div>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={useWallet}
                    onChange={handleWalletToggle}
                    disabled={isUpdating}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            )}

            <p className="text-secondary mb-6 mt-4">
              {checkoutData.finalPayable > 0
                ? "Enter your card details to pay the remaining balance"
                : "Your wallet covers the full amount. Click below to complete order."}
            </p>

            {/* ✅ IMPORTANT FIX */}
            {checkoutData.clientSecret && checkoutData.finalPayable > 0 && (
              <Elements
                key={checkoutData.clientSecret} // Re-mount elements when secret changes
                stripe={stripePromise}
                options={{
                  clientSecret: checkoutData.clientSecret,
                  appearance: { theme: 'stripe' }
                }}
              >
                <CheckoutForm
                  clientSecret={checkoutData.clientSecret}
                  orderData={checkoutData}
                />
              </Elements>
            )}

            {checkoutData.finalPayable === 0 && (
              <button
                className="btn-pdp-cart"
                onClick={async () => {
                  // Direct success for wallet-only payment
                  navigate('/payment-success', {
                    state: { orderId: checkoutData.order?._id }
                  });
                }}
              >
                Place Order with Wallet
              </button>
            )}

            <div className="trust-footer">
              <span className="icon">🔒</span> Secure, encrypted payment processing powered by Stripe.
            </div>
          </div>
        </div>

        {/* ===== Order Summary (RIGHT) ===== */}
        <div className="checkout-details-panel">
          <div className="order-summary-card">
            <h3>Your Order</h3>

            <div className="checkout-items-list">
              {checkoutData.order?.items.map((item, idx) => (
                <div key={item._id || idx} className="checkout-item-mini">
                  <div className="checkout-item-name">
                    {item.name} <span style={{ color: '#888' }}>x {item.quantity}</span>
                    {(item.size || item.color) && (
                      <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                        {item.size && `Size: ${item.size} `}
                        {item.color && `Color: ${item.color}`}
                      </div>
                    )}
                  </div>
                  <div className="checkout-item-price">₹{item.totalItemPrice}</div>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{checkoutData.order?.cartTotal}</span>
              </div>

              {checkoutData.membershipDiscount > 0 && (
                <div className="total-row discount">
                  <span>Membership Discount</span>
                  <span>-₹{checkoutData.membershipDiscount}</span>
                </div>
              )}

              {checkoutData.promoDiscount > 0 && (
                <div className="total-row discount">
                  <span>Promo Discount</span>
                  <span>-₹{checkoutData.promoDiscount}</span>
                </div>
              )}

              <div className="total-row">
                <span>Delivery</span>
                <span>₹{checkoutData.deliveryCharge || 0}</span>
              </div>

              {checkoutData.order?.walletAmountUsed > 0 && (
                <div className="total-row wallet-deduction">
                  <span>Wallet Used</span>
                  <span>-₹{checkoutData.order.walletAmountUsed}</span>
                </div>
              )}

              <div className="total-row grand-total">
                <span>Total Payable</span>
                <span>₹{checkoutData.finalPayable}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;