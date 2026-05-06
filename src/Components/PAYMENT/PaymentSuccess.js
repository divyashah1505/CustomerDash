import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // 🎉 Trigger confetti animation
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b26afff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
    });

    // Redirect to dashboard after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    // Countdown interval
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="payment-success-container">
      <div className="success-card">
        <div className="success-icon-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">
          Welcome to the club. Your premium membership is now active.
        </p>
        <div className="redirect-message">
          Redirecting to your dashboard in <span>{countdown}</span> seconds...
        </div>
        <button className="btn-primary success-btn" onClick={() => navigate('/dashboard')}>
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
