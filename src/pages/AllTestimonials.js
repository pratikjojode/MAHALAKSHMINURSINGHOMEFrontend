import React from "react";
import "../styles/testiminails.css";
import Layout from "../components/Layout";
import crad1 from "../images/image copy 9.png";
import crad2 from "../images/image copy 10.png";
import crad3 from "../images/image copy 11.png";
const AllTestimonials = () => {
  return (
    <Layout>
      <h1 className="text-center">Testimonails</h1>
      <div className="testimonails">
        <div className="card-1 hover comma">
          <h1>""</h1>
          <img src={crad1} alt="image" />
          <h3>John Carter</h3>
          <p>
            "A seasoned software engineer with a passion for developing
            innovative solutions that drive business growth and enhance user
            experience."
          </p>
        </div>
        <div className="card-2 hover comma">
          <h1>""</h1>
          <img src={crad2} alt="image" />
          <h3>Sophia Bennett</h3>
          <p>
            "A creative graphic designer specializing in branding and visual
            storytelling, dedicated to bringing ideas to life through stunning
            designs."
          </p>
        </div>
        <div className="card-3 hover comma">
          <h1>""</h1>
          <img src={crad3} alt="image" />
          <h3>Michael Lee</h3>
          <p>
            "A data analyst with expertise in transforming complex datasets into
            actionable insights, helping organizations make data-driven
            decisions."
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AllTestimonials;
