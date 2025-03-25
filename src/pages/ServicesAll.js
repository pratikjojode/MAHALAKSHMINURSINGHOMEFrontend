import React from "react";
import "../styles/ServicesAll.css";
import Footer from "./Footer";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const ServicesAll = () => {
  const services = [
    {
      title: "Comprehensive Prenatal Care",
      description:
        "Regular check-ups, ultrasounds, and screenings to ensure a healthy pregnancy.",
      icon: "👶",
    },
    {
      title: "High-Risk Pregnancy Management",
      description:
        "Specialized care for mothers with medical conditions or complications.",
      icon: "🤰",
    },
    {
      title: "Painless & Normal Deliveries",
      description:
        "Expert obstetricians providing both natural and C-section deliveries.",
      icon: "🏥",
    },
    {
      title: "Postnatal Care & Recovery",
      description: "Mother and baby care, lactation support, and counseling.",
      icon: "👩‍⚕",
    },
    {
      title: "Neonatal Intensive Care (NICU)",
      description: "Advanced care for premature or high-risk newborns.",
      icon: "🍼",
    },
    {
      title: "Newborn & Child Check-Ups",
      description:
        "Growth monitoring, vaccinations, and routine pediatric care.",
      icon: "👦",
    },
    {
      title: "Immunization Programs",
      description: "Complete vaccination schedule for newborns and children.",
      icon: "💉",
    },
    {
      title: "Emergency Pediatric Care",
      description: "24/7 emergency services for infants and children.",
      icon: "🤕",
    },
    {
      title: "Specialized Pediatric Treatments",
      description:
        "Management of childhood illnesses, allergies, and chronic conditions.",
      icon: "🩺",
    },
    {
      title: "Developmental & Nutritional Guidance",
      description:
        "Expert advice on child growth, diet, and mental well-being.",
      icon: "👨‍⚕",
    },
  ];

  return (
    <Layout>
      <div>
        {/* Header Section */}

        {/* Services Section */}
        <div className="services-all">
          <div className="services-title">
            <h1>Our Services</h1>
            <p>
              Compassionate care and expert services tailored to meet the needs
              of our residents.
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesAll;
