import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Policy from "./components/Policy";
import PolicyForm from "./components/PolicyForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/policy/create" element={<PolicyForm />} />
        <Route exact path="/policy/:id" element={<Policy />} />
      </Routes>
    </Router>
  );
}
export default App;
