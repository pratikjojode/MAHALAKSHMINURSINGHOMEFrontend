import React from "react";
import Layout from "../components/Layout";
import "../styles/vision.css";
import mother from "../images/image copy 17.png";
import patient from "../images/image copy 18.png";
import innovation from "../images/image copy 19.png";
import wellbeing from "../images/image copy 20.png";
import affordable from "../images/image copy 21.png";

const VisionMissions = () => {
  return (
    <Layout>
      <div className="vision-container">
        <div className="vision-div">
          <h1>Our Vision</h1>
          <p>
            🌟 To be a leading maternity and pediatric healthcare provider,
            ensuring the highest standards of care, comfort, and safety for
            mothers and children. We strive to create a nurturing environment
            where every mother and child receives compassionate, personalized,
            and world-class medical attention.
          </p>
        </div>
        <h1 className="mission-txt">Our mission</h1>
        <div className="mission-div">
          <div className="mission-card">
            <img src={mother} alt="Safe Motherhood & Childcare" />
            <h3>Safe Motherhood & Childcare</h3>
            <p>
              Provide exceptional maternity and pediatric care with advanced
              medical expertise.
            </p>
          </div>
          <div className="mission-card">
            <img src={patient} alt="Patient-Centered Approach" />
            <h3>Patient-Centered Approach</h3>
            <p>
              Ensure a comfortable and stress-free experience for mothers,
              newborns, and children.
            </p>
          </div>
          <div className="mission-card">
            <img src={innovation} alt="Innovation & Excellence" />
            <h3>Innovation & Excellence</h3>
            <p>
              Implement the latest medical advancements for better health
              outcomes.
            </p>
          </div>
          <div className="mission-card">
            <img src={wellbeing} alt="Holistic Well-Being" />
            <h3>Holistic Well-Being</h3>
            <p>
              Focus on physical, emotional, and mental wellness for both mother
              and child.
            </p>
          </div>
          <div className="mission-card">
            <img src={affordable} alt="Affordable & Accessible Care" />
            <h3>Affordable & Accessible Care</h3>
            <p>
              Deliver quality healthcare services to all families with empathy
              and integrity.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VisionMissions;
