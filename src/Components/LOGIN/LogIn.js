import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../config/config';
import PasswordField from '../COMMON/PasswordField';
import './Auth.css';

const LogIn = () => {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isEmail = contact.includes('@');
      const payload = {
        password: password
      };

      if (isEmail) {
        payload.email = contact;
      } else {
        payload.mobile = contact;
      }

      const response = await axios.post(`${BASE_URL}/login`, payload);

      if (response.data && response.data.success) {
        const token = response.data.token || response.data.data?.accessToken || response.data.data?.token;
        const refreshToken = response.data.refreshToken || response.data.data?.refreshToken;
        const userData = response.data.user || response.data.data;
        
        login(userData, token, refreshToken);
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome back.</h2>
            <p>Enter your details to access your Clothiq account.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: '600' }}>{error}</div>}

            <div className="input-group">
              <label className="input-label" htmlFor="contact">Email or Mobile Number</label>
              <input 
                type="text" 
                id="contact" 
                className="input-field" 
                placeholder="hello@example.com or 9876543210"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div className="label-row" style={{ marginBottom: '10px' }}>
                <label className="input-label" style={{ marginBottom: '0' }}>Password</label>
                <Link to="/forgot-password" size={18} className="forgot-link">Forgot?</Link>
              </div>
              <PasswordField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>

            <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup" className="text-gold fw-600">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
