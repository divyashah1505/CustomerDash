import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "../MODAL/Toast";

const AddAddress = () => {
  const [address, setAddress] = useState("");
  const [isPrimary, setIsPrimary] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    const token = localStorage.getItem("clothiq_token");

    try {
      const res = await axios.post(
        `${BASE_URL}/add`,
        {
          Address: address,
          isPrimary: isPrimary ? 1 : 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        toast.success('Address added successfully!');
        navigate(location.state?.from || "/cart");
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add address. Please try again.');
    }
  };

  return (
    <div className="container py-20">
      <h2>Add Delivery Address</h2>

      <textarea
        placeholder="Enter full address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", height: "120px" }}
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={isPrimary}
            onChange={() => setIsPrimary(!isPrimary)}
          />
          Set as Primary Address
        </label>
      </div>

      <button onClick={handleSubmit}>
        Save Address
      </button>
    </div>
  );
};

export default AddAddress;