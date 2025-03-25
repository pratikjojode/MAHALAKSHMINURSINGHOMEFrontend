import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/ApplyDoctor.css";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const ApplyDoctor = () => {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [timings, setTimings] = useState("");
  const [image, setImage] = useState(null);
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();
  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form data
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("Contact", contact);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("Experience", experience);
    formData.append("timings", timings);
    formData.append("specialization", specialization);

    // If an image is selected, append it to the form data
    if (image) {
      formData.append("image", image);
    }

    try {
      // Send POST request to the backend
      const response = await axios.post(
        "/api/v1/doctor/createDoctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success response
      if (response.status === 201 || response.data.success) {
        alert("Doctor created successfully go to /users/doctors");

        setUserId("");
        setFirstName("");
        setLastName("");
        setContact("");
        setEmail("");
        setAddress("");
        setExperience("");
        setTimings("");
        setImage(null);
        setSpecialization("");
      } else {
        alert("Unexpected response from server");
      }
    } catch (error) {
      // Handle error response
      console.error("Error creating doctor", error);
      alert("Failed to create doctor");
    }
  };

  return (
    <Layout>
      <div className="apply-doctor-container">
        <h2>Apply for Doctor</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Specialization:</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Experience:</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Timings:</label>
            <input
              type="text"
              value={timings}
              onChange={(e) => setTimings(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Profile Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="file-input"
            />
          </div>

          <button type="submit">Apply</button>
        </form>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
