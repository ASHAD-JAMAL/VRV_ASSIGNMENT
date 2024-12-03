import React, { useState } from "react";
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

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        // Store token and user data in localStorage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("userRole", response.data.data.User.role);
        localStorage.setItem("userName", response.data.data.User.fullName);

        toast.success("Login successful");
        navigate("/dashboard");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error in login:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4 sm:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl md:flex">
        {/* Left Image Section */}
        <div className="hidden md:flex bg-[#92CBCE] items-center justify-center w-1/2">
          <div>
            <img
              src={image}
              alt="Abstract illustration"
              className="w-3/4 h-auto object-contain transform rotate-6"
            />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-8">
          <h2 className="text-[#383535] text-2xl md:text-3xl font-bold text-center md:text-left mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="relative">
              <MdOutlineMailOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#9D9D9D] text-xl" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#92CBCE] focus:outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <BsKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#9D9D9D] text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#92CBCE] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9D9D9D] text-xl"
              >
                {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
              </button>
            </div>

            {/* Login Button */}
            <button className="bg-[#92CBCE] text-white py-2 rounded-md hover:bg-[#7fb3b5] transition">
              {loader ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 mx-3">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Sign-In */}
          <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition">
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/" className="text-[#92CBCE] font-medium hover:underline">
              Create one!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
