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

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use("/", mainRoutes);

const port = PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
