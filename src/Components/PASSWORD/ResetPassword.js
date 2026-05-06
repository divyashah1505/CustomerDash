import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { toast } from '../MODAL/Toast';
import PasswordField from '../COMMON/PasswordField';
import '../LOGIN/Auth.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: OTP, 2: New Password

  useEffect(() => {
    if (!email) {
      toast.error('Session expired. Please request OTP again.');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/verify-otp-reset`, { email, otp });
      if (response.data && response.data.success) {
        toast.success('OTP verified! Now set your new password.');
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/reset-password`, {
        email,
        otp,
        newPassword,
        confirmPassword
      });

      if (response.data && response.data.success) {
        toast.success('Password reset successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{step === 1 ? 'Verify OTP' : 'Reset Password'}</h2>
            <p>
              {step === 1 
                ? `Enter the 6-digit OTP sent to ${email}`
                : 'Enter your new password below to secure your account.'
              }
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleVerifyOtp} className="auth-form">
              <div className="input-group">
                <label className="input-label" htmlFor="otp">OTP Code</label>
                <input 
                  type="text" 
                  id="otp" 
                  className="input-field" 
                  placeholder="000000"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="auth-form">
              <PasswordField
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                iconType="shield"
              />

              <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
                {isLoading ? 'Resetting Password...' : 'Update Password'}
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>Didn't receive code? <Link to="/forgot-password" style={{ color: 'var(--clothiq-gold)', fontWeight: 600 }}>Resend OTP</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
