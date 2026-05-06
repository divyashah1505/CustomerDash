import React, { useEffect, useState } from 'react';
import './PaymentSuccessModal.css';

const PaymentSuccessModal = ({ onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Small delay to allow CSS transitions to trigger
    setTimeout(() => setShow(true), 10);
    
    // Auto close after 8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 400); // Wait for fade out
  };

  // Generate random confetti pieces
  const confetti = Array.from({ length: 50 }).map((_, i) => {
    const randomLeft = Math.floor(Math.random() * 100);
    const randomAnimationDelay = Math.random() * 3;
    const randomColor = ['#D4AF37', '#FFD700', '#ffffff', '#000000'][Math.floor(Math.random() * 4)];
    
    return (
      <div 
        key={i} 
        className="confetti-piece"
        style={{
          left: `${randomLeft}%`,
          animationDelay: `${randomAnimationDelay}s`,
          backgroundColor: randomColor
        }}
      ></div>
    );
  });

  return (
    <div className={`payment-modal-overlay ${show ? 'show' : ''}`}>
      <div className="confetti-container">
        {confetti}
      </div>
      <div className={`payment-modal-content ${show ? 'show' : ''}`}>
        <div className="modal-icon-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h2>Payment Successful!</h2>
        <p>Your premium membership is now active. Welcome to the exclusive club!</p>
        <button className="btn-gold" onClick={handleClose}>
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
