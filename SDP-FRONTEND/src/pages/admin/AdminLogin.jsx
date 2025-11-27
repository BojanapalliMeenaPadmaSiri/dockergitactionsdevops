import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "../auth.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", { email, password });
      if (res.data) {
        alert("Login successful!");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="auth-container admin-theme">
      <div className="illustration-side">
        <img
          src="/admin.png"
          alt="Admin illustration"
          className="student-illustration"
        />
      </div>
      <div className="auth-box">
        <h2>Admin Login</h2>
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
          <Link to="/" className="back-link">
            ⬅ Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
export default AdminLogin;