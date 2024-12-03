import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setFormData({
          fullName: response.data.data.fullName || "",
          email: response.data.data.email || "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch user details."
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        localStorage.setItem("userName", response.data.data.fullName);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to update profile."
      );
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Edit Profile
        </h2>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#92CBCE] focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#92CBCE] focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#92CBCE] focus:outline-none"
            placeholder="Enter new password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#92CBCE] text-white py-2 rounded-lg font-medium hover:bg-[#7ab3b6]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
