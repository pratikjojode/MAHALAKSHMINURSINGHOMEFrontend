import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import "../styles/Help.css";

const HelpPage = () => {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Layout>
      {/* Popup Message */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h4>Important Notice</h4>
            <p>Please visit the homepage before exploring other pages.</p>
            <Link to="/" className="popup-link">
              Go to Homepage
            </Link>
            <button className="popup-close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Help Content */}
      <div className="help">
        <h4>Welcome to Help Center</h4>
        <h1>How can we help?</h1>
        <div className="search-box">
          <input type="text" className="search" placeholder="Search" />
          <button className="search-btn">Search</button>
        </div>
        <div className="popular-topics">
          <h6>
            Popular Topics:
            <Link to="/" className="link">
              FAQ
            </Link>
            <Link to="/user/doctors" className="link">
              Doctors
            </Link>
            <Link to="/about" className="link">
              Clinics
            </Link>
          </h6>
        </div>
      </div>

      {/* Card Box */}
      <div className="help-card-box">
        {/* Help Cards */}
        <div className="help-card">
          <h4>
            <i className="fas fa-user-md"></i> How to find a doctor?
          </h4>
          <p>
            You can find a doctor by searching in the search bar. You can also
            search by specialty, location, and name.
          </p>
          <Link to="/user/doctors" className="card-link">
            Learn More
          </Link>
        </div>
        <div className="help-card">
          <h4>
            <i className="fas fa-calendar-check"></i> How to book an
            appointment?
          </h4>
          <p>
            You can book an appointment by clicking on the book appointment
            button on the doctor's profile page.
          </p>
          <Link to="/book-appointment" className="card-link">
            Learn More
          </Link>
        </div>
        <div className="help-card">
          <h4>
            <i className="fas fa-calendar-times"></i> How to cancel an
            appointment?
          </h4>
          <p>
            You can cancel an appointment by clicking on the cancel appointment
            button on the appointment page.
          </p>
          <Link to="/user/doctors" className="card-link">
            Learn More
          </Link>
        </div>
        <div className="help-card">
          <h4>
            <i className="fas fa-headset"></i> How to contact support?
          </h4>
          <p>
            You can contact support by clicking on the contact us button on the
            help page.
          </p>
          <Link to="/" className="card-link">
            Learn More
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          <h4>1. What is this platform about?</h4>
          <p>
            This platform helps users find doctors, book appointments, and
            access healthcare-related services.
          </p>
        </div>

        <div className="faq">
          <h4>4. Can I reschedule my appointment?</h4>
          <p>
            Yes, you can reschedule your appointment by visiting the
            "Appointments" section in your profile and selecting the reschedule
            option.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;
