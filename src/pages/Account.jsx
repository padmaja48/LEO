import React, { useState, useEffect } from "react";
import "../styles/Account.css";
import axios from "axios"; // Import Axios for API calls

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data from backend API
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://your-backend.com/api/user"); // Replace with actual API
        setUser(response.data);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="account-container">
      <h2 className="account-title">My Account</h2>

      {/* Profile Section */}
      <div className="profile-section">
        <img src={user.profilePic} alt="Profile" className="profile-pic" />
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p className="account-type">{user.accountType}</p>
        </div>
      </div>

      {/* Account Details */}
      <div className="account-details">
        <h3>Portfolio Balance</h3>
        <p className="balance">₹{user.balance.toFixed(2)}</p>

        <h3>Trading Preferences</h3>
        <p>Default Order Type: <strong>{user.defaultOrderType}</strong></p>
        <p>Max Daily Loss: <strong>₹{user.maxDailyLoss}</strong></p>
      </div>

      {/* Actions */}
      <div className="account-actions">
        <button className="settings-btn">Edit Profile</button>
        <button className="security-btn">Security Settings</button>
        <button className="support-btn">Support</button>
      </div>
    </div>
  );
};

export default Account;
