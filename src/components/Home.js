import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Policy from "./Policy";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = localStorage.getItem("id");
  const [homestate, setHomestate] = useState({
    numberOfPolicies: 0,
    policies: [],
  });

  const getpolicies = async () => {
    try {
      // Your async code here
      // For example:
      // const response = await fetch('your-api-endpoint');
      // const data = await response.json();
      // console.log(data);
      const resp = await axios.get(
        process.env.REACT_APP_SERVER + "/policies/" + id
      );
      localStorage.setItem("policies", JSON.stringify(resp.data));
      const policiesdata = Object.values(resp.data);
      setHomestate({
        policies: resp.data,
        numberOfPolicies: policiesdata.length,
      });
      // console.log(typeof policiesdata);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  useEffect(
    () => {
      // First: Code to run on each render
      getpolicies();

      // Second: Cleanup function (optional)
      return () => {
        // Code to run on component unmount or when the dependency 'third' changes
      };
    },
    [
      /* List of dependencies, e.g., third */
    ]
  );

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container">
          <div className="user-card">
            <h3>Name: {user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Number of Policies: {homestate.numberOfPolicies}</p>
          </div>
        </div>
        {/* <div className="policies-container"> */}
        <div className="policies">
          Policies
          <button
            onClick={() => {
              navigate("/policy/create");
            }}
            className="create-button"
          >
            Create
          </button>
          {/* </div> */}
        </div>
        {/* policies */}
        {/* mapping the policies state */}

        <div className="policieslist">
          {homestate.policies &&
            homestate.policies.map((policy) => {
              return (
                <div
                  class="card"
                  onClick={() => navigate(`/policy/${policy._id}`)}
                >
                  <div class="card-header">
                    <h2>Policy Details</h2>
                  </div>
                  <div class="card-body">
                    <div class="card-row">
                      <span class="label">Policy:</span>
                      <span class="value">{policy._id}</span>
                    </div>
                    <div class="card-row">
                      <span class="label">Amount:</span>
                      <span class="value">${policy.amount}</span>
                    </div>
                    <div class="card-row">
                      <span class="label">Status:</span>
                      <span class="value">{policy.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Home;
