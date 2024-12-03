const mongoose = require("mongoose");

const dbConnection = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => {
    console.log("Error connecting to database", error);
  });
  db.once("open", () => {
    console.log("Connected to database");
  });
};
module.exports = dbConnection;
