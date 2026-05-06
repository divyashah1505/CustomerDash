// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./NavBar.css";
// import Logo from "../../IMAGES/E-learning-images/logo-black.webp";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

// const NavBar = () => {
//     const [isTransparent, setTransparent] = useState(true);
//     const [notificationCount, setNotificationCount] = useState(3); 
//     const [showNotifications, setShowNotifications] = useState(false); 
//     const [showUserMenu, setShowUserMenu] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY;
//             setTransparent(scrollPosition === 0);
//         };

//         window.addEventListener("scroll", handleScroll);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     const handleNotificationClick = (e) => {
//         e.stopPropagation(); 
//         setShowNotifications(!showNotifications);
//         setShowUserMenu(false); // Ensure user menu is closed when opening notifications
//         setNotificationCount(0); 
//     };

//     const handleUserMenuClick = (e) => {
//         e.stopPropagation();
//         setShowUserMenu(!showUserMenu);
//         setShowNotifications(false); // Ensure notifications are closed when opening user menu
//     };

//     const notifications = [
//         { id: 1, text: "New course available!" },
//         { id: 2, text: "Sale ends tonight!" },
//         { id: 3, text: "New blog post published." }
//     ];

//     const userMenuOptions = [
//         { id: 1, text: "My Profile" },
//         { id: 2, text: "Settings" },
//         { id: 3, text: "Log out" }
//     ];

//     return (
//         <header className={`header ${isTransparent ? 'transparent-header' : ''}`}>
//             <div className="main-header">
//                 <div className="main-menu-wrap">
//                     <div className="navbar-container">
//                         <div className="navbarRow align-items-center">
//                             <div className="col-xl-2 col-lg-3 col-md-4 col-6">
//                                 <div className="logo">
//                                     <Link to="/" className="navbar-brand">
//                                         <img src={Logo} alt="logo"/>
//                                     </Link>
//                                 </div>
//                             </div>
//                             <div className="col-xl-6 col-lg-6 col-md-4 col-6 menu-button">
//                                 <div className="menu--inner-area clearfix">
//                                     <div className="menu-wraper">
//                                         <nav>
//                                             <div className="header-menu dosis">
//                                                 <ul>
//                                                     <li className="active navbarList"><Link to="/"><span>Home</span></Link>
//                                                         <ul>
//                                                             <li className="active"><Link to="/">Home 1</Link></li>
//                                                             <li><Link to="/home2">Home 2</Link></li>
//                                                         </ul>
//                                                     </li>
//                                                     <li className="navbarList"><Link to="/featured-videos">Featured Recipes</Link></li>
//                                                     <li className="navbarList"><Link to="/favorites">Favorites</Link></li>
//                                                     <li className="navbarList"><Link to="/">Contests</Link></li>
//                                                     <li className="navbarList">
//                                                         <Link to="/blog">Blog</Link>
//                                                     </li>
//                                                 </ul>
//                                             </div>
//                                         </nav>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-3 col-md-4 col-sm-5 d-md-block d-none">
//                                 <div className="urgent-call text-right">
//                                     <span className="notification-icon" onClick={handleNotificationClick}>
//                                         {notificationCount > 0 && (
//                                             <span className="notification-count">{notificationCount}</span>
//                                         )}
//                                         <FontAwesomeIcon icon={faBell} />
//                                         {showNotifications && (
//                                             <div className="notification-dialogue">
//                                                 {notifications.map((notification) => (
//                                                     <div key={notification.id} className="notification-item">
//                                                         {notification.text}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </span>
//                                     <span className="user-icon" onClick={handleUserMenuClick}>
//                                         <FontAwesomeIcon icon={faUserCircle} />
//                                         {showUserMenu && (
//                                             <div className="user-dialogue">
//                                                 {userMenuOptions.map((option) => (
//                                                     <div key={option.id} className="user-menu-item">
//                                                         {option.text}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </span>
//                                     <Link to="/login" className="btn">Log In</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default NavBar;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./NavBar.css";
// import Logo from "../../IMAGES/E-learning-images/logo-black.webp";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// const NavBar = () => {
//     const [isTransparent, setTransparent] = useState(true);
//     const [notificationCount, setNotificationCount] = useState(3);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [showUserMenu, setShowUserMenu] = useState(false);
//     const [customerName, setCustomerName] = useState(localStorage.getItem("customerName"));

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY;
//             setTransparent(scrollPosition === 0);
//         };

//         window.addEventListener("scroll", handleScroll);

