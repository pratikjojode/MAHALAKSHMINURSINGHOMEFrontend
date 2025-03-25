import React from "react";
import { Link } from "react-router-dom";
import "../styles/Custom404.css";

const Custom404 = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="medical-symbol">
          <div className="cross-line-1"></div>
          <div className="cross-line-2"></div>
          <div className="pulse-dot pulse-dot-1"></div>
          <div className="pulse-dot pulse-dot-2"></div>
          <div className="pulse-dot pulse-dot-3"></div>
        </div>
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you're looking for isn't available. It might have been
          moved or deleted.
        </p>
        <p className="medical-message">
          Don't worry, our medical team is on it! In the meantime, you can:
        </p>
        <div className="error-actions">
          <Link to="/" className="home-button">
            Return to Home
          </Link>
          <Link to="/contact" className="contact-button">
            Contact Support
          </Link>
        </div>
        <div className="medical-equipment">
          <div className="equipment syringe"></div>
          <div className="equipment pill"></div>
          <div className="equipment heartbeat"></div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
