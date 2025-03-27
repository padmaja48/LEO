import React, { useEffect, useState } from "react";
import axios from "axios";
import TradingViewWidget from "../components/TradingViewWidget";
import "../styles/Home.css";

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const backendUrl = "http://localhost:5000"; // Update to match your backend port

  const fetchStockData = async (symbol) => {
    if (!symbol.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${backendUrl}/api/stocks/${symbol.toUpperCase()}`);
      if (response.data.error) {
        setError(response.data.error);
        setStocks([]);
      } else {
        setStocks([response.data]);
      }
    } catch (err) {
      console.error("❌ Error fetching stock data:", err);
      setError("Failed to fetch stock data. Please try again.");
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setStocks([]);
    setError("");
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    try {
      const response = await axios.post(`${backendUrl}/api/chatbot`, { message: chatInput });
      setChatResponse(response.data.response);
    } catch (err) {
      console.error("Error fetching chatbot response:", err);
      setChatResponse("Failed to get response from AI.");
    }
  };

  useEffect(() => {
    const scriptId = "tradingview-ticker-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const container = document.getElementById("tradingview-ticker");
      if (!container) return;

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "NASDAQ:AAPL", title: "Apple" },
          { proName: "NASDAQ:TSLA", title: "Tesla" },
          { proName: "NASDAQ:GOOGL", title: "Google" },
        ],
        showSymbolLogo: true,
        colorTheme: "dark",
        displayMode: "adaptive",
        locale: "en"
      });

      container.appendChild(script);
    }
  }, []);

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => fetchStockData(searchQuery)}>Search</button>
        <button onClick={clearSearch} className="clear-btn">Clear</button>
      </div>

      <div className="stock-data">
        {loading ? <p>Loading...</p> : error ? <p className="error">{error}</p> :
          stocks.length > 0 ? (
            <table className="stocks-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.symbol}</td>
                    <td>${stock.price}</td>
                    <td>${stock.change}</td>
                    <td>{stock.change_percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>No stock data available.</p>
        }
      </div>

      {/* Chatbot Section */}
      <div className="chatbot-section">
        <h2>Chat with AI</h2>
        <form onSubmit={handleChatSubmit}>
          <input
            type="text"
            placeholder="Ask about stock trends..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button type="submit">Ask</button>
        </form>
        {chatResponse && <p className="chat-response">{chatResponse}</p>}
      </div>

      {/* TradingView Widget */}
      <div className="tradingview-widget-section">
        <h2>Market Overview</h2>
        <TradingViewWidget />
      </div>

      {/* TradingView Ticker */}
      <div id="tradingview-ticker" className="tradingview-widget-container"></div>

      {/* Footer */}
      <div className="footer">
        <p>© 2025 LeoSignal Trading Simulator. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
