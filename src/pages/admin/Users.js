import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import {
  Card,
  Col,
  Row,
  Button,
  Space,
  Statistic,
  Input,
  Modal,
  Table,
} from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv
import "../../styles/Users.css"; // Import the external CSS file

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Delete User by ID
  const handeldeletuser = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/admin/delete-user`, {
        data: { id },
      });
      if (res.data.success) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all users
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/admin/getAllUsers");
      if (res.data.success) {
        setUsers(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Search handler to filter users by name or email
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle the update button click
  const handelUpdateuser = (id) => {
    navigate(`/admin/edit-user/${id}`); // Navigate to the edit page with the user ID
  };

  // Prepare CSV data from filtered users
  const csvData = filteredUsers.map((user) => ({
    name: user.name,
    email: user.email,
    isAdmin: user?.isAdmin ? "Yes" : "No",
    isDoctor: user?.isDoctor ? "Yes" : "No",
    userId: user._id,
  }));

  // Modal Table Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (isAdmin ? "Yes" : "No"),
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      key: "isDoctor",
      render: (isDoctor) => (isDoctor ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            danger
            size="small"
            onClick={() => handeldeletuser(record._id)}
          >
            Delete
          </Button>
          <Button size="small" onClick={() => handelUpdateuser(record._id)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="users-container text-center">All Users List</h1>

      {/* Search Input */}
      <Input
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearch}
        style={{
          width: 300,
          marginBottom: 20,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <button className="table-btn" onClick={() => setIsModalOpen(true)}>
        Show Table View
      </button>

      {/* Display the total number of users */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="User Statistics">
            <Statistic title="Total Users" value={filteredUsers.length} />
          </Card>
        </Col>
      </Row>

      {/* Button to download CSV */}
      <Row gutter={[16, 16]} className="csv-btn">
        <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
          <CSVLink
            data={csvData}
            filename={"users.csv"}
            className="custom-csv-btn"
            target="_blank"
          >
            Download Users CSV
          </CSVLink>
        </Col>
      </Row>

      {/* Display the list of users */}
      <Row gutter={[16, 16]}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredUsers.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} key={user._id}>
              <Card
                hoverable
                className="user-card"
                cover={
                  <div className="card-cover">
                    <img
                      alt="user-avatar"
                      src="https://www.w3schools.com/w3images/avatar2.png"
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={`Name: ${user.name}`}
                  description={`Email: ${user.email}`}
                />
                <div className="user-info">
                  <h7>{`Admin: ${user?.isAdmin ? "Yes" : "No"}`}</h7>
                  <h7>{`Doctor: ${user?.isDoctor ? "Yes" : "No"}`}</h7>
                  <h7>{`UserId: ${user._id}`}</h7>
                </div>
                <div className="card-buttons">
                  <Space>
                    <Button
                      danger
                      size="small"
                      onClick={() => handeldeletuser(user._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handelUpdateuser(user._id)}
                    >
                      Update
                    </Button>
                  </Space>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Modal with Scrollable Table */}
      <Modal
        title={
          <h2 style={{ color: "#003366", fontWeight: "bold" }}>Users Table</h2>
        }
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={900}
        style={{ borderRadius: "12px", overflow: "hidden" }}
        bodyStyle={{ padding: "20px", backgroundColor: "#f9f9f9" }}
        centered
      >
        <Table
          columns={columns}
          dataSource={filteredUsers.map((user) => ({ ...user, key: user._id }))}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }} // Enable horizontal scroll
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        />
      </Modal>
    </Layout>
  );
};

export default Users;
