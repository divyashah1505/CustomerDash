import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import './ProductDetail.css';
import AITryOnModal from './AITryOnModal';
import { FiZap } from 'react-icons/fi';
import { io } from 'socket.io-client';

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.productData || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedSize(product.variants[0].size);
      }
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const apiUrl = `${BASE_URL}/products`;
        const response = await axios.get(apiUrl);
        if (response.data && response.data.success) {
          const allProducts = response.data.data;
          const foundProduct = allProducts.find(p => p._id === productId);

          if (foundProduct) {
            setProduct(foundProduct);
            if (foundProduct.variants && foundProduct.variants.length > 0) {
              setSelectedSize(foundProduct.variants[0].size);
            }
          } else {
            setError("Product details not found.");
          }
        }
      } catch (err) {
        console.error("ProductDetail.js Error:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (productId && !product) {
      fetchProduct();
    }

    // ✅ Socket.io for Real-time Stock Sync
    const socket = io(BASE_URL.replace('/api', ''), {
      transports: ['websocket'],
      upgrade: false
    });

    socket.on('stockUpdated', (data) => {
      console.log("[Socket] Stock Update received:", data);
      if (data.productId === productId) {
        setProduct(prev => {
          if (!prev) return prev;
          const updatedVariants = prev.variants?.map(v => {
            if (data.variantId) {
              return v._id === data.variantId ? { ...v, stock: data.newStock } : v;
            }
            return v;
          });

          return {
            ...prev,
            variants: updatedVariants,
            qty: !data.variantId ? data.newStock : prev.qty
          };
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [productId, product]);

  const handleAddToCart = async (silent = false) => {
    if (!selectedSize) {
      setFeedback({ type: 'error', message: 'Please select a size first.' });
      return false;
    }

    const currentVariant = product.variants?.find(v => v.size === selectedSize);

    if (!currentVariant || currentVariant.stock <= 0) {
      setFeedback({ type: 'error', message: 'This item is currently out of stock.' });
      return false;
    }

    if (quantity > currentVariant.stock) {
      setFeedback({ type: 'error', message: `You cannot buy more than available stock (${currentVariant.stock})` });
      return false;
    }

    try {
      if (!silent) setIsProcessing(true);

      const payload = {
        product: [
          {
            productId: product._id,
            variantId: currentVariant?._id,
            quantity: quantity
          }
        ]
      };

      const storedToken = localStorage.getItem('clothiq_token');
      const config = storedToken ? { headers: { Authorization: `Bearer ${storedToken}` } } : {};

      const response = await axios.post(`${BASE_URL}/add-to-cart`, payload, config);

      if (response.data.success) {
        if (!silent) setFeedback({ type: 'success', message: 'Item added to cart successfully' });

        // Notify other components (like Navbar) to refresh cart count
        window.dispatchEvent(new Event('cartUpdated'));

        return true;
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      if (!silent) {
        const errorMsg = err.response?.data?.message || 'Failed to add to cart. Please log in.';
        setFeedback({ type: 'error', message: errorMsg });
      }
      return false;
    } finally {
      if (!silent) setIsProcessing(false);
    }
  };

  const handleBuyNow = async () => {
    setIsProcessing(true);
    setFeedback({ type: '', message: '' });

    const added = await handleAddToCart(true);
    if (!added) {
      setIsProcessing(false);
      return;
    }

    try {
      const storedToken = localStorage.getItem('clothiq_token');
      const config = storedToken ? { headers: { Authorization: `Bearer ${storedToken}` } } : {};

      const orderResponse = await axios.post(`${BASE_URL}/initialize-order`, {}, config);

      if (orderResponse.data.success) {
        setFeedback({ type: 'success', message: 'Initializing secure checkout...' });
        navigate('/checkout', { state: { checkoutData: orderResponse.data } });
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setFeedback({ type: 'error', message: 'Checkout initialization failed. Try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state text-center py-20">
        <div className="spinner"></div>
        <p>Refining details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-state text-center py-20">
        <p style={{ color: '#ef4444' }}>{error || "Product not found"}</p>
        <Link to="/shop" className="btn-outline mt-4">Back to Shop</Link>
      </div>
    );
  }

  const productImages = (product.images && product.images.length > 0) ? product.images : (product.image ? [product.image] : []);
  const currentVariant = product.variants?.find(v => v.size === selectedSize);
  const displayPrice = currentVariant ? `₹${currentVariant.price}` : (product.minPrice !== undefined ? `₹${product.minPrice}` : `₹${product.price || '0'}`);

  return (
    <>
      <div className="pdp-container container section">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
        </div>

        <div className="pdp-layout">
          <div className="pdp-gallery">
            <div className="pdp-thumbnails">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${mainImage === idx ? 'active' : ''}`}
                  onClick={() => setMainImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} />
                </button>
              ))}
            </div>
            <div className="pdp-main-image-wrapper">
              {productImages.length > 0 ? (
                <img src={productImages[mainImage]} alt={product.name} className="pdp-main-image" />
              ) : (
                <div className="no-image-placeholder">No Image Available</div>
              )}
            </div>
          </div>

          <div className="pdp-details">
            <div className="pdp-header">
              <span className="pdp-category-tag">{product.mainCategory?.name || "Premium Collection"}</span>
              <h1 className="pdp-title">{product.name}</h1>
              <div className="pdp-price-wrap">
                <span className="pdp-price-amount">{displayPrice}</span>
                <span className="pdp-tax-note">Includes all duties and taxes</span>
              </div>
            </div>

            <div className="pdp-description-box">
              <p>{product.description}</p>
            </div>

            <div className="pdp-selection-group">
              <div className="pdp-size-section">
                <div className="size-header-row">
                  <span className="fw-600">Select Size</span>
                  <button className="size-guide-link">Size Guide</button>
                </div>
                <div className="size-selector-grid">
                  {product.variants && product.variants.length > 0 ? (
                    product.variants.map(variant => (
                      <button
                        key={variant._id}
                        className={`size-option ${selectedSize === variant.size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(variant.size)}
                        disabled={variant.stock === 0}
                      >
                        {variant.size}
                        {variant.stock === 0 && <span className="stock-badge">Out</span>}
                      </button>
                    ))
                  ) : (
                    <p className="text-secondary">No variants available.</p>
                  )}
                </div>
              </div>

              <div className="pdp-quantity-section">
                <div className="quantity-header">
                  <span className="fw-600">Quantity</span>
                  {currentVariant && (
                    <span className={`stock-status ${currentVariant.stock <= 5 ? 'low' : ''}`}>
                      {currentVariant.stock === 0 ? (
                        <span className="out-of-stock-text">Out of Stock</span>
                      ) : (
                        currentVariant.stock <= 5 ? `Only ${currentVariant.stock} left!` : `${currentVariant.stock} available`
                      )}
                    </span>
                  )}
                </div>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <input type="number" value={quantity} readOnly />
                  <button
                    onClick={() => {
                      if (currentVariant && quantity < currentVariant.stock) {
                        setQuantity(quantity + 1);
                        setFeedback({ type: '', message: '' });
                      } else if (currentVariant) {
                        setFeedback({ type: 'error', message: `You cannot buy more than available stock (${currentVariant.stock})` });
                      }
                    }}
                  >+</button>
                </div>
              </div>
            </div>

            <div className="pdp-cta-group">
              <button
                className={`btn-pdp-cart ${isProcessing ? 'loading' : ''} ${(!currentVariant || currentVariant.stock <= 0) ? 'disabled' : ''}`}
                onClick={() => handleAddToCart()}
                disabled={isProcessing || !currentVariant || currentVariant.stock <= 0}
              >
                {(!currentVariant || currentVariant.stock <= 0) ? 'Out of Stock' : (isProcessing ? 'Processing...' : 'Add to Cart')}
              </button>
              <button
                className={`btn-pdp-buy ${isProcessing ? 'loading' : ''} ${(!currentVariant || currentVariant.stock <= 0) ? 'disabled' : ''}`}
                onClick={handleBuyNow}
                disabled={isProcessing || !currentVariant || currentVariant.stock <= 0}
              >
                {(!currentVariant || currentVariant.stock <= 0) ? 'Out of Stock' : 'Buy it Now'}
              </button>

              {/* <button
                className="btn-pdp-tryon"
                onClick={() => setShowTryOnModal(true)}
              >
                <FiZap /> AI Virtual Try On
              </button> */}
            </div>

            {feedback.message && (
              <div className={`pdp-feedback ${feedback.type}`}>
                {feedback.message}
              </div>
            )}

            <div className="pdp-trust-badges">
              <div className="trust-item">
                <span className="badge-icon">📦</span>
                <div className="badge-text">
                  <strong>Complementary Shipping</strong>
                  <p>On all orders over ₹100</p>
                </div>
              </div>
              <div className="trust-item">
                <span className="badge-icon">🛡️</span>
                <div className="badge-text">
                  <strong>Premium Guarantee</strong>
                  <p>30-day effortless returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AITryOnModal
        isOpen={showTryOnModal}
        onClose={() => setShowTryOnModal(false)}
        product={{
          name: product.name,
          image: productImages[mainImage] || product.image
        }}
      />
    </>
  );
};

export default ProductDetail;
