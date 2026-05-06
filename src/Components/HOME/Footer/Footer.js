import React, { useEffect, useState } from 'react';
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import footerbg from "../../IMAGES/img/footer-bg.svg"
import logo from "../../IMAGES/E-learning-images/logo-black.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faPhoneSquare, faEnvelope, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {

    const [isVisible, setIsVisible] = useState(false);

    // Function to detect scroll and update state
    const toggleVisibility = () => {
      if (window.scrollY > 500) { // Adjust the number based on when you want the button to show
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
  
      return () => {
        window.removeEventListener("scroll", toggleVisibility);
      };
    }, []);
  
    // Function to smoothly scroll to the top
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
        duration: 1000
      });
    };
  
  return (
    <>
      <footer className="footer">
        <div className="footerbg">
        <img src={footerbg} alt=""/>
        </div>
        <section className="footer-top pt-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        {/* footer widget  */}
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <Link to="index.html"><img src={logo} alt=""/></Link>
                            </div>
                            <p>CrazeeCook is your Online Chef Friend.</p>
                            {/* footer social area  */}
                            {/* <div className="footer-social-area">
                                <ul className="social-icons social-icons-light nav">
                                    <li><Link to="/" target="_blank"><i className="fa fa-facebook-f"></i></Link></li>
                                    <li><Link to="/" target="_blank"><i className="fa fa-twitter"></i></Link></li>
                                    <li><Link to="/" target="_blank"><i className="fa fa-google-plus"></i></Link></li>
                                    <li><Link to="/" target="_blank"><i className="fa fa-linkedin"></i></Link></li>
                                </ul>
                            </div> */}
                            {/* End of footer social area  */}
                        </div>
                        {/* End of footer widget  */}
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget">
                             {/* widget header  */}
                            <div className="widget-header">
                                <h5>Our Address</h5>
                            </div>
                            {/* widget header  */}
                            <div className="widget-body">
                                <ul className="address-list">
                                    <li>
                                    <FontAwesomeIcon icon={faPhoneSquare}/>  
                                    <span>97255 29103</span>                   
                                    </li>
                                    <li>
                                    <FontAwesomeIcon icon={faEnvelope}/> 
                                    <span> emedev0922@gmail.com</span>                                     
                                    </li>
                                    <li>
                                    <FontAwesomeIcon icon={faMap} />  
                                    <span> Surat, Gujarat, India </span>                  
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 FDC">
                        <div className="footer-widget">
                            {/* widget header  */}
                            <div className="widget-header">
                                <h5>Extra Links</h5>
                            </div>
                            {/*  widget header  */}
                        </div>

                        <div className="widget-body">
                            <div className="extra-link">
                                <div className="link-left">
                                    <ul>
                                        <li><Link to="/">About</Link></li>
                                        <li><Link to="/">Our Team</Link></li>
                                        <li><Link to="/">Features</Link></li>
                                        <li><Link to="/">Blog</Link></li>
                                        <li><Link to="/">Working</Link></li>
                                    </ul>
                                </div>
                                <div className="link-right">
                                    <ul>
                                        <li><Link to="/">Help</Link></li>
                                        <li><Link to="/">Support</Link></li>
                                        <li><Link to="/">Clients</Link></li>
                                        <li><Link to="/">Blog</Link></li>
                                        <li><Link to="/">Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget">
                            <div className="widget-body">
                                <div className="twetter-post-inner">
                                    <div className="footer-post-details">
                                         Take your Cooking Skills to new heights with CrazeeCook. 
                                    </div>
                                    <div className="twitter-post">
                                    <FontAwesomeIcon icon={faTwitter} />      
                                        CrazeeCook- Feb 23, 2024
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <div className="footer-bottom">
            <div className="footer-text text-center">
                <p>© copyright 2019 by Layerdrops.com</p>       
            </div>
        </div> */}
        
    </footer>

    {isVisible && (
        <div className="back-to-top">
          <button onClick={scrollToTop}> 
            <span> <FontAwesomeIcon icon={faChevronUp}/> </span> 
          </button>
        </div>
      )}
    </>
  );
};

export default Footer;
