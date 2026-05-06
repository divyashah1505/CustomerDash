import React, { useState } from 'react';
import axios from 'axios';
import { FiX, FiLock, FiShield, FiSave } from 'react-icons/fi';
import { BASE_URL } from '../../config/config';
import { toast } from './Toast';

import PasswordField from '../COMMON/PasswordField';
import './ChangePasswordModal.css';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error('New passwords do not match');
    }

    if (formData.oldPassword === formData.newPassword) {
      return toast.error('New password must be different from old password');
    }

    setIsLoading(true);

    try {
      const storedToken = localStorage.getItem('clothiq_token');
      const response = await axios.put(`${BASE_URL}/change-password`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });

      if (response.data && response.data.success) {
        toast.success('Password updated successfully');
        onClose();
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`cp-modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="cp-modal-content">
        {/* Header */}
        <div className="cp-modal-header">
          <button onClick={onClose} className="cp-close-btn">
            <FiX size={20} />
          </button>
          
          <div className="cp-header-title">
            <div className="cp-icon-box">
              <FiShield size={22} />
            </div>
            <h2>Account Security</h2>
          </div>
          <p className="cp-header-subtitle">Update your login credentials below.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="cp-form">
          <PasswordField
            label="Current Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            iconType="lock"
          />

          <div className="cp-divider" />

          <PasswordField
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            iconType="lock"
          />

          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            iconType="shield"
          />

          <button type="submit" disabled={isLoading} className="cp-submit-btn">
            {isLoading ? (
              <>
                <div className="cp-spinner" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <FiSave size={18} />
                <span>Update Password</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
