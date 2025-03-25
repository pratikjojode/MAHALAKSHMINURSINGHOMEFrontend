import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import registerImage from "../../src/images/image copy 13.png";
import hello from "../../src/images/mdi_human-hello-variant.png";
import { GoogleOutlined } from "@ant-design/icons";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registration successful! Welcome to Mahalaxmi");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="form-decoration-top"></div>
        <div className="form-decoration-bottom"></div>

        <div className="register-form">
          <div className="form-header">
            <h1 className="welcome-text">
              Join <span>Mahalaxmi</span>
            </h1>
            <p className="subtitle">Nursing Home Management System</p>
          </div>

          <button className="google-login-btn">
            <GoogleOutlined className="google-icon" />
            Register with Google
          </button>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            className="auth-form"
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your full name" },
                { min: 3, message: "Name must be at least 3 characters" },
              ]}
            >
              <Input
                placeholder="John Doe"
                className="auth-input"
                prefix={<span className="input-icon">👤</span>}
              />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                placeholder="name@example.com"
                className="auth-input"
                prefix={<span className="input-icon">✉️</span>}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Create a password"
                className="auth-input"
                prefix={<span className="input-icon">🔒</span>}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-btn"
                block
              >
                Create Account
              </Button>
            </Form.Item>

            <div className="login-cta">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign in
              </Link>
            </div>
          </Form>
        </div>
      </div>

      <div className="register-hero">
        <div className="hero-overlay"></div>
        <img
          src={registerImage}
          alt="Healthcare professionals"
          className="hero-image"
        />
        <div className="hero-content">
          <div className="hero-quote">
            <blockquote>
              "Where compassionate care meets medical excellence."
            </blockquote>
            <div className="quote-author">- Mahalaxmi Nursing Home</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
