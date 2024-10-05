import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Navbar/NavbarComponent";
import "./dash.css";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar-style">
        <Sidebar />
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
