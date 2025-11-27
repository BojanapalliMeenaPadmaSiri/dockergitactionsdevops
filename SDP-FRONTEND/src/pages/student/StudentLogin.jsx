import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "../auth.css";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/students/login", { email, password });
      if (res.data && res.data.id) {
        localStorage.setItem("studentId", res.data.id);
        localStorage.setItem("studentName", res.data.name);
        alert("Login successful!");
        navigate("/student/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      {/* === LEFT SIDE WITH ILLUSTRATION === */}
      <div className="illustration-side">
        <img
          src="/student.png"
          alt="Student illustration"
          className="student-illustration"
        />
      </div>

      {/* === RIGHT SIDE WITH FORM === */}
      <div className="auth-box">
        <h2>Student Login</h2>
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
          Don’t have an account?{" "}
          <Link to="/signup/student">Signup</Link>
        </p>
        <p>
          <Link to="/" className="back-link">⬅ Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;
