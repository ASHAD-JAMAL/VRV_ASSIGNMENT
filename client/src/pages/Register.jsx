import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsKey } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../assets/abstraction.png";

function Register() {
  const [activeTab, setActiveTab] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const role = activeTab;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          email,
          password,
          fullName,
          role,
        }
      );
      if (response.status === 201) {
        toast.success("Registration successful");
        navigate("/login");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error in registration:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4 sm:px-8">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        {/* First Div */}
        <div className="hidden md:flex bg-[#92CBCE] items-center justify-center w-1/2">
          <img
            src={image}
            alt="Abstract"
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rotate-8 opacity-70"
          />
        </div>

        {/* Second Div */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-[#383535] text-2xl md:text-3xl font-bold">
              Create Account
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-[#92cbce] text-white rounded-full p-2 mb-6">
            <p
              className={`px-4 py-2 rounded-full cursor-pointer transition-all text-sm md:text-base ${
                activeTab === "user" ? "bg-white text-[#92cbce]" : ""
              }`}
              onClick={() => setActiveTab("user")}
            >
              User Signup
            </p>
            <p
              className={`px-4 py-2 rounded-full cursor-pointer transition-all text-sm md:text-base ${
                activeTab === "moderator" ? "bg-white text-[#92cbce]" : ""
              }`}
              onClick={() => setActiveTab("moderator")}
            >
              Moderator Signup
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaRegUserCircle className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#9D9D9D] text-2xl" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#92CBCE] focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="relative">
              <MdOutlineMailOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#9D9D9D] text-2xl" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#92CBCE] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <BsKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#9D9D9D] text-2xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#92CBCE] focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEyeSlash className="text-[#9D9D9D] text-2xl" />
                ) : (
                  <IoEyeOutline className="text-[#9D9D9D] text-2xl" />
                )}
              </div>
            </div>
            <button className="bg-[#92CBCE] text-white py-2 rounded-md hover:bg-[#7fb3b5] transition w-full">
              {loader ? "Signing up..." : "Signup"}
            </button>
          </form>

          {/* Social Signup */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 mx-3">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition">
            <FcGoogle className="text-xl" />
            <span>Sign up with Google</span>
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#92CBCE] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
