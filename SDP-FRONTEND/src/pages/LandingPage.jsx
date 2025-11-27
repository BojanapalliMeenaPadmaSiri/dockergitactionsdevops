import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import "../components/Navbar.css";
function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav className="navbar">
    
        <div className="nav-links">
          <Link to="/">Home</Link>

          {/* Login Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setLoginOpen(true)}
            onMouseLeave={() => setLoginOpen(false)}
          >
            <span className="dropdown-btn">Login ▾</span>
            {loginOpen && (
              <div className="dropdown-menu">
                <Link to="/login/admin">Admin</Link>
                <Link to="/login/faculty">Faculty</Link>
                <Link to="/login/student">Student</Link>
                <Link to="/login/parent">Parent</Link>
              </div>
            )}
          </div>

          {/* Signup Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setSignupOpen(true)}
            onMouseLeave={() => setSignupOpen(false)}
          >
            <span className="dropdown-btn">Signup ▾</span>
            {signupOpen && (
              <div className="dropdown-menu">
                
                <Link to="/signup/faculty">Faculty</Link>
                <Link to="/signup/student">Student</Link>
                <Link to="/signup/parent">Parent</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="landing-container">
        <h1 className="landing-title">Welcome to Student Report System</h1>
        <p className="landing-subtitle">
          Organize. Analyze. Achieve - Your Academic Journey Starts Here.
        </p>
        <Link to="/login/student" className="get-started-btn">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
