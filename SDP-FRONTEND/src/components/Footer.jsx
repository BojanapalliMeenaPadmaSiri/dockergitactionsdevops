// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h4>What We Do</h4>
          <ul>
            <li><a href="#">Student Reports</a></li>
            <li><a href="#">Faculty Tools</a></li>
            <li><a href="#">Parent Portal</a></li>
            <li><a href="#">Admin Dashboard</a></li>
            <li><a href="#">Data Analytics</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h4>Who We Serve</h4>
          <ul>
            <li><a href="#">Students</a></li>
            <li><a href="#">Parents</a></li>
            <li><a href="#">Faculty</a></li>
            <li><a href="#">Institutions</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-column">
          <h4>Where We Are</h4>
          <ul>
            <li><a href="#">Hyderabad</a></li>
            <li><a href="#">Bangalore</a></li>
            <li><a href="#">Chennai</a></li>
            <li><a href="#">Mumbai</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Skill Track. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
