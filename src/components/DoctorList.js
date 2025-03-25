import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/userDoctors.css";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  if (!doctor) {
    return (
      <div className="custom-card">
        <p>Doctor details are not available.</p>
      </div>
    );
  }

  return (
    <div
      className="custom-card"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className="card-header">
        <div className="doctor-info-2">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={`${doctor.firstName} ${doctor.lastName}`}
              className="doctor-image-2"
            />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
          <div className="doctor-details-2">
            <h3>
              <strong>Name:</strong>
              {`Dr. ${doctor.firstName || "First Name"} ${
                doctor.lastName || "Last Name"
              }`}
            </h3>
            <p>
              <strong>Specialization:</strong> {doctor.specialization || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong> {doctor.Experience || "N/A"} years
            </p>

            <p>
              <strong>Phone:</strong> {doctor.Contact || "N/A"}
            </p>
            <button className="btn-2">Book appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

DoctorList.propTypes = {
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    specialization: PropTypes.string,
    Experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    Contact: PropTypes.string,
    address: PropTypes.string,
  }),
};

export default DoctorList;
