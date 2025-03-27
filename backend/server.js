const express = require('express');
const cors = require('cors');
const axios = require('axios');  // To make requests to the Gemini API

const app = express();
const PORT = process.env.PORT || 4000;
const FINNHUB_API_KEY = 'cv1l3t9r01qngf09ba5gcv1l3t9r01qngf09ba60'; // Replace with your Finnhub API key
const GEMINI_API_KEY = 'AIzaSyBBVdNWzDwSh8hGvAavm3g90O68rSjzprw'; // Replace with your Gemini API key

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());  // Middleware to parse JSON data from the body

// Endpoint to fetch stock data for specific symbols (query parameter or default)
app.get('/stocks', async (req, res) => {
  const stockSymbols = req.query.symbols
    ? req.query.symbols.split(",")  // If query parameter is provided, use it
    : ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA", "META", "NFLX", "IBM", "INTC"];  // Default symbols

  try {
    const promises = stockSymbols.map(async (symbol) => {
      try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
          params: { symbol, token: FINNHUB_API_KEY }
        });
        const data = response.data;

        if (!data || data.c === 0) {
          console.warn(`No valid data found for ${symbol}`);
          return null; // skip invalid symbol
        }

        return {
          Symbol: symbol,
          Open: data.o,
          High: data.h,
          Low: data.l,
          Close: data.c,
          Change: (data.c - data.pc).toFixed(2),
          ChangePercent: (((data.c - data.pc) / data.pc) * 100).toFixed(2),
        };
      } catch (err) {
        console.error(`Error fetching data for ${symbol}:`, err.message);
        return null; // skip if error
      }
    });

    let stocksData = await Promise.all(promises);
    stocksData = stocksData.filter((item) => item !== null); // remove nulls

    if (stocksData.length === 0) {
      return res.status(500).json({ error: "Could not fetch any valid stock data." });
    }

    res.json(stocksData);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: "Server error occurred." });
  }
});

// Endpoint to fetch live stock prices (use same API or simulate with random data)
app.get('/live-prices', async (req, res) => {
  try {
    const stockSymbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"];  // Can be dynamic based on need
    const promises = stockSymbols.map(async (symbol) => {
      try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
          params: { symbol, token: FINNHUB_API_KEY }
        });
        const data = response.data;

        if (!data || data.c === 0) {
          return null;
        }

        return {
          Symbol: symbol,
          Close: data.c,
          ChangePercent: (((data.c - data.pc) / data.pc) * 100).toFixed(2),
        };
      } catch (err) {
        console.error(`Error fetching live price for ${symbol}:`, err.message);
        return null;
      }
    });

    let livePrices = await Promise.all(promises);
    livePrices = livePrices.filter(item => item !== null); // remove nulls

    res.json(livePrices);
  } catch (err) {
    console.error("Error fetching live prices:", err.message);
    res.status(500).json({ error: "Error fetching live prices." });
  }
});

// Endpoint for Chatbot interaction (Gemini API)
app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Request stock data to include in the response
    const stockData = await fetchStockData(["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"]);
    const stockInfo = stockData.map(stock => `${stock.Symbol}: $${stock.Close}, Change: ${stock.ChangePercent}%`).join("\n");

    // Call the Gemini API for generating chatbot response
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Stock data:\n${stockInfo}\nUser question: ${message}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,  // Your Gemini API key
        },
      }
    );

    const chatbotResponse = response.data.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";

    res.json({ response: chatbotResponse });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.status(500).json({ error: "Failed to fetch chatbot response" });
  }
});

// Helper function to fetch stock data (for chatbot response)
const fetchStockData = async (symbols) => {
  const stockData = [];
  for (const symbol of symbols) {
    try {
      const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
      const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`;

      const [quoteRes, profileRes] = await Promise.all([axios.get(quoteUrl), axios.get(profileUrl)]);

      if (quoteRes.data.c && profileRes.data.name) {
        stockData.push({
          symbol,
          name: profileRes.data.name,
          price: quoteRes.data.c.toFixed(2),
          change: quoteRes.data.d ? quoteRes.data.d.toFixed(2) : "0.00",
          change_percent: quoteRes.data.dp ? quoteRes.data.dp.toFixed(2) : "0.00",
        });
      }
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error.message);
    }
  }
  return stockData;
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
