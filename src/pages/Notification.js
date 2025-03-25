import React from "react";
import Layout from "../components/Layout";
import { message, Tabs, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";
import "../styles/Notification.css"; // Import custom CSS

const Notification = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/get-all-notification", {
        userId: user._id,
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(setUser(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Unread",
      children: (
        <div className="notification-container">
          {user?.notification && user.notification.length > 0 ? (
            user.notification.map((notificationMsg, index) => (
              <div
                key={index}
                className="notification-card"
                onClick={() =>
                  (window.location.href = notificationMsg.onClickPath)
                }
              >
                <p className="notification-message">
                  {notificationMsg.message}
                </p>
              </div>
            ))
          ) : (
            <p className="no-notification">
              No unread notifications available.
            </p>
          )}
          <Button
            type="primary"
            className="mark-read-btn"
            onClick={handleMarkAllRead}
          >
            Mark All as Read
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: "Read",
      children: (
        <div className="notification-container">
          {user?.seenNotification && user.seenNotification.length > 0 ? (
            user.seenNotification.map((notificationMsg, index) => (
              <div
                key={index}
                className="notification-card"
                onClick={() =>
                  (window.location.href = notificationMsg.onClickPath)
                }
              >
                <p className="notification-message">
                  {notificationMsg.message}
                </p>
              </div>
            ))
          ) : (
            <p className="no-notification">No read notifications available.</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h4 className="notification-title">Notifications</h4>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </Layout>
  );
};

export default Notification;
