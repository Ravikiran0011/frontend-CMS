import React from "react";
import "./Navbar.css"; // Create a CSS file for styling
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout button clicked");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo">Health CMS</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
