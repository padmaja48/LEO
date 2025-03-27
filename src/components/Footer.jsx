import React, { useState } from "react";
import "../styles/Footer.css"; // Make sure to add the CSS for the chat UI

const Footer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");

  // Toggle the chatbot visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle message input
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending the message to the backend API
  const handleSendMessage = async () => {
    if (!message) return;

    try {
      const response = await fetch("https://leo-6kuu.onrender.com/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChatbotResponse(data.response || "Sorry, I couldn't process your request.");
      setMessage(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
      setChatbotResponse("Sorry, there was an error with the chatbot.");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Leo Signal Trading Simulator Contatct - support@leosignal.com. All rights reserved . .</p>

        {/* Button to open/close the chatbot */}
        <button onClick={toggleChat} className="chatbot-toggle-btn">
          {isChatOpen ? "Close Chatbot" : "Open Chatbot"}
        </button>

        {/* Display Chatbot if it's open */}
        {isChatOpen && (
          <div className="chatbot-container">
            <div className="chatbot-header">
              <h3>Chatbot</h3>
              <button onClick={toggleChat} className="close-chatbot-btn">X</button>
            </div>
            <div className="chatbot-body">
              <div className="messages">
                <div className="user-message">{message}</div>
                <div className="chatbot-message">{chatbotResponse}</div>
              </div>
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
