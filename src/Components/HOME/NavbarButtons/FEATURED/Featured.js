// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../../../../config/config";
// import "../../PopularCategories/Category.css";
// import NavBar from "../../NAVBAR/NavBar";

// const Featured = () => {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/recipes/featured`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch Featured Recipes");
//         }
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error("Error fetching Featured Recipes:", error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   return (
//     <>
//       <NavBar/>
//       <section className="categoryContainer" id="Featured">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="section-title text-center">
//               <h2>Featured(Trending) Recipe</h2>
//             </div>
//           </div>
//           <div className="row custom-row">
//             {recipes.map((recipe, index) => (
//               <div className="col-lg-4 col-md-4 margin-adjust" key={index}>
//                 <div className="single-blog-inner">
//                   <div className="post-image">
//                     <img src={recipe.Recipe_Thumbnail} alt={recipe.Recipe_Title} className="image-container" />
//                   </div>
//                   <div className="post-content">
//                     <div className="post-details">
//                       <div className="post-title">
//                         <h3>{recipe.Recipe_Title}</h3>
//                         <Link
//                           to={`/recipes/subcategory/${recipe.Sub_Category_id}/${recipe.Recipe_id}`} 
//                           className="btn cat-view-more-button"
//                           >
//                           View 
//                         </Link>
//                       </div>
//                     </div>

//                     <p>{recipe.Recipe_Description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Featured;
// src/Components/HOME/NavbarButtons/FEATURED/Featured.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Add this line
import { BASE_URL } from "../../../../config/config";
import NavBar from "../../NAVBAR/NavBar";
import "./Features.css";

// Custom Arrow Components
function SampleNextArrow({ onClick }) {
  return (
    <div className="custom-arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [heartFilled, setHeartFilled] = useState({}); // State to track liked recipes

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/featured`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          setRecipes(result.data);
        } else {
          setError("Unexpected data format.");
        }
      } catch (error) {
        setError(`Failed to fetch recipes: ${error.message}`);
      }
    };

    fetchRecipes();
  }, []);

  // Function to toggle heart status
  const toggleHeart = (recipeId) => {
    setHeartFilled((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId], // Toggle the heart status
    }));
  };

  return (
    <>
      <NavBar />
      <section className="categoryContainer" id="trending">
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-title text-center">
              <h2>Featured Recipes</h2>
              <Link to="/featured-recipes" className="view-more-button">
                View More
              </Link>
            </div>
          </div>

          {error ? (
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <p className="error-message">{error}</p>
              </div>
            </div>
          ) : (
            <div className="row custom-row">
              {recipes.map((recipe) => (
                <div className="col-lg-4 col-md-4 margin-adjust" key={recipe.Recipe_id}>
                  <div className="single-blog-inner" style={{ border: '2px solid yellow' }}>
                    <div className="post-image">
                      <img
                        src={recipe.Recipe_Thumbnail || "/default-image.jpg"}
                        alt={recipe.Recipe_Title || "Recipe Image"}
                        className="image-container"
                      />
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`heart-icon ${heartFilled[recipe.Recipe_id] ? 'filled' : ''}`}
                        onClick={() => toggleHeart(recipe.Recipe_id)}
                      />
                    </div>
                    <div className="post-content">
                      <div className="post-details">
                        <div className="post-title">
                          <h3>{recipe.Recipe_Title || "Untitled Recipe"}</h3>
                          <Link to={`/recipes/subcategory/${recipe.Sub_Category_id}/${recipe.Recipe_id}`} className="btn cat-view-more-button">
                          View
                          </Link>
                        </div>
                      </div>
                      {/* Render description with or without HTML */}
                      <p
                        className="recipe-description"
                        dangerouslySetInnerHTML={{
                          __html: recipe.Recipe_Description || "No description available.",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FeaturedRecipes;
