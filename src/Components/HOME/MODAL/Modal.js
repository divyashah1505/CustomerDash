// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// import './Modal.css'; 
// import { toast } from 'react-toastify'; 
// import { BASE_URL } from "../../../config/config"; 

// const Modal = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${BASE_URL}/clogin`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email_address: email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Storing token and customerName in local storage
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('customerName', data.customerName);

//         toast.success(data.message || 'Login successful!', { autoClose: 2000 });

//         setTimeout(() => {
//           onClose(); // Close the modal
//           navigate('/'); // Redirect to home or dashboard page
//         }, 2000);
//       } else {
//         toast.error(data.message || 'Login failed. Please try again.', { autoClose: 5000 });
//       }
//     } catch (error) {
//       console.error('Error connecting to the server', error);
//       toast.error('Internal server error', { autoClose: 5000 });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <div className="modal-header">
//           <div className="close-container" onClick={onClose}>
//             <div className="leftright"></div>
//             <div className="rightleft"></div>
//           </div>
//         </div>
//         <div className="modal-content">
//           <form onSubmit={handleSubmit} className="modal-form">
//             <h1 className="lead text-center text-dark">Please Login to Continue..</h1>
//             <div className="form-group">
//               <FontAwesomeIcon icon={faEnvelope} />
//               <input
//                 type="text"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="theme-input-style"
//                 required
//                 placeholder="Email"
//                 autoComplete="username" 
//               />
//             </div>
//             <div className="form-group">
//               <FontAwesomeIcon icon={faLock} />
//               <input
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="theme-input-style"
//                 required
//                 placeholder="Password"
//                 autoComplete="current-password"
//               />
//             </div>
//             <div className="form-group">
//               <button className="modal-login-btn" type="submit">
//                 Sign In
//               </button>
//             </div>

//             <div className="option text-center my-2">
//               <label>Don't have an Account? &ensp;</label>
//               <Link to="/signup">
//                 <span>Register Here</span>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;







// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Modal.css';
// import { BASE_URL } from "../../../config/config";

// const Modal = ({ isOpen, onClose, redirectTo }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${BASE_URL}/clogin`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email_address: email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('customerName', data.customerName);

//         toast.success(data.message || 'Login successful!', { autoClose: 2000 });

//         setTimeout(() => {
//           onClose();
//           if (redirectTo) {
//             navigate(redirectTo); // Redirect to the specified route
//           } else {
//             navigate('/'); // Default redirect to home
//           }
//         }, 2000);
//       } else {
//         toast.error(data.message || 'Login failed. Please try again.', { autoClose: 5000 });
//       }
//     } catch (error) {
//       console.error('Error connecting to the server', error);
//       toast.error('Internal server error', { autoClose: 5000 });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <div className="modal-header">
//           <div className="close-container" onClick={onClose}>
//             <div className="leftright"></div>
//             <div className="rightleft"></div>
//           </div>
//         </div>
//         <div className="modal-content">
//           <form onSubmit={handleSubmit} className="modal-form">
//             <h1 className="lead text-center text-dark">Please Login to Continue..</h1>
//             <div className="form-group">
//               <FontAwesomeIcon icon={faEnvelope} />
//               <input
//                 type="text"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="theme-input-style"
//                 required
//                 placeholder="Email"
//                 autoComplete="username" 
//               />
//             </div>
//             <div className="form-group">
//               <FontAwesomeIcon icon={faLock} />
//               <input
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="theme-input-style"
//                 required
//                 placeholder="Password"
//                 autoComplete="current-password"
//               />
//             </div>
//             <div className="form-group">
//               <button className="modal-login-btn" type="submit">
//                 Sign In
//               </button>
//             </div>

//             <div className="option text-center my-2">
//               <label>Don't have an Account? &ensp;</label>
//               <Link to="/signup">
//                 <span>Register Here</span>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Modal;













import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Modal.css';
import { BASE_URL } from "../../../config/config";

const Modal = ({ isOpen, onClose, redirectTo }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/clogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('customerName', data.customerName);
        localStorage.setItem('customerId', data.id); 

        toast.success(data.message || 'Login successful!', { autoClose: 2000 });

        setTimeout(() => {
          onClose();
          if (redirectTo) {
            navigate(redirectTo); 
            window.location.reload();
          } else {
            navigate('/'); 
          }
        }, 2000);
      } else {
        toast.error(data.message || 'Login failed. Please try again.', { autoClose: 5000 });
      }
    } catch (error) {
      console.error('Error connecting to the server', error);
      toast.error('Internal server error', { autoClose: 5000 });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="close-container" onClick={onClose}>
            <div className="leftright"></div>
            <div className="rightleft"></div>
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit} className="modal-form">
            <h1 className="lead text-center text-dark">Please Login to Continue..</h1>
            <div className="form-group">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="theme-input-style"
                required
                placeholder="Email"
                autoComplete="username" 
              />
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="theme-input-style"
                required
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
            <div className="form-group">
              <button className="modal-login-btn" type="submit">
                Sign In
              </button>
            </div>

            <div className="option text-center my-2">
              <label>Don't have an Account? &ensp;</label>
              <Link to="/signup">
                <span>Register Here</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
