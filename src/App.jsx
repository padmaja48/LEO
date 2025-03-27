import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Holdings from "./pages/Holdings";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Simulator from "./pages/Simulator";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { OrderProvider } from "./context/OrderContext"; // ✅ Import OrderProvider
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const App = () => {
  return (
    <OrderProvider> {/* ✅ Wrap the entire app inside OrderProvider */}
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header /> {/* This is where your site's header will go */}
          <main className="p-4 bg-gray-100 flex-grow min-h-[calc(100vh-120px)] overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} /> {/* Home Page */}
              <Route path="/about" element={<About />} /> {/* About Page */}
              <Route path="/holdings" element={<Holdings />} /> {/* Holdings Page */}
              <Route path="/orders" element={<Orders />} /> {/* Orders Page */}
              <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Page */}
              <Route path="/simulator" element={<Simulator />} /> {/* Simulator Page */}
              <Route path="/login" element={<Login />} /> {/* Login Page */}
              <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
            </Routes>
          </main>
          <Footer /> {/* Footer Component with chatbot integration */}
        </div>
      </Router>
      <ToastContainer />  {/* Render the ToastContainer to show the notifications */}
    </OrderProvider>
  );
};

export default App;
