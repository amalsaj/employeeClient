import React, { useState } from "react";
import { Nav, Image } from "react-bootstrap";
import data2 from "../../assets/images/data2.png";
import { enqueueSnackbar } from "notistack";
import {
  FaUsers, // Employees
  FaClipboardList, // Attendance
  FaUser, // Profile
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ toggleSidebar }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("email");
  const first_name = user?.split("@")[0].toLocaleUpperCase() || "User";

  const logoutHandle = () => {
    enqueueSnackbar("Logout Successful 🎉", { variant: "success" });
    navigate("/");
  };

  const expand = () => {
    setExpanded(!expanded);
    toggleSidebar();
  };

  return (
    <>
      {/* Sidebar for Desktop */}
      <div
        className={`d-flex flex-column bg-light text-dark vh-100 p-3 ${
          expanded ? "expanded" : "collapsed"
        } sidebar`}
      >
        {/* User Profile Section */}
        <div className="d-flex align-items-center mb-4">
          <Image src={data2} alt="User" width={40} />
          {expanded && (
            <div className="ms-3">
              <h6 className="m-0">{first_name}</h6>
              <small>Product Manager</small>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="my-3 mt-0" />

        {/* Main Navigation */}
        <Nav className="flex-column">
          <Nav.Link
            href="/getEmployeeData/employees"
            className="d-flex align-items-center text-dark py-2 nav-link"
          >
            <FaUsers className="sidebar-icon" />
            {expanded && <span className="sidebar-text">Dashboard</span>}
          </Nav.Link>

          <Nav.Link
            href="/getEmployeeData/leave"
            className="d-flex align-items-center text-dark py-2 nav-link"
          >
            <FaClipboardList className="sidebar-icon" />
            {expanded && <span className="sidebar-text">Attendance</span>}
          </Nav.Link>

          <Nav.Link
            href="/getEmployeeData/profile"
            className="d-flex align-items-center text-dark py-2 nav-link"
          >
            <FaUser className="sidebar-icon" />
            {expanded && <span className="sidebar-text">Profile</span>}
          </Nav.Link>

          <Nav.Link
            href="#schedules"
            className="d-flex align-items-center text-dark py-2 nav-link"
          >
            <FaCalendarAlt className="sidebar-icon" />
            {expanded && <span className="sidebar-text">Schedules</span>}
          </Nav.Link>
        </Nav>

        <hr className="my-3" />

        {/* Settings and Logout */}
        <Nav className="mt-auto">
          <Nav.Link
            href="#settings"
            className="d-flex align-items-center text-dark py-2 nav-link"
          >
            <FaCog className="sidebar-icon" />
            {expanded && <span className="sidebar-text">Settings</span>}
          </Nav.Link>

          <Nav.Link
            className="d-flex align-items-center text-danger py-2 nav-link"
            onClick={logoutHandle}
          >
            <FaSignOutAlt className="sidebar-icon" />
            {expanded && <span className="sidebar-text">Logout Account</span>}
          </Nav.Link>
        </Nav>

        {/* Toggle Sidebar */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "<" : ">"}
          </button>
        </div>
      </div>

      {/* Bottom Navbar for Mobile */}
      <NavBarMobile logoutHandle={logoutHandle} />
    </>
  );
};

const NavBarMobile = ({ logoutHandle }) => {
  return (
    <div className="navbar-mobile">
      <Nav className="justify-content-around">
        <Nav.Link href="/getEmployeeData/employees">
          <FaUsers className="mobile-icon" />
        </Nav.Link>
        <Nav.Link href="/getEmployeeData/leave">
          <FaClipboardList className="mobile-icon" />
        </Nav.Link>
        <Nav.Link href="#schedules">
          <FaCalendarAlt className="mobile-icon" />
        </Nav.Link>
        <Nav.Link href="/getEmployeeData/profile">
          <Image src={data2} alt="User" width={40} />
        </Nav.Link>
        <Nav.Link onClick={logoutHandle} className="text-danger">
          <FaSignOutAlt className="mobile-icon" />
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
