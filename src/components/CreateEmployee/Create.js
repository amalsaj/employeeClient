import React, { useState } from "react";
import axios from "axios";
import { APIURL } from "../../utils/api";
import Img from "../../assets/images/emp.svg";
import Image from "react-bootstrap/Image";
import "./create.css";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const FormComponent = ({ setCreate, fetchData }) => {
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
    f_Createdate: "",
    f_Image: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name } = e.target;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: reader.result,
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    // Validate Name
    if (!nameRegex.test(formData.f_Name)) {
      enqueueSnackbar("Name must contain only letters and spaces.", {
        variant: "warning",
      });
      return;
    }

    // Validate Email
    if (!emailRegex.test(formData.f_Email)) {
      enqueueSnackbar("Please enter a valid email address.", {
        variant: "warning",
      });
      return;
    }

    // Validate Mobile
    if (!mobileRegex.test(formData.f_Mobile)) {
      enqueueSnackbar("Please enter a valid 10-digit mobile number.", {
        variant: "warning",
      });
      return;
    }

    // Validate Designation
    if (!formData.f_Designation) {
      enqueueSnackbar("Please select a designation.", { variant: "warning" });
      return;
    }

    // Validate Designation
    if (!formData.f_gender) {
      enqueueSnackbar("Please select a gender.", { variant: "warning" });
      return;
    }

    // Validate Designation
    if (!formData.f_Image) {
      enqueueSnackbar("Please select a Profile Photo.", { variant: "warning" });
      return;
    }

    // Validate Course
    if (!formData.f_Course) {
      enqueueSnackbar("Please select a course.", { variant: "warning" });
      return;
    }

    // Validate Join Date
    if (!formData.f_Createdate) {
      enqueueSnackbar("Please select a join date.", { variant: "warning" });
      return;
    }
    setError("");

    try {
      await axios.post(
        `${APIURL}/createEmployee`,
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      setCreate(false);
      navigate("/getEmployeeData/employees");
      fetchData(1)
      enqueueSnackbar("Employee created successfully.", { variant: "success" });
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred";
        enqueueSnackbar(`${errorMessage}`, { variant: "error" });
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div>
      <div className="card">
        <div className="card-header text-center head text-white">
          <img src={Img} alt="" width={100} className="rounded-circle" />
          <i
            class="fas fa-times close"
            onClick={() => {
              setCreate(false);
            }}
          ></i>
          <h2 className="fs-4 mt-1 mb-1 ">Create Employee</h2>
        </div>

        <div className="card-body">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="f_Name"
                name="f_Name"
                value={formData.f_Name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="f_Email"
                name="f_Email"
                value={formData.f_Email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Mobile">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                id="f_Mobile"
                name="f_Mobile"
                value={formData.f_Mobile}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Designation">
                Designation
              </label>
              <select
                className="form-control"
                id="f_Designation"
                name="f_Designation"
                value={formData.f_Designation}
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Marketing">Marketing</option>
                <option value="Support">Support</option>
              </select>
            </div>

            <div className="form-group">
              <label className="font_card" htmlFor="f_gender">
                Gender
              </label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="f_gender"
                    id="male"
                    value="Male"
                    onChange={handleChange}
                    checked={formData.f_gender === "Male"}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="f_gender"
                    id="female"
                    value="Female"
                    onChange={handleChange}
                    checked={formData.f_gender === "Female"}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="f_gender"
                    id="other"
                    value="Other"
                    onChange={handleChange}
                    checked={formData.f_gender === "Other"}
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Course">
                Course
              </label>
              <select
                className="form-control"
                id="f_Course"
                name="f_Course"
                value={formData.f_Course}
                onChange={handleChange}
              >
                <option value="">Select a course</option>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="BSC">BSC</option>
                <option value="BTECH">B-TECH</option>
                <option value="MBA">MBA</option>
                <option value="MSC">MSC</option>
                <option value="MTECH">M-TECH</option>
                <option value="BA">BA</option>
                <option value="MA">MA</option>
                <option value="PHD">PhD</option>
                <option value="DIPLOMA">Diploma</option>
              </select>
            </div>

            <div className="form-group">
              <label className="font_card" htmlFor="f_Createdate">
                Join Date
              </label>
              <input
                type="date"
                className="form-control"
                id="f_Createdate"
                name="f_Createdate"
                value={formData.f_Createdate}
                onChange={handleChange}
                min={today}
              />
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Image">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="f_Image"
                name="f_Image"
                accept=".png"
                onChange={handleChange}
              />
              {formData.f_Image && (
                <div>
                  <h6 className="mt-2 fs-6 display-4 ">
                    <i class="fa-solid fa-eye"></i> Preview
                  </h6>
                  <Image src={formData.f_Image} alt="Preview" width={200} />
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
