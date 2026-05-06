import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import PaymentSuccessModal from '../MODAL/PaymentSuccessModal';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const location = useLocation();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    // Check if redirected here after payment
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('payment') === 'success') {
      setShowPaymentSuccess(true);
      // Clean URL without reloading page
      window.history.replaceState({}, document.title, "/");
    }
  }, [location]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getActiveCategories`);
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCategories();
  }, []);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);


  const featuredProducts = [
    { id: 1, name: 'The Perfect Heavyweight Tee', price: '$45', category: 'Originals', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Minimalist Supima Crew', price: '$55', category: 'Luxe', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Oversized Boxy Fit', price: '$40', category: 'Street', image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Everyday Active V-Neck', price: '$35', category: 'Active', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
  ];

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 4);

  return (
    <div className="home-wrapper">
      {showPaymentSuccess && <PaymentSuccessModal onClose={() => setShowPaymentSuccess(false)} />}
      {/* Ultra-Premium Editorial Hero Section */}
      <section className="hero-editorial">
        <div
          className="hero-bg-text"
          style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.15}px))` }}
        >
          CLOTHIQ
        </div>
        <div className="container hero-editorial-content">
          <div
            className="hero-text-box"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(1 - scrollY / 400, 0)
            }}
          >
            <h1 className="hero-editorial-title">
              Elevate<br />Your Everyday<br /><span className="text-gold">Style.</span>
            </h1>
            <p className="hero-editorial-subtitle">
              Premium men's t-shirts crafted for the perfect fit. Redefining modern basics with uncompromising quality and minimalist design.
            </p>
            <Link to="/shop" className="btn-gold btn-large">Shop Collection</Link>
          </div>
          <div className="hero-showcase-wrapper">
            <div className="showcase-ambient-glow"></div>
            
            <div 
              className="showcase-portal"
              style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
            >
              <img 
                src="https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Luxury Fashion Model" 
                className="portal-img"
              />
              
              <div className="portal-overlay"></div>
              
              <div className="portal-glass-card">
                <div className="glass-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
                <div className="glass-text">
                  <span className="glass-title">100% Supima Cotton</span>
                  <span className="glass-subtitle">Uncompromising Quality</span>
                </div>
              </div>
            </div>

            <div className="showcase-text-ring">
              {/* <svg viewBox="0 0 100 100" width="100%" height="100%">
                <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                <text>
                  <textPath href="#circlePath" startOffset="0%" textLength="251">
                    • REDEFINING MODERN BASICS • PREMIUM QUALITY 
                  </textPath>
                </text>
              </svg> */}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section container reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
        <div className="section-header">
          <h2>Shop by Category</h2>
          {categories.length > 4 && (
            <button
              className="btn-outline view-all-btn"
              onClick={() => setShowAllCategories(!showAllCategories)}
              style={{ padding: '10px 24px', border: 'none', borderBottom: '2px solid var(--clothiq-black)', borderRadius: 0 }}
            >
              {showAllCategories ? 'Show Less ↑' : 'View All Categories →'}
            </button>
          )}
        </div>
        <div className="categories-grid">
          {loadingCats ? (
            <p>Loading categories...</p>
          ) : (
            displayedCategories.map(cat => (
              <div key={cat._id} className="category-card premium-cat-card">
                <div className="category-image-wrap">
                  <img src={cat.image} alt={cat.name} className="category-image" loading="lazy" />
                </div>
                <div className="category-info-below">
                  <h3>{cat.name}</h3>
                  <p className="category-desc-visible">{cat.description}</p>
                  <Link to={`/category/${cat._id}`} state={{ categoryData: cat }} className="view-link-editorial">
                    Explore Collection <span className="arrow">→</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section container" style={{ backgroundColor: 'var(--clothiq-white)', borderRadius: '24px', padding: '60px 40px' }}>
        <div className="section-header">
          <h2>New Arrivals</h2>
          <Link to="/shop" className="text-gold fw-600 view-all">Shop All →</Link>
        </div>
        <div className="products-carousel">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-image-wrap">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                <div className="quick-add">Quick Add</div>
              </Link>
              <div className="product-details">
                <span className="product-category">{product.category}</span>
                <Link to={`/product/${product.id}`}><h4 className="product-name">{product.name}</h4></Link>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Clothiq Standard - Typography Driven */}
      <section className="section premium-why-section reveal-on-scroll">
        <div className="container">
          <div className="why-minimal-header">
            <h2 className="why-title">The Clothiq Standard</h2>
            <p className="why-subtitle">Elevating the everyday essential with uncompromising quality.</p>
          </div>

          <div className="why-minimal-grid">
            <div className="why-minimal-item">
              <span className="why-minimal-number">01</span>
              <h4 className="why-minimal-heading">Premium Fabric</h4>
              <p className="why-minimal-text">Crafted from 100% long-staple Supima cotton for unparalleled softness, luxurious drape, and unmatched breathability.</p>
            </div>
            <div className="why-minimal-item">
              <span className="why-minimal-number">02</span>
              <h4 className="why-minimal-heading">Perfect Fit</h4>
              <p className="why-minimal-text">Tailored specifically for the modern silhouette. Expertly measured to be not too tight, not too loose. Just right.</p>
            </div>
            <div className="why-minimal-item">
              <span className="why-minimal-number">03</span>
              <h4 className="why-minimal-heading">Wash Durability</h4>
              <p className="why-minimal-text">Pre-shrunk, garment-dyed, and built to last. Our premium tees maintain their structural integrity and deep color wash after wash.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
