import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiShield } from 'react-icons/fi';

const PasswordField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = '••••••••', 
  required = true,
  iconType = 'lock' // 'lock' or 'shield'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Leading Icon */}
        <div style={{ position: 'absolute', left: '16px', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
          {iconType === 'lock' ? <FiLock size={18} /> : <FiShield size={18} />}
        </div>

        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="input-field"
          style={{ 
            width: '100%', 
            paddingLeft: '48px', 
            paddingRight: '48px' 
          }}
        />

        {/* Toggle Button */}
        <button
          type="button"
          onClick={togglePassword}
          style={{
            position: 'absolute',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
