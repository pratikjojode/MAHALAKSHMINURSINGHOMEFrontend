import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Popconfirm, message, Input, Modal } from "antd";
import Layout from "../components/Layout";
import "../styles/AdminFeedback.css";
import { CSVLink } from "react-csv"; // Import CSVLink for exporting data

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Tracks selected rows for bulk delete
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [selectedFeedback, setSelectedFeedback] = useState(null); // Selected feedback for viewing

  // Fetch feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/v1/feedback/getfeedback");
        setFeedbacks(response.data);
      } catch (error) {
        message.error("Error fetching feedbacks.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/feedback/deletefeedback/${id}`);
      message.success("Feedback deleted successfully");
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
    } catch (error) {
      message.error("Error deleting feedback");
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post("/api/v1/feedback/deletebulk", { ids: selectedRowKeys });
      message.success("Selected feedbacks deleted successfully");
      setFeedbacks(
        feedbacks.filter((feedback) => !selectedRowKeys.includes(feedback._id))
      );
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Error deleting selected feedbacks");
    }
  };

  const handleView = (record) => {
    setSelectedFeedback(record); // Set the selected feedback to display in the modal
    setIsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal
    setSelectedFeedback(null); // Clear the selected feedback
  };

  // Filter feedbacks based on search query
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Overall Rating",
      dataIndex: "overallRating",
      key: "overallRating",
    },
    {
      title: "Staff Rating",
      dataIndex: "staffRating",
      key: "staffRating",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          <Button
            type="link"
            className="view-button"
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this feedback?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" className="delete-button" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
  };

  return (
    <Layout>
      <div className="admin-feedback-container">
        <h2>Admin Feedback Management</h2>

        {/* Search Bar */}
        <Input
          placeholder="Search by User or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "20px", width: "100%", maxWidth: "500px" }}
        />

        {/* Bulk Actions */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <Popconfirm
            title="Are you sure you want to delete selected feedbacks?"
            onConfirm={handleBulkDelete}
            okText="Yes"
            cancelText="No"
            disabled={!selectedRowKeys.length}
          >
            <Button
              type="danger"
              disabled={!selectedRowKeys.length}
              style={{ background: "#e74c3c", color: "#fff" }}
            >
              Bulk Delete
            </Button>
          </Popconfirm>

          <CSVLink
            data={filteredFeedbacks}
            headers={[
              { label: "User", key: "name" },
              { label: "Email", key: "email" },
              { label: "Overall Rating", key: "overallRating" },
              { label: "Staff Rating", key: "staffRating" },
              { label: "Suggestions", key: "suggestions" },
            ]}
            filename="feedbacks.csv"
            style={{ textDecoration: "none" }}
          >
            <Button type="primary" style={{ background: "#4caf50" }}>
              Export to CSV
            </Button>
          </CSVLink>
        </div>

        {/* Feedback Table */}
        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredFeedbacks}
          pagination={{ pageSize: 5 }}
          loading={isLoading}
          className="feedback-table"
          bordered
          locale={{
            emptyText: "No feedback available",
          }}
          responsive={true} // Make the table responsive
        />

        {/* Modal to View Full Feedback */}
        {selectedFeedback && (
          <Modal
            title="Feedback Details"
            visible={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            className="feedback-modal"
            width={600}
          >
            <div>
              <p>
                <strong>User:</strong> {selectedFeedback.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedFeedback.email}
              </p>
              <p>
                <strong>Overall Rating:</strong>{" "}
                {selectedFeedback.overallRating}
              </p>
              <p>
                <strong>Staff Rating:</strong> {selectedFeedback.staffRating}
              </p>
              <p>
                <strong>Feedback:</strong> {selectedFeedback.suggestions}
              </p>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default AdminFeedback;
