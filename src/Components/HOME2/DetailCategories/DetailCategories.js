import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailCategories.css"
import dataBgImage from '../../IMAGES/E-learning-images/Fast Food1.webp'
import NavBar from '../../HOME/NAVBAR/NavBar';
import blogDetailImage from '../../IMAGES/E-learning-images/Chinese4.webp'
import commentAuthor from '../../IMAGES/comment-author.png'
import commentAuthor2 from '../../IMAGES/Account.jpg'
import similarBlogs from '../../IMAGES/similar-blogs.png'
export default function DetailCategories() {

    const [comments, setComments] = useState([
        // {
        //   name: "Dev Gajjar",
        //   date: "February 29,2024 - 4:04 pm",
        //   message: "Easy to learn and Cook!!",
        //   avatar: commentAuthor,
        // },
        // {
        //   name: "Call me Taeni",
        //   date: "January 22,2024 - 7:35 pm",
        //   message: "Please upload a video of cooking Khavsa..",
        //   avatar: commentAuthor2,
        // },
      ]);
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
      // Step 2: Handle Form Input
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      // Step 3: Submit Comment
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

        const newComment = {
            name: formData.name,
            // Combine formatted date and time
            date: `${formattedDate}, - ${formattedTime}`,
            message: formData.message,
            avatar: commentAuthor, // Default avatar or based on user
        };

    setComments((prevComments) => [...prevComments, newComment]);
        // Clear form data
    setFormData({ name: "", email: "", message: "" });
      };
    

  return (
    <>
        <NavBar/>
    <div className="page-title-wrap" img={dataBgImage}>
        <div className="container">
            <div className="row">
                <div className="col">
                    {/* <!-- page title content --> */}
                    <div className="page-title-content text-center">
                        {/* <ul className="mb-0 list-unstyle nav">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="/">Single Blog</a></li>
                        </ul> */}
                        <h1 className="h2">Blog Listing</h1>
                    </div> {/*/.End of page title content*/}
                </div>  {/*/.col*/}
            </div> {/*/.row*/}
        </div> {/*/.container */}
    </div>
    {/* <!--/.End of page title --> */}

    {/* <!-- blog list area --> */}
    <section className="pt-90 pb-150">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="DC-blog-details-inner">
                        <div className="DC-single-blog-inner">
                            <div className="DC-post-image">
                                <a href="/">
                                    <img src={blogDetailImage} alt="BlogPhoto"/>
                                </a>
                                <div className="post-date">
                                    <p><span>10</span>Sep</p>
                                </div>
                            </div>
                            {/* <!--/.End of  blog image --> */}
                        
                            {/* <!-- post content --> */}
                            <div className="DC-post-content">
                                <div className="DC-post-details">
                                    <div className="DC-post-info d-flex">
                                        <a href="/"><span>Category: </span>Chinese</a>
                                        <a href="/"><span>2</span> Comment</a>
                                    </div>
                        
                                    <div className="DC-post-title">
                                        <h3><a href="blog-details.html">Recipe of Dumplings(Jiaozi in Mandarin)</a></h3>
                                    </div>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,
                                    by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of
                                    Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum
                                    generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the
                                    Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to
                                    generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition,
                                    injected humour, or non-characteristic words etc.</p>
                                    <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its
                                    layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
                                    using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
                                    editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites
                                    still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                                    injected humour and the like.</p>
                                </div>
                            </div>  {/* <!-- Ennd of post content --> */}
                        </div> {/* <!-- Ennd of single blog  inner --> */}

                        {/* <!-- post tag and share --> */}
                        <div className="DC-post-tag-share d-flex align-items-center">
                            <div className="DC-post-tag">
                                <a href='/'>Tags: </a>
                                <a href="/"> Chinese,</a>
                                <a href="/">Dumplings,</a>
                                <a href="/">Jiaozi</a>
                            </div>
                            <div className="post-share">
                                <ul className="social-list mb--0 list-unstyled">
                                    <li><a href="/"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="/"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="/"><i className="fa fa-pinterest"></i></a></li>
                                    <li><a href="/"><i className="fa fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div> {/* <!-- End of post tag and share --> */}                         
                        
                        {/* <!-- post comments --> */}
                        {/* <div className="DC-post-comment">
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
                        </div> */}
                        {/* <!--/.End of post comments --> */}
                        
                        {/* <!-- contact form --> */}
                        <div className="contact-form contact-page-form parsley-validate">
                            <h3>Leave a Comment</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            className="theme-input-style"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />                                  
                                     </div>
                                    <div className="col-md-6">
                                        <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        className="theme-input-style"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        />                                  
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                    <textarea
                                        name="message"
                                        placeholder="Write Message"
                                        className="theme-input-style"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>                                        
                                    <div className="submite-btn">
                                    <button type="submit" className="btn"> Send Message</button>
                                        </div>  {/* <!-- Ennd of submit button --> */}
                                    </div>  {/* <!-- Ennd of col --> */}
                                </div> {/* <!-- Ennd of row --> */}
                            </form> {/* <!-- Ennd of form --> */}
                        </div> {/* <!-- End of contact form --> */}
                    </div>
                    {/* <!-- Ennd of blog details inner --> */}
                </div>

                <div className="col-lg-4">
                    <aside>
                        {/* <!-- single sidebar widget --> */}
                        <div className="single-sidebar-widget mb-30">
                            <div className="search-bar-widget">
                                <div className="search-form parsley-validate">
                                    <form action="/" method="POST">
                                        <input type="text" placeholder="Search here..." required/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <!--End of  single sidebar widget --> */}

                        {/* <!-- single sidebar widget --> */}
                        <div className="single-sidebar-widget mb-30">
                            <div className="sidebar-title">
                                <h5>Similar in this Category</h5>
                            </div>
                            <div className="sidebar-body latest-post">
                                <ul>
                                    {/* <!-- single latest post --> */}
                                    <li>
                                        <div className="DC-latest-post-wrap media">
                                            <div className="latest-post-img">
                                                <img src={similarBlogs} alt=""/>
                                            </div>
                                            <div className="latest-post-body media-body">
                                                <p>Chow Mein</p>
                                            </div>
                                        </div>
                                    </li>
                                    {/* <!-- single latest post --> */}

                                    {/* <!-- single latest post --> */}
                                    <li>
                                        <div className="DC-latest-post-wrap media">
                                            <div className="latest-post-img">
                                                <img src={similarBlogs} alt=""/>
                                            </div>
                                            <div className="latest-post-body media-body">
                                                <p>Hakka Noodles</p>
                                            </div>
                                        </div>
                                    </li>
                                    {/* <!-- single latest post --> */}

                                    {/* <!-- single latest post --> */}
                                    <li>
                                        <div className="DC-latest-post-wrap media">
                                            <div className="latest-post-img">
                                                <img src={similarBlogs} alt=""/>
                                            </div>
                                            <div className="latest-post-body media-body">
                                                <p>Spring Rolls</p>
                                            </div>
                                        </div>
                                    </li>
                                    {/* <!-- single latest post --> */}
                                </ul>
                            </div>
                        </div>
                        {/* <!--End of  single sidebar widget --> */}

                        {/* <!-- single sidebar widget --> */}
                        <div className="single-sidebar-widget mb-30">
                            <div className="sidebar-title">
                                <h5>Ingredients</h5>
                            </div>

                            <div className="sidebar-body categories-inner">
                                <ul>
                                    <li><span>3 cloves garlic, minced</span></li>
                                    <li><span>1 large egg</span></li>
                                    <li><span>2 tablespoons soy sauce</span></li>
                                    <li><span>1 tablespoon minced fresh ginger</span></li>
                                    <li><span>50 dumpling wrappers</span></li>
                                    <li><span>1 tablespoon seasoned rice vinegar</span></li>
                                    <li><span>1 tablespoon finely chopped Chinese chives</span></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!--End of  single sidebar widget --> */}

                        {/* <!-- single sidebar widget --> */}
                        <div className="single-sidebar-widget mb-30">
                            <div className="sidebar-title">
                                <h5>Tags</h5>
                            </div>

                            <div className="sidebar-body tag-inner">
                                <span>Category     : Chinese,</span>
                                <span>Sub-Category : Authenticate Chinese,</span>
                                <span>Recipe Name  : Chinese Dumplings</span>
                            </div>
                        </div>
                        {/* <!--End of  single sidebar widget --> */}
                    </aside>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
