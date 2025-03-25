import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import "../styles/ForgotPassword.css"; // import the CSS file
import Footer from "./Footer"; // Assuming the Footer component is already created

const ForgotPassword = () => {
  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/forgot-password", values);
      if (res.data.success) {
        message.success("Password reset link sent to your email!");
      } else {
        message.error(res.data.message || "Failed to send reset link!");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <p>Enter your email to receive a reset link.</p>
      <Form layout="vertical" onFinish={onFinishHandler}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
      <div className="footer">
        <p>
          Remembered your password? <a href="/login">Login</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
