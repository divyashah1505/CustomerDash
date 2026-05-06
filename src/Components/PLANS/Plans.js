import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { useAuth } from '../../context/AuthContext';
import PaymentSuccessModal from '../MODAL/PaymentSuccessModal';
import ConfirmationModal from '../MODAL/ConfirmationModal';
import { toast } from '../MODAL/Toast';
import './Plans.css';

// ── Helper: safely compare two IDs (handles ObjectId objects, strings, undefined) ──
const isSameId = (a, b) => {
  if (!a || !b) return false;
  return String(a) === String(b);
};

// ── Modal shown when user tries to join a plan while one is already active ──────
const ActivePlanModal = ({ isOpen, activePlanName, onClose }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
    }}>
      <div style={{
        background: 'var(--bg-card, #1e1e2e)', borderRadius: '18px',
        padding: '40px 32px', maxWidth: '460px', width: '100%',
        boxShadow: '0 28px 70px rgba(0,0,0,0.6)', textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ fontSize: '52px', marginBottom: '14px' }}>⚠️</div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary, #fff)' }}>
          Active Plan Detected
        </h3>
        <p style={{ color: 'var(--text-secondary, #bbb)', lineHeight: 1.7, marginBottom: '10px' }}>
          You currently have an active{' '}
          <strong style={{ color: '#f59e0b' }}>{activePlanName}</strong> membership.
        </p>
        <p style={{ color: 'var(--text-secondary, #bbb)', lineHeight: 1.7, marginBottom: '30px' }}>
          To switch to a different plan, please{' '}
          <strong style={{ color: '#ef4444' }}>cancel your current subscription</strong> first.
          Your unused days will be{' '}
          <strong style={{ color: '#22c55e' }}>refunded to your wallet</strong> automatically.
        </p>
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', border: 'none', borderRadius: '12px',
            padding: '13px 32px', fontSize: '1rem', fontWeight: 600,
            cursor: 'pointer', width: '100%'
          }}
        >
          Got it — I'll cancel first
        </button>
      </div>
    </div>
  );
};