//         const handleStorageChange = () => {
//             setCustomerName(localStorage.getItem("customerName"));
//         };

//         window.addEventListener('storage', handleStorageChange);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//             window.removeEventListener('storage', handleStorageChange);
//         };
//     }, []);

//     const handleNotificationClick = (e) => {
//         e.stopPropagation();
//         setShowNotifications(!showNotifications);
//         setShowUserMenu(false);
//         if (showNotifications) {
//             setNotificationCount(0);
//         }
//     };

//     const handleUserMenuClick = (e) => {
//         e.stopPropagation();
//         setShowUserMenu(!showUserMenu);
//         setShowNotifications(false);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("customerName");
//         setCustomerName(null);
//         setShowUserMenu(false);
//     };

//     const scrollToBlogSection = (e) => {
//         e.preventDefault();
//         const blogSection = document.getElementById('blog');
//         if (blogSection) {
//             const headerOffset = 50;
//             const elementPosition = blogSection.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.scrollY - headerOffset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: 'smooth'
//             });
//         }
//     };

//     const notifications = [
//         { id: 1, text: "New course available!" },
//         { id: 2, text: "Sale ends tonight!" },
//         { id: 3, text: "New blog post published." }
//     ];

//     const userMenuOptions = [
//         { id: 1, text: "My Profile" },
//         { id: 2, text: "Settings" },
//         { id: 3, text: "Log out", action: handleLogout } // Including action for logout
//     ];

//     return (
//         <header className={`header ${isTransparent ? 'transparent-header' : ''}`}>
//             <div className="main-header">
//                 <div className="main-menu-wrap">
//                     <div className="navbar-container">
//                         <div className="navbarRow align-items-center">
//                             <div className="col-xl-2 col-lg-3 col-md-4 col-6">
//                                 <div className="logo">
//                                     <Link to="/" className="navbar-brand">
//                                         <img src={Logo} alt="logo" />
//                                     </Link>
//                                 </div>
//                             </div>
//                             <div className="col-xl-6 col-lg-6 col-md-4 col-6 menu-button">
//                                 <div className="menu--inner-area clearfix">
//                                     <div className="menu-wraper">
//                                         <nav>
//                                             <div className="header-menu dosis">
//                                                 <ul>
//                                                     <li className="active navbarList"><Link to="/"><span>Home</span></Link></li>
//                                                     <li className="navbarList"><Link to="/featured-videos">Featured Recipes</Link></li>
//                                                     <li className="navbarList"><Link to="/favorites">Favorites</Link></li>
//                                                     <li className="navbarList"><Link to="/">Contests</Link></li>
//                                                     <li className="navbarList"><Link to="/#" onClick={scrollToBlogSection}>Blog</Link></li>
//                                                 </ul>
//                                             </div>
//                                         </nav>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-3 col-md-4 col-sm-5 d-md-block d-none">
//                                 <div className="urgent-call text-right">
//                                     <span className="notification-icon" onClick={handleNotificationClick}>
//                                         {notificationCount > 0 && (
//                                             <span className="notification-count">{notificationCount}</span>
//                                         )}
//                                         <FontAwesomeIcon icon={faBell} />
//                                         {showNotifications && (
//                                             <div className="notification-dialogue">
//                                                 {notifications.map((notification) => (
//                                                     <div key={notification.id} className="notification-item">
//                                                         {notification.text}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </span>
//                                     {customerName ? (
//                                         <div className="user-greeting" onClick={handleUserMenuClick}>
//                                             <span>Hello, {customerName}</span>
//                                             <FontAwesomeIcon icon={faChevronDown} />
//                                             {showUserMenu && (
//                                                 <div className="user-dialogue">
//                                                     {userMenuOptions.map((option) => (
//                                                         <div key={option.id} className="user-menu-item" onClick={option.action}>
//                                                             {option.text}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ) : (
//                                         <>
//                                             {/* <span className="user-icon" onClick={handleUserMenuClick}>
//                                                 <FontAwesomeIcon icon={faUserCircle} />
//                                             </span> */}
//                                             <Link to="/login" className="btn">Log In</Link>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };
// export default NavBar;















// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./NavBar.css";
// import Logo from "../../IMAGES/E-learning-images/logo-black.webp";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// const NavBar = () => {
//     const [isTransparent, setTransparent] = useState(true);
//     const [notificationCount, setNotificationCount] = useState(3);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [showUserMenu, setShowUserMenu] = useState(false);
//     const [customerName, setCustomerName] = useState(localStorage.getItem("customerName"));

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY;
//             setTransparent(scrollPosition === 0);
//         };

