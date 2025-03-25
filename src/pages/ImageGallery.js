import React from "react";
import { Row, Col, Card } from "antd";
import Footer from "./Footer";
import "../styles/Gallery.css"; // ✅ Import External CSS
import Layout from "../components/Layout";

const ImageGallery = () => {
  const images = [
    {
      src: "image copy 7.png",
      title: "Modern Healthcare Facilities",
      description: "State-of-the-art medical equipment for superior treatment.",
      extraInfo: "Advanced diagnostic tools ensuring accurate health analysis.",
    },
    {
      src: "2018-01-22 (1).jpg",
      title: "Experienced Medical Staff",
      description: "A dedicated team of doctors and nurses at your service.",
      extraInfo: "24/7 patient care with specialized medical expertise.",
    },
    {
      src: "2021-09-21.jpg",
      title: "Emergency Services",
      description: "Round-the-clock emergency support for critical cases.",
      extraInfo: "Ambulance services available for urgent medical needs.",
    },
    {
      src: "image copy 5.png",
      title: "Patient Care Rooms",
      description: "Comfortable and hygienic rooms for in-patient treatment.",
      extraInfo:
        "Private and general wards designed for recovery and wellness.",
    },
    {
      src: "image copy 15.png",
      title: "Operation Theatre",
      description: "Equipped with the latest technology for safe surgeries.",
      extraInfo:
        "Sterile environment ensuring top-quality surgical procedures.",
    },
    {
      src: "image copy 7.png",
      title: "Pharmacy & Laboratory",
      description: "On-site pharmacy and lab for quick medical assistance.",
      extraInfo: "Immediate availability of medicines and test reports.",
    },
    {
      src: "2018-01-22.jpg",
      title: "Specialized Treatments",
      description: "Expert care in cardiology, orthopedics, and more.",
      extraInfo: "Advanced procedures ensuring faster recovery.",
    },
    {
      src: "image copy 14.png",
      title: "Maternity & Child Care",
      description: "Comprehensive care for expecting mothers and newborns.",
      extraInfo: "Experienced gynecologists and pediatric specialists.",
    },
    {
      src: "image copy 16.png",
      title: "Health & Wellness Programs",
      description: "Regular checkups and preventive healthcare services.",
      extraInfo: "Tailored healthcare plans for a healthier life.",
    },
  ];

  return (
    <Layout>
      <div className="gallery-container">
        {/* 🔹 Header Section */}

        {/* 🔹 Grid Layout */}
        <h2 className="gallery-grid-title">Our Healthcare Services</h2>
        <Row gutter={[16, 16]} justify="center" className="gallery-row">
          {images.map((img, index) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              className="gallery-col"
            >
              <Card
                hoverable
                className="gallery-card"
                cover={
                  <img src={require(`../images/${img.src}`)} alt={img.title} />
                }
              >
                <h3>{img.title}</h3>
                <p>{img.description}</p>
                <p className="extra-info">{img.extraInfo}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ImageGallery;
