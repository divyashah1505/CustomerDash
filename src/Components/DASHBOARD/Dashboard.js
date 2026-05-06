import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BASE_URL } from '../../config/config';
import { useAuth } from '../../context/AuthContext';
import ConfirmationModal from '../MODAL/ConfirmationModal';
import { toast } from '../MODAL/Toast';
import {
  FiUser, FiShoppingBag, FiStar, FiHeart, FiLogOut, FiEdit2,
  FiMail, FiPhone, FiPackage, FiArrowRight, FiShield, FiSave, FiX, FiCreditCard, FiInfo
} from 'react-icons/fi';
import WithdrawModal from '../MODAL/WithdrawModal';
import ChangePasswordModal from '../MODAL/ChangePasswordModal';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSubscription, setActiveSubscription] = useState(null);
  const [loadingSub, setLoadingSub] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [wallet, setWallet] = useState({ totalReward_Points: 0, totalWithdraw_amount: 0 });
  const [loadingWallet, setLoadingWallet] = useState(true);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    mobile: user?.mobile || ''
  });

  const userInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'G';

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        setLoadingProfile(true);
        const response = await axios.get(`${BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && response.data.success) {
          setUserProfile(response.data.data);
          setEditData({
            username: response.data.data.username || '',
            email: response.data.data.email || '',
            mobile: response.data.data.mobile || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [token]);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${BASE_URL}/mySubscription`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && response.data.success) {
          setActiveSubscription(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
      } finally {
        setLoadingSub(false);
      }
    };
    if (activeTab === 'subscriptions') fetchSubscription();
  }, [activeTab, token]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        setLoadingOrders(true);
        const response = await axios.get(`${BASE_URL}/order-history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch order history:', error);
      } finally {
        setLoadingOrders(false);
      }
    };
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab, token]);

  useEffect(() => {
    const fetchWallet = async () => {
      if (!token) return;
      try {
        setLoadingWallet(true);
        const response = await axios.get(`${BASE_URL}/get-wallet`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && response.data.success) {
          setWallet(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch wallet:', error);
      } finally {
        setLoadingWallet(false);
      }
    };
    if (activeTab === 'wallet') fetchWallet();
  }, [activeTab, token]);

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      const response = await axios.put(`${BASE_URL}/update`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Profile updated successfully!');
        setUserProfile(response.data.data);
        setIsEditingProfile(false);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelSubscriptionClick = () => setShowCancelModal(true);

  const confirmCancelSubscription = async () => {
    setShowCancelModal(false);
    try {
      const response = await axios.delete(`${BASE_URL}/cancelsubscription`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const refundAmount = response.data?.walletRefundAmount || '0.00';
      toast.success(`Membership cancelled! ₹${refundAmount} has been credited to your wallet.`, 5000);
      setActiveSubscription(null);
    } catch (error) {
      console.error('Error canceling subscription:', error);
      const msg = error.response?.data?.message || error.response?.data?.error || 'Failed to cancel membership.';
      toast.error(msg);
    }
  };

  const handleWithdrawRequest = async (pointsToWithdraw) => {
    try {
      const response = await axios.post(`${BASE_URL}/withDrawByUser`,
        { pointsToWithdraw },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data) {
        toast.success('Withdrawal request submitted! Points will be credited to your wallet.');
        setShowWithdrawModal(false);
        // Refresh profile to update points balance
        const profRes = await axios.get(`${BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (profRes.data && profRes.data.success) {
          setUserProfile(profRes.data.data);
        }
        // Refresh wallet
        const walletRes = await axios.get(`${BASE_URL}/get-wallet`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (walletRes.data && walletRes.data.success) {
          setWallet(walletRes.data.data);
        }
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast.error(error.response?.data?.error || 'Failed to submit withdrawal request.');
    }
  };

  const generateInvoice = (order) => {
    const doc = new jsPDF();
    const orderId = `#ORD-${order._id.slice(-6).toUpperCase()}`;
    const date = new Date(order.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    const pageWidth = 210;
    const margin = 14;

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 45, 'F');

    doc.setTextColor(212, 175, 55);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('CLOTHIQ', margin, 22);

    doc.setTextColor(180, 190, 210);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setCharSpace(1.5);
    doc.text('PREMIUM E-COMMERCE', margin + 1, 30);
    doc.setCharSpace(0);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', pageWidth - margin, 22, { align: 'right' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(212, 175, 55);
    doc.text(orderId, pageWidth - margin, 30, { align: 'right' });

    doc.setFillColor(212, 175, 55);
    doc.rect(0, 45, pageWidth, 2, 'F');

    let y = 60;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text('BILL TO:', margin, y);

    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(user?.username || 'Customer', margin, y + 6);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(user?.email || '', margin, y + 12);
    if (order.shippingAddress) {
      const splitAddress = doc.splitTextToSize(order.shippingAddress, 80);
      doc.text(splitAddress, margin, y + 17);
    }

    const rightColX = pageWidth - margin - 65;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text('ORDER DETAILS:', rightColX, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('Date:', rightColX, y + 6);
    doc.setTextColor(15, 23, 42);
    doc.text(date, rightColX + 20, y + 6);

    doc.setTextColor(71, 85, 105);
    doc.text('Payment:', rightColX, y + 12);
    doc.setTextColor(15, 23, 42);
    doc.text(order.paymentMethod === 2 ? 'Pending (COD)' : 'Paid', rightColX + 20, y + 12);

    const tableBody = order.items.map(item => {
      let description = item.name;
      const extras = [];
      if (item.size) extras.push(`Size: ${item.size}`);
      if (item.color) extras.push(`Color: ${item.color}`);
      if (extras.length > 0) description += `\n(${extras.join(', ')})`;
      return [
        description,
        item.quantity.toString(),
        `INR ${Number(item.price || 0).toFixed(2)}`,
        `INR ${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}`
      ];
    });

    autoTable(doc, {
      startY: 85,
      head: [['Item Description', 'Qty', 'Unit Price', 'Total']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10, halign: 'left' },
      styles: { fontSize: 10, cellPadding: 5, textColor: [51, 65, 85], lineColor: [226, 232, 240], lineWidth: 0.1 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      columnStyles: {
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right', fontStyle: 'bold', textColor: [15, 23, 42] }
      },
      margin: { left: margin, right: margin }
    });

    const finalY = doc.lastAutoTable.finalY || 85;
    const panelW = 80;
    const panelX = pageWidth - margin - panelW;
    let rowY = finalY + 10;

    const cartTotal = order.cartTotal || 0;
    const memDiscount = order.membershipDiscount || 0;
    const promoDiscount = order.discountAmount || 0;
    const delivery = order.deliveryCharge || order.delivercharge || 0;
    const payable = order.payableAmount || (cartTotal - memDiscount - promoDiscount + delivery) || 0;

    const rows = [
      ['Subtotal', cartTotal],
      ['Membership Discount', -memDiscount],
      ['Promo Discount', -promoDiscount],
      ['Delivery Charge', delivery]
    ];

    doc.setFontSize(10);
    rows.forEach(([label, val]) => {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(label, panelX, rowY);
      const isNeg = val < 0;
      doc.setTextColor(isNeg ? 220 : 15, isNeg ? 38 : 23, isNeg ? 38 : 42);
      doc.text(`INR ${Number(val).toFixed(2)}`, panelX + panelW, rowY, { align: 'right' });
      rowY += 7;
    });

    doc.setDrawColor(226, 232, 240);
    doc.line(panelX, rowY - 3, panelX + panelW, rowY - 3);

    doc.setFillColor(248, 250, 252);
    doc.rect(panelX, rowY, panelW, 10, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Total Payable', panelX + 3, rowY + 7);
    doc.text(`INR ${Number(payable).toFixed(2)}`, panelX + panelW - 3, rowY + 7, { align: 'right' });

    const noteY = finalY + 15;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(148, 163, 184);
    doc.text('Notes:', margin, noteY);
    doc.setFont('helvetica', 'normal');
    doc.text('Payment is due upon delivery for COD orders.', margin, noteY + 5);
    doc.text('For support: support@clothiq.com', margin, noteY + 10);

    const footerY = 280;
    doc.setFillColor(15, 23, 42);
    doc.rect(0, footerY, pageWidth, 17, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('CLOTHIQ', margin, footerY + 11);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('Thank you for shopping with us!', pageWidth / 2, footerY + 11, { align: 'center' });
    doc.text('www.clothiq.com', pageWidth - margin, footerY + 11, { align: 'right' });

    doc.save(`Clothiq_Invoice_${orderId}.pdf`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="premium-dash-card fade-in">
            <div className="dash-card-header">
              <div>
                <h3>Personal Information</h3>
                <p>Manage your personal details and account security.</p>
              </div>
              {!isEditingProfile ? (
                <button className="btn-edit-profile" onClick={() => setIsEditingProfile(true)}>
                  <FiEdit2 size={14} /> Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-outline-small" onClick={() => setIsEditingProfile(false)} disabled={savingProfile}>
                    <FiX size={14} /> Cancel
                  </button>
                  <button className="btn-primary-small" onClick={handleSaveProfile} disabled={savingProfile}>
                    <FiSave size={14} /> {savingProfile ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            <div className="profile-form-grid">
              <div className="premium-input-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    readOnly={!isEditingProfile}
                  />
                </div>
              </div>

              <div className="premium-input-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    readOnly={!isEditingProfile}
                  />
                </div>
              </div>

              <div className="premium-input-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <FiPhone className="input-icon" />
                  <input
                    type="tel"
                    value={editData.mobile}
                    onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
                    readOnly={!isEditingProfile}
                    placeholder="E.g. +91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div className="account-security-section">
              <h4>Account Security</h4>
              <div className="security-item">
                <div className="security-info">
                  <div className="icon-wrapper">
                    <FiShield size={18} />
                  </div>
                  <div>
                    <h5>Password</h5>
                    <p>Keep your account safe by updating your password regularly.</p>
                  </div>
                </div>
                <button
                  className="btn-outline-small"
                  onClick={() => setShowChangePasswordModal(true)}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="premium-dash-card fade-in">
            <div className="dash-card-header">
              <div>
                <h3>Order History</h3>
                <p>Track, return, or purchase items again.</p>
              </div>
            </div>

            {loadingOrders ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>Loading your orders…</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="premium-orders-list">
                {orders.map(order => {
                  const date = new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  });
                  const statusObj =
                    order.status === 1
                      ? { text: 'Processing', cls: 'status-processing' }
                      : order.status === 2
                        ? { text: 'Delivered', cls: 'status-delivered' }
                        : { text: 'Pending', cls: 'status-pending' };

                  const isCOD = order.paymentMethod === 2;
                  const paymentText = isCOD ? 'Payment: Pending (COD)' : 'Payment: Done';
                  const paymentCls = isCOD ? 'payment-pending' : 'payment-Done';

                  const itemsText =
                    order.items?.map(i => `${i.name} (x${i.quantity})`).join(', ') || 'Various items';

                  return (
                    <div key={order._id} className="premium-order-item">
                      <div className="p-order-header">
                        <div className="p-order-id-date">
                          <div className="p-icon-box"><FiPackage size={16} /></div>
                          <div>
                            <strong>#ORD-{order._id.slice(-6).toUpperCase()}</strong>
                            <span>{date}</span>
                          </div>
                        </div>
                        <div className="order-badges">
                          <span className={paymentCls}>{paymentText}</span>
                          <span className={`p-order-status ${statusObj.cls}`}>{statusObj.text}</span>
                        </div>
                      </div>

                      <div className="p-order-body">
                        <div className="p-order-products">
                          <p>{itemsText}</p>
                        </div>
                        <div className="p-order-price">
                          <span>Total Amount</span>
                          <strong>₹{order.payableAmount || order.cartTotal}</strong>
                        </div>
                      </div>

                      <div className="p-order-actions">
                        <button className="btn-text" onClick={() => generateInvoice(order)}>
                          View Invoice
                        </button>
                        <button className="btn-primary-small">
                          Track Order <FiArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="premium-empty-state">
                <div className="empty-icon-wrapper"><FiShoppingBag size={36} /></div>
                <h4>No orders yet</h4>
                <p>Discover our latest collection and start shopping.</p>
                <Link to="/shop" className="btn-primary">Explore Collection</Link>
              </div>
            )}
          </div>
        );

      case 'subscriptions':
        return (
          <div className="premium-dash-card fade-in">
            <div className="dash-card-header">
              <div>
                <h3>VIP Memberships</h3>
                <p>Manage your exclusive VIP perks and reward points.</p>
              </div>

              {/* Prominent Points display in VIP tab */}
              <div className="vip-points-display">
                <div className="vip-points-label">AVAILABLE POINTS</div>
                <div className="vip-points-value">
                  <FiStar className="gold-icon" size={18} />
                  {userProfile?.totalPoints || 0}
                </div>
              </div>
            </div>

            {loadingSub ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>Loading your subscription details…</p>
              </div>
            ) : activeSubscription ? (
              <div className="sub-content-area">
                <div className="premium-subscription-card">
                  <div className="sub-card-header">
                    <div className="sub-title-wrapper">
                      <FiStar className="gold-icon" size={22} />
                      <h4>
                        {activeSubscription.membership_id?.name ||
                          activeSubscription.name ||
                          'Premium VIP Plan'}
                      </h4>
                    </div>
                    <span className="sub-badge">Active</span>
                  </div>

                  <div className="sub-benefits">
                    <div className="benefit-item">✓ Free Express Delivery</div>
                    <div className="benefit-item">✓ Early Access to Drops</div>
                    <div className="benefit-item">✓ Extra 10% Off All Orders</div>
                  </div>

                  <div className="sub-footer-actions">
                    <button className="btn-primary" onClick={() => toast.info('Manage billing coming soon!')}>
                      Manage Billing
                    </button>
                    <button className="btn-danger-outline" onClick={handleCancelSubscriptionClick}>
                      Cancel Membership
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="premium-empty-state">
                <div className="empty-icon-wrapper gold"><FiStar size={36} /></div>
                <h4>Unlock Exclusive Perks</h4>
                <p>Join Clothiq VIP for free shipping, extra discounts, and early access.</p>
                <Link to="/plans" className="btn-gold">View VIP Plans</Link>
              </div>
            )}
          </div>
        );

      case 'wishlist':
        return (
          <div className="premium-dash-card fade-in">
            <div className="dash-card-header">
              <div>
                <h3>Saved Items</h3>
                <p>Products you've loved and saved for later.</p>
              </div>
            </div>
            <div className="premium-empty-state">
              <div className="empty-icon-wrapper"><FiHeart size={36} /></div>
              <h4>Your wishlist is empty</h4>
              <p>Heart items you love to keep track of them here.</p>
              <Link to="/shop" className="btn-primary">Discover Products</Link>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="premium-dash-card fade-in">
            <div className="dash-card-header">
              <div>
                <h3>My Wallet</h3>
                <p>Manage your reward points and withdrawal requests.</p>
              </div>
            </div>
            <div className="sub-content-area">
              <div className="wallet-grid">
                <div className="wallet-balance-card points">
                  <div className="wallet-info">
                    {/* <FiStar className="gold-icon" size={24} /> */}
                    <div>
                      <div className="wallet-label">AVAILABLE POINTS</div>
                      <div className="wallet-value">{userProfile?.totalPoints || 0} PTS</div>
                    </div>
                  </div>
                  <button className="btn-gold-small" onClick={() => setShowWithdrawModal(true)}>
                    Withdraw Points
                  </button>
                </div>

                <div className="wallet-balance-card cash">
                  <div className="wallet-info">
                    <FiCreditCard className="gold-icon" size={24} />
                    <div>
                      <div className="wallet-label">WALLET BALANCE</div>
                      <div className="wallet-value">₹{wallet.totalWithdraw_amount || 0}</div>
                    </div>
                  </div>
                  <button className="btn-primary-small" onClick={() => toast.info('Payout feature coming soon!')}>
                    Payout Cash
                  </button>
                </div>
              </div>

              <div className="wallet-notice">
                <FiInfo size={16} />
                <p>Points can be converted to wallet balance once you reach a minimum of 500 points. 10 Points = ₹1.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="premium-dashboard-page">
      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancel Membership?"
        message="Are you sure you want to cancel your premium membership? Your unused days will be refunded to your Clothiq wallet automatically."
        confirmText="Yes, Cancel & Refund to Wallet"
        cancelText="Keep Membership"
        onConfirm={confirmCancelSubscription}
        onCancel={() => setShowCancelModal(false)}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onConfirm={handleWithdrawRequest}
        currentPoints={userProfile?.totalPoints || 0}
      />

      {/* Top bar — replaces the site navbar inside the dashboard */}
      <header className="dash-topbar">
        <span className="dash-topbar-brand">CLOTH<span>IQ</span></span>
        <div className="dash-topbar-right">
          {/* Points in Header */}
          <div className="dash-topbar-points" onClick={() => setShowWithdrawModal(true)} style={{ cursor: 'pointer' }}>
            <FiStar className="points-icon" size={14} />
            <span>{userProfile?.totalPoints || 0} Points</span>
          </div>
          <span className="dash-topbar-name">{userProfile?.username || user?.username || 'Guest'}</span>
          <div className="dash-topbar-avatar">{userInitial}</div>
        </div>
      </header>

      {/* Body: sidebar + scrollable content */}
      <div className="dashboard-body">
        <aside className="premium-sidebar">
          <div className="sidebar-profile">
            <div className="avatar-circle">{userInitial}</div>
            <div className="profile-text">
              <h2>{userProfile?.username || 'User'}</h2>
              <p>{userProfile?.email}</p>
            </div>
          </div>

          <nav>
            {[
              { key: 'profile', label: 'Profile' },
              { key: 'orders', label: 'Orders' },
              { key: 'wallet', label: 'Wallet' },
              { key: 'subscriptions', label: 'Membership' },
              { key: 'wishlist', label: 'Wishlist' },
            ].map(item => (
              <button
                key={item.key}
                className={`p-nav-btn ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ marginTop: 'auto' }}>
            <button onClick={handleLogout} className="p-nav-btn">
              Logout
            </button>
          </div>
        </aside>

        {/* ← This scrolls independently; sidebar and topbar stay fixed */}
        <main className="premium-main-content">
          {renderContent()}
        </main>
      </div>

      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />

      {showCancelModal && (
        <ConfirmationModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={confirmCancelSubscription}
          title="Cancel Membership?"
          message="You'll lose access to exclusive discounts and perks. A pro-rata refund will be added to your wallet."
          confirmText="Yes, Cancel"
          type="danger"
        />
      )}
    </div>
  );
};

export default Dashboard;