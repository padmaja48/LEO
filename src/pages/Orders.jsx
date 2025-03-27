import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const Orders = () => {
  const { orders } = useContext(OrderContext); // Access orders from context

  // Sort orders by orderTime in descending order (latest first)
  const sortedOrders = orders.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>
      {orders.length === 0 ? (
        <p className="white-text">No Orders Placed</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price (USD)</th>
              <th>Status</th>
              <th>Order Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.stock}</td>
                <td className={order.type === "Buy" ? "buy-text" : "sell-text"}>
                  {order.type}
                </td>
                <td>{order.quantity}</td> {/* Display quantity here */}
                <td>${order.price.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{order.orderTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
