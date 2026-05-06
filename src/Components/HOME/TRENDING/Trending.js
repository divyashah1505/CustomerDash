// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../templateStyles.css"; // Import your CSS file
// import image1 from '../../IMAGES/E-learning-images/food1.webp';
// import image2 from '../../IMAGES/E-learning-images/food4.webp';
// import image3 from '../../IMAGES/E-learning-images/food3.webp';

// const Trending = () => {
//   const [favorites, setFavorites] = useState([]);

//   const handleFavoriteClick = (itemName) => {
//     const updatedFavorites = [...favorites];
//     const index = updatedFavorites.indexOf(itemName);
//     if (index !== -1) {
//       updatedFavorites.splice(index, 1);
//       toast.error(`Recipe "${itemName}" removed from Favorites`, {className : "toast-error"});
//     } else {
//       updatedFavorites.push(itemName);
//       toast.success(`Recipe "${itemName}" added to Favorites` , {className : "toast-success"});
//     }
//     setFavorites(updatedFavorites);

//     // Display updated favorites array in the console
//     console.log("Favorites array:", updatedFavorites);
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={1000} // Set the autoClose duration to 1 second
//         hideProgressBar
//         closeButton={false} // Disable the close button
//       />
//       <section className="pt-40 pb-80" id='trending'>
//       <div className="container">
//           <div className="row justify-content-center">
//             <div className="section-title text-center">
//               <h2> Trending(Featured) Video 🔥</h2>
//             </div>
//           </div>
//           <div className="row">
//             {trendingItems.map((item, index) => (
//               <div className="col-lg-4 col-md-4" key={index}>
//                 <div className="single-blog-inner">
//                   <div className="post-image">
//                     <Link to="blog-details.html">
//                       <img
//                         src={item.image}
//                         alt=""
//                         className="image-container"
//                       />
//                        <div className="play-button">
//                         <span>&#9654;</span>
//                       </div>

//                       {/* <div className="rating-box">
//                         <p>{item.rating} &#9733;</p>
//                       </div> */}
//                     </Link>
//                   </div>
//                   <div className="post-content">
//                     <div className="post-details">
//                       <hr className="horizon" />

//                       <div className="post-title">
//                         <h3>
//                           <a href="blog-details.html">{item.title}</a>
//                         </h3>
//                       </div>

//                       <div className="post-info d-flex">
//                         <span>{item.duration}</span>
//                         <span
//                           className={`favorite-heart ${
//                             favorites.includes(item.title) ? 'favorited' : ''
//                           }`}
//                           onClick={() => handleFavoriteClick(item.title)}
//                         >
//                           &#10084;
//                         </span>
//                       </div>

//                     </div>
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

// const trendingItems = [
//   {
//     image: image1,
//     title: "Smoked Salmon Pizza",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.5",
//   },
//   {
//     image: image2,
//     title: "Chorizo Tacos",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.8",
//   },
//   {
//     image: image3,
//     title: "Barbacoa",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.2",
//   },
// ];

// export default Trending;









// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../PopularCategories/Category.css"; 
// import image1 from '../../IMAGES/E-learning-images/food1.webp';
// import image2 from '../../IMAGES/E-learning-images/food4.webp';
// import image3 from '../../IMAGES/E-learning-images/food3.webp';

// const Trending = () => {
//   const [favorites, setFavorites] = useState([]);

//   const handleFavoriteClick = (itemName) => {
//     const updatedFavorites = [...favorites];
//     const index = updatedFavorites.indexOf(itemName);
//     if (index !== -1) {
//       updatedFavorites.splice(index, 1);
//       toast.error(`Recipe "${itemName}" removed from Favorites`, {className : "toast-error"});
//     } else {
//       updatedFavorites.push(itemName);
//       toast.success(`Recipe "${itemName}" added to Favorites` , {className : "toast-success"});
//     }
//     setFavorites(updatedFavorites);

//     // Display updated favorites array in the console
//     console.log("Favorites array:", updatedFavorites);
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={1000} // Set the autoClose duration to 1 second
//         hideProgressBar
//         closeButton={false} // Disable the close button
//       />
//       <section className="pt-40 pb-80" id='trending'>
//       <div className="container">
//           <div className="row justify-content-center">
//             <div className="section-title text-center">
//               <h2> Trending(Featured) Video 🔥</h2>
//             </div>
//           </div>
//           <div className="row">
//             {trendingItems.map((item, index) => (
//               <div className="col-lg-4 col-md-4 margin-adjust" key={index}>
//                 <div className="single-blog-inner">
//                   <div className="post-image">
//                     <Link to="blog-details.html">
//                       <img
//                         src={item.image}
//                         alt=""
//                         className="image-container"
//                       />
//                        <div className="play-button">
//                         <span>&#9654;</span>
//                       </div>

