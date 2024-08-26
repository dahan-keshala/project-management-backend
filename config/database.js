const mongoose = require("mongoose");

const connectDB = async () => {
  const dbURL = process.env.MONGODB_URI || "mongodb://localhost:27017/tasksDB";

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(dbURL, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      });
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error(
        `MongoDB connection failed: ${error.message}. Retrying in 5 seconds...`
      );
      setTimeout(connectWithRetry, 5000);
    }
  };

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to the database");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Mongoose connection error: ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose disconnected from the database");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Mongoose connection closed due to application termination");
    process.exit(0);
  });

  connectWithRetry();
};

module.exports = {
  connectDB,
};
