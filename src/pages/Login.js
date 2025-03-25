import React from "react";
import { Form, Input, Button, message } from "antd";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import loginImage from "../../src/images/image copy 13.png";
import hello from "../../src/images/mdi_human-hello-variant.png";

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
        message.success("User login successfully!!");
        navigate("/");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong during login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Form layout="vertical" onFinish={onFinishHandler} className="ant-form">
          <div className="elements">
            <h1 className="text-center welcome">
              <span>Welcome</span> Back to Mahalaxmi Nursing Home
              <img src={hello} alt="hello-icon" />
            </h1>
            <p className="text-center details">Please enter your details</p>
            <button className="google-btn">Login with Google</button>
            <p>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯OR⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</p>
          </div>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter your email",
              },
            ]}
          >
            <Input
              type="email"
              className="email-input"
              placeholder="Please Enter Your email!!"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input
              type="password"
              className="pass"
              placeholder="Please Enter Your Password!!"
            />
          </Form.Item>
          <div className="forgot-password-container-2">
            <Link to="/forgot-password" className="forgot-password-link-2">
              Forgot Password?
            </Link>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login">
              Login
            </Button>
          </Form.Item>
          <Link to="/register" className="link">
            Don't Have an Account? Register
          </Link>
        </Form>
      </div>
      <div className="login-image">
        <img src={loginImage} alt="Login" className="login-img" />
      </div>
    </div>
  );
};

export default Login;
