import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // let user = useStore((store) => store.tasks);
    event.preventDefault();
    // alert(`Name: ${name}, Email: ${email}, Password: ${password}`);

    // send a req to server
    try {
      const resp = await axios.post(
        process.env.REACT_APP_SERVER + "/loginpolicyholder",
        {
          email: email,
          password: password,
        }
      );
      // Assuming the response contains the user data
      const userData = resp.data;
      console.log(userData);
      localStorage.setItem("id", userData._id);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Policy Holder Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
