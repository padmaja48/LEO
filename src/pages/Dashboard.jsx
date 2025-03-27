import React, { useContext, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { OrderContext } from "../context/OrderContext"; // Context for Orders & Holdings

const Dashboard = () => {
  const { orders, holdings } = useContext(OrderContext); // Get data from context
  const [marketData, setMarketData] = useState([]); // Store market data

  // Simulate fetching market data (Replace with actual API later)
  useEffect(() => {
    const fetchMarketData = async () => {
      const dummyData = [
        { stock: "TCS", price: 46.20, change: "+2.1%" }, // Prices directly in USD
        { stock: "INFY", price: 18.20, change: "-1.2%" },
        { stock: "RELIANCE", price: 29.30, change: "+0.8%" },
        { stock: "HDFCBANK", price: 18.50, change: "-0.5%" },
      ];
      setMarketData(dummyData);
    };

    fetchMarketData();
  }, []);

  // Calculate Portfolio Summary in USD
  const totalInvestment = holdings.reduce((sum, h) => sum + h.buyPrice * h.quantity, 0);
  const currentPortfolioValue = holdings.reduce((sum, h) => sum + h.currentPrice * h.quantity, 0);
  const totalPL = currentPortfolioValue - totalInvestment;

  // Function to calculate profit or loss for each order
  const calculateProfitLoss = (order) => {
    const stockMarketData = marketData.find(stock => stock.stock === order.stock);
    if (!stockMarketData) return 0; // Return 0 if no market data is found for the stock

    // If order is a Buy, we can't calculate P&L yet
    if (order.type === "Buy") {
      return 0;
    }

    // If order is a Sell, calculate P&L
    if (order.type === "Sell") {
      // Get all matching completed Buy orders for the stock
      const matchingBuyOrders = orders.filter(o => o.stock === order.stock && o.type === "Buy" && o.status === "Completed");

      let totalBuyPrice = 0;
      let totalBuyQuantity = 0;

      // Match Buy orders with Sell orders
      for (let i = 0; i < matchingBuyOrders.length; i++) {
        const buyOrder = matchingBuyOrders[i];
        const remainingQuantity = buyOrder.quantity - totalBuyQuantity;
        if (remainingQuantity > 0) {
          const quantityToMatch = Math.min(order.quantity, remainingQuantity);
          totalBuyPrice += buyOrder.price * quantityToMatch;
          totalBuyQuantity += quantityToMatch;
          order.quantity -= quantityToMatch;

          // If the order is fully matched, break out of the loop
          if (order.quantity <= 0) break;
        }
      }

      const sellPrice = stockMarketData.price;
      return (sellPrice - totalBuyPrice / totalBuyQuantity) * totalBuyQuantity;
    }

    return 0;
  };

  return (
    <div className="dashboard-container">
      {/* Portfolio Summary */}
      <div className="portfolio-summary">
        <h2 className="section-title">Portfolio Summary</h2>
        <div className="summary-cards">
          <div className="card">
            <h3>Total Investment</h3>
            <p>${totalInvestment.toFixed(2)}</p>
          </div>
          <div className="card">
            <h3>Current Value</h3>
            <p>${currentPortfolioValue.toFixed(2)}</p>
          </div>
          <div className={`card ${totalPL >= 0 ? "green-text" : "red-text"}`}>
            <h3>Profit & Loss</h3>
            <p>
              {totalPL >= 0 ? `+$${totalPL.toFixed(2)}` : `-$${Math.abs(totalPL).toFixed(2)}`}
            </p>
          </div>
        </div>
      </div>

      {/* Market Data Section */}
      <div className="market-data">
        <h2 className="section-title">Market Data</h2>
        <table className="market-table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Price (USD)</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((stock, index) => (
              <tr key={index}>
                <td>{stock.stock}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td className={stock.change.includes("+") ? "green-text" : "red-text"}>
                  {stock.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <h2 className="section-title">Recent Orders</h2>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price (USD)</th>
                <th>Status</th>
                <th>Profit/Loss</th> {/* Added column for Profit/Loss */}
              </tr>
            </thead>
            <tbody>
              {orders.slice(-5).map((order) => (
                <tr key={order.id}>
                  <td>{order.stock}</td>
                  <td className={order.type === "Buy" ? "green-text" : "red-text"}>{order.type}</td>
                  <td>{order.quantity}</td>
                  <td>${order.price.toFixed(2)}</td> {/* Direct USD prices */}
                  <td>{order.status}</td>
                  <td>
                    {order.type === "Buy" ? (
                      "-"
                    ) : (
                      <span className={calculateProfitLoss(order) >= 0 ? "green-text" : "red-text"}>
                        ${calculateProfitLoss(order).toFixed(2)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
