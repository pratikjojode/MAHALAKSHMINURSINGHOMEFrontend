import React from "react";
import Layout from "../components/Layout";
import about from "../images/image copy 7.png";
import about2 from "../images/image copy 8.png";
import "../styles/Allablout.css";

const AboutPage = () => {
  return (
    <Layout>
      <h1 className="text-center">About Us</h1>

      <div className="about-main">
        <div className="about-1">
          <img alt="about-1" src={about} className="about-img-1" />
          <p>
            <b>Your Trusted Healthcare Partner Since 2005</b> Mahalaxmi Nursing
            Home, located in the heart of Kolhapur at Amar Vikas Colony, has
            been a cornerstone of compassionate and quality healthcare.
            Established with the goal of providing comprehensive medical
            services under one roof, our facility has grown to become a trusted
            name in the community.
            <br /> We specialize in maternity and fertility care, ensuring safe
            and personalized experiences for mothers and their newborns. Our
            expert team is also equipped to handle a variety of advanced medical
            procedures, including laparoscopic surgeries, backed by a modern
            operation theater and digital diagnostic tools like X-ray and
            pathology services.
          </p>
        </div>

        <div className="about-2">
          <p>
            <b>We take pride in maintaining </b> a hygienic and patient-friendly
            environment, ensuring the well-being of every individual who walks
            through our doors. Our team of experienced professionals is
            committed to delivering personalized care, guided by compassion and
            cutting-edge medical expertise. 24/7 Emergency Services: Dedicated
            ambulance services and emergency care ensure that help is always
            within reach. Maternity and Fertility Excellence: Comprehensive care
            for pregnancy and reproductive health, supported by experienced
            obstetricians and gynecologists. Advanced Technology:
            State-of-the-art equipment and innovative treatment approaches for
            better outcomes. Hygienic and Patient-Friendly Environment: Our
            focus on cleanliness and comfort ensures a seamless recovery for our
            patients.
          </p>

          <img alt="about-2" src={about2} />
        </div>
        <br />
      </div>

      {/* Google Map Embed */}
      <div className="map-container">
        <h2 className="text-center visit">Visit Us</h2>
        <div className="map-embed">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.699258119118!2d74.22905301536373!3d16.702414288263464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf8cbb787d7f57%3A0x7e9f3229530e69c6!2sMahalaxmi%20Nursing%20Home%20%7C%20Maternity%20and%20Fertility%20Care!5e0!3m2!1sen!2sin!4v1674327583502!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <h6 className="text-center">Find Us on Google Maps</h6>
        <p className="text-center">
          <a
            href="https://g.co/kgs/F9nqs9G"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to view the map
          </a>
        </p>
      </div>

      <h3 className="main-text">
        "At Mahalaxmi Nursing Home, we believe in the ethos of 'Healing with
        Heart.' Our commitment to integrating modern medicine with compassionate
        care has enabled us to touch countless lives positively."
      </h3>
    </Layout>
  );
};

export default AboutPage;
