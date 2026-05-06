// // React component
// import React, { useState } from 'react';
// import './PriceSection.css';
// import { Link } from 'react-router-dom';
// import combo1 from "../../IMAGES/E-learning-images/combo1.webp"
// import combo2 from "../../IMAGES/E-learning-images/combo2.webp"
// import combo3 from "../../IMAGES/E-learning-images/combo3.webp"


// const PriceSection = () => {
//   const [activeTab, setActiveTab] = useState('plans');

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <section className="pt-40 pb-80" id="pricing">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="section-title text-center">
//             <h2>Plans & Combos</h2>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12">
//             <div className="price-nav-wrap">
//               <div className="price--nav-inner">
//                 <nav>
//                   <div className="nav info-tabs">
//                     <Link
//                       className={`price--nav-item ${
//                         activeTab === 'plans' ? 'active' : ''
//                       }`}
//                       id="nav-contact-tab"
//                       onClick={() => handleTabChange('plans')}
//                     >
//                       Plans
//                     </Link>
//                     <Link
//                       className={`price--nav-item ${
//                         activeTab === 'combo' ? 'active' : ''
//                       }`}
//                       onClick={() => handleTabChange('combo')}
//                     >
//                       Combos
//                     </Link>
//                   </div>
//                 </nav>
//               </div>
//             </div>


//             <div className="tab-content price-content">
//               <div
//                 className={`tab-pane fade ${
//                   activeTab === 'plans' ? 'active show' : ''
//                 }`}
//                 id="plans"
//                 role="tabpanel"
//               >
//                 <div className="price-row">
//                   <PricingPlan
//                     name="Silver"
//                     price="Rs 99/-"
//                     features={['1 Month Validity', '10 Free Recipees', '']}
//                   />
//                   <PricingPlan
//                     name="Gold"
//                     price="Rs 499/-"
//                     features={[
//                       '6 Month Validity',
//                       '100 Free Recipees',
//                       '',
//                     ]}
//                     active={true}
//                   />
//                   <PricingPlan
//                     name="Diamond"
//                     price="Rs 799/-"
//                     features={[
//                       '1 Year Validity',
//                       'Unlimited Free Recipees',
//                       '',
//                     ]}
//                   />
//                 </div>
//               </div>
//               {/* Combo Images */}
//               <div
//                 className={`tab-pane fade ${
//                   activeTab === 'combo' ? 'active show' : ''
//                 }`}
//                 id="combo"
//                 role="tabpanel"
//               >
//                 <div className="combo-row">
//                   <ComboImage src={combo1} alt="Combo Image 1" />
//                   <ComboImage src={combo2} alt="Combo Image 2" />
//                   <ComboImage src={combo3} alt="Combo Image 3" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const PricingPlan = ({ name, price, features, active }) => {
//   return (
//     <div className={`col-md-4 ${active ? 'active' : ''}`}>
//       <div className="single-price-plan text-center">
//         <div className="single-price-top">
//           <h4>{name}</h4>
//           <span>{price}</span>
//         </div>
//         <div className="single-price-body">
//           <div className="price-list">
//             <ul>
//               {features.map((feature, index) => (
//                 <li key={index}>
//                   <span>
//                     {index < 4 ? (
//                       <i className="fa fa-check" aria-hidden="true"></i>
//                     ) : (
//                       <i className="fa fa-times" aria-hidden="true"></i>
//                     )}
//                   </span>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <button className="btn">Get Started</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ComboImage = ({ src, alt }) => {
//   return (
//     <div className="col-lg-4 d-flex justify-content-center">
//       <div className="combo-image">
//         <img src={src} alt={alt} />
//       </div>
//     </div>
//   );
// };

// export default PriceSection;





// import axios from 'axios'; // Ensure axios is installed or use the native fetch API
// import './PriceSection.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { BASE_URL } from "../../../config/config";

// const PriceSection = () => {
//   const [activeTab, setActiveTab] = useState('plans');
//   const [combos, setCombos] = useState([]);

//   useEffect(() => {
//     const fetchCombos = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/activecombos`);
//         if (Array.isArray(response.data)) {
//           setCombos(response.data);
//         } else {
//           console.error("Expected an array for combos but got:", typeof response.data);
//           setCombos([]); // Set to an empty array to avoid errors
//         }
//       } catch (error) {
//         console.error("Failed to fetch combos", error);
//         setCombos([]); // Set to an empty array in case of an error
//       }
//     };

