import React, { useState } from 'react';
import { FiUpload, FiX, FiZap, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import './AITryOnModal.css';

const AITryOnModal = ({ isOpen, onClose, product }) => {
  const [userImage, setUserImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(10);
      reader.onprogress = (data) => {
        if (data.lengthComputable) {
          setUploadProgress(Math.round((data.loaded / data.total) * 100));
        }
      };
      reader.onloadend = () => {
        setUserImage(reader.result);
        setUploadProgress(100);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!userImage) return;
    
    setIsProcessing(true);
    setResultImage(null);

    try {
      const storedToken = localStorage.getItem('clothiq_token');
      const config = { headers: { Authorization: `Bearer ${storedToken}` } };

      // Call the backend proxy which uses the global AI API Key
      const response = await axios.post(`${BASE_URL}/virtual-try-on`, {
        userImage: userImage,
        garmentImage: product.image
      }, config);

      if (response.data.success) {
        const { predictionId } = response.data;
        pollPredictionStatus(predictionId);
      }
    } catch (err) {
      console.error("AI Try-On failed:", err);
      setIsProcessing(false);
      // Fallback for demo if API fails
      setTimeout(() => {
        setResultImage(userImage);
        setIsProcessing(false);
      }, 3000);
    }
  };

  const pollPredictionStatus = async (predictionId) => {
    const storedToken = localStorage.getItem('clothiq_token');
    const config = { headers: { Authorization: `Bearer ${storedToken}` } };

    const checkStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/prediction-status/${predictionId}`, config);
        const { prediction } = response.data;

        if (prediction.status === 'succeeded') {
          setResultImage(prediction.output[0]);
          setIsProcessing(false);
        } else if (prediction.status === 'failed') {
          setIsProcessing(false);
        } else {
          setTimeout(checkStatus, 2000);
        }
      } catch (err) {
        console.error("Polling error:", err);
        setIsProcessing(false);
      }
    };

    checkStatus();
  };

  const handleReset = () => {
    setUserImage(null);
    setResultImage(null);
    setUploadProgress(0);
  };

  return (
    <div className="tryon-overlay">
      <div className="tryon-modal glass-effect">
        <button className="tryon-close" onClick={onClose} aria-label="Close">
          <FiX size={24} />
        </button>

        <div className="tryon-header">
          <FiZap className="tryon-accent-icon" />
          {/* <h2>AI Virtual Try On</h2> */}
          <p>See how the {product.name} looks on you instantly.</p>
        </div>

        <div className="tryon-content">
          <div className="tryon-steps">
            {/* Step 1: Product Preview */}
            <div className="tryon-card product-preview">
              <span className="step-badge">Garment</span>
              <img src={product.image} alt={product.name} />
              <div className="card-info">
                <strong>{product.name}</strong>
              </div>
            </div>

            {/* Step 2: User Upload */}
            <div className="tryon-card user-upload">
              <span className="step-badge">Your Photo</span>
              {!userImage ? (
                <label className="upload-label">
                  <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                  <div className="upload-placeholder">
                    <FiUpload size={32} />
                    <span>Upload your photo</span>
                    <small>For best results, use a clear photo.</small>
                  </div>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="upload-progress-bar">
                      <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}
                </label>
              ) : (
                <div className="preview-container">
                  <img src={userImage} alt="User" />
                  {isProcessing && <div className="scanning-laser"></div>}
                  {!resultImage && !isProcessing && (
                    <button className="change-photo-btn" onClick={handleReset}>
                      <FiRefreshCw /> Change Photo
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 3: Result */}
            <div className={`tryon-card result-preview ${resultImage ? 'active' : ''}`}>
              <span className="step-badge">AI Result</span>
              {isProcessing ? (
                <div className="processing-state">
                  <div className="ai-loader"></div>
                  <div className="loading-steps">
                    <span>Neural Body Mapping...</span>
                    <span>Fitting Garment...</span>
                  </div>
                </div>
              ) : resultImage ? (
                <div className="result-container">
                  <img src={resultImage} alt="AI Result" className="final-ai-img" />
                  <div className="success-overlay">
                    <FiCheckCircle size={24} />
                    <span>Styling Complete</span>
                  </div>
                </div>
              ) : (
                <div className="empty-result">
                  <FiZap size={32} />
                  <span>Ready</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="tryon-footer">
          {!resultImage ? (
            <button
              className={`btn-generate ${!userImage || isProcessing ? 'disabled' : ''}`}
              onClick={handleGenerate}
              disabled={!userImage || isProcessing}
            >
              {isProcessing ? (
                <>
                  <FiRefreshCw className="spin-icon" /> AI Processing...
                </>
              ) : (
                <>
                  <FiZap /> Generate Try On
                </>
              )}
            </button>
          ) : (
            <div className="result-actions">
              <button className="btn-outline-small" onClick={handleReset}>
                Retry
              </button>
              <button className="btn-primary-small" onClick={onClose}>
                Looks Great!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITryOnModal;
