import React, { useState, useEffect } from "react";
import "../styles/Layout.css";
import { useSelector } from "react-redux";
import { adminMenu, UserMenu } from "../data/data";
import { Avatar, message, Badge } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../pages/Footer";
import Logo from "../images/logo.png"; // Your logo file

const Layout = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility
  const [greeting, setGreeting] = useState(""); // State for greeting message

  // Menu for doctor
  const DoctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    {
      name: "Appointments",
      path: "/doctor/show-bookings/:id",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-user-md",
    },
    {
      name: "Our Doctor",
      path: "/user/doctors",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    { name: "About Us", path: "/about", icon: "fa-solid fa-info-circle" },
    { name: "Feedback", path: "/feedback", icon: "fa-solid fa-comment-dots" },
    { name: "Help & Support", path: "/help", icon: "fa-solid fa-life-ring" },
    { name: "Nurses", path: "/nurses", icon: "fa-solid fa-user-nurse" },
  ];

  // Determine the sidebar menu based on user role
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? DoctorMenu
    : UserMenu;

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout successfully!");
    navigate("/login");
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getGreeting = () => {
    const date = new Date();
    const time = date.getHours();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth() + 1; // Months are 0-indexed
    const currentYear = date.getFullYear();

    if (time < 12) {
      return "Good Morning";
    } else if (time < 18) {
      return `Good Afternoon ${currentDate}/${currentMonth}/${currentYear}`;
    } else {
      return `Good Evening ${currentDate}/${currentMonth}/${currentYear}`;
    }
  };

  // Set the greeting message on component mount
  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="main">
      <div className="layout">
        <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <div className="logo">
            <img src={Logo} width={60} alt="Logo" className="logo-img" />
            <h6>Mahalaxmi Nursing Home</h6>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={index}
                  className={`menu-items ${isActive ? "active" : ""}`}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-items" onClick={handleLogout}>
              <i className="fa-solid fa-sign-out-alt"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-left">
              {user?.notification?.length > 0 && (
                <Badge
                  style={{ cursor: "pointer" }}
                  count={user.notification.length}
                  onClick={() => navigate("/notification")}
                  className="badge"
                >
                  <Avatar shape="circle" size="small" />
                </Badge>
              )}
              <h6>{greeting}</h6>
              <Link to="/profile" className="info">
                {`Name: ${user?.name || "Guest"}`}
                <br />
                {`Email: ${user?.email}`}
                <br />
                {`User ID: ${user?._id}`}
              </Link>
            </div>
            <div className="header-right">
              <button className="hamburger" onClick={toggleSidebar}>
                <i
                  className={`fa ${isSidebarOpen ? "fa-times" : "fa-bars"}`}
                ></i>
              </button>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
