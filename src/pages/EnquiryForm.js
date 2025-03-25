import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/EnquiryForm.css";
import Footer from "./Footer";
import Layout from "../components/Layout";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_jwoq3fn", // Replace with your EmailJS Service ID
        "template_y27ohrc", // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email, // This will be the sender's email
          message: formData.message,
        },
        "wdxJWyFmB2qh2La8x" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setStatusMessage("Your inquiry has been sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Error sending email:", error);
          setStatusMessage("Failed to send inquiry. Please try again.");
        }
      );
  };

  return (
    <Layout>
      <div className="enquiry-form">
        <h2>Send Us an Inquiry</h2>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default EnquiryForm;
