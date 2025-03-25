import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";
import "../styles/bokking.css";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/api/v1/user/userBooking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedAppointments = response.data.data;

        // Check for approved appointments and notify the user
        fetchedAppointments.forEach((appointment) => {
          if (appointment.status === "approved") {
            toast.success(
              `Your appointment with Dr. ${appointment.doctorInfo.firstName} ${
                appointment.doctorInfo.lastName
              } on ${new Date(
                appointment.date
              ).toLocaleDateString()} has been approved!`
            );
          }
        });

        setAppointments(fetchedAppointments); // Store appointments in state
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching appointments");
        toast.error(
          err.response?.data?.message || "Error fetching appointments"
        );
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleDelete = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized to delete this appointment.");
        return;
      }

      // Make DELETE request to the backend
      const response = await axios.delete(
        `/api/v1/user/deleteAppointments/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted appointment from the state
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );

      toast.success(
        response.data.message || "Appointment deleted successfully."
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete the appointment."
      );
    }
  };

  return (
    <Layout>
      <div className="appointments-container">
        <div className="appointment-banner">
          <div className="boking-image"></div>
          <div className="banner-content">
            <h1>Your Appointments</h1>
            <p>
              Stay updated with your upcoming appointments. Manage and track all
              your bookings in one place.
            </p>
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <Row gutter={[16, 16]}>
            {appointments.map((appointment) => (
              <Col xs={24} sm={12} md={8} lg={6} key={appointment._id}>
                <div className="custom-card-1">
                  <div className="card-header">
                    <h3>{`Appointment on ${new Date(
                      appointment.date
                    ).toLocaleDateString()}`}</h3>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Time:</strong> {appointment.time}
                    </p>
                    <p>
                      <strong>UserId:</strong> {appointment.userId}
                    </p>
                    <p>
                      <strong>UserInfo:</strong> {appointment.userInfo.name}
                    </p>
                    <p>
                      <strong>DoctorInfo:</strong>{" "}
                      {appointment.doctorInfo.firstName}{" "}
                      {appointment.doctorInfo.lastName}
                    </p>
                    <p>
                      <strong>Contact:</strong> {appointment.doctorInfo.Contact}
                    </p>
                    <p>
                      <strong>Status:</strong> {appointment.status}
                    </p>
                    <p>
                      <strong>Experience:</strong>{" "}
                      {appointment.doctorInfo.Experience}
                    </p>
                    <p>
                      <strong>Specialization:</strong>{" "}
                      {appointment.doctorInfo.specialization}
                    </p>
                    <button
                      className="cancel-btn"
                      onClick={() => handleDelete(appointment._id)}
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default UserAppointments;