//         window.addEventListener("scroll", handleScroll);


//         const handleStorageChange = () => {
//             setCustomerName(localStorage.getItem("customerName"));
//         };

//         window.addEventListener('storage', handleStorageChange);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//             window.removeEventListener('storage', handleStorageChange);
//         };
//     }, []);

//     const handleNotificationClick = (e) => {
//         e.stopPropagation();
//         setShowNotifications(!showNotifications);
//         setShowUserMenu(false);
//         if (showNotifications) {
//             setNotificationCount(0);
//         }
//     };

//     const handleUserMenuClick = (e) => {
//         e.stopPropagation();
//         setShowUserMenu(!showUserMenu);
//         setShowNotifications(false);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("customerName");
//         localStorage.removeItem("token");
//         localStorage.removeItem("customerId");
//         setCustomerName(null);
//         setShowUserMenu(false);
//         window.location.href = "/";
//         };

//     const scrollToBlogSection = (e) => {
//         e.preventDefault();
//         const blogSection = document.getElementById('blog');
//         if (blogSection) {
//             const headerOffset = 50;
//             const elementPosition = blogSection.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.scrollY - headerOffset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: 'smooth'
//             });
//         }
//     };

//     const scrollToPlansAndCombosSection = (e) => {
//         e.preventDefault();
//         const plansAndCombosSection = document.getElementById("pricing");
//         if (plansAndCombosSection) {
//           const headerOffset = 50;
//           const elementPosition = plansAndCombosSection.getBoundingClientRect().top;
//           const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
//           window.scrollTo({
//             top: offsetPosition,
//             behavior: "smooth"
//           });
//         }
//     };    

//     const notifications = [
//         { id: 1, text: "New course available!" },
//         { id: 2, text: "Sale ends tonight!" },
//         { id: 3, text: "New blog post published." }
//     ];

//     const userMenuOptions = [
//         { id: 1, text: "My Profile" },
//         { id: 2, text: "Settings" },
//         { id: 3, text: "Log out", action: handleLogout } // Including action for logout
//     ];

//     return (
//         <header className={`header ${isTransparent ? 'transparent-header' : ''}`}>
//             <div className="main-header">
//                 <div className="main-menu-wrap">
//                     <div className="navbar-container">
//                         <div className="navbarRow align-items-center">
//                             <div className="col-xl-2 col-lg-3 col-md-4 col-6">
//                                 <div className="logo">
//                                     <Link to="/" className="navbar-brand">
//                                         <img src={Logo} alt="logo" />
//                                     </Link>
//                                 </div>
//                             </div>
//                             <div className="col-xl-6 col-lg-6 col-md-4 col-6 menu-button">
//                                 <div className="menu--inner-area clearfix">
//                                     <div className="menu-wraper">
//                                         <nav>
//                                             <div className="header-menu dosis">
//                                                 <ul>
//                                                     <li className="active navbarList"><Link to="/"><span>Home</span></Link></li>
//                                                     <li className="navbarList"><Link to="/featured-videos">Featured Recipes</Link></li>
//                                                     <li className="navbarList"><Link to="/favorites">Favorites</Link></li>
//                                                     <li className="navbarList"><Link to="/" onClick={scrollToPlansAndCombosSection}> Plans and Combos</Link></li>
//                                                     <li className="navbarList"><Link to="/#" onClick={scrollToBlogSection}> Blog</Link></li>
//                                                 </ul>
//                                             </div>
//                                         </nav>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-3 col-md-4 col-sm-5 d-md-block d-none">
//                                 <div className="urgent-call text-right">
//                                     {customerName && (
//                                         <>
//                                             <span className="notification-icon" onClick={handleNotificationClick}>
//                                                 {notificationCount > 0 && (
//                                                     <span className="notification-count">{notificationCount}</span>
//                                                     )}
//                                                     <FontAwesomeIcon icon={faBell} />
//                                                     {showNotifications && (
//                                                         <div className="notification-dialogue">
//                                                             {notifications.map((notification) => (
//                                                                 <div key={notification.id} className="notification-item">
//                                                                     {notification.text}
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     )}
//                                                 </span>
//                                                 <div className="user-greeting" onClick={handleUserMenuClick}>
//                                                     <span>Hello, {customerName}</span>
//                                                     <FontAwesomeIcon icon={faChevronDown} />
//                                                     {showUserMenu && (
//                                                         <div className="user-dialogue">
//                                                             {userMenuOptions.map((option) => (
//                                                                 <div key={option.id} className="user-menu-item" onClick={option.action}>
//                                                                     {option.text}
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </>
//                                         )}
//                                         {!customerName && (
//                                             <Link to="/login" className="btn">Log In</Link>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//         );
//     };
//     export default NavBar;
    












