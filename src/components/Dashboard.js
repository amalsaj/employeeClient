import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import Img from "../Images/emp2.svg";
import data2 from "../Images/data2.png";
import Image from "../Images/logo.png";
import { Pagination, Navbar, Nav, Card, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const value = localStorage.getItem("value");
  let first_name;
  if (user !== null) {
    first_name = user.split(" ")[0];
  } else {
    console.log("username_head is null.");
  }

  const [formDataList, setFormDataList] = useState({
    data: [],
    active: 1,
    totalPages: 0,
  });
  const [editFormData, setEditFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        "https://employeeserver-979i.onrender.com/getEmployeeData",
        {
          params: { page: page, pageSize: 5 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("value", response.data.totalPages);
      setFormDataList({
        data: response.data.data,
        active: page,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setFormDataList((prevState) => ({ ...prevState, active: pageNumber }));
    fetchData(pageNumber);
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleEditClick = (formData) => {
    setEditFormData({ ...formData });
    setIsEditing(true);
  };

  const handleClick = () => {
    navigate("/getEmployeeData");
    setShowWelcome(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setEditFormData({ ...editFormData, f_Image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("https://employeeserver-979i.onrender.com/editEmployee", {
        editFormData,
      });
      setIsEditing(false);
      setError("");
      showToastMessage("Update Successfully");
      setTimeout(() => {
        navigate(`/getEmployeeData`);
        refreshPage();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const Toast = () => {
    showToastMessage("Logot Successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <div className="Nav text-white">
        <Navbar className="navBar">
          <Navbar.Brand className="logo1">
            <img
              src={Image}
              style={{ width: "50px", height: "30px" }}
              alt="Img"
            />
          </Navbar.Brand>
          <Nav className="navStyle">
            <Nav.Link
              className="text-white mt-2 employeeNav"
              onClick={handleClick}
            >
              <i className="fa-solid fa-clipboard-list me-2 employeeIcon"></i>{" "}
              Employees
            </Nav.Link>
            <Nav.Link className="text-white mt-2 timelineNav">
              <i className="fa-solid fa-timeline me-2 timelineIcon"></i>Time
              Line
            </Nav.Link>
            <Nav.Link className="text-white mt-2 profileNav">
              <i className="fa-regular fa-user me-2 profileIcon"></i>Profile
            </Nav.Link>
            <Nav.Link className="text-white mt-2 settingsNav">
              <i className="fa-solid fa-gear me-2 settingsIcon"></i> Settings
            </Nav.Link>
            <Nav.Link className="mt-5 text-center photo">
              <img
                src={data2}
                style={{ width: "40px", height: "40px" }}
                alt="Img"
              />
              <h1 className="fw-bold logo1 display-5 mt-1">
                {first_name && first_name}
              </h1>
            </Nav.Link>
            <Nav.Link className="logoutNav" onClick={() => Toast()}>
              <i className="fa-solid fa-arrow-right-from-bracket me-2 logoutIcon"></i>{" "}
              <span className="logoutTitle">Logout</span>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>

      <ToastContainer />
      <div className="col-10 dashbaord">
        <div>
          <div className="container">
            <div className="row">
              {showWelcome && value === 0 ? (
                <div className="notEmployee">
                  <Card className="dash1 table_body">
                    <Card.Body className="welcomeCard">
                      <Card.Title className="fs-1">
                        Welcome, {first_name && first_name}!
                      </Card.Title>
                      <Card.Text>
                        Add a new employee to your team and assign roles.
                      </Card.Text>
                      <Button
                        className="create_btn2"
                        variant="primary"
                        onClick={() => {
                          navigate(`/create`);
                        }}
                      >
                        Add Employee
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ) : (
                <div className="employee">
                  <div className="col-12 fs-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="logoMobile">
                        <img
                          src={Image}
                          style={{ width: "50px", height: "40px" ,paddingTop:"10px"}}
                          alt="Img"
                        />
                      </div>
                      <div className="search-wrapper">
                        <input
                          className="border-1 search fs-6"
                          type="text"
                          placeholder="search"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 d-flex justify-content-end mt-4">
                    <button
                      type="button"
                      className="btn bg-white position-relative create_btn me-5"
                    >
                      Count
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {formDataList.data && formDataList.data.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                    <button
                      className="btn create_btn bg-white me-2"
                      onClick={() => {
                        navigate(`/create`);
                      }}
                    >
                      <i className="fa-solid fa-plus me-1"></i> Create
                    </button>
                  </div>
                  <div className="col-12 mt-2">
                    <h2 className="display-6 table_title fw-bolder">
                      EMPLOYEE LIST
                    </h2>
                    <div className="table-responsive mt-4">
                      <table className="table table-hover">
                        <thead className="logo text-secondary">
                          <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create Date</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody className="logo">
                          {formDataList.data &&
                            formDataList.data.map((formData, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    src={formData.f_Image}
                                    alt="User"
                                    width="50"
                                    className="img-thumbnail"
                                  />
                                </td>
                                <td>{formData.f_Name}</td>
                                <td>{formData.f_Email}</td>
                                <td>{formData.f_Mobile}</td>
                                <td>{formData.f_Designation}</td>
                                <td>{formData.f_gender}</td>
                                <td>{formData.f_Course}</td>
                                <td>{formData.f_Createdate}</td>
                                <td>
                                  <i
                                    className="fa-regular fa-pen-to-square icon_style"
                                    onClick={() => handleEditClick(formData)}
                                  ></i>{" "}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination size="sm" className="page">
                      <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={formDataList.active === 1}
                      />
                      <Pagination.Prev
                        onClick={() =>
                          handlePageChange(formDataList.active - 1)
                        }
                        disabled={formDataList.active === 1}
                      />
                      {[...Array(formDataList.totalPages).keys()].map(
                        (pageNumber) => (
                          <Pagination.Item
                            onClick={() => handlePageChange(pageNumber + 1)}
                            key={pageNumber + 1}
                            active={pageNumber + 1 === formDataList.active}
                          >
                            {pageNumber + 1}
                          </Pagination.Item>
                        )
                      )}
                      <Pagination.Next
                        onClick={() =>
                          handlePageChange(formDataList.active + 1)
                        }
                        disabled={
                          formDataList.active === formDataList.totalPages
                        }
                      />
                      <Pagination.Last
                        onClick={() =>
                          handlePageChange(formDataList.totalPages)
                        }
                        disabled={
                          formDataList.active === formDataList.totalPages
                        }
                      />
                    </Pagination>
                    {isEditing && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="card">
                            <div className="card-header text-center head text-white">
                              <img
                                src={Img}
                                alt=""
                                width={70}
                                className="rounded"
                              />
                              <h2 className="fs-4 mt-1 mb-1">
                                Update Information
                              </h2>
                            </div>
                            <div className="card-body table_body m-3">
                              {error && <p style={{ color: "red" }}>{error}</p>}
                              <div>
                                <form onSubmit={handleFormSubmit}>
                                  <div className="form-group">
                                    <label htmlFor="f_Image">Image</label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="f_Image"
                                      name="f_Image"
                                      onChange={handleFileInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Name">Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_Name"
                                      name="f_Name"
                                      value={editFormData.f_Name}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Email">Email</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="f_Email"
                                      name="f_Email"
                                      value={editFormData.f_Email}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Mobile">Mobile</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_Mobile"
                                      name="f_Mobile"
                                      value={editFormData.f_Mobile}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Designation">
                                      Designation
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_Designation"
                                      name="f_Designation"
                                      value={editFormData.f_Designation}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_gender">Gender</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_gender"
                                      name="f_gender"
                                      value={editFormData.f_gender}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Course">Course</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_Course"
                                      name="f_Course"
                                      value={editFormData.f_Course}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Createdate">
                                      Create Date
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      id="f_Createdate"
                                      name="f_Createdate"
                                      value={editFormData.f_Createdate}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="d-flex justify-content-center">
                                    <button
                                      type="submit"
                                      className="btn btn-primary mt-2"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
