import { Navbar, Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import data2 from "../../assets/images/data2.png";
import Image from "../../assets/images/logo.png";
import "./navabr.css";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("email");
  const first_name = user?.split("@")[0] || "User";

  const logoutHandle = () => {
    enqueueSnackbar("Logout Successful 🎉", { variant: "success" });
    navigate("/");
  };

  return (
    <div className="Nav text-white">
      <Navbar className="navBar">
        <Navbar.Brand className="logo1">
          <img src={Image} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Nav className="navStyle">
          <Nav.Link
            as={Link}
            to="/getEmployeeData/employees"
            className="navLink"
          >
            <i className="fa-solid fa-users"></i> Employees
          </Nav.Link>
          <Nav.Link as={Link} to="/getEmployeeData/leave" className="navLink">
            <i className="fa-solid fa-calendar-check"></i> Attendance
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/getEmployeeData/profile"
            className="navLink profileNav"
          >
            <i className="fa-solid fa-user-circle"></i> Profile
          </Nav.Link>
          <Nav.Link className="navLink">
            <i className="fa-solid fa-cog"></i> Settings
          </Nav.Link>
          <Nav.Link className="navLink userProfile"  as={Link}
            to="/getEmployeeData/profile">
            <img src={data2} alt="User" className="userImage" />
            <span className="photo">{first_name}</span>
          </Nav.Link>
          <Nav.Link onClick={logoutHandle} className="navLink logoutLink">
            <i className="fa-solid fa-sign-out-alt"></i>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
