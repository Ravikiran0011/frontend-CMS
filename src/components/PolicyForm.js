import React, { useState } from "react";
import axios from "axios";
import "./PolicyForm.css"; // Create a CSS file for styling
import { useNavigate } from "react-router-dom";

const CreatePolicyForm = () => {
  const navigate = useNavigate();
  const [policyData, setPolicyData] = useState({
    policy: "",
    amount: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // user id
    const id = localStorage.getItem("id");
    console.log(policyData, "data");
    // send a req to server
    try {
      const resp = await axios.post(
        process.env.REACT_APP_SERVER + "/createpolicy",
        {
          id,
          policy: policyData.policy,
          amount: policyData.amount,
          status: policyData.status,
        }
      );
      // Assuming the response contains the user data
      const respolicy = resp.data;
      console.log("result", respolicy);
      let localpolicies = JSON.parse(localStorage.getItem("policies"));
      localpolicies.push(respolicy);
      localStorage.setItem("policies", JSON.stringify(localpolicies));
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }

    // Add your logic to handle form submission
    console.log("Form submitted with data:", policyData);
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">
        Create a Policy: <span className="blue-text">policy</span>
      </h1>
      <form onSubmit={handleSubmit} className="card-like-form">
        <div className="form-group">
          <label htmlFor="policy">Policy Type:</label>
          <input
            type="text"
            id="policy"
            name="policy"
            value={policyData.policy}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={policyData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={policyData.status}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePolicyForm;
