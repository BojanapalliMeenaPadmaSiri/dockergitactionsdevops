import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "../auth.css";

function FacultyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/faculty/login", { email, password });
      if (res.data) {
        alert("Login successful!");
        navigate("/faculty/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="auth-container faculty-theme">
      <div className="illustration-side">
        <img
          src="/faculty.png"
          alt="Faculty illustration"
          className="student-illustration"
        />
      </div>
      <div className="auth-box">
        <h2>Faculty Login</h2>
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
          Don’t have an account? <Link to="/signup/faculty">Signup</Link>
        </p>
        <p>
          <Link to="/" className="back-link">
            ⬅ Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
export default FacultyLogin;
