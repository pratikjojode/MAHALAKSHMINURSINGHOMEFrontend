import React from "react";
import { Form, Input, Button, message } from "antd";
import "../styles/Register.css"; // Ensure you have styles matching the Login page
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import registerImage from "../../src/images/image copy 13.png"; // Update this path to your registration image
import hello from "../../src/images/mdi_human-hello-variant.png"; // Use the same welcome image or another relevant one

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("User registered successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong during registration");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Form layout="vertical" onFinish={onFinishHandler} className="ant-form">
          <div className="elements">
            <h1 className="text-center welcome">
              <span>Welcome</span> to Mahalaxmi Nursing Home
              <img src={hello} alt="Welcome" />
            </h1>
            <p className="text-center details">Please fill in your details</p>
            <button className="google-btn">Register with Google</button>
            <p>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯OR⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</p>
          </div>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              type="text"
              className="name"
              placeholder="Please enter your name"
            />
          </Form.Item>
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
              className="email"
              placeholder="Please enter your email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input
              type="password"
              className="password"
              placeholder="Please enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login">
              Register
            </Button>
          </Form.Item>
          <Link to="/login">Already a user? Login</Link>
        </Form>
      </div>
      <div className="login-image">
        <img src={registerImage} alt="Register" />
      </div>
    </div>
  );
};

export default Register;