//                       {/* <div className="rating-box">
//                         <p>{item.rating} &#9733;</p>
//                       </div> */}
//                     </Link>
//                   </div>
//                   <div className="post-content">
//                     <div className="post-details">
//                       <hr className="horizon" />

//                       <div className="post-title">
//                         <h3>
//                           <a href="blog-details.html">{item.title}</a>
//                         </h3>
//                       </div>

//                       <div className="post-info d-flex">
//                         <span>{item.duration}</span>
//                         <span
//                           className={`favorite-heart ${
//                             favorites.includes(item.title) ? 'favorited' : ''
//                           }`}
//                           onClick={() => handleFavoriteClick(item.title)}
//                         >
//                           &#10084;
//                         </span>
//                       </div>

//                     </div>
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

// const trendingItems = [
//   {
//     image: image1,
//     title: "Smoked Salmon Pizza",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.5",
//   },
//   {
//     image: image2,
//     title: "Chorizo Tacos",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.8",
//   },
//   {
//     image: image3,
//     title: "Barbacoa",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.2",
//   },
// ];

// export default Trending;










// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../../../config/config";
// import "../PopularCategories/Category.css";


// const Trending = () => {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/recipes/featured`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch Featured Recipes");
//         }
//         const data = await response.json();
//         // Sort the recipes based on recipe_id in descending order
//         const sortedRecipes = data.sort((a, b) => b.Recipe_id - a.Recipe_id);
//         // Slice the array to only include the first three elements
//         const topThreeRecipes = sortedRecipes.slice(0, 3);
//         setRecipes(topThreeRecipes);
//       } catch (error) {
//         console.error("Error fetching Featured Recipes:", error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   return (
//     <section className="categoryContainer" id="trending">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="section-title text-center">
//             <h2>Featured(Trending) Recipe</h2>
//             <span>
//               <Link to="/featured-videos" className="view-more-button">
//                 <span> View More </span>
//               </Link>
//             </span>  
//           </div>
//         </div>
//         <div className="row custom-row">
//           {recipes.map((recipe, index) => (
//             <div className="col-lg-4 col-md-4 margin-adjust" key={index}>
//               <div className="single-blog-inner">
//                 <div className="post-image">
//                   <img src={recipe.Recipe_Thumbnail} alt={recipe.Recipe_Title} className="image-container"/>
//                 </div>
//                 <div className="post-content">
//                   <div className="post-details">
//                     <div className="post-title">
//                       <h3>{recipe.Recipe_Title}</h3>
//                       <Link
//                         to={`/recipes/subcategory/${recipe.Sub_Category_id}/${recipe.Recipe_id}`} 
//                         className="btn cat-view-more-button"
//                         >
//                         View 
//                       </Link>
//                     </div>
//                   </div>

//                   <p>{recipe.Recipe_Description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Trending;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../PopularCategories/Category.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';

// const Trending = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [heartFilled, setHeartFilled] = useState({});
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/recipes/featured`);

//         if (!response.ok) {
//           throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
//         }

//         const data = await response.json();

//         if (data.success && Array.isArray(data.data)) {
//           setRecipes(data.data);  // ✅ Ensure data.data is an array before setting
//         } else {
//           throw new Error("Invalid API response format.");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching Featured Recipes:", error);
//         setError("Failed to load recipes. Please try again later.");
//       }
//     };



//     fetchRecipes();
//   }, []);

//   const toggleHeart = async (recipeId) => {
//     const isFavorite = heartFilled[recipeId];
//     const customerId = localStorage.getItem("customerId");

//     if (!customerId) {
//       alert("Please log in to add to favorites.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${BASE_URL}/favorites/${isFavorite ? `${recipeId}/remove` : "add"}`,
//         {
//           method: isFavorite ? "DELETE" : "POST",
//           headers: { "Content-Type": "application/json" },
//           body: isFavorite ? null : JSON.stringify({ user_id: customerId, recipe_id: recipeId }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to ${isFavorite ? "remove from" : "add to"} favorites`);
//       }

//       console.log(`${isFavorite ? "Removed from" : "Added to"} favorites successfully`);
//       setHeartFilled((prev) => ({ ...prev, [recipeId]: !isFavorite }));
//     } catch (error) {
//       console.error(`Error ${isFavorite ? "removing from" : "adding to"} favorites:`, error);
//     }
//   };

