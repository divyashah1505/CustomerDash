import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { BASE_URL } from '../../../config/config';
import LoginModal from '../../MODAL/LoginModal';
import './Category.css';

const Category = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [category, setCategory] = useState(location.state?.categoryData || null);
  const [loading, setLoading] = useState(!category);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSubId, setPendingSubId] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!category) {
      // If no state was passed, we need to fetch the category data.
      // Since the API getActiveCategories returns all, we can fetch all and find the matching one.
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/getActiveCategories`);
          if (response.data.success) {
            const foundCategory = response.data.data.find(c => c._id === categoryId);
            if (foundCategory) {
              setCategory(foundCategory);
            } else {
              navigate('/shop');
            }
          }
        } catch (error) {
          console.error("Error fetching category:", error);
          navigate('/shop');
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, [category, categoryId, navigate]);

  const handleSubcategoryClick = (subId) => {
    if (user) {
      navigate(`/shop?category=${category._id}&subcategory=${subId}`);
    } else {
      setPendingSubId(subId);
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    if (pendingSubId) {
      navigate(`/shop?category=${category._id}&subcategory=${pendingSubId}`);
      setPendingSubId(null);
    }
  };

  const [revealItems, setRevealItems] = useState([]);

  useEffect(() => {
    if (category?.subcategories) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setRevealItems(prev => [...new Set([...prev, entry.target.dataset.id])]);
          }
        });
      }, { threshold: 0.1 });

      const cards = document.querySelectorAll('.subcategory-card');
      cards.forEach(card => observer.observe(card));

      return () => observer.disconnect();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="category-loading">
        <div className="loader-spinner"></div>
        <p>Curating your collection...</p>
      </div>
    );
  }

  if (!category) {
    return <div className="container section text-center">Category not found.</div>;
  }

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="category-hero-overlay"></div>
        <img src={category.image} alt={category.name} className="category-hero-img" />
        <div className="category-hero-content container">
          <div className="breadcrumbs-premium">
            <Link to="/">Home</Link> <span className="separator">/</span> <span>{category.name}</span>
          </div>
          <h1 className="hero-title-reveal">{category.name}</h1>
          <p className="hero-desc-reveal">{category.description}</p>
        </div>
      </div>

      <div className="subcategories-section container">
        <div className="section-header-editorial">
          <span className="section-tag">Collections</span>
          <h2>Explore the Series</h2>
          <div className="editorial-line"></div>
        </div>

        {category.subcategories && category.subcategories.length > 0 ? (
          <div className="subcategories-grid">
            {category.subcategories.map((sub, index) => (
              <div
                key={sub._id}
                data-id={sub._id}
                onClick={() => handleSubcategoryClick(sub._id)}
                className={`subcategory-card premium-sub-card ${revealItems.includes(sub._id) ? 'is-revealed' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s`, cursor: 'pointer' }}
              >
                <div className="subcategory-image-wrap">
                  <img src={sub.image} alt={sub.name} className="subcategory-image" loading="lazy" />
                  {!user && (
                    <div className="subcategory-lock-overlay">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                  )}
                  <div className="subcategory-card-overlay">
                    <span className="view-text">{user ? 'Explore' : 'Login to View'}</span>
                  </div>
                </div>
                <div className="subcategory-info-below">
                  <span className="sub-count">0{index + 1}</span>
                  <h3>{sub.name}</h3>
                  <p className="subcategory-desc-visible">
                    {sub.description || `Experience the pinnacle of ${sub.name.toLowerCase()} design. Crafted for the modern silhouette.`}
                  </p>
                  <div className="subcategory-footer">
                    <span className="view-link-editorial">
                      {user ? 'Shop Collection' : 'Member Only'} <span className="arrow">→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary mt-4">No collections available in this category yet.</p>
        )}
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Category;
