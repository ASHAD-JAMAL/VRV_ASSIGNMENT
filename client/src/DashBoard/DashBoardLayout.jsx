import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import Sidebar from "../components/Sidebar";
import EditProfie from "./EditProfie";
function DashBoardLayout() {
  return (
    <div className="w-full flex">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="w-10/12">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfie />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashBoardLayout;