//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <section className="categoryContainer" id="trending">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="section-title text-center">
//             <h2>Featured (Trending) Recipes</h2>
//             <span>
//               <Link to="/featured-videos" className="view-more-button">
//                 <span>View More</span>
//               </Link>
//             </span>
//           </div>
//         </div>
//         <div className="row custom-row">
//           {recipes.length > 0 ? (
//             recipes.map((recipe) => (
//               <div className="col-lg-4 col-md-4 margin-adjust" key={recipe.Recipe_id}>
//                 <div className="single-blog-inner">
//                   <div className="post-image">
//                     <img src={recipe.Recipe_Thumbnail} alt={recipe.Recipe_Title} className="image-container" />
//                     <FontAwesomeIcon
//                       icon={faHeart}
//                       className={`heart-icon ${heartFilled[recipe.Recipe_id] ? "filled" : ""}`}
//                       onClick={() => toggleHeart(recipe.Recipe_id)}
//                     />
//                   </div>
//                   <div className="post-content">
//                     <div className="post-details">
//                       <div className="post-title">
//                         <h3>{recipe.Recipe_Title}</h3>
//                         <Link
//                           to={`/recipes/subcategory/${recipe.Sub_Category_id}/${recipe.Recipe_id}`}
//                           className="btn cat-view-more-button"
//                         >
//                           View
//                         </Link>
//                       </div>
//                     </div>
//                     <p>{recipe.Recipe_Description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-recipes-message">
//               <p>No trending recipes found. Check back later!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Trending;





import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../config/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Replace this with your actual ngrok or backend base URL

const Trending = () => {
  const [recipes, setRecipes] = useState([]);
  const [heartFilled, setHeartFilled] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/featured`, {
          headers: { "ngrok-skip-browser-warning": "true" },
          credentials: "include" // add this line for cookie-based auth


        });

        if (!response.ok) throw new Error("Failed to fetch Featured Recipes");

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON response");
        }

        const { success, data } = await response.json();

        if (!success || !Array.isArray(data) || data.length === 0) {
          // console.warn("No featured recipes found!");
          setRecipes([]); // Set empty array if no recipes are found
          return;
        }

        console.log("✅ API Response Data:", data);
        const sortedRecipes = data
          .sort((a, b) => b.Recipe_id - a.Recipe_id)
          .slice(0, 3); // show latest 3

        setRecipes(sortedRecipes);
      } catch (error) {
        console.error("Error fetching Featured Recipes:", error);
        setError("Something went wrong while fetching recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const toggleHeart = async (recipeId) => {
    const isFilled = heartFilled[recipeId];
    const customerId = localStorage.getItem('customerId');
    const url = `${BASE_URL}/favorites/${isFilled ? `${recipeId}/remove` : "add"}`;
    const method = isFilled ? "DELETE" : "POST";
    const body = isFilled ? null : JSON.stringify({ user_id: customerId, recipe_id: recipeId });

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });
      if (!response.ok) {
        throw new Error(`Failed to ${isFilled ? "remove" : "add"} from favorites`);
      }
      console.log(`${isFilled ? "Removed from" : "Added to"} favorites successfully`);
      setHeartFilled((prev) => ({ ...prev, [recipeId]: !isFilled }));
    } catch (error) {
      console.error(`Error ${isFilled ? "removing from" : "adding to"} favorites:`, error);
    }
  };

  return (
    <section className="categoryContainer" id="trending">
      <div className="container">
        <div className="row justify-content-center">
          <div className="section-title text-center">
            <h2>Featured (Trending) Recipes</h2>
            <Link to="/featured-videos" className="view-more-button">
              View More
            </Link>
          </div>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && recipes.length === 0 && (
          <p className="text-center">No featured recipes available right now.</p>
        )}

        <div className="row custom-row">
          {recipes.map((recipe) => (
            <div className="col-lg-4 col-md-4 margin-adjust" key={recipe.Recipe_id}>
              <div className="single-blog-inner">
                <div className="post-image">
                  <img src={recipe.Recipe_Thumbnail || recipe.Recipe_image} alt={recipe.Recipe_Title || recipe.Recipe_name} className="image-container" />
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`heart-icon ${heartFilled[recipe.Recipe_id] ? 'filled' : ''}`}
                    onClick={() => toggleHeart(recipe.Recipe_id)}
                  />
                </div>
                <div className="post-content">
                  <div className="post-details">
                    <div className="post-title">
                      <h3>{recipe.Recipe_Title || recipe.Recipe_name}</h3>
                      <Link to={`/recipes/subcategory/${recipe.Sub_Category_id}/${recipe.Recipe_id}`} className="btn cat-view-more-button">
                        View
                      </Link>
                    </div>
                  </div>
                  <p>{recipe.Recipe_Description || "No description provided."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
