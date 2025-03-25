import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, Button, message } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import "../styles/BookingPage.css";

const BookingPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getSingleDoctorById = async () => {
    try {
      const res = await axios.get(
        `/api/v1/doctor/singleDocInfoById/${params.doctorId}`
      );
      if (res.data.success && res.data.data) {
        setDoctor(res.data.data);
      } else {
        console.log("No doctor found");
      }
    } catch (error) {
      console.log("Error fetching doctor:", error);
    }
  };

  useEffect(() => {
    getSingleDoctorById();
  }, [params.doctorId]);

  const handleDateChange = (value, dateString) => {
    setDate(dateString);
  };

  const handleTimeChange = (value) => {
    setTime(value);
  };

  const handleAvailabilityCheck = async () => {
    try {
      const res = await axios.post("/api/v1/user/booking-avaibility", {
        doctorId: params.doctorId,
        date: date,
        time: time ? time.format("HH:mm") : null,
      });

      if (res.data.success) {
        setIsAvailable(true);
        message.success("Doctor is available at the selected time.");
      } else {
        setIsAvailable(false);
        message.error("Doctor is not available at the selected time.");
      }
    } catch (error) {
      console.log("Error checking availability:", error);
      message.error("Error checking availability.");
    }
  };

  const handleBooking = async () => {
    try {
      const res = await axios.post("/api/v1/user/book-appointment", {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: doctor,
        date: date,
        time: time ? time.format("HH:mm") : null,
        userInfo: user,
      });

      if (res.data.success) {
        message.success(res.data.message);
        message.info(
          `Your User ID for this Appointment is: ${res.data.userId}`
        );
        navigate("/user/show-bookings/:id");
      } else {
        message.error("Error in booking appointment");
      }
    } catch (error) {
      console.log("Error in booking:", error);
    }
  };

  return (
    <Layout>
      <div className="booking-page">
        <div className="banner-1">
          <h2 className="banner-title-1">Your Health, Our Priority</h2>
          <p className="banner-description-1">
            Schedule an appointment with our experienced doctors today. We
            ensure the best care for you and your loved ones.
          </p>
        </div>
        <h1 className="booking-title">Book Your Appointment</h1>
        {doctor ? (
          <div className="doctor-details">
            <div className="doctor-info">
              <img
                src={doctor.image || "/default-doctor.jpg"}
                alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                className="doctor-image"
              />
              <div className="doctor-text">
                <h3 className="doctor-name">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h3>
                <p>
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p>
                  <strong>Experience:</strong> {doctor.Experience} years
                </p>
                <p>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p>
                  <strong>Phone:</strong> {doctor.Contact}
                </p>
                <p>
                  <strong>Timings:</strong> {doctor.timings}
                </p>
                <p>
                  <strong>Address:</strong> {doctor.address}
                </p>
              </div>
            </div>

            <div className="appointment-form">
              <DatePicker
                format="DD-MM-YYYY"
                onChange={handleDateChange}
                placeholder="Select Date"
                className="appointment-input"
              />
              <br />
              <TimePicker
                format="HH:mm"
                onChange={handleTimeChange}
                placeholder="Select Time"
                className="appointment-input"
                minuteStep={15}
              />
              <br />
              <Button
                type="primary"
                onClick={handleAvailabilityCheck}
                disabled={!date || !time}
                className="appointment-btn"
              >
                Check Availability
              </Button>
              <br />
              {isAvailable !== null && (
                <p
                  className={`availability-message ${
                    isAvailable ? "available" : "not-available"
                  }`}
                >
                  {isAvailable
                    ? "Doctor is available. You can proceed to book."
                    : "Doctor is not available. Please select another time."}
                </p>
              )}
              <Button
                type="primary"
                disabled={!date || !time || isAvailable === false}
                onClick={handleBooking}
                className="appointment-btn"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        ) : (
          <p>Loading doctor details...</p>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
