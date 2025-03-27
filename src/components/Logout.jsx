import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user token
    alert("Logged out successfully ✅");
    navigate("/login"); // Redirect to login page
  };

  return (
    <button 
      onClick={handleLogout} 
      className="auth-btn logout-btn"
    >
      Logout
    </button>
  );
};

export default Logout;
