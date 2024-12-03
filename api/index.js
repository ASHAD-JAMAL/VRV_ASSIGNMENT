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

dbConnection(MONGO_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://vrv-assignment-i7p6.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use("/", mainRoutes);

const port = PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
