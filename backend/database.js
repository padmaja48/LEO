const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // Load environment variables

const uri = process.env.MONGO_URI; // Use .env for security

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    return client.db("Leosignal"); // Select your database
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
