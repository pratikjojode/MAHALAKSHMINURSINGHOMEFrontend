import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = () => {
  const [loading] = useState(true);

  const containerStyle = {
    textAlign: "center",
    marginTop: "10px",
    padding: "20px",
  };

  const textStyle = {
    marginTop: "15px",
    fontSize: "1.2rem",
    color: "#3498db", // Matches the color of the loader
  };

  return (
    <div className="spinner-container" style={containerStyle}>
      <BeatLoader
        color="#3498db" // Customize the color as needed
        loading={loading}
        size={15} // Adjust the size for a premium look
        margin={5} // Space between the dots
      />
      <p style={textStyle}>Loading...</p>
    </div>
  );
};

export default Spinner;
