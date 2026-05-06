import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Blog.css";
import blogimage1 from '../../IMAGES/E-learning-images/Fruits1.webp';
import blogimage2 from '../../IMAGES/E-learning-images/Fruits2.webp';
import blogimage3 from '../../IMAGES/E-learning-images/Blog-3.webp';

const Blog = () => {
  return (
    <>
      <section className="pt-40 pb-80" id='blog'>
        <div className="container">
          <div className="blog-section-title text-center">
            <h2>Blog </h2> 
            <span>
              <Link to="/" className="view-more-button">
                <span> View More </span>
              </Link>
            </span>  
          </div>
          <div className="row">
            {blogItems.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="blog-post-single-inner">
                  <div className="post-image">
                    <Link to="blog-details.html">
                      <img
                        src={item.image}
                        alt=""
                        className="image-container"
                      />
                    </Link>
                  </div>
                  <div className="post-content">
                    <div className="blog-post-details">
                      <div className="post-title">
                        <h3>
                          <Link to="/">{item.title}</Link>
                        </h3>
                      </div>
                      <div className="post-info d-flex">
                        <span>{item.detail} <Link to="/">Read More</Link></span>
                      </div>
                       
                    </div>
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

const blogItems = [
  {
    image: blogimage1,
    title: "Kiwis can reduce your Acne!! ",
    detail: "Unlock the secret to radiant skin with a twist of nature's goodness. Dive into a world where the humble kiwi becomes your skin's best ally, working its magic to reduce acne woes. Discover the power of this vibrant green fruit and embark on a journey towards clearer, healthier skin...",
    rating: "4.5",
  },
  {
    image: blogimage2,
    title: "Strawberries can prevent Alzheimers",
    detail: "Dive into the berry bliss that transcends taste, as we unravel the extraordinary benefits of strawberries. Beyond their sweet allure, these ruby gems emerge as formidable guardians against Alzheimer's...",
    rating: "4.8",
  },
  {
    image: blogimage3,
    title: "The bitter truth about added sugar",
    detail: "Delve into the not-so-sweet reality lurking behind the tempting allure of added sugar. Uncover the bitter truth that hides within your favorite treats and daily indulgences...",
    rating: "4.8",
  },
];

export default Blog;
