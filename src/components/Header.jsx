import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Import CSS
import logo from "../assets/ourlogo.jpeg"; // Import your logo
import Logout from "./Logout"; // Import Logout Button

const Header = () => {
  const token = localStorage.getItem("token"); // Check if user is logged in

  return (
    <header className="header">
      <div className="heading">
        <img 
          src={logo} 
          alt="Leo Signal Logo" 
          className="logo" 
          style={{ width: "auto", height: "90px", objectFit: "contain", marginRight: "10px" }} 
        />
        <h2>Leo Signal Trading Simulator</h2>
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/about">Home</Link></li>
          <li><Link to="/holdings">Holdings</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/simulator">Simulator</Link></li>

          {/* Show Login/Signup if NOT logged in, otherwise show Logout */}
          {token ? (
            <li><Logout /></li> 
          ) : (
            <>
              <li><Link to="/login" className="auth-btn">Login</Link></li>
              <li><Link to="/signup" className="auth-btn">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
