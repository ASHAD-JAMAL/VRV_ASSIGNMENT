const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mainRoutes = require("./routes/mainRoutes");
const dbConnection = require("./config/db");
const { PORT, MONGO_URL } = process.env;

// Connect to the database
dbConnection(MONGO_URL);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Improved CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173", // No trailing slash
      "https://vrv-assignment-i7p6.vercel.app", // No trailing slash
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Main routes
app.use("/", mainRoutes);

// Start the server
const port = PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