// ── Main Plans Component ──────────────────────────────────────────────────────────
const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPlanId, setProcessingPlanId] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [activePlanModal, setActivePlanModal] = useState({ open: false, planName: '' });

  const { user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Fetch the user's active subscription ──
  const fetchActiveSubscription = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${BASE_URL}/mySubscription`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data?.success) {
        console.log('[Plans] Active subscription:', response.data.data);
        setActiveSubscription(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch active subscription:', err);
    }
  }, [token]);

  // ── Check for ?payment=success redirect from Stripe & activate membership ──
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('payment') === 'success') {
      setShowPaymentSuccess(true);
      const sessionId = queryParams.get('session_id');
      window.history.replaceState({}, document.title, '/plans');

      const activateAndRefresh = async () => {
        if (sessionId && token) {
          try {
            console.log('[Plans] Verifying session:', sessionId);
            await axios.get(`${BASE_URL}/verifySubscription?sessionId=${sessionId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            console.log('[Plans] Membership activated ✅');
          } catch (err) {
            console.warn('[Plans] verifySubscription warning:', err.response?.data?.message || err.message);
          }
        }
        await fetchActiveSubscription();
      };

      activateAndRefresh();
    }
  }, [location, fetchActiveSubscription, token]);

  // ── Fetch plans list + active subscription on mount ──
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getSubscriptionDetails`);
        if (response.data?.success) setPlans(response.data.data);
      } catch (err) {
        console.error('Error fetching subscription details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
    fetchActiveSubscription();
  }, [fetchActiveSubscription]);

  // ── Determine if a plan card matches the user's active subscription ──
  const isPlanActive = (plan) => {
    if (!activeSubscription) return false;
    const memId = activeSubscription.membership_id;
    if (memId && typeof memId === 'object') return isSameId(memId._id, plan._id);
    return isSameId(memId, plan._id);
  };

  // ── Cancel subscription flow ──
  const handleCancelSubscriptionClick = () => setShowCancelModal(true);

  const confirmCancelSubscription = async () => {
    setShowCancelModal(false);
    try {
      setProcessingPlanId('cancel');
      const response = await axios.delete(`${BASE_URL}/cancelsubscription`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const refundAmount = response.data?.walletRefundAmount || '0.00';
      toast.success(
        `Membership cancelled! ₹${refundAmount} has been credited to your wallet.`,
        5000
      );
      setActiveSubscription(null);
    } catch (err) {
      console.error('Error canceling subscription:', err);
      const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to cancel membership. Please try again.';
      toast.error(msg);
    } finally {
      setProcessingPlanId(null);
    }
  };

  // ── Join / Switch plan flow ──
  const handleJoinPlan = async (memberShipId) => {
    if (!user || !token) {
      toast.info('Please log in to purchase a membership.');
      navigate('/login');
      return;
    }

    try {
      setProcessingPlanId(memberShipId);
      const response = await axios.post(
        `${BASE_URL}/paymentInitate`,
        {
          memberShipId,
          successUrl: `${window.location.origin}/plans?payment=success`,
          cancelUrl: `${window.location.origin}/plans`
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.status === 'success' && response.data?.data?.url) {
        window.location.href = response.data.data.url;
      } else {
        toast.error('Failed to initiate payment. Please try again.');
        setProcessingPlanId(null);
      }
    } catch (err) {
      const errData = err.response?.data;
      const errMsg = errData?.message || '';
      if (errData?.code === 'ACTIVE_MEMBERSHIP' || errMsg === 'Already have an active membership') {
        setActivePlanModal({ open: true, planName: errData?.activePlanName || 'your current plan' });
      } else {
        toast.error(errMsg || 'An error occurred. Please try again.');
      }
      setProcessingPlanId(null);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="plans-page container section">
      {showPaymentSuccess && (
        <PaymentSuccessModal onClose={() => setShowPaymentSuccess(false)} />
      )}

      <ActivePlanModal
        isOpen={activePlanModal.open}
        activePlanName={activePlanModal.planName}
        onClose={() => setActivePlanModal({ open: false, planName: '' })}
      />

      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancel Membership?"
        message="Are you sure you want to cancel your premium membership? Your unused days will be calculated and refunded to your Clothiq wallet automatically."
        confirmText="Yes, Cancel & Refund to Wallet"
        cancelText="Keep Membership"
        onConfirm={confirmCancelSubscription}
        onCancel={() => setShowCancelModal(false)}
      />

      <div className="plans-header">
        <h1>Clothiq Memberships</h1>
        <p>Elevate your wardrobe and enjoy exclusive perks with our premium plans.</p>
      </div>

      {loading ? (
        <div className="loading-state text-center" style={{ padding: '60px', color: 'var(--text-secondary)' }}>
          <p>Loading subscription plans...</p>
        </div>
      ) : (
        <div className="plans-grid">
          {plans.map((plan, index) => {
            const isPopular = plan.name.toLowerCase().includes('gold') || index === 1;
            const isActivePlan = isPlanActive(plan);

            const features = [
              `${plan.discount_percent}% flat discount on orders`,
              `Minimum order amount: ₹${plan.min_order_amount}`,
              `Max discount limit: ${plan.max_discount_limit}%`,
              ...(plan.free_delivery ? [`Free delivery on orders above ₹${plan.free_delivery_min_amount}`] : []),
              `Earn ${plan.rewards?.first_order_points || 0} points on your first order!`
            ];

            return (
              <div key={plan._id} className={`plan-card ${isPopular ? 'popular' : ''}`}>
                {isPopular && <div className="plan-badge">Best Value</div>}

                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">
                  <span className="amount">₹{plan.price}</span>
                  <span className="period">/ {plan.duration_months} months</span>
                </div>
                <p className="plan-desc">Exclusive perks and rewards for our {plan.name} members.</p>

                <ul className="plan-features">
                  {features.map((feat, idx) => (
                    <li key={idx}><span className="check">✓</span> {feat}</li>
                  ))}
                </ul>

                {isActivePlan ? (
                  <div>
                    <div style={{
                      // textAlign: 'center', marginBottom: '10px',
                      // padding: '7px 14px', borderRadius: '8px',
                      // background: 'rgba(34,197,94,0.13)',
                      // color: '#22c55e', fontSize: '0.85rem', fontWeight: 600
                    }}>
                      {/* ✅ Your Active Plan */}
                    </div>
                    <button
                      className="btn-outline"
                      onClick={handleCancelSubscriptionClick}
                      disabled={processingPlanId !== null}
                      style={{ width: '100%', color: '#ef4444', borderColor: '#ef4444' }}
                    >
                      {processingPlanId === 'cancel' ? 'Canceling...' : 'Cancel Subscription'}
                    </button>
                    <p style={{
                      fontSize: '0.74rem', color: 'var(--text-secondary, #888)',
                      textAlign: 'center', marginTop: '8px', lineHeight: 1.5
                    }}>
                      Unused days refunded to your wallet
                    </p>
                  </div>
                ) : (
                  <button
                    className={`btn-primary plan-btn ${plan.name.toLowerCase().includes('platinum') || plan.name.toLowerCase().includes('black') ? 'btn-black' : ''} ${isPopular ? 'btn-gold' : ''}`}
                    onClick={() => handleJoinPlan(plan._id)}
                    disabled={processingPlanId !== null}
                  >
                    {processingPlanId === plan._id
                      ? 'Processing...'
                      : activeSubscription
                        ? `Switch to ${plan.name.split(' ')[0]}`
                        : `Join ${plan.name.split(' ')[0]}`}
                  </button>
                )}
              </div>
            );
          })}

          {plans.length === 0 && (
            <p className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
              No plans available at the moment.
            </p>
          )}
        </div>
      )}

      <div className="plans-faq">
        <h3 className="text-center" style={{ marginBottom: '32px' }}>Frequently Asked Questions</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Can I cancel anytime?</h4>
            <p>Yes! All Clothiq memberships can be cancelled at any time. Unused days are automatically refunded to your wallet.</p>
          </div>
          <div className="faq-item">
            <h4>Where does my refund go?</h4>
            <p>When you cancel, the pro-rata refund for unused days is instantly credited to your Clothiq wallet — ready to use on your next order.</p>
          </div>
          <div className="faq-item">
            <h4>Can I switch plans?</h4>
            <p>Yes! Cancel your current plan first — the unused amount goes to your wallet — then purchase the new plan you'd like.</p>
          </div>
          <div className="faq-item">
            <h4>When do discounts apply?</h4>
            <p>Your membership discounts are applied automatically at checkout once you are logged in with an active membership.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
