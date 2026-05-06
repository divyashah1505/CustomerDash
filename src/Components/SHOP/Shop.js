import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import './Shop.css';
import { io } from 'socket.io-client';

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  const initialSubcategory = queryParams.get('subcategory');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory || null);

  // const categories = ['All', 'Originals', 'Street', 'Luxe', 'Active'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let apiUrl = '';
        const params = {};

        if (initialSubcategory) {
          // Use the specific user-side subcategory API provided by the user
          apiUrl = `${BASE_URL}/products/${initialSubcategory}`;
        } else {
          // If no subcategory, try to fetch all products or fallback to a general endpoint
          // Based on the user's pattern, this might be /products or we can use a general one if known
          apiUrl = `${BASE_URL}/products`;
        }

        console.log("Shop.js: Fetching products from:", apiUrl);

        const config = { params };
        const storedToken = localStorage.getItem('clothiq_token');
        if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` };
        }

        const response = await axios.get(apiUrl, config);

        if (response.data && response.data.success) {
          const fetchedData = response.data.data;
          console.log("Shop.js: Raw data received:", fetchedData);

          if (Array.isArray(fetchedData)) {
            setProducts(fetchedData);
          } else if (fetchedData && Array.isArray(fetchedData.products)) {
            setProducts(fetchedData.products);
          } else {
            console.warn("Shop.js: Data is not an array:", fetchedData);
            setProducts([]);
          }
        } else {
          setError("No products found in this collection.");
          setProducts([]);
        }
      } catch (err) {
        console.error("Shop.js: Error fetching products:", err.response?.data || err.message);
        if (err.response?.status !== 401) {
          setError("Failed to load products. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // ✅ Socket.io for Real-time Stock Sync
    const socket = io(BASE_URL.replace('/api', ''), {
      transports: ['websocket'],
      upgrade: false
    });

    socket.on('stockUpdated', (data) => {
      console.log("[Socket] Shop Update received:", data);
      setProducts(prev => {
        return prev.map(p => {
          if (p._id === data.productId) {
            const updatedVariants = p.variants?.map(v => {
              if (data.variantId) {
                return v._id === data.variantId ? { ...v, stock: data.newStock } : v;
              }
              return v;
            });

            return {
              ...p,
              variants: updatedVariants,
              qty: !data.variantId ? data.newStock : p.qty
            };
          }
          return p;
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredProducts = (Array.isArray(products) ? products : []).filter(product => {
    // If we're filtering by a main category in the sidebar
    // We check if it matches the name OR if the selectedCategory is an ID that matches product.maincategoryId
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      const catName = product.mainCategory?.name?.toLowerCase() || '';
      const catId = product.maincategoryId || product.categoryId || '';

      // If it's a name filter (like 'Originals')
      const isNameMatch = catName && catName.includes(selectedCategory.toLowerCase());
      // If it's an ID filter (like the one in the URL)
      const isIdMatch = catId === selectedCategory;

      if (!isNameMatch && !isIdMatch && catName !== '') {
        return false;
      }
    }

    return true;
  });

  console.log("Shop.js: Filtered products:", filteredProducts);

  return (
    <div className="shop-page container section">
      <div className="shop-header">
        <h1>Shop All Collection</h1>
        <p>Discover our premium selection of men's essentials.</p>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="filter-group">
            {/* <h3>Categories</h3> */}
            <ul className="filter-list">
              {/* {categories.map(f => (
                <li key={f}>
                  <button
                    className={`filter-btn ${selectedCategory.toLowerCase() === f.toLowerCase() ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(f);
                      // Clear subcategory when clicking a main category filter
                      if (initialSubcategory) {
                        window.history.replaceState({}, '', '/shop');
                      }
                    }}
                  >
                    {f}
                  </button>
                </li>
              ))} */}
            </ul>
          </div>

          <div className="filter-group">
            {/* <h3>Size</h3> */}
            {/* <div className="size-grid">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className="size-btn">{size}</button>
              ))}
            </div> */}
          </div>
        </aside>

        {/* Product Grid */}
        <main className="shop-main">
          <div className="shop-controls">
            <span>Showing {loading ? '...' : filteredProducts.length} Products</span>
            <select className="sort-select">
              <option>Recommended</option>
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-state text-center py-10">
              <div className="spinner"></div>
              <p>Loading premium collection...</p>
            </div>
          ) : error ? (
            <div className="error-state text-center py-10">
              <p style={{ color: '#ef4444' }}>{error}</p>
              <button className="btn-outline mt-4" onClick={() => window.location.reload()}>Try Again</button>
            </div>
          ) : (
            <div className="plp-grid">
              {filteredProducts.map(product => {
                const primaryImage = product.images?.[0] || product.image;
                const displayPrice = product.minPrice !== undefined && product.maxPrice !== undefined
                  ? (product.minPrice === product.maxPrice ? `₹${product.minPrice}` : `₹${product.minPrice} - ₹${product.maxPrice}`)
                  : (product.variants?.[0]?.price ? `₹${product.variants[0].price}` : `₹${product.price || '0'}`);

                const categoryName = product.mainCategory?.name || "Premium Collection";

                const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;
                const isOutOfStock = totalStock === 0;

                return (
                  <div key={product._id} className="product-card">
                    <Link to={`/product/${product._id}`} state={{ productData: product }} className="product-image-wrap">
                      <img src={primaryImage} alt={product.name} className="product-image primary-img" loading="lazy" />
                      <img src={primaryImage} alt={`${product.name} hover`} className="product-image hover-img" loading="lazy" />
                      {isOutOfStock ? (
                        <div className="out-of-stock-badge-grid">Out of Stock</div>
                      ) : (
                        <div className="quick-add">Quick Add</div>
                      )}
                    </Link>
                    <div className="product-details">
                      <span className="product-category">{categoryName}</span>
                      <Link to={`/product/${product._id}`} state={{ productData: product }}><h4 className="product-name">{product.name}</h4></Link>
                      <div className="product-price">{displayPrice}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="empty-state text-center">
              <h3>No products found</h3>
              <p>Try adjusting your filters or browse all categories.</p>
              <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => {
                setSelectedCategory('All');
                window.history.replaceState({}, '', '/shop');
              }}>Clear Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
