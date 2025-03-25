import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import loginImage from "../../src/images/image copy 13.png";
import hello from "../../src/images/mdi_human-hello-variant.png";
import { GoogleOutlined } from "@ant-design/icons";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <div className="form-header">
            <h1 className="welcome-text">
              <span>Welcome</span> Back
              <img src={hello} alt="hello-icon" className="hello-icon" />
            </h1>
            <p className="subtitle">Mahalaxmi Nursing Home</p>
            <p className="instruction">Please enter your details</p>
          </div>

          <button className="google-login-btn">
            <GoogleOutlined className="google-icon" />
            Continue with Google
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
              <Input
                type="email"
                placeholder="Enter your email"
                className="auth-input"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="auth-input"
              />
            </Form.Item>

            <div className="form-actions">
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-btn"
                block
              >
                Sign In
              </Button>
            </Form.Item>

            <div className="register-cta">
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>

      <div className="login-hero">
        <div className="hero-overlay"></div>
        <img src={loginImage} alt="Healthcare" className="hero-image" />
        <div className="hero-content">
          <h2>Compassionate Care for All</h2>
          <p>
            Your health is our priority. Access your medical records and connect
            with our healthcare professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
