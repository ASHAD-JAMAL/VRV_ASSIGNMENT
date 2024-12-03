import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiUserListBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import sidebarSupportImg from "../assets/sidebarImg.svg";
import { toast } from "react-toastify";

const SidebarItem = ({ icon, text, onClick, isActive }) => (
  <div
    className={`flex cursor-pointer items-center gap-2 py-2 mt-3 px-3 rounded-lg group ${
      isActive
        ? "bg-[#92CBCE] text-white"
        : "hover:bg-[#92CBCE] hover:text-white"
    }`}
    onClick={onClick}
  >
    <div
      className={`text-xl ${
        isActive
          ? "text-white font-semibold"
          : "text-[#9197B3] group-hover:text-white group-hover:font-semibold"
      }`}
    >
      {icon}
    </div>
    <h1
      className={`text-sm ${
        isActive
          ? "text-white font-semibold"
          : "text-[#9197B3] group-hover:text-white group-hover:font-semibold"
      }`}
    >
      {text}
    </h1>
  </div>
);

function Sidebar() {
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleLogout = () => {
    toast.success("Logged out successfully");
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const commonItems = [
    {
      icon: <LuLayoutDashboard />,
      text: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: <FaRegCircleUser />,
      text: "Profile",
      onClick: () => navigate("/dashboard/user-profile"),
    },
    {
      icon: <IoLogOutOutline />,
      text: "Logout",
      onClick: handleLogout,
    },
  ];

  const adminItems = [
    ...commonItems,
    {
      icon: <PiUserListBold />,
      text: "User List",
      onClick: () => navigate("/dashboard/users"),
    },
  ];

  const moderatorItems = [
    ...commonItems,
    {
      icon: <FaRegCircleUser />,
      text: "Edit Profile",
      onClick: () => navigate("/dashboard/edit-profile"),
    },
  ];

  const items =
    role === "admin"
      ? adminItems
      : role === "moderator"
      ? moderatorItems
      : commonItems;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setRole(localStorage.getItem("userRole"));
    }
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col justify-between space-y-2 w-full h-screen px-4 overflow-y-auto scrollbar-hide">
      <div>
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="rounded-full" />
        </div>
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            onClick={() => {
              setActiveItem(item.text);
              item.onClick();
            }}
            isActive={activeItem === item.text}
          />
        ))}
      </div>
      <div className="w-full mb-10">
        <div className="w-full bg-[#92CBCE] rounded-2xl p-5">
          <h1 className="text-white text-xl font-semibold my-1">
            Support 24/7
          </h1>
          <p className=" text-white">Contacts us anytime</p>
          <button className="text-primary bg-white rounded-lg px-5 my-2 py-1 relative z-[3]">
            Start
          </button>
          <img
            src={sidebarSupportImg}
            alt=""
            className="h-[130px] w-[150px] relative z-[0] right-[-40px] mt-[-50px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
