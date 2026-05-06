import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config/config";
import Modal from "../MODAL/Modal";
import "./Category.css";
import NavBar from "../NAVBAR/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SubCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        // Using the same local endpoint for consistency
        const response = await fetch(`${BASE_URL}/getActiveCategories`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const category = result.data.find((cat) => cat._id === categoryId);
          if (isMounted) {
            if (category) {
              setCategoryName(category.name);
              setSubcategories(category.subcategories || []);
            } else {
              setError(`Collection not found.`);
            }
          }
        } else {
          throw new Error("Invalid response format.");
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
        if (isMounted) setError("Unable to load subcategories. Please refresh.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (categoryId) fetchCategoryData();
    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  const handleViewRecipesClick = (e, subCategoryId) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      setRedirectRoute(`/recipes/subcategory/${subCategoryId}`);
      setIsModalOpen(true);
    } else {
      navigate(`/recipes/subcategory/${subCategoryId}`);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="loading-container" style={{height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
           </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <section className="categoryContainer mt-lg-5" id="subcategories">
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          redirectTo={redirectRoute}
          message="Please Sign-In to view our exclusive Recipes."
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-title text-center mb-5">
              <span className="eyebrow">Discover Collection</span>
              <h2>{categoryName} Styles</h2>
              <p>Explore our curated selection of premium {categoryName.toLowerCase()} essentials.</p>
            </div>
          </div>
          <div className="row">
            {subcategories.length > 0 ? (
              subcategories.map((subcategory) => (
                <div
                  className="col-lg-4 col-md-6 mb-4"
                  key={subcategory._id}
                >
                  <div className="single-blog-inner" onClick={(e) => handleViewRecipesClick(e, subcategory._id)}>
                    <div className="post-image">
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="image-container"
                      />
                      <div className="cat-tag">New Season</div>
                      <div className="fav-btn">
                         <FontAwesomeIcon icon={faHeart} />
                      </div>
                    </div>
                    <div className="post-content">
                      <div className="post-title">
                        <h3>{subcategory.name}</h3>
                      </div>
                      <p>{subcategory.description}</p>
                      
                      <div className="post-footer">
                         <div className="post-count">
                            <span>Explore</span> collection
                         </div>
                         <button
                            className="cat-view-more-button"
                            onClick={(e) =>
                              handleViewRecipesClick(e, subcategory._id)
                            }
                          >
                            View <FontAwesomeIcon icon={faChevronRight} style={{fontSize: '8px'}} />
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No collections available for this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubCategory;
