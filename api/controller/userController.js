const httpStatusCode = require("../constants/httpStatusCode");
const { getToken } = require("../middleware/authMiddleware");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Please enter email and password",
      });
    }
    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, User.password);
    if (!isPasswordCorrect) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await getToken(User);
    console.log(User);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Login successful",
      data: { User, token, role: User.role },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const Register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!email || !password || !fullName || !role) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Please enter email, password, fullName and role",
      });
    }

    const isExistingUser = await UserModel.findOne({ email });
    if (isExistingUser) {
      return res.status(httpStatusCode.CONFLICT).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "User created successfully",
      data: User,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const UserDetails = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user._id;
    const User = await UserModel.findById(userId);
    if (!User) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "User details",
      data: User,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, email, password } = req.body;
    const updateFields = { fullName, email };

    // Hash the password if it's provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const AllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "No users found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "All users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  Login,
  Register,
  UserDetails,
  UpdateProfile,
  AllUsers,
};
