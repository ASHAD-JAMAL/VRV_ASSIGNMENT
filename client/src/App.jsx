import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import UserProfile from "./DashBoard/UserProfile";
import ModeratorProfile from "./pages/ModeratorProfile";
import ProtectedRoute from "./ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import DashBoardLayout from "./DashBoard/DashBoardLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashBoardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
