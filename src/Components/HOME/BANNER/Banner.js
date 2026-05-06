// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Banner.css'
// import 'bootstrap/dist/css/bootstrap.min.css';


// const Banner = () => {

//     const [searchQuery, setSearchQuery] = useState(null);
//     const getQuery = event => setSearchQuery(event.target.value);
    

//     return (
//         <section className='banner d-flex align-items-center text-center'>
//             <div className='bannerContainer'>
//                   <div className='search-box col-md-6 my-5 mx-auto'>
//                     <input
//                         type="text"
//                         id="query"
//                         onChange={getQuery}
//                         className='form-control'
//                         placeholder='Search Food Item'
//                     />
//                     <Link to={'/search=' + searchQuery}>
//                         <button
//                             onClick={() => window.scrollBy(0, 525)}
//                             className='btn btn-danger search-btn btn-rounded'
//                         >
//                             Search
//                     </button>
//                     </Link>
//                 </div>

//                 <h1 className='text'>Best Food Waiting For Your Belly</h1>

//             </div>
//         </section>
//     );
// };

// export default Banner;


import React from 'react';
import { Link } from 'react-router-dom';
// import './Banner.css'
import "../templateStyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import shape1 from "../../IMAGES/img/banner/shaps1.png"
// import shape2 from "../../IMAGES/img/banner/shaps2.png"
// import shape3 from "../../IMAGES/img/banner/shaps3.png"
// import shape4 from "../../IMAGES/img/banner/shaps4.png"
// import shape5 from "../../IMAGES/img/banner/shaps5.png"
// import shape6 from "../../IMAGES/img/banner/shaps6.png"
// import shape7 from "../../IMAGES/img/banner/shaps7.png"
import bannerImage from "../../IMAGES/E-learning-images/Desserts1.webp"




const Banner = () => {
    return (
    <div className="banner-area-inner">
        <div className="banner-inner-area banner-area1">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        {/* banner text  */}
                        <div className="banner-text-inner">
                            <div className="banner-shape-wrap">
                                {/* <div className="banner-shape-inner">
                                    <img src={shape1} alt="" className='shape shape1 rotate3d'/>
                                    <img src={shape2} alt="" className='shape shape2 rotate2d'/>
                                    <img src={shape3} alt="" className='shape shape3 rotate-2d'/>
                                    <img src={shape4} alt="" className='shape shape4 rotate3d'/>
                                    <img src={shape5} alt="" className='shape shape5 rotate2d'/>
                                    <img src={shape6} alt="" className='shape shape6 rotate-2d'/>
                                    <img src={shape7} alt="" className='shape shape7 rotate3d'/>
                                </div> */}
                            </div>

                            <h1>CrazeeCook is your Online Chef Friend</h1>
                            <p>Make everyday cooking easy and enjoyable with the Kitchen Stories app. Build your confidence in the kitchen with our step-by-step recipe guides, save time and collect your favorite recipes in personal cookbooks, and join a passionate community of millions of hobby chefs from around the world. Our award winning app is simple to use and has a wide range of over 10,000 recipes that will appeal to beginners and more experienced home cooks alike. Download our free app and create delicious meals that will impress everyone at home.</p>
                            <Link to="/" className="btn">Discover More</Link>
                        </div>
                        {/*banner text */}
                    </div>
                    <div className="col-lg-5 offset-lg-1 col-md-4 offse-xl-2">
                        {/* banner image */}
                        <div className="banner-image">
                            <img src={bannerImage} alt=""/>
                        </div>
                        {/* End of banner image */}
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    );
};

export default Banner;
