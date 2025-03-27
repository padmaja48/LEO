import React, { useContext, useEffect } from "react";
import "../styles/Holdings.css";
import { OrderContext } from "../context/OrderContext"; 

const Holdings = () => {
  const { holdings = [] } = useContext(OrderContext); // Ensure holdings is not undefined

  useEffect(() => {
    console.log("Holdings Data:", holdings); // Debugging
  }, [holdings]);

  // Filter out holdings that have been sold
  const availableHoldings = holdings.filter((holding) => holding.status !== "Sold");

  return (
    <div className="holdings-container">
      <h2 className="holdings-title">My Holdings</h2>
      {availableHoldings.length === 0 ? (
        <p className="white-text no-holdings">No Holdings Available</p>
      ) : (
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Avg. Buy Price (USD)</th>
              <th>Current Price (USD)</th>
              <th>P&L (USD)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableHoldings.map((holding) => {
              const profitLoss = (holding.currentPrice - holding.buyPrice) * holding.quantity;
              return (
                <tr key={holding.stock}>
                  <td>{holding.stock}</td>
                  <td>{holding.quantity}</td>
                  <td>${holding.buyPrice.toFixed(2)}</td> {/* Direct USD prices */}
                  <td>${holding.currentPrice.toFixed(2)}</td>
                  <td className={profitLoss >= 0 ? "green-text" : "red-text"}>
                    {profitLoss >= 0
                      ? `+$${profitLoss.toFixed(2)}`
                      : `-$${Math.abs(profitLoss).toFixed(2)}`}
                  </td>
                  <td>
                    <button className="sell-button">Sell</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Holdings;
