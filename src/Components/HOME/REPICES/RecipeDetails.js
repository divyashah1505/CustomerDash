// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./RecipeDetails.css";
// import NavBar from '../NAVBAR/NavBar';
// import commentAuthor from '../../IMAGES/comment-author.png';
// import commentAuthor2 from '../../IMAGES/Account.jpg';
// import { BASE_URL } from '../../../config/config';

// export default function Recipes() {
//     const { subcategoryId, recipeId } = useParams();
//     const navigate = useNavigate();
//     const [recipeDetails, setRecipeDetails] = useState(null);
//     const [comments, setComments] = useState([
//         {
//             name: "Dev Gajjar",
//             date: "February 29,2024 - 4:04 pm",
//             message: "Easy to learn and Cook!!",
//             avatar: commentAuthor,
//         },
//         {
//             name: "Call me Taeni",
//             date: "January 22,2024 - 7:35 pm",
//             message: "Please upload a video of cooking Khavsa..",
//             avatar: commentAuthor2,
//         },
//     ]);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         message: "",
//     });
//     const [showVideo, setShowVideo] = useState(false);
//     const [similarRecipes, setSimilarRecipes] = useState([]);

//     useEffect(() => {
//         const fetchRecipeDetails = async () => {
//             try {
//                 const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}/${recipeId}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch recipe details');
//                 }
//                 const data = await response.json();
//                 setRecipeDetails(data);
//             } catch (error) {
//                 console.error("Error fetching recipe details:", error);
//             }
//         };

//         const fetchSimilarRecipes = async () => {
//             try {
//                 const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch similar recipes');
//                 }
//                 const data = await response.json();
//                 const filteredRecipes = data.filter(recipe => recipe.recipeId !== recipeId);
//                 const shuffledData = filteredRecipes.sort(() => Math.random() - 0.5);
//                 const randomRecipes = shuffledData.slice(0, 3);
//                 setSimilarRecipes(randomRecipes);
//             } catch (error) {
//                 console.error("Error fetching similar recipes:", error);
//             }
//         };


//         if (subcategoryId && recipeId) {
//             fetchRecipeDetails();
//             fetchSimilarRecipes();
//         }
//     }, [subcategoryId, recipeId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const now = new Date();

//         const formattedDate = now.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//         });
        
//         const formattedTime = now.toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//         });

//         const newComment = {
//             name: formData.name,
//             date: `${formattedDate} - ${formattedTime}`,
//             message: formData.message,
//             avatar: commentAuthor,
//         };

//         setComments(prevComments => [...prevComments, newComment]);
//         setFormData({ name: "", email: "", message: "" });
//     };

//     const handleThumbnailClick = () => {
//         setShowVideo(true);
//     };

//     const handleCloseVideo = () => {
//         setShowVideo(false);
//     };

//     const handleViewMore = () => {
//         navigate(`/recipes/subcategory/${subcategoryId}`);
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const options = { day: '2-digit', month: 'short' };
//         return date.toLocaleDateString('en-US', options);
//     };

//     return (
//         <>
//             <NavBar />
//             <div className="mt-150 mb-120">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-8">
//                             <div className="DC-blog-details-inner">
//                                 {recipeDetails && (
//                                     <div className="DC-single-blog-inner">
//                                         <div className="DC-post-image">
//                                             {showVideo ? (
//                                                 <div className="video-container">
//                                                     <button className="close-video-btn" onClick={handleCloseVideo}>
//                                                        X
//                                                     </button>
//                                                     <video controls src={recipeDetails.Recipe_Url} className="img-fluid" />
//                                                 </div>
                                                
//                                                 ) : (
//                                                     <>
//                                                         <img src={recipeDetails.Recipe_Thumbnail} alt="Recipe Thumbnail"/>
//                                                         <div className="play-button" onClick={handleThumbnailClick}>
//                                                             <span>&#9658;</span>
//                                                         </div>
//                                                         <div className="post-date">
//                                                             <p><span>{formatDate(recipeDetails.createdAt)}</span></p>
//                                                         </div>
//                                                     </>
//                                                 )}

