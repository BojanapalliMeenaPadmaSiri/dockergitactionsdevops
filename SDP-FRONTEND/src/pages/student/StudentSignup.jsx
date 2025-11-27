import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "../auth.css";

function StudentSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/students/signup", { name, email, password });
      alert("Signup successful!");
      navigate("/login/student");
    } catch (err) {
      alert("Signup failed");
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
        <h2>Student Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
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
          Already have an account?{" "}
          <Link to="/login/student">Login</Link>
        </p>
        <p>
          <Link to="/" className="back-link">⬅ Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default StudentSignup;
