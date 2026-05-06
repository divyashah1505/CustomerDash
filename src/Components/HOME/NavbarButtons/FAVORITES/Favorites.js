// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Favorites.css"; // Import your CSS file
// import image1 from '../../../IMAGES/E-learning-images/food1.webp';
// import image2 from '../../../IMAGES/E-learning-images/food4.webp';
// import image3 from '../../../IMAGES/E-learning-images/food3.webp';
// import image4 from '../../../IMAGES/E-learning-images/food2.webp';
// import image5 from '../../../IMAGES/E-learning-images/sev-tameta.webp';
// import image6 from '../../../IMAGES/E-learning-images/pineapple-pizza.webp';
// import NavBar from "../../NAVBAR/NavBar";

// const favoritesItems = [
//   {
//     image: image1,
//     categoryName : "Chill Bliss",
//     title: "Smoked Salmon Pizza",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.5",
//   },
//   {
//     image: image2,
//     categoryName : "Chill Bliss",
//     title: "Chorizo Tacos",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.8",
//   },
//   {
//     image: image3,
//     categoryName : "Chill Bliss",
//     title: "Barbacoa",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.2",
//   },
//   {
//     image: image4,
//     categoryName : "Chill Bliss",
//     title: "Broccoli Tofu Salad",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.6",
//   },
//   {
//     image: image5,
//     categoryName : "Chill Bliss",
//     title: "Sev Tameta",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.3",
//   },
//   {
//     image: image6,
//     categoryName : "Chill Bliss",
//     title: "Pineapple Cheese Pizza",
//     duration: "1 Hour 30 Minutes",
//     rating: "4.1",
//   },
// ];

// // Use the titles from the favoritesItems array to initialize the favorites state directly
// const initialFavorites = favoritesItems.map(item => item.title);

// const Favorites = () => {
//   const [favorites, setFavorites] = useState(initialFavorites);

//   const handleFavoriteClick = (itemName) => {
//     let updatedFavorites = favorites.filter(favorite => favorite !== itemName); // Filter out the item that is no longer a favorite
//     setFavorites(updatedFavorites); // Update the state
//     toast.error(`Recipe "${itemName}" removed from Favorites`, { className: "toast-error" });
//   };

//   return (
//     <>
//       <NavBar/>
//       <ToastContainer position="top-right" autoClose={1000} hideProgressBar closeButton={false} />
//       <section className="favoritesContainer" id='favorites'>
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="section-title text-center">
//               <h2>Your Favorites ❤️</h2>
//             </div>
//           </div>
//           <div className="row custom-row">
//             {favoritesItems.filter(item => favorites.includes(item.title)).map((item, index) => (
//               <div className="col-lg-4 col-md-4 margin-adjust" key={index}>
//                 <div className="single-blog-inner">
//                   <div className="post-image">
//                     <Link to="blog-details.html">
//                       <img src={item.image} alt="" className="image-container" />
//                       <div className="play-button">
//                         <span>&#9654;</span>
//                       </div>
//                       {/* <div className="rating-box">
//                         <p>{item.duration}</p>
//                       </div> */}
//                     </Link>
//                   </div>
//                   <div className="post-content">
//                     <div className="post-details">
//                       <div className="post-title">
//                         <h6>{item.categoryName}</h6>
//                         <h3><a href="blog-details.html">{item.title}</a></h3>
//                       </div>
//                       <div className="post-info d-flex">
//                         <span>{item.duration}</span>
//                         <span className={`favorite-heart ${favorites.includes(item.title) ? 'favorited' : ''}`} onClick={() => handleFavoriteClick(item.title)}>
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

// export default Favorites;







import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../config/config";
import "../../PopularCategories/Category.css";
import NavBar from "../../NAVBAR/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from "../../MODAL/Modal";

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [heartFilled, setHeartFilled] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState(null);
  const isAuthenticated = !!localStorage.getItem("token"); 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/featured`);
        if (!response.ok) {
          throw new Error("Failed to fetch Featured Recipes");
        }
        const data = await response.json();
        const sortedRecipes = data.sort((a, b) => b.Recipe_id - a.Recipe_id);
        const initialHeartState = sortedRecipes.reduce((acc, recipe) => {
          acc[recipe.Recipe_id] = false;
          return acc;
        }, {});
        setHeartFilled(initialHeartState);
        setRecipes(sortedRecipes);
      } catch (error) {
        console.error("Error fetching Featured Recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const toggleHeart = async (recipe) => {
    if (!isAuthenticated) {
      setRedirectRoute(`/featured-videos`);
      setIsModalOpen(true);
      return;
    }
  };

  return (
    <>
      <NavBar/>
      <section className="categoryContainer" id="Featured">
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          redirectTo={redirectRoute}
          message="Please Sign-In to add to favorites."
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-title text-center">
              <h2>Favorites Recipe</h2>
              <span>
              </span>  
            </div>
          </div>
          <div className="row custom-row">
            {recipes.map((recipe, index) => (
              <div className="col-lg-4 col-md-4 margin-adjust" key={index}>
                <div className="single-blog-inner">
                  <div className="post-image">
                    <img src={recipe.Recipe_Thumbnail} alt={recipe.Recipe_Title} className="image-container"/>
                    <FontAwesomeIcon 
                      icon={faHeart} 
                      className={`heart-icon ${heartFilled[recipe.Recipe_id] ? 'filled' : ''}`} 
                      onClick={() => toggleHeart(recipe)} 
                    />
                  </div>
                  <div className="post-content">
                    <div className="post-details">
                      <div className="post-title">
                        <h3>{recipe.Recipe_Title}</h3>
                        {isAuthenticated ? (
                          <Link
                            to={`/recipes/subcategory/${recipe.Sub_Category_id}/${recipe.Recipe_id}`} 
                            className="btn cat-view-more-button"
                          >
                            View 
                          </Link>
                        ) : (
                          <button className="btn cat-view-more-button" onClick={() => toggleHeart(recipe)}>View</button>
                        )}
                      </div>
                    </div>
                    <p>{recipe.Recipe_Description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorites;
