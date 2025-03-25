import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Row, Spin, Empty } from "antd";
import DoctorList from "../../components/DoctorList";
import "../../styles/extrenal.css";

const UsersDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllDoctorsUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/user/getAllDoctorsUsers");
      if (res.data.success && res.data.data) {
        setDoctors(res.data.data);
      } else {
        setDoctors([]);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching doctors:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDoctorsUsers();
  }, []);

  return (
    <Layout>
      <div className="doctor-page-container">
        {/* Hero Banner */}
        <div className="doctor-hero-banner">
          <div className="hero-overlay">
            <h1 className="hero-title">Meet Our Expert Medical Team</h1>
            <p className="hero-subtitle">
              Compassionate care from board-certified professionals dedicated to
              your health and wellbeing
            </p>
          </div>
        </div>

        {/* Doctors Section */}
        <div className="doctors-container">
          <div className="section-header">
            <h2 className="section-title">Our Specialist Physicians</h2>
            <p className="section-description">
              Each doctor brings unique expertise and a commitment to
              exceptional patient care
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <Spin size="large" tip="Loading doctors..." />
            </div>
          ) : (
            <div className="doctors-grid">
              {doctors.length > 0 ? (
                <Row gutter={[24, 24]}>
                  {doctors.map((doctor) => (
                    <DoctorList key={doctor._id} doctor={doctor} />
                  ))}
                </Row>
              ) : (
                <div className="no-doctors">
                  <Empty
                    description={
                      <span className="empty-message">
                        Currently no doctors available. Please check back later.
                      </span>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UsersDoctors;
