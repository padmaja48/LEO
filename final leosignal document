import React, { useState, useEffect, useContext } from "react";
import Draggable from "react-draggable";  // Import Draggable
import "../styles/Simulator.css";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import TradingViewWidget from "../components/TradingViewWidget";
import { toast } from 'react-toastify'; // Import toast for notification
import '../styles/toastStyles.css';  // Adjust the path based on where you save the CSS file

const Simulator = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("NASDAQ:AAPL"); // Default stock
  const [chartHeight, setChartHeight] = useState(500);
  const [searchQuery, setSearchQuery] = useState("");
  const { addOrder, availableBalance, updateBalance, holdings, updateHoldings } = useContext(OrderContext);
  const [showBuyModal, setShowBuyModal] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [limitBuyPrice, setLimitBuyPrice] = useState("");  // Limit buy price
  const [stopLossPrice, setStopLossPrice] = useState("");  // Stop loss price
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const [showSellModal, setShowSellModal] = useState(null); // Modal state for selling
  const [sellQuantity, setSellQuantity] = useState(1); // Sell quantity
  const [limitSellPrice, setLimitSellPrice] = useState(""); // Limit sell price

  const navigate = useNavigate();

  // Fetch complete stock data every 3 minutes
  const fetchStockData = async () => {
    try {
      const response = await fetch("http://localhost:4000/stocks");
      const data = await response.json();
      if (Array.isArray(data)) {
        setStocks(data);
      } else {
        console.error("API did not return an array:", data);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch only live prices every 3 seconds
  const fetchLivePrices = async () => {
    try {
      const response = await fetch("http://localhost:4000/live-prices");
      const liveData = await response.json();
      if (Array.isArray(liveData)) {
        setStocks((prevStocks) =>
          prevStocks.map((stock) => {
            const updatedStock = liveData.find((s) => s.Symbol === stock.Symbol);
            return updatedStock
              ? { ...stock, Close: updatedStock.Close, ChangePercent: updatedStock.ChangePercent }
              : stock;
          })
        );
      } else {
        console.error("Live price API did not return an array:", liveData);
      }
    } catch (error) {
      console.error("Error fetching live prices:", error);
    }
  };

  useEffect(() => {
    fetchStockData();
    const stockInterval = setInterval(fetchStockData, 180000); // Refresh full data every 3 minutes
    return () => clearInterval(stockInterval);
  }, []);

  useEffect(() => {
    fetchLivePrices();
    const priceInterval = setInterval(fetchLivePrices, 3000); // Fetch live prices every 3 seconds
    return () => clearInterval(priceInterval);
  }, []);

  const handleStockSelect = (symbol) => {
    const formattedSymbol = `NASDAQ:${symbol}`;
    setSelectedChart(formattedSymbol);
  };

  // Handle Buy with Limit Price
  const handleBuy = (symbol, price) => {
    if (buyQuantity <= 0 || buyQuantity > 1000) {
      toast.error("Quantity must be between 1 and 1000!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    const totalCost = price * buyQuantity;

    if (totalCost > availableBalance) {
      toast.error("Insufficient balance!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    // If Limit Buy Price is set, only proceed if current price is at or below the limit
    if (limitBuyPrice && price > limitBuyPrice) {
      toast.error(`Current price is higher than the limit buy price of $${limitBuyPrice}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    addOrder(symbol, "Buy", price, buyQuantity); // Add the order
    updateBalance(-totalCost); // Update the balance

    // Update holdings
    const existingHolding = holdings.find((holding) => holding.symbol === symbol);
    if (existingHolding) {
      updateHoldings(symbol, existingHolding.quantity + buyQuantity);
    } else {
      updateHoldings(symbol, buyQuantity);
    }

    setSuccessMessage(`Successfully bought ${buyQuantity} shares of ${symbol} at $${price}`);

    setTimeout(() => setSuccessMessage(""), 3000);

    setShowBuyModal(null); // Close the modal after buying
  };

  // Handle Sell with Stop Loss
  const handleSell = (symbol, price) => {
    if (sellQuantity <= 0 || sellQuantity > 1000) {
      toast.error("Quantity must be between 1 and 1000!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    const totalCost = price * sellQuantity;

    if (totalCost > availableBalance) {
      toast.error("Insufficient balance!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    // If Limit Sell Price is set, only proceed if current price is at or below the limit
    if (limitSellPrice && price > limitSellPrice) {
      toast.error(`Current price is higher than the limit sell price of $${limitSellPrice}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    addOrder(symbol, "Sell", price, sellQuantity); // Add the order
    updateBalance(totalCost); // Update the balance

    // Update holdings
    const existingHolding = holdings.find((holding) => holding.symbol === symbol);
    if (existingHolding) {
      updateHoldings(symbol, existingHolding.quantity - sellQuantity);
    }

    setSuccessMessage(`Successfully sold ${sellQuantity} shares of ${symbol} at $${price}`);

    setTimeout(() => setSuccessMessage(""), 3000);

    setShowSellModal(null); // Close the modal after Selling
  };

  return (
    <div className="simulator-container">
      <div className="left-frame">
        <div className="market-watch frame">
          <h2 className="white-text">Market Watch</h2>
          <input
            type="text"
            placeholder="Search Stocks..."
            className="search-box"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {loading ? (
            <p className="white-text">Loading stock data...</p>
          ) : (
            <div className="stock-list">
              {stocks.length === 0 ? (
                <p className="white-text">No stocks available.</p>
              ) : (
                stocks
                  .filter((stock) => stock.Symbol.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((stock, index) => (
                    <div key={index} className="stock-item">
                      <div className="stock-details">
                        <strong className="white-text">{stock.Symbol}</strong>
                        <p className="white-text">
                          ${stock.Close} ({stock.ChangePercent}%)
                        </p>
                      </div>
                      <div className="stock-actions">
                        <button className="buy-button" onClick={() => setShowBuyModal(stock)}>
                          Buy
                        </button>
                        <button
                          className="sell-button" onClick={() => setShowSellModal(stock)}
                        >
                          Sell
                        </button>
                        <button className="chart-button" onClick={() => handleStockSelect(stock.Symbol)}>
                          Chart
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="right-frame">
        <div className="full-chart-container">
          <h2 className="white-text">Live Market Chart</h2>
          <div className="chart-resize">
            <label className="white-text">Adjust Chart Height:</label>
            <input
              type="range"
              min="300"
              max="800"
              value={chartHeight}
              onChange={(e) => setChartHeight(e.target.value)}
            />
          </div>
          <div className="tradingview-chart">
            <TradingViewWidget symbol={selectedChart} chartHeight={chartHeight} />
          </div>
        </div>
        <div className="youtube-embed-containers">
  <Draggable axis="both" handle=".youtube-embed-container">
    <div className="youtube-embed-container left">
      <iframe
        width="100%"
        height="210"
        src="https://www.youtube.com/embed/P857H4ej-MQ"
        title="CNBC TV"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </Draggable>

  <Draggable axis="both" handle=".youtube-embed-container">
    <div className="youtube-embed-container right">
      <iframe
        width="100%"
        height="210"
        src="https://www.youtube.com/embed/iEpJwprxDdk"
        title="Bloomberg TV"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </Draggable>
</div>
      </div>

      {/* Modal for confirming the Buy action */}
      {showBuyModal && (
        <div className="modal buy-modal">
          <h3>Buy {showBuyModal.Symbol}</h3>
          <p>Market Price: ${showBuyModal.Close}</p>
          <div className="input-group">
            <label>Quantity:</label>
            <input
              type="number"
              value={buyQuantity}
              onChange={(e) => {
                let value = Math.max(1, Math.min(1000, Number(e.target.value))); // Ensure quantity is between 1 and 1000
                setBuyQuantity(value);
              }}
            />
          </div>

          {/* Limit Buy Price */}
          <div className="input-group">
            <label>Limit Buy Price:</label>
            <input
              type="number"
              value={limitBuyPrice}
              onChange={(e) => setLimitBuyPrice(Number(e.target.value))}
              placeholder={`Set price below $${showBuyModal.Close}`}
            />
          </div>

          <button
            className="buy-btn"
            onClick={() => handleBuy(showBuyModal.Symbol, showBuyModal.Close)}
          >
            Confirm Buy
          </button>

          {/* Success Message below Confirm Buy */}
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          <button className="close-btn" onClick={() => setShowBuyModal(null)}>
            Close
          </button>
        </div>
      )}

      {/* Modal for confirming the Sell action */}
      {showSellModal && (
        <div className="modal sell-modal">
          <h3>Sell {showSellModal.Symbol}</h3>
          <p>Market Price: ${showSellModal.Close}</p>
          <div className="input-group">
            <label>Quantity:</label>
            <input
              type="number"
              value={sellQuantity}
              onChange={(e) => {
                let value = Math.max(1, Math.min(1000, Number(e.target.value))); // Ensure quantity is between 1 and 1000
                setSellQuantity(value);
              }}
            />
          </div>

          {/* Limit Sell Price */}
          <div className="input-group">
            <label>Limit Sell Price:</label>
            <input
              type="number"
              value={limitSellPrice}
              onChange={(e) => setLimitSellPrice(Number(e.target.value))}
              placeholder={`Set price below $${showSellModal.Close}`}
            />
          </div>

          <button
            className="sell-btn"
            onClick={() => handleSell(showSellModal.Symbol, showSellModal.Close)}
          >
            Confirm Sell
          </button>

          {/* Success Message below Confirm Sell */}
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          <button className="close-btn" onClick={() => setShowSellModal(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Simulator;