//     fetchCombos();
//   }, []);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <section className="pt-40 pb-80" id="pricing">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="section-title text-center">
//             <h2>Plans & Combos</h2>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12">
//             <div className="price-nav-wrap">
//               <div className="price--nav-inner">
//                 <nav>
//                   <div className="nav info-tabs">
//                     <Link
//                       className={`price--nav-item ${activeTab === 'plans' ? 'active' : ''}`}
//                       onClick={() => handleTabChange('plans')}
//                     >
//                       Plans
//                     </Link>
//                     <Link
//                       className={`price--nav-item ${activeTab === 'combo' ? 'active' : ''}`}
//                       onClick={() => handleTabChange('combo')}
//                     >
//                       Combos
//                     </Link>
//                   </div>
//                 </nav>
//               </div>
//             </div>

//             <div className="tab-content price-content">
//               <div
//                 className={`tab-pane fade ${activeTab === 'plans' ? 'show active' : ''}`}
//                 id="plans"
//                 role="tabpanel"
//               >
//                 <div className="price-row">
//                   <PricingPlan
//                     name="Silver"
//                     price="499"
//                     features={['1 Month Validity', '10 Free Recipes']}
//                   />
//                   <PricingPlan
//                     name="Gold"
//                     price="599"
//                     features={['6 Month Validity', '100 Free Recipes']}
//                     active={true}
//                   />
//                   <PricingPlan
//                     name="Diamond"
//                     price="699"
//                     features={['1 Year Validity', 'Unlimited Free Recipes']}
//                   />
//                 </div>
//               </div>

//               <div
//                 className={`tab-pane fade ${activeTab === 'combo' ? 'show active' : ''}`}
//                 id="combo"
//                 role="tabpanel"
//               >
//                 <div className="price-row">
//                   {combos.length > 0 ? (
//                     combos.map((combo, index) => (
//                       <PricingPlan
//                         key={combo.id || index} // Assuming your combo objects have an 'id' field
//                         name={combo.comboname}
//                         price={combo.comboprice}
//                         features={[combo.combodescription]} // Adjust according to your data structure
//                       />
//                     ))
//                   ) : (
//                     <p>No combos available at the moment.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const PricingPlan = ({ name, price, features, thumbnail, active, type }) => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate(`/plansdetail/${type}/${name}`, { state: { price, features, thumbnail } });
//   };

//   return (
//     <div className={`col-md-4 ${active ? 'active' : ''}`}>
//       <div className="single-price-plan text-center">
//         {thumbnail && (
//           <div className="combo-section-top">
//             <img src={thumbnail} alt={name} />
//             <h4>{name}</h4>
//           </div>
//         )}
//         {!thumbnail && (
//           <div className="single-price-top">
//             <h4>{name}</h4>
//           </div>
//         )}

//         <div className="combo-section-bottom">
//           <span>Rs {price}/-</span>
//           <ul className="price-list">
//             {features.map((feature, index) => (
//               <li key={index}>
//                 {feature}
//               </li>
//             ))}
//           </ul>
//           {thumbnail && <span>{price}</span>}
//         </div>

//         <div className="get-started-button">
//           <button className="btn" onClick={handleGetStarted}>Get Started</button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default PriceSection;import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/config';
import './PriceSection.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51P142NSD4IihR2313TAprmD6DyuCOYTDgP9jkrtNzYYHOaeXKu1nBNnhkqvge9dCfdYXlslfMVrwdJktnaLT3XZv0057eks7Wx');

