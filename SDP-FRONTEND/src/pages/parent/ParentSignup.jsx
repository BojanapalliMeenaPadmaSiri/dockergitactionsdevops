import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "../auth.css";

function ParentSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/parents/signup", { name, email, password });
      alert("Signup successful!");
      navigate("/login/parent");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="auth-container parent-theme">
      <div className="illustration-side">
        <img
          src="/parent.png"
          alt="Parent illustration"
          className="student-illustration"
        />
      </div>
      <div className="auth-box">
        <h2>Parent Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/login/parents">Login</Link>
        </p>
        <p>
          <Link to="/" className="back-link">⬅ Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default ParentSignup;