import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import "./dashboard.css";
const Dashboard = () => {
  return (
    <div>
      <div>
        <NavbarComponent />
      </div>
      <div className="col-10 dashbaord">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
