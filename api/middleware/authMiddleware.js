const jwt = require("jsonwebtoken");
require("dotenv").config();

const httpStatusCode = require("../constants/httpStatusCode");

async function getToken(user) {
  const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Error in verifyToken", error);
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }
}
module.exports = {
  getToken,
  verifyToken,
};