//                                         </div>
//                                         <div className="DC-post-content">    
//                                             <h2 className="mt-3 underline">Recipe : {recipeDetails.Recipe_Title}</h2>
//                                         </div>
//                                         <div className="single-sidebar-widget mt-30">
//                                             <span className="mt-3 recipe_description">Recipe Description: </span>
//                                             <p className="recipe_description">{recipeDetails.Recipe_Description}</p>
//                                         </div>    
//                                     </div>
//                                 )}
//                                 <div className="DC-post-comment">
//                                     <h3>{comments.length} Comments</h3>
//                                     <ul className="post-comments p-0 m-0 list-unstyled">
//                                         {comments.map((comment, index) => (
//                                             <li key={index}>
//                                                 <div className="DC-comment-author-details media">
//                                                     <img src={comment.avatar} alt="" />
//                                                     <div className="DC-comment-author-content">
//                                                         <div className="comment-header">
//                                                             <h5>{comment.name}</h5>
//                                                             <h6>{comment.date}</h6>
//                                                         </div>
//                                                         <p>{comment.message}</p>
//                                                         <a href="/" className="btn">Reply</a>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                                 <div className="contact-form contact-page-form parsley-validate">
//                                     <h3>Leave a Comment</h3>
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <input
//                                                     type="text"
//                                                     name="name"
//                                                     placeholder="Full Name"
//                                                     className="theme-input-style"
//                                                     value={formData.name}
//                                                     onChange={handleChange}
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <input
//                                                     type="email"
//                                                     name="email"
//                                                     placeholder="Email Address"
//                                                     className="theme-input-style"
//                                                     value={formData.email}
//                                                     onChange={handleChange}
//                                                     required
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-md-12">
//                                                 <textarea
//                                                     name="message"
//                                                     placeholder="Write Message"
//                                                     className="theme-input-style"
//                                                     value={formData.message}
//                                                     onChange={handleChange}
//                                                 ></textarea>
//                                                 <div className="submit-btn">
//                                                     <button type="submit" className="btn">Send Message</button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-4">
//                             <aside>
//                                 <div className="single-sidebar-widget mb-30">
//                                     <div className="sidebar-title">
//                                         <h5 className='underline'>Similar in this SubCategory</h5>
//                                     </div>
//                                     <div className="sidebar-body latest-post">
//                                         <ul>
//                                             {similarRecipes.map((recipe, index) => (
//                                                 <li key={index}>
//                                                     <div className="DC-latest-post-wrap media">
//                                                         <img className='similar_in_Image' src={recipe.Recipe_Thumbnail} alt=""/>
//                                                         <div className="latest-post-body media-body">
//                                                             <p>{recipe.Recipe_Title}</p>
//                                                         </div>
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                         <span>
//                                             <button onClick={handleViewMore} className="view_more_button">
//                                                 <span> View More </span>
//                                             </button>
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {recipeDetails && (
//                                     <div className="single-sidebar-widget mb-30">
//                                         <div className="sidebar-title">
//                                             <h5 className='underline'>Ingredients</h5>
//                                         </div>

//                                         <div className="sidebar-body latest-post">
//                                             <span>{recipeDetails.Recipe_Ingredients}</span>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {recipeDetails && (
//                                     <div className="single-sidebar-widget mb-30">
//                                         <div className="sidebar-title">
//                                             <h5 className='underline'>Nutritional Info</h5>
//                                         </div>
                                        
//                                         <div className="sidebar-body latest-post">
//                                             <span>{recipeDetails.Recipe_Nutritional_Info}</span>
//                                         </div>
//                                     </div>
//                                 )}
//                             </aside>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }











// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./RecipeDetails.css";
// import NavBar from '../NAVBAR/NavBar';
// import commentAuthor from '../../IMAGES/comment-author.png';
// import commentAuthor2 from '../../IMAGES/Account.jpg';
// import { BASE_URL } from '../../../config/config';

// export default function Recipes() {
//     const { subcategoryId, recipeId } = useParams();
//     const navigate = useNavigate();
//     const [recipeDetails, setRecipeDetails] = useState(null);
//     const [comments, setComments] = useState([
//         {
//             name: "Dev Gajjar",
//             date: "February 29,2024 - 4:04 pm",
//             message: "Easy to learn and Cook!!",
//             avatar: commentAuthor,
//         },
//         {
//             name: "Call me Taeni",
//             date: "January 22,2024 - 7:35 pm",
//             message: "Please upload a video of cooking Khavsa..",
//             avatar: commentAuthor2,
//         },
//     ]);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         message: "",
//     });
//     const [showVideo, setShowVideo] = useState(false);
//     const [similarRecipes, setSimilarRecipes] = useState([]);

//     useEffect(() => {
//         const fetchRecipeDetails = async () => {
//             try {
//                 const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}/${recipeId}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch recipe details');
//                 }
//                 const data = await response.json();
//                 setRecipeDetails(data);
//             } catch (error) {
//                 console.error("Error fetching recipe details:", error);
//             }
//         };

//         const fetchSimilarRecipes = async () => {
//             try {
//                 const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch similar recipes');
//                 }
//                 const data = await response.json();
//                 const filteredRecipes = data.filter(recipe => recipe.Recipe_id !== recipeId);
//                 const shuffledData = filteredRecipes.sort(() => Math.random() - 0.5);
//                 const randomRecipes = shuffledData.slice(0, 3);
//                 setSimilarRecipes(randomRecipes);
//             } catch (error) {
//                 console.error("Error fetching similar recipes:", error);
//             }
//         };


//         if (subcategoryId && recipeId) {
//             fetchRecipeDetails();
//             fetchSimilarRecipes();
//         }
//     }, [subcategoryId, recipeId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const now = new Date();

//         const formattedDate = now.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//         });
        
//         const formattedTime = now.toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//         });

//         const newComment = {
//             name: formData.name,
//             date: `${formattedDate} - ${formattedTime}`,
//             message: formData.message,
//             avatar: commentAuthor,
//         };

//         setComments(prevComments => [...prevComments, newComment]);
//         setFormData({ name: "", email: "", message: "" });
//     };

//     const handleThumbnailClick = () => {
//         setShowVideo(true);
//     };

//     const handleCloseVideo = () => {
//         setShowVideo(false);
//     };

//     const handleViewMore = () => {
//         navigate(`/recipes/subcategory/${subcategoryId}`);
//     };

//     const handleRecipeClick = (recipeId) => {
//         navigate(`/recipes/subcategory/${subcategoryId}/${recipeId}`);
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const options = { day: '2-digit', month: 'short' };
//         return date.toLocaleDateString('en-US', options);
//     };

//     return (
//         <>
//             <NavBar />
//             <div className="mt-150 mb-120">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-8">
//                             <div className="DC-blog-details-inner">
//                                 {recipeDetails && (
//                                     <div className="DC-single-blog-inner">
//                                         <div className="DC-post-image">
//                                             {showVideo ? (
//                                                 <div className="video-container">
//                                                     <button className="close-video-btn" onClick={handleCloseVideo}>
//                                                        X
//                                                     </button>
//                                                     <video controls src={recipeDetails.Recipe_Url} className="img-fluid" />
//                                                 </div>
                                                
//                                                 ) : (
//                                                     <>
//                                                         <img src={recipeDetails.Recipe_Thumbnail} alt="Recipe Thumbnail"/>
//                                                         <div className="play-button" onClick={handleThumbnailClick}>
//                                                             <span>&#9658;</span>
//                                                         </div>
//                                                         <div className="post-date">
//                                                             <p><span>{formatDate(recipeDetails.createdAt)}</span></p>
//                                                         </div>
//                                                     </>
//                                                 )}

//                                         </div>
//                                         <div className="DC-post-content">    
//                                             <h2 className="mt-3 underline">Recipe : {recipeDetails.Recipe_Title}</h2>
//                                         </div>
//                                         <div className="single-sidebar-widget mt-30">
//                                             <span className="mt-3 recipe_description">Recipe Description: </span>
//                                             <p className="recipe_description">{recipeDetails.Recipe_Description}</p>
//                                         </div>    
//                                     </div>
//                                 )}
//                                 <div className="DC-post-comment">
//                                     <h3>{comments.length} Comments</h3>
//                                     <ul className="post-comments p-0 m-0 list-unstyled">
//                                         {comments.map((comment, index) => (
//                                             <li key={index}>
//                                                 <div className="DC-comment-author-details media">
//                                                     <img src={comment.avatar} alt="" />
//                                                     <div className="DC-comment-author-content">
//                                                         <div className="comment-header">
//                                                             <h5>{comment.name}</h5>
//                                                             <h6>{comment.date}</h6>
//                                                         </div>
//                                                         <p>{comment.message}</p>
//                                                         <a href="/" className="btn">Reply</a>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                                 <div className="contact-form contact-page-form parsley-validate">
//                                     <h3>Leave a Comment</h3>
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <input
//                                                     type="text"
//                                                     name="name"
//                                                     placeholder="Full Name"
//                                                     className="theme-input-style"
//                                                     value={formData.name}
//                                                     onChange={handleChange}
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <input
//                                                     type="email"
//                                                     name="email"
//                                                     placeholder="Email Address"
//                                                     className="theme-input-style"
//                                                     value={formData.email}
//                                                     onChange={handleChange}
//                                                     required
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-md-12">
//                                                 <textarea
//                                                     name="message"
//                                                     placeholder="Write Message"
//                                                     className="theme-input-style"
//                                                     value={formData.message}
//                                                     onChange={handleChange}
//                                                 ></textarea>
//                                                 <div className="submit-btn">
//                                                     <button type="submit" className="btn">Send Message</button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-4">
//                             <aside>
//                                 <div className="single-sidebar-widget mb-30">
//                                     <div className="sidebar-title">
//                                         <h5 className='underline'>Similar in this SubCategory</h5>
//                                     </div>
//                                     <div className="sidebar-body latest-post">
//                                         <ul>
//                                             {similarRecipes.map((recipe, index) => (
//                                                 <li key={index} onClick={() => handleRecipeClick(recipe.Recipe_id)}>
//                                                     <div className="DC-latest-post-wrap media">
//                                                         <img className='similar_in_Image' src={recipe.Recipe_Thumbnail} alt=""/>
//                                                         <div className="latest-post-body media-body">
//                                                             <p>{recipe.Recipe_Title}</p>
//                                                         </div>
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                         <span>
//                                             <button onClick={handleViewMore} className="view_more_button">
//                                                 <span> View More </span>
//                                             </button>
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {recipeDetails && (
//                                     <div className="single-sidebar-widget mb-30">
//                                         <div className="sidebar-title">
//                                             <h5 className='underline'>Ingredients</h5>
//                                         </div>

//                                         <div className="sidebar-body latest-post">
//                                             <span>{recipeDetails.Recipe_Ingredients}</span>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {recipeDetails && (
//                                     <div className="single-sidebar-widget mb-30">
//                                         <div className="sidebar-title">
//                                             <h5 className='underline'>Nutritional Info</h5>
//                                         </div>
                                        
//                                         <div className="sidebar-body latest-post">
//                                             <span>{recipeDetails.Recipe_Nutritional_Info}</span>
//                                         </div>
//                                     </div>
//                                 )}
//                             </aside>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }







import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./RecipeDetails.css";
import NavBar from '../NAVBAR/NavBar';
import commentAuthor from '../../IMAGES/comment-author.png';
import commentAuthor2 from '../../IMAGES/Account.jpg';
import { BASE_URL } from '../../../config/config';

export default function Recipes() {
    const { subcategoryId, recipeId } = useParams();
    const navigate = useNavigate();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [comments, setComments] = useState([
        {
            name: "Dev Gajjar",
            date: "February 29,2024 - 4:04 pm",
            message: "Easy to learn and Cook!!",
            avatar: commentAuthor,
        },
        {
            name: "Call me Taeni",
            date: "January 22,2024 - 7:35 pm",
            message: "Please upload a video of cooking Khavsa..",
            avatar: commentAuthor2,
        },
    ]);
    const [formData, setFormData] = useState({
        message: "",
    });
    const [showVideo, setShowVideo] = useState(false);
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const isLoggedIn = localStorage.getItem("customerName"); // Check if user is logged in

    useEffect(() => {
        // Redirect to login page if user is not logged in
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            const fetchRecipeDetails = async () => {
                try {
                    const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}/${recipeId}`, {
                        headers: {
                            "ngrok-skip-browser-warning": "true"
                        }
                    });
            
                    if (!response.ok) {
                        throw new Error('Failed to fetch recipe details');
                    }
            
                    const data = await response.json();
                    setRecipeDetails(data);
                } catch (error) {
                    console.error("Error fetching recipe details:", error);
                }
            };
            
            const fetchSimilarRecipes = async () => {
                try {
                    const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`, {
                        headers: {
                            "ngrok-skip-browser-warning": "true"
                        }
                    });
            
                    if (!response.ok) {
                        throw new Error('Failed to fetch similar recipes');
                    }
            
                    const data = await response.json();
                    const filteredRecipes = data.filter(recipe => recipe.Recipe_id !== recipeId);
                    const shuffledData = filteredRecipes.sort(() => Math.random() - 0.5);
                    const randomRecipes = shuffledData.slice(0, 3);
                    setSimilarRecipes(randomRecipes);
                } catch (error) {
                    console.error("Error fetching similar recipes:", error);
                }
            };
            

            if (subcategoryId && recipeId) {
                fetchRecipeDetails();
                fetchSimilarRecipes();
            }
        }
    }, [isLoggedIn, navigate, recipeId, subcategoryId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();

        const formattedDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        
        const formattedTime = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        });

        const customerName = localStorage.getItem("customerName") || "Anonymous"; // Get customer name from local storage
        const newComment = {
            name: customerName,
            date: `${formattedDate} - ${formattedTime}`,
            message: formData.message,
            avatar: commentAuthor, // Assuming the avatar remains the same
        };

        setComments(prevComments => [...prevComments, newComment]);
        setFormData({ message: "" });
    };

    const handleThumbnailClick = () => {
        setShowVideo(true);
    };

    const handleCloseVideo = () => {
        setShowVideo(false);
    };

    const handleViewMore = () => {
        navigate(`/recipes/subcategory/${subcategoryId}`);
    };

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipes/subcategory/${subcategoryId}/${recipeId}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            <NavBar />
            <div className="mt-150 mb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="DC-blog-details-inner">
                                {recipeDetails && (
                                    <div className="DC-single-blog-inner">
                                        <div className="DC-post-image">
                                            {showVideo ? (
                                                <div className="video-container">
                                                    <button className="close-video-btn" onClick={handleCloseVideo}>
                                                       X
                                                    </button>
                                                    <video controls src={recipeDetails.Recipe_Url} className="img-fluid" />
                                                </div>
                                                
                                                ) : (
                                                    <>
                                                        <img src={recipeDetails.Recipe_Thumbnail} alt="Recipe Thumbnail"/>
                                                        <div className="play-button" onClick={handleThumbnailClick}>
                                                            <span>&#9658;</span>
                                                        </div>
                                                        <div className="post-date">
                                                            <p><span>{formatDate(recipeDetails.createdAt)}</span></p>
                                                        </div>
                                                    </>
                                                )}

                                        </div>
                                        <div className="DC-post-content">    
                                            <h2 className="mt-3 underline">Recipe : {recipeDetails.Recipe_Title}</h2>
                                        </div>
                                        <div className="single-sidebar-widget mt-30">
                                            <span className="mt-3 recipe_description">Recipe Description: </span>
                                            <p className="recipe_description">{recipeDetails.Recipe_Description}</p>
                                        </div>    
                                    </div>
                                )}
                                <div className="DC-post-comment">
                                    <h3>{comments.length} Comments</h3>
                                    <ul className="post-comments p-0 m-0 list-unstyled">
                                        {comments.map((comment, index) => (
                                            <li key={index}>
                                                <div className="DC-comment-author-details media">
                                                    <img src={comment.avatar} alt="" />
                                                    <div className="DC-comment-author-content">
                                                        <div className="comment-header">
                                                            <h5>{comment.name}</h5>
                                                            <h6>{comment.date}</h6>
                                                        </div>
                                                        <p>{comment.message}</p>
                                                        <a href="/" className="btn">Reply</a>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="contact-form contact-page-form parsley-validate">
                                    <h3>Leave a Comment</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <textarea
                                                    name="message"
                                                    placeholder="Write Message"
                                                    className="theme-input-style"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                ></textarea>
                                                <div className="submit-btn">
                                                    <button type="submit" className="btn">Send Message</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <aside>
                                <div className="single-sidebar-widget mb-30">
                                    <div className="sidebar-title">
                                        <h5 className='underline'>Similar in this SubCategory</h5>
                                    </div>
                                    <div className="sidebar-body latest-post">
                                        <ul>
                                            {similarRecipes.map((recipe, index) => (
                                                <li key={index} onClick={() => handleRecipeClick(recipe.Recipe_id)}>
                                                    <div className="DC-latest-post-wrap media">
                                                        <img className='similar_in_Image' src={recipe.Recipe_Thumbnail} alt=""/>
                                                        <div className="latest-post-body media-body">
                                                            <p>{recipe.Recipe_Title}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <span>
                                            <button onClick={handleViewMore} className="view_more_button">
                                                <span> View More </span>
                                            </button>
                                        </span>
                                    </div>
                                </div>

                                {recipeDetails && (
                                    <div className="single-sidebar-widget mb-30">
                                        <div className="sidebar-title">
                                            <h5 className='underline'>Ingredients</h5>
                                        </div>

                                        <div className="sidebar-body latest-post">
                                            <span>{recipeDetails.Recipe_Ingredients}</span>
                                        </div>
                                    </div>
                                )}

                                {recipeDetails && (
                                    <div className="single-sidebar-widget mb-30">
                                        <div className="sidebar-title">
                                            <h5 className='underline'>Nutritional Info</h5>
                                        </div>
                                        
                                        <div className="sidebar-body latest-post">
                                            <span>{recipeDetails.Recipe_Nutritional_Info}</span>
                                        </div>
                                    </div>
                                )}
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
