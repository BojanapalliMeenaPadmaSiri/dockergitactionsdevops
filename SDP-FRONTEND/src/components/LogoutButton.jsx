import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole"); // clear role or token
    navigate("/"); // go back to home page
  };

  return (
    <button onClick={handleLogout} style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      padding: "6px 12px",
      backgroundColor: "#fbfdfbff",
      color: "#0a3013ff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}>
      Logout
    </button>
  );
}

export default LogoutButton;
