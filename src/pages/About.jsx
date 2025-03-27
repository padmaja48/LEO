import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">Leo Signal Trading Simulator</h1>
        <p className="about-text">
          Welcome to Leo Signal Trading Simulator, an advanced platform designed to educate and empower traders of all levels. Whether you're a beginner looking to learn the fundamentals or an experienced trader testing new strategies, our simulator provides a risk-free environment with real-time market insights.
        </p>

        <h2 className="about-subtitle">Why Choose Our Virtual Trading Platform?</h2>
        <p className="about-text">
          Our mission is to bridge the gap between theory and practical trading by offering an interactive, AI-driven experience. Gain hands-on exposure to stock markets, cryptocurrencies, and financial instruments while refining your decision-making skills. With Leo Signal Trading Simulator, you're not just learning—you're mastering the art of trading.
        </p>

        <div className="features">
          <div className="feature-item">
            <h3>📊 Live Market Data</h3>
            <p>Stay ahead with real-time stock, forex, and crypto updates. Track market movements as they happen and learn how to react in fast-paced conditions.</p>
          </div>
          <div className="feature-item">
            <h3>🤖 AI Trading Signals</h3>
            <p>Leverage AI-powered analytics to make informed investment decisions, helping you spot trends and patterns you might otherwise miss.</p>
          </div>
          <div className="feature-item">
            <h3>📈 Trading Behavior Analysis</h3>
            <p>Our AI tracks and analyzes your trades, providing daily summaries and insights into your trading behavior to help improve your strategy over time.</p>
          </div>
          <div className="feature-item">
            <h3>⚡ Risk-Free Trading</h3>
            <p>Simulate trades in a safe, virtual environment. Practice different approaches and strategies without any financial risk.</p>
          </div>
          <div className="feature-item">
            <h3>📚 Educational Resources</h3>
            <p>Access a wide array of tutorials, expert insights, and market trend analysis to sharpen your trading skills and stay up-to-date with industry changes.</p>
          </div>
          <div className="feature-item">
            <h3>📈 Strategy Testing</h3>
            <p>Backtest your trading strategies with historical data to refine your approach and ensure you're ready for real market conditions.</p>
          </div>
        </div>

        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-text">
          At Leo Signal Trading Simulator, we are committed to bridging the gap between theory and real-world trading. Our platform provides a hands-on experience, allowing users to develop trading strategies, analyze market trends, and refine decision-making skills in a completely risk-free environment. We aim to equip you with the tools needed to navigate the complexities of modern financial markets.
        </p>

        <h2 className="about-subtitle">Empowering the Future of Trading</h2>
        <p className="about-text">
          Whether you're a beginner exploring the stock market or an experienced trader testing advanced strategies, our AI-powered insights and real-time data provide the perfect learning environment. With a focus on practical education, we strive to build confident, well-informed traders who can effectively navigate the financial markets.
        </p>

        <h2 className="about-subtitle">Why We Stand Out</h2>
        <p className="about-text">
          Leo Signal Trading Simulator isn't just another trading platform; it's a comprehensive educational tool designed to accelerate your learning curve. We offer an unparalleled combination of AI-powered features, risk-free trading, and detailed performance feedback that sets us apart from the competition.
        </p>

        <h2 className="about-subtitle">Contact Us</h2>
        <p className="about-text">
          Have questions or need support? Reach out to us at <strong>support@leosignal.com</strong>. Our dedicated customer service team is ready to assist you.
        </p>

        <p className="about-text">
          Thank you for choosing Leo Signal Trading Simulator. We look forward to supporting your journey toward becoming a skilled and successful trader.
        </p>

        <button className="about-btn" onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;
