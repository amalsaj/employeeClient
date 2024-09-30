import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { APIURL } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const EmployerProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${APIURL}/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setEditUser(response.data.user);
      setProfilePhoto(response.data.user.profile || profilePhoto);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Token expired"
      ) {
        navigate("/");
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${APIURL}/editUser`,
        { editUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      fetchUser(); // Fetch updated user data
      setIsEditing(false);
      enqueueSnackbar("Profile Updated 🎉", { variant: "success" });
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "An error occurred.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditUser({ ...editUser, profile: reader.result });
      setProfilePhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-photo-wrapper">
            <img
              src={profilePhoto} // Updated to use profilePhoto state
              alt="Profile"
              className="profile-photo"
            />
            {isEditing && (
              <label htmlFor="photo-upload" className="change-photo-label">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                <FaCamera className="camera-icon" />
              </label>
            )}
          </div>
          <div className="profile-info">
            <h2>{user?.user?.username}</h2>
            <p>HR Manager</p>
          </div>
        </div>

        {isEditing ? (
          <form className="profile-edit" onSubmit={handleEditSubmit}>
            <div className="edit-item">
              <label>Company Name</label>
              <input
                type="text"
                name="username"
                value={editUser.username || ""}
                onChange={handleInputChange}
                className="edit-input"
              />
            </div>
            <div className="edit-item">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editUser.email || ""}
                onChange={handleInputChange}
                className="edit-input"
              />
            </div>
            <div className="edit-item">
              <label>Phone</label>
              <input
                type="tel"
                name="mobileNumber"
                value={editUser.mobileNumber || ""}
                onChange={handleInputChange}
                className="edit-input"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="profile-actions">
              <button type="submit" className="save-button button-style">
                Save
              </button>
              <button
                type="button"
                className="cancel-button button-style"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-item">
              <h4>Total Employees</h4>
              <p>{user?.count}</p>
            </div>
            <div className="detail-item">
              <h4>Onboarded Since</h4>
              <p>{new Date(user?.user?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="detail-item">
              <h4>Email</h4>
              <p>{user?.user?.email}</p>
            </div>
            <div className="detail-item">
              <h4>Phone</h4>
              <p>{user?.user?.mobileNumber}</p>
            </div>
            <div className="profile-actions">
              <button
                className="edit-button button-style"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button className="settings-button button-style">
                Account Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfilePage;
