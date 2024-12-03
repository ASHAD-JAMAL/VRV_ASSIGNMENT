import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
        setUser(response.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
    fetchUserDetails();
  }, []);
  return (
    <div className="px-8 py-6 flex-1 overflow-y-auto bg-[#e1f4f5] h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Name: {user.fullName}
          </h2>
          <h2 className="text-lg font-semibold text-gray-800">
            Email: {user.email}
          </h2>
          <h2 className="text-lg font-semibold text-gray-800">
            Role: {user.role}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
