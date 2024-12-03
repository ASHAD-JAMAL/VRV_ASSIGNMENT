const mongoose = require("mongoose");

const dbConnection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

module.exports = dbConnection;
