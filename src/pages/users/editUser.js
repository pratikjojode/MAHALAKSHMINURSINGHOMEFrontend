import React, { useState, useEffect } from "react";
import { Input, Button, Form, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user details by ID to populate the form
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/v1/admin/getUserById/${id}`);
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          message.error("User not found");
          navigate("/admin/users"); // Navigate back to users list if user not found
        }
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch user details");
      }
    };

    getUser();
  }, [id, navigate]);

  // Handle form submission to update user
  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `/api/v1/admin/update-user/${id}`,
        values
      );
      if (response.data.success) {
        message.success("User updated successfully");
        navigate("/admin/users"); // Navigate back to the users list
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to update user");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit User</h1>
      <Form initialValues={user} onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter the email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Admin" name="isAdmin" valuePropName="checked">
          <Input type="checkbox" />
        </Form.Item>

        <Form.Item label="Doctor" name="isDoctor" valuePropName="checked">
          <Input type="checkbox" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
