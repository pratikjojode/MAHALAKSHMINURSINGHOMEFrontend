import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Modal,
  Button,
  Input,
  Rate,
  Form,
  message,
  Card,
  Spin,
  Row,
  Col,
} from "antd";
import "../styles/FeedbackForm.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    overallRating: 1,
    staffRating: 1,
    cleanlinessRating: 1,
    foodRating: 1,
    suggestions: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [averageRatings, setAverageRatings] = useState({
    overall: 0,
    staff: 0,
    cleanliness: 0,
    food: 0,
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/feedback/getfeedback");
        setFeedbacks(response.data);
        calculateAverageRatings(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "/api/v1/feedback/userfeedback",
        values
      );
      message.success("Feedback submitted successfully!");
      setIsModalVisible(false);
      setFormData({
        name: "",
        email: "",
        overallRating: 1,
        staffRating: 1,
        cleanlinessRating: 1,
        foodRating: 1,
        suggestions: "",
      });
      const updatedFeedbacks = await axios.get("/api/v1/feedback");
      setFeedbacks(updatedFeedbacks.data);
      calculateAverageRatings(updatedFeedbacks.data);
      window.location.reload(); // Reload the page after feedback is submitted
    } catch (error) {
      console.error("There was an error submitting the feedback", error);
      message.error("Failed to submit feedback. Please try again.");
    }
  };

  const calculateAverageRatings = (feedbacks) => {
    if (feedbacks.length > 0) {
      const total = feedbacks.reduce(
        (acc, feedback) => {
          acc.overall += feedback.overallRating;
          acc.staff += feedback.staffRating;
          acc.cleanliness += feedback.cleanlinessRating;
          acc.food += feedback.foodRating;
          return acc;
        },
        { overall: 0, staff: 0, cleanliness: 0, food: 0 }
      );
      setAverageRatings({
        overall: (total.overall / feedbacks.length).toFixed(1),
        staff: (total.staff / feedbacks.length).toFixed(1),
        cleanliness: (total.cleanliness / feedbacks.length).toFixed(1),
        food: (total.food / feedbacks.length).toFixed(1),
      });
    }
  };

  return (
    <Layout>
      {/* Banner Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #003366, #000000)", // Gradient background
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px", // Optional: To add rounded corners
          color: "#fff", // White text color for better contrast on dark background
        }}
      >
        <h2 style={{ fontSize: "1.6rem", textAlign: "center" }}>
          We Value Your Feedback! Help us improve our services.
        </h2>
        <p style={{ fontSize: "1rem", textAlign: "center" }}>
          Your thoughts matter to us. Please take a moment to share your
          experience, and let us know what we can do better.
        </p>
      </div>

      <Button
        className="feedback-button"
        onClick={() => setIsModalVisible(true)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#1890ff",
          color: "#fff",
          fontSize: "1rem",
        }}
      >
        Give Feedback
      </Button>

      {/* Feedback Form Modal */}
      <Modal
        title="Your Feedback"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form name="feedback" onFinish={handleSubmit} initialValues={formData}>
          <Form.Item label="Name (Optional)" name="name">
            <Input
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Email (Optional)" name="email">
            <Input
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Overall Rating (1-10)" name="overallRating">
            <Rate
              value={formData.overallRating}
              onChange={(value) =>
                setFormData({ ...formData, overallRating: value })
              }
              allowClear={false}
            />
          </Form.Item>

          <Form.Item label="Staff Rating (1-5)" name="staffRating">
            <Rate
              value={formData.staffRating}
              onChange={(value) =>
                setFormData({ ...formData, staffRating: value })
              }
              allowClear={false}
            />
          </Form.Item>

          <Form.Item label="Cleanliness Rating (1-5)" name="cleanlinessRating">
            <Rate
              value={formData.cleanlinessRating}
              onChange={(value) =>
                setFormData({ ...formData, cleanlinessRating: value })
              }
              allowClear={false}
            />
          </Form.Item>

          <Form.Item label="Food Rating (1-5)" name="foodRating">
            <Rate
              value={formData.foodRating}
              onChange={(value) =>
                setFormData({ ...formData, foodRating: value })
              }
              allowClear={false}
            />
          </Form.Item>

          <Form.Item label="Suggestions" name="suggestions">
            <Input.TextArea
              placeholder="Your suggestions (max 500 characters)"
              value={formData.suggestions}
              onChange={handleChange}
              maxLength={500}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="feedback-button"
              style={{ backgroundColor: "#1890ff" }}
            >
              Submit Feedback
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => setIsModalVisible(false)}
            >
              Close
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Average Ratings Display */}
      <div className="average-ratings">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card title="Average Overall Rating">
              <p>{averageRatings.overall}</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Average Staff Rating">
              <p>{averageRatings.staff}</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Average Cleanliness Rating">
              <p>{averageRatings.cleanliness}</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Average Food Rating">
              <p>{averageRatings.food}</p>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Feedback Cards */}
      <div className="feedback-cards-container">
        {loading ? (
          <Spin size="large" />
        ) : feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <Card
              key={feedback._id}
              className="feedback-card"
              title={`Feedback from ${feedback.name || "Anonymous"}`}
            >
              <p>
                <strong>Overall Rating:</strong> {feedback.overallRating}{" "}
                <i className="fa-solid fa-star"></i>
              </p>
              <p>
                <strong>Staff Rating:</strong> {feedback.staffRating}{" "}
                <i className="fa-solid fa-star "></i>
              </p>
              <p>
                <strong>Cleanliness Rating:</strong>{" "}
                {feedback.cleanlinessRating}{" "}
                <i className="fa-solid fa-star"></i>
              </p>
              <p>
                <strong>Food Rating:</strong> {feedback.foodRating}{" "}
                <i className="fa-solid fa-star"></i>
              </p>
              <p>
                <strong>Suggestions:</strong>{" "}
                {feedback.suggestions || "No suggestions"}
              </p>
            </Card>
          ))
        ) : (
          <p>No feedbacks available</p>
        )}
      </div>
    </Layout>
  );
};

export default FeedbackForm;