import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../IMAGES/E-learning-images/logo-black.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
    const [isTransparent, setTransparent] = useState(true);
    const [notificationCount, setNotificationCount] = useState(3);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [customerName, setCustomerName] = useState(localStorage.getItem("customerName"));
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setTransparent(scrollPosition <= 50); // Adjusted to consider a header offset of 50 pixels.
        };

        window.addEventListener("scroll", handleScroll);

        const handleStorageChange = () => {
            setCustomerName(localStorage.getItem("customerName"));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleNotificationClick = (e) => {
        e.stopPropagation();
        setShowNotifications(!showNotifications);
        setShowUserMenu(false);
        if (showNotifications) {
            setNotificationCount(0);
        }
    };

    const handleUserMenuClick = (e) => {
        e.stopPropagation();
        setShowUserMenu(!showUserMenu);
        setShowNotifications(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("customerName");
        localStorage.removeItem("token");
        localStorage.removeItem("customerId");
        setCustomerName(null);
        setShowUserMenu(false);
        navigate("/");
    };

    const scrollToBlogSection = (e) => {
        e.preventDefault();
        if (location.pathname === "/") {
            const blogSection = document.getElementById("blog");
            if (blogSection) {
                window.scrollTo({
                    top: blogSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        } else {
            navigate("/");
            setTimeout(() => {
                const blogSection = document.getElementById("blog");
                if (blogSection) {
                    window.scrollTo({
                        top: blogSection.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }, 500); // Adjust the delay as needed
        }
    };

    const scrollToPlansAndCombosSection = (e) => {
        e.preventDefault();
        if (location.pathname === "/") {
            const pricingSection = document.getElementById("pricing");
            if (pricingSection) {
                window.scrollTo({
                    top: pricingSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        } else {
            navigate("/");
            setTimeout(() => {
                const pricingSection = document.getElementById("pricing");
                if (pricingSection) {
                    window.scrollTo({
                        top: pricingSection.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }, 500); // Adjust the delay as needed
        }
    };

    // const notifications = [
    //     { id: 1, text: "New course available!" },
    //     { id: 2, text: "Sale ends tonight!" },
    //     { id: 3, text: "New blog post published." }
    // ];

    const userMenuOptions = [
        // { id: 1, text: "My Profile" },
        // { id: 2, text: "Settings" },
        { id: 3, text: "Log out", action: handleLogout }
    ];

    return (
        <header className={`header ${isTransparent ? 'transparent-header' : ''}`}>
            <div className="main-header">
                <div className="main-menu-wrap">
                    <div className="navbar-container">
                        <div className="navbarRow align-items-center">
                            <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                                <div className="logo">
                                    <Link to="/" className="navbar-brand">
                                        <img src={Logo} alt="logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-4 col-6 menu-button">
                                <div className="menu--inner-area clearfix">
                                    <div className="menu-wraper">
                                        <nav>
                                            <div className="header-menu dosis">
                                                <ul>
                                                    <li className="active navbarList"><Link to="/"><span>Home</span></Link></li>
                                                    <li className="navbarList"><Link to="/featured-videos">Featured Recipes</Link></li>
                                                    <li className="navbarList"><Link to="/favorites">Favorites</Link></li>
                                                    <li className="navbarList"><Link to="#" onClick={scrollToPlansAndCombosSection}> Plans and Combos</Link></li> {/* Updated to prevent default behavior */}
                                                    <li className="navbarList"><Link to="#" onClick={scrollToBlogSection}> Blog</Link></li> {/* Updated to prevent default behavior */}
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-5 d-md-block d-none">
                                <div className="urgent-call text-right">
                                    {customerName && (
                                        <>
                                                
                                            <div className="user-greeting" onClick={handleUserMenuClick}>
                                                <span>Hello, {customerName}</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {showUserMenu && (
                                                    <div className="user-dialogue">
                                                        {userMenuOptions.map((option) => (
                                                            <div key={option.id} className="user-menu-item" onClick={option.action}>
                                                                {option.text}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {!customerName && (
                                        <Link to="/login" className="btn">Log In</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
