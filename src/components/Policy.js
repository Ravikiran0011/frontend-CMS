import React from "react";
import { useParams } from "react-router-dom";
import "./Policy.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Policy() {
  const navigate = useNavigate();
  let policies = JSON.parse(localStorage.getItem("policies"));
  const { id } = useParams();
  const policy = policies.find((p) => p._id === id);
  const DeletePolicy = async (id) => {
    try {
      const resp = await axios.delete(
        process.env.REACT_APP_SERVER + "/policy/" + id
      );
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h2>Policy Details</h2>
      </div>
      <div className="card-body">
        <div className="card-row">
          <span className="label">Policy:</span>
          <span className="value">{policy._id}</span>
        </div>
        <div className="card-row">
          <span className="label">Amount:</span>
          <span className="value">${policy.amount}</span>
        </div>
        <div className="card-row">
          <span className="label">Status:</span>
          <span className="value">{policy.status}</span>
        </div>
      </div>
      <button
        onClick={() => {
          DeletePolicy(id);
        }}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
}
export default Policy;
