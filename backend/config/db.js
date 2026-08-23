
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB Already Connected");
      return;
    }

    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000,          
    });

    console.log("✅ MongoDB Connected Successfully");

  } catch (error) {
    console.log("❌ MongoDB Error:", error.message);
  }
};

module.exports = connectDB;