const PriceSection = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [plans, setPlans] = useState([]);
  const [combos, setCombos] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/activecombos`);
        setCombos(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch combos', error);
        setCombos([]);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/getSubscriptionDetails`);
        if (response.data.success && Array.isArray(response.data.data)) {
          setPlans(response.data.data);
        } else {
          setPlans([]);
        }
      } catch (error) {
        console.error('Failed to fetch plans', error);
        setPlans([]);
      }
    };

    fetchCombos();
    fetchPlans();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleGetStarted = (plan) => {
    setSelectedPlan(plan);
    setShowQRCode(true);
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setShowQRCode(false);
  };

  const handleStripeCheckout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/create-checkout-session`, {
        name: selectedPlan.name,
        price: selectedPlan.price,
        description: selectedPlan.description,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      console.error('Stripe Checkout Error:', err);
      alert('Payment initiation failed. Try again.');
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <section className="pt-40 pb-80" id="pricing">
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-title text-center">
              <h2>Plans & Combos</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="price-nav-wrap">
                <div className="price--nav-inner">
                  <nav>
                    <div className="nav info-tabs">
                      <Link className={`price--nav-item ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => handleTabChange('plans')}>Plans</Link>
                      <Link className={`price--nav-item ${activeTab === 'combo' ? 'active' : ''}`} onClick={() => handleTabChange('combo')}>Combos</Link>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="tab-content price-content">
                <div className={`tab-pane fade ${activeTab === 'plans' ? 'show active' : ''}`} id="plans">
                  <div className="price-row row">
                    {plans.length > 0 ? (
                      plans.map((plan, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={plan._id || index}>
                          <PricingPlan
                            name={plan.name}
                            price={plan.price}
                            features={[
                              `${plan.duration_months} Months Validity`,
                              `${plan.discount_percent}% Discount on all orders`,
                              plan.free_delivery === 1 
                                ? `Free Delivery above ₹${plan.free_delivery_min_amount}` 
                                : "Standard Delivery",
                              plan.rewards?.first_order_points 
                                ? `${plan.rewards.first_order_points} Rewards on 1st Order`
                                : null
                            ].filter(Boolean)}
                            onGetStarted={() =>
                              handleGetStarted({
                                name: plan.name,
                                price: plan.price,
                                description: `${plan.duration_months} Months Membership`,
                              })
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <p>No plans available at the moment.</p>
                    )}
                  </div>
                </div>

                <div className={`tab-pane fade ${activeTab === 'combo' ? 'show active' : ''}`} id="combo">
                  <div className="price-row row">
                    {combos.length > 0 ? (
                      combos.map((combo, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={combo.comboid || index}>
                          <div className="single-blog-inner combo-card">
                            <div className="post-image combo-img-wrapper">
                              <img 
                                src={combo.combotthumbnail || combo.image} 
                                alt={combo.comboname || combo.name} 
                                className="image-container combo-img" 
                              />
                              <div className="combo-price-tag">₹{combo.comboprice || combo.price}</div>
                            </div>
                            <div className="post-content">
                              <div className="post-details">
                                <div className="post-title">
                                  <h3>{combo.comboname || combo.name}</h3>
                                </div>
                              </div>
                              <p className="combo-description">{combo.combodescription || combo.description}</p>
                              <button
                                className="btn cat-view-more-button w-100 mt-auto"
                                onClick={() =>
                                  handleGetStarted({
                                    name: combo.comboname || combo.name,
                                    price: combo.comboprice || combo.price,
                                    description: combo.combodescription || combo.description,
                                  })
                                }
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No combos available at the moment.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        <Modal show={showPaymentModal} onHide={handleCloseModal} dialogClassName="custom-modal-width">
          <Modal.Header closeButton>
            <Modal.Title>Complete Your Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="payment-summary">
              <h4 className="text-center mb-3">{selectedPlan?.name}</h4>
              <p className="text-center text-muted">
                You're purchasing <strong>{selectedPlan?.name}</strong> for <strong>₹{selectedPlan?.price}</strong>
              </p>
              <hr />
              <div className="d-flex flex-column flex-md-row gap-4">
                <div className="card-section flex-fill text-center">
                  <h5 className="mb-3">Pay with Stripe</h5>
                  <Button variant="primary" className="w-100" onClick={handleStripeCheckout}>
                    Pay via Stripe
                  </Button>
                </div>
                <div className="upi-section flex-fill text-center">
                  <h5 className="mb-3">Pay via UPI</h5>
                  <QRCodeCanvas
                    value={`upi://pay?pa=8000192167@axl&pn=Tapesh&am=${selectedPlan?.price}&cu=INR&tn=Payment for ${selectedPlan?.name}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                  <p className="text-muted mt-2 small">Scan this QR code using any UPI app</p>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </section>
    </Elements>
  );
};

const PricingPlan = ({ name, price, features, onGetStarted }) => {
  // Determine badge color based on name
  const isGold = name.toLowerCase().includes('gold');
  const isPlatinum = name.toLowerCase().includes('platinum');
  const isSilver = name.toLowerCase().includes('silver');

  let badgeClass = 'silver-badge';
  if (isGold) badgeClass = 'gold-badge';
  if (isPlatinum) badgeClass = 'platinum-badge';

  return (
    <div className="single-blog-inner plan-card">
      <div className={`post-image plan-badge-area ${badgeClass}`}>
        <div className="badge-overlay">
           <span className="membership-label">Membership</span>
           <h2 className="plan-badge-title">{name.split(' ')[0]}</h2>
        </div>
      </div>
      <div className="post-content">
        <div className="post-details">
          <div className="post-title">
            <h3>{name}</h3>
            <span className="plan-card-price">₹{price}</span>
          </div>
        </div>
        <ul className="plan-feature-list">
          {features.map((feature, index) => (
            <li key={index} className="plan-feature-item">
               <i className="fa fa-check-circle me-2"></i> {feature}
            </li>
          ))}
        </ul>
        <button className="btn cat-view-more-button w-100 h-100  mt-auto" onClick={onGetStarted}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PriceSection;
