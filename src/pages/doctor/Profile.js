import React, { useEffect, useState } from "react";
import Layout from "../../../../client/src/components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/Profile.css"; // Make sure to create this CSS file for custom styles

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    Experience: "",
    timings: "",
  });
  const params = useParams();

  // Function to get doctor details
  const getDocDetails = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        {
          _id: params.userId, // Using _id instead of userId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
        setFormData({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          email: res.data.data.email,
          contact: res.data.data.Contact,
          address: res.data.data.address,
          Experience: res.data.data.Experience,
          timings: res.data.data.timings,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle profile update
  const handleProfileUpdate = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/updateDocProfile",
        {
          _id: params.userId, // Using _id to identify the doctor
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data); // Set the updated doctor data to the state
        setFormData({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          email: res.data.data.email,
          contact: res.data.data.Contact,
          address: res.data.data.address,
          Experience: res.data.data.Experience,
          timings: res.data.data.timings,
        });
        setEditMode(false); // Exit edit mode after successful update
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch doctor details on component mount
  useEffect(() => {
    getDocDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="profile-title">Manage Profile</h1>
      <div className="profile-container">
        <div className="profile-card">
          <img
            src={doctor?.image || "/default-avatar.png"} // Default image if doctor doesn't have one
            alt="Profile"
            className="profile-image"
          />
          {!editMode ? (
            <div className="doctor-info">
              <h2>
                {doctor?.firstName} {doctor?.lastName}
              </h2>
              <p>
                <strong>Email:</strong> {doctor?.email}
              </p>
              <p>
                <strong>Contact:</strong> {doctor?.Contact}
              </p>
              <p>
                <strong>Address:</strong> {doctor?.address}
              </p>
              <p>
                <strong>Experience:</strong> {doctor?.Experience} years
              </p>
              <p>
                <strong>Timings:</strong> {doctor?.timings}
              </p>
              <button
                className="edit-profile-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="doctor-info">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Contact"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Experience"
              />
              <input
                type="text"
                name="timings"
                value={formData.timings}
                onChange={handleInputChange}
                placeholder="Timings"
              />
              <button
                className="edit-profile-btn"
                onClick={handleProfileUpdate}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
