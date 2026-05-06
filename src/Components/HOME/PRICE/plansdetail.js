import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const PlanDetails = () => {
  const { type, name } = useParams();
  const location = useLocation();
  const { price, features, thumbnail } = location.state;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="plan-details">
            {thumbnail && <img src={thumbnail} alt={name} className="img-fluid" />}
            <h2>{name}</h2>
            <p>Type: {type}</p>
            <p>Price: Rs {price}/-</p>
            <ul>
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className="btn btn-primary">Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
