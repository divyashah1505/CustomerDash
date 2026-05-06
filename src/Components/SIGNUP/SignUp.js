import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../config/config';
import '../LOGIN/Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = register, 2 = otp
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      let uploadedFileName = '';

      // 1. Upload the image first if one is selected
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        
        try {
          // Attempting to upload to the users/upload-photos endpoint
          const uploadRes = await axios.post(`${BASE_URL}/upload-photos`, uploadData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          if (uploadRes.data && uploadRes.data.success) {
            uploadedFileName = uploadRes.data.filename || uploadRes.data.data;
          } else {
            // If upload fails, we can either stop or proceed without image. 
            // The user's example has a filename, so we'll try to get it.
            uploadedFileName = uploadRes.data.filename || uploadRes.data.data;
          }
        } catch (uploadErr) {
          console.error("Image upload failed, proceeding without profile picture.", uploadErr);
        }
      }

      // 2. Register with all data including the filename
      const isEmail = formData.contact.includes('@');
      const payload = {
        username: formData.username,
        password: formData.password,
        file: uploadedFileName // The filename returned from the upload endpoint
      };

      if (isEmail) {
        payload.email = formData.contact;
      } else {
        payload.mobile = formData.contact;
      }

      const response = await axios.post(`${BASE_URL}/register`, payload);

      if (response.data && response.data.success) {
        setStep(2); // Move to OTP
      } else {
        setError(response.data.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isEmail = formData.contact.includes('@');
      const payload = { otp };

      if (isEmail) {
        payload.email = formData.contact;
      } else {
        payload.mobile = formData.contact;
      }

      const response = await axios.post(`${BASE_URL}/verify-otp`, payload);

      if (response.data && response.data.success) {
        // Auto-login after verification by calling login endpoint
        const loginPayload = { password: formData.password };
        if (isEmail) loginPayload.email = formData.contact;
        else loginPayload.mobile = formData.contact;
        
        const loginResponse = await axios.post(`${BASE_URL}/login`, loginPayload);
        if (loginResponse.data && loginResponse.data.success) {
          const token = loginResponse.data.token || loginResponse.data.data?.token;
          const userData = loginResponse.data.user || loginResponse.data.data;
          login(userData, token);
          navigate('/');
        } else {
          // If auto-login fails, redirect to login page
          navigate('/login');
        }
      } else {
        setError(response.data.message || 'Invalid OTP.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-split-left">
        <div className="auth-split-content">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--clothiq-white)' }}>Join Clothiq.</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
            Elevate your everyday style with premium, minimalist essentials.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--clothiq-gold)', fontSize: '1.5rem' }}>✓</span> Early access to drops
            </li>
            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--clothiq-gold)', fontSize: '1.5rem' }}>✓</span> Exclusive member pricing
            </li>
            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--clothiq-gold)', fontSize: '1.5rem' }}>✓</span> Faster checkout
            </li>
          </ul>
        </div>
      </div>
      
      <div className="auth-split-right">
        <div className="auth-container">
          <div className="auth-header">
            <h2>{step === 1 ? 'Create Account' : 'Verify Account'}</h2>
            <p>{step === 1 ? 'Join the club and upgrade your wardrobe.' : `Enter the OTP sent to ${formData.contact}`}</p>
          </div>

          {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

          {step === 1 ? (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              {/* Profile Image Upload */}
              <div className="profile-upload-section">
                <label htmlFor="file" className="profile-upload-label">
                  <div className="profile-preview-container">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="profile-preview-img" />
                    ) : (
                      <div className="profile-placeholder">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                      </div>
                    )}
                    <div className="upload-overlay">
                      <span>{imagePreview ? 'Change' : 'Upload'}</span>
                    </div>
                  </div>
                </label>
                <input 
                  type="file" 
                  id="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={{ display: 'none' }} 
                />
                <p className="upload-hint">Upload a profile picture (optional)</p>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  className="input-field" 
                  placeholder="johndoe123"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="contact">Email or Mobile Number</label>
                <input 
                  type="text" 
                  id="contact" 
                  className="input-field" 
                  placeholder="hello@example.com or 9876543210"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '1.5rem' }}>
                <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
                  <label className="input-label" htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="input-field" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
                  <label className="input-label" htmlFor="confirmPassword">Confirm</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    className="input-field" 
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="auth-form">
              <div className="input-group">
                <label className="input-label" htmlFor="otp">One Time Password (OTP)</label>
                <input 
                  type="text" 
                  id="otp" 
                  className="input-field" 
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength="6"
                  style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem' }}
                />
              </div>

              <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="text-gold fw-600">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
