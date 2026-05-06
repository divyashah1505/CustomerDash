// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { BASE_URL } from "../../../config/config";
// import Modal from "../MODAL/Modal";
// import "./Category.css";

// const ViewRecipes = () => {
//   const { subcategoryId } = useParams();
//   const [recipes, setRecipes] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchCategoryName = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/viewcategories`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch categories`);
//         }
//         const categories = await response.json();

//         const category = categories.find(cat => cat.Category_id === parseInt(subcategoryId, 10));
//         if (category) {
//           setCategoryName(category.Category_Name);
//         } else {
//           console.log(`Category with ID: ${subcategoryId} not found`);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     if (subcategoryId) {
//       fetchCategoryName();
//     } else {
//       console.log("subcategoryId is undefined or null");
//     }
//   }, [subcategoryId]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch recipes");
//         }
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       }
//     };

//     fetchRecipes();
//   }, [subcategoryId]);

//   const handleViewRecipesClick = (e, recipeId) => {
//     e.preventDefault();
//     // Handle the click event
//     // For example, you can redirect the user to another page
//     // window.location.href = `/recipes/${recipeId}`;
//   };

//   return (
//     <section className="categoryContainer" id="recipes">
//       <Modal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         message="Please Sign-In to view Recipes."
//       />
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="section-title text-center">
//             <h2>Recipes under {categoryName}</h2>
//           </div>
//         </div>
//         <div className="row custom-row">
//           {recipes.length > 0 ? (
//             recipes.map((recipe) => (
//               <div className="col-lg-4 col-md-4 margin-adjust" key={recipe.Recipe_id}>
//                 <div className="single-blog-inner">
//                   <div className="post-image">
//                     <img src={recipe.Recipe_Thumbnail} alt={recipe.Recipe_Title} className="image-container" />
//                   </div>
//                   <div className="post-content">
//                     <div className="post-details">
//                       <div className="post-title">
//                         <h3>{recipe.Recipe_Title}</h3>
//                       </div>
//                       <button onClick={(e) => handleViewRecipesClick(e, recipe.Recipe_id)} className="btn cat-view-more-button">
//                         View Recipe
//                       </button>
//                     </div>
//                     <p>{recipe.Recipe_Description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-12 text-center">
//               <p>No recipes found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ViewRecipes;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../../config/config";
// import Modal from "../MODAL/Modal";
// import "./Category.css";
// import NavBar from "../NAVBAR/NavBar";

// const ViewRecipes = () => {
//   const { subcategoryId } = useParams();
//   const [recipes, setRecipes] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategoryName = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/viewcategories`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch categories`);
//         }
//         const categories = await response.json();

//         const category = categories.find(cat => cat.Category_id === parseInt(subcategoryId, 10));
//         if (category) {
//           setCategoryName(category.Category_Name);
//         } else {
//           console.log(`Category with ID: ${subcategoryId} not found`);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     if (subcategoryId) {
//       fetchCategoryName();
//     } else {
//       console.log("subcategoryId is undefined or null");
//     }
//   }, [subcategoryId]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch recipes");
//         }
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       }
//     };

//     fetchRecipes();
//   }, [subcategoryId]);

//   const handleViewRecipesClick = (e, recipeId) => {
//     e.preventDefault();
//     // Redirect to RecipeDetails component
//     navigate(`/recipes/subcategory/${subcategoryId}/${recipeId}`);
//   };

//   return (
//     <>
//     <NavBar/>
//     <section className="categoryContainer mt-lg-5" id="recipes">
//       <Modal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         message="Please Sign-In to view Recipes."
//       />
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="section-title text-center">
//             <h2>Recipes under {categoryName}</h2>
//           </div>
//         </div>
//         <div className="row custom-row">
//           {recipes.length > 0 ? (
//             recipes.map((recipe) => (
//               <div className="col-lg-4 col-md-4 margin-adjust" key={recipe.Recipe_id}>
//                 <div className="single-blog-inner">
//                   <div className="post-image">
//                     <img src={recipe.Recipe_Thumbnail} alt={recipe.Recipe_Title} className="image-container" />
//                   </div>
//                   <div className="post-content">
//                     <div className="post-details">
//                       <div className="post-title">
//                         <h3>{recipe.Recipe_Title}</h3>
//                         <button onClick={(e) => handleViewRecipesClick(e, recipe.Recipe_id)} className="btn cat-view-more-button">
//                           view
//                         </button>
//                       </div>
//                     </div>
//                     <p>{recipe.Recipe_Description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-12 text-center">
//               <p>No recipes found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//     </>
//   );
// };

// export default ViewRecipes;






import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config/config";
import Modal from "../MODAL/Modal";
import "./Category.css";
import NavBar from "../NAVBAR/NavBar";

const ViewRecipes = () => {
  const { subcategoryId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await fetch(`${BASE_URL}/viewcategories`);
        if (!response.ok) {
          throw new Error(`Failed to fetch categories`);
        }
        const categories = await response.json();

        const category = categories.find(cat => cat.Category_id === parseInt(subcategoryId, 10));
        if (category) {
          setCategoryName(category.Category_Name);
        } else {
          console.log(`Category with ID: ${subcategoryId} not found`);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (subcategoryId) {
      fetchCategoryName();
    } else {
      console.log("subcategoryId is undefined or null");
    }
  }, [subcategoryId]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`, {
          headers: {
            "ngrok-skip-browser-warning": "true", // Skip ngrok browser warning
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    

    fetchRecipes();
  }, [subcategoryId]);

  const handleViewRecipesClick = (e, recipeId) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      setIsModalOpen(true);
    } else {
      navigate(`/recipes/subcategory/${subcategoryId}/${recipeId}`);
    }
  };

  // Add a check for authentication before rendering the component
  useEffect(() => {
    // Check if the user is authenticated, if not, redirect to login page
    if (!localStorage.getItem("token")) {
      navigate("/login"); // Change "/login" to your actual login route
    }
  }, []);

  return (
    <>
    <NavBar/>
    <section className="categoryContainer mt-lg-5" id="recipes">
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message="Please Sign-In to view Recipes."
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="section-title text-center">
            <h2>Recipes under {categoryName}</h2>
          </div>
        </div>
        <div className="row custom-row">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div className="col-lg-4 col-md-4 margin-adjust" key={recipe.Recipe_id}>
                <div className="single-blog-inner">
                  <div className="post-image">
                    <img src={recipe.Recipe_Thumbnail} alt={recipe.Recipe_Title} className="image-container" />
                  </div>
                  <div className="post-content">
                    <div className="post-details">
                      <div className="post-title">
                        <h3>{recipe.Recipe_Title}</h3>
                        <button onClick={(e) => handleViewRecipesClick(e, recipe.Recipe_id)} className="btn cat-view-more-button">
                          view
                        </button>
                      </div>
                    </div>
                    <p>{recipe.Recipe_Description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No recipes found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default ViewRecipes;
