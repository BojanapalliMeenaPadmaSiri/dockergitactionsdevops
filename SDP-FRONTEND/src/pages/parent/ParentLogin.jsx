import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "../auth.css";

function ParentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/parents/login", { email, password });
      if (res.data) {
        alert("Login successful!");
        navigate("/parent/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
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
        <h2>Parent Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/signup/parents">Signup</Link>
        </p>
        <p>
          <Link to="/" className="back-link">⬅ Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default ParentLogin;
