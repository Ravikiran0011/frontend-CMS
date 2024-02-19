import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // let user = useStore((store) => store.tasks);
    event.preventDefault();
    // alert(`Name: ${name}, Email: ${email}, Password: ${password}`);

    // send a req to server
    console.log(process.env);
    try {
      const resp = await axios.post(
        process.env.REACT_APP_SERVER + "/policyholder",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      // Assuming the response contains the user data
      const userData = resp.data;
      localStorage.setItem("id", userData._id);
      console.log(userData);
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
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

        <button onClick={() => navigate("/login")}>Login</button>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
