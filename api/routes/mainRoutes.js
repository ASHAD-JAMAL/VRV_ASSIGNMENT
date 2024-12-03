const express = require("express");
const Router = express.Router();
const {
  Login,
  Register,
  UserDetails,
  UpdateProfile,
  AllUsers,
} = require("../controller/userController");
const { verifyToken } = require("../middleware/authMiddleware");

Router.post("/login", Login);
Router.post("/register", Register);
Router.get("/user-details", verifyToken, UserDetails);
Router.put("/update-profile", verifyToken, UpdateProfile);
Router.get("/user-list", verifyToken, AllUsers);

module.exports = Router;
