import React, { useState } from 'react';
import { FiX, FiStar, FiArrowRight, FiInfo } from 'react-icons/fi';

const WithdrawModal = ({ isOpen, onClose, onConfirm, currentPoints }) => {
  const [points, setPoints] = useState(500);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setErrorMsg('');
    if (points < 500) {
      setErrorMsg('Minimum withdrawal is 500 points.');
      return;
    }
    if (points > currentPoints) {
      setErrorMsg('Insufficient points balance.');
      return;
    }
    setLoading(true);
    await onConfirm(points);
    setLoading(false);
  };

  const estimatedAmount = (points / 10).toFixed(2);

  return (
    <div className="modal-overlay">
      <div className="modal-content withdraw-modal">
        <button className="modal-close" onClick={onClose}>
          <FiX size={20} />
        </button>

        <div className="withdraw-header">
          <div className="withdraw-icon-wrapper">
            <FiStar size={24} fill="#c9a84c" color="#c9a84c" />
          </div>
          <h3>Withdraw Reward Points</h3>
          <p>Convert your Clothiq points into wallet balance.</p>
        </div>

        <div className="withdraw-body">
          <div className="points-balance-info">
            <span>Available Balance:</span>
            <strong>{currentPoints} Points</strong>
          </div>

          <div className="withdraw-input-group">
            <label>Points to Withdraw (Min. 500)</label>
            <div className="input-with-label">
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                min="500"
              />
              <span className="unit">PTS</span>
            </div>
          </div>

          <div className="conversion-preview">
            <div className="preview-row">
              <span>Points to Convert</span>
              <strong>{points} PTS</strong>
            </div>
            <div className="preview-divider">
              <FiArrowRight />
            </div>
            <div className="preview-row result">
              <span>Wallet Credit</span>
              <strong>₹{estimatedAmount}</strong>
            </div>
          </div>

          <div className="withdraw-note">
            <FiInfo size={14} />
            <p>10 points = ₹1. Withdrawal subject to membership limits.</p>
          </div>

          {/* Inline validation error */}
          {errorMsg && (
            <div style={{
              marginTop: '10px', padding: '10px 14px', borderRadius: '8px',
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              ❌ {errorMsg}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleConfirm}
            disabled={loading || points < 500 || points > currentPoints}
          >
            {loading ? "Processing..." : "Request Withdrawal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
