import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([]); // Add holdings

  const addOrder = (stock, type, price, quantity) => {
    const newOrder = {
      id: orders.length + 1,
      stock,
      type,
      quantity,
      price,
      status: "completed",
      orderTime: new Date().toISOString(), // Store the current time
    };
    
    // Prepend the new order to the orders array (newest first)
    setOrders((prevOrders) => [newOrder, ...prevOrders]);

    // If it's a buy order, update holdings
    if (type === "Buy") {
      setHoldings((prevHoldings) => {
        const existingHolding = prevHoldings.find((h) => h.stock === stock);
        if (existingHolding) {
          // Update existing holding by recalculating the average buy price
          const totalCost = existingHolding.buyPrice * existingHolding.quantity + price * quantity;
          const totalQuantity = existingHolding.quantity + quantity;
          const newBuyPrice = totalCost / totalQuantity;
          return prevHoldings.map((h) =>
            h.stock === stock
              ? { ...h, quantity: totalQuantity, buyPrice: newBuyPrice, currentPrice: price }
              : h
          );
        } else {
          // Add a new holding if it doesn't exist
          return [
            ...prevHoldings,
            { stock, quantity, buyPrice: price, currentPrice: price },
          ];
        }
      });
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, holdings, setHoldings }}>
      {children}
    </OrderContext.Provider>
  );
};
