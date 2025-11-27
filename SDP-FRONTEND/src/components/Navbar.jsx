import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../landing.css";

function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);

  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  return (
    <nav className="navbar-clean-navbar">
      <div className="logo">Skill Track</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!userRole && (
          <>
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
          </>
        )}

        <div
          className="dropdown"
          onMouseEnter={() => setDashOpen(true)}
          onMouseLeave={() => setDashOpen(false)}
        >
          <span className="dropdown-btn">Dashboards ▾</span>
          {dashOpen && (
            <div className="dropdown-menu">
              <Link to="/admin/dashboard">Admin</Link>
              <Link to="/faculty/dashboard">Faculty</Link>
              <Link to="/student/dashboard">Student</Link>
              <Link to="/parent/dashboard">Parent</Link>
            </div>
          )}
        </div>

        {userRole && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout ({userRole})
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
