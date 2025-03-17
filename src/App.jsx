import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Admin Components
import AdminElectionSelect from "./components/admin/Election_Select";
import AdminElectionPartys from "./components/admin/Election_Partys";
import AdminElectionConnect from "./components/admin/Election_Conect";
import AdminElectionVote from "./components/admin/Election_Vote";
import "./components/admin/admin-tool/Admin.css";

// User Components
import UserVoting from "./components/User/Voting";
import UserProfile from "./components/User/Profile";

// Authentication Components
import UserLogin from "./components/Userlogin";
import AdminLogin from "./components/AdminLogin";

function App() {
  const [role, setRole] = useState(Cookies.get("role") || "");

  // Function to handle role change
  const updateRole = () => {
    setRole(Cookies.get("role") || "");
  };

  useEffect(() => {
    window.addEventListener("roleChanged", updateRole);

    return () => {
      window.removeEventListener("roleChanged", updateRole);
    };
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      {!role && (
        <>
          <Route path="/" element={<UserLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {/* Admin Routes */}
      {role === "Admin" && (
        <>
          <Route path="/" element={<AdminElectionSelect />} />
          <Route path="/admin/electionpartys" element={<AdminElectionPartys />} />
          <Route path="/admin/partysconnect" element={<AdminElectionConnect />} />
          <Route path="/admin/evote" element={<AdminElectionVote />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {/* User Routes */}
      {role === "User" && (
        <>
          <Route path="/" element={<UserVoting />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
