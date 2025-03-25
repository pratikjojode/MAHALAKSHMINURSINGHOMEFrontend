import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import {
  Card,
  Col,
  Row,
  Button,
  Space,
  message,
  Input,
  Modal,
  Table,
} from "antd";
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv
import "../../styles/Doctors.css";

const { Search } = Input;

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorStats, setDoctorStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  // For the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handelDelete = async (id) => {
    try {
      const res = await axios.delete("/api/v1/admin/delete-doctor", {
        data: { id },
      });
      if (res.data.success) {
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
        message.success("Doctor deleted successfully!");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to delete the doctor.");
    }
  };

  const getDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/admin/getAllDoctors");
      if (res.data.success) {
        const doctorsData = res.data.data;
        setDoctors(doctorsData);

        // Calculate doctor statistics
        const stats = doctorsData.reduce(
          (acc, doctor) => {
            acc[doctor.status.toLowerCase()] += 1;
            return acc;
          },
          { approved: 0, pending: 0, rejected: 0 }
        );
        setDoctorStats(stats);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAccountStatus = async (doctor, status) => {
    try {
      const res = await axios.post("/api/v1/admin/changeAccountStatus", {
        doctorId: doctor._id,
        status: status,
      });

      if (res.data.success) {
        setDoctors((prevDoctors) =>
          prevDoctors.map((d) =>
            d._id === doctor._id ? { ...d, status: status } : d
          )
        );
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.success("Request updated please reload the site");
      window.location.reload();
    }
  };

  const handleShowModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setSelectedDoctor(null);
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const csvData = filteredDoctors.map((doctor) => ({
    Name: `${doctor.firstName} ${doctor.lastName}`,
    Email: doctor.email,
    Status: doctor.status,
    Specialization: doctor.specialization,
    Experience: doctor.Experience,
    Timings: doctor.timings,
    Contact: doctor.Contact,
  }));

  // Table columns for the modal view
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    { title: "Experience", dataIndex: "experience", key: "experience" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="danger"
          size="small"
          onClick={() => handelDelete(record.key)} // Delete button for each doctor in the table
        >
          Delete
        </Button>
      ),
    },
  ];

  // Prepare data for the table
  const tableData = filteredDoctors.map((doctor) => ({
    key: doctor._id,
    name: `${doctor.firstName} ${doctor.lastName}`,
    email: doctor.email,
    status: doctor.status,
    specialization: doctor.specialization,
    experience: doctor.Experience,
    contact: doctor.Contact,
  }));

  return (
    <Layout>
      <div className="doc">
        <h1 style={{ marginBottom: "20px" }}>Admin Doctors Management</h1>
      </div>

      {/* Doctor Statistics Section */}
      <Row gutter={16} style={{ marginBottom: "20px" }} className="app-div">
        <Col span={8} className="col">
          <Card title="Approved Doctors" className="app" bordered={false}>
            <h3>{doctorStats.approved}</h3>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pending Doctors" className="app-1" bordered={false}>
            <h3>{doctorStats.pending}</h3>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Rejected Doctors" className="app-2" bordered={false}>
            <h3>{doctorStats.rejected}</h3>
          </Card>
        </Col>
      </Row>

      {/* CSV Download Button */}
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <CSVLink
            data={csvData}
            filename={"doctors.csv"}
            className="csv-custom-btn"
            target="_blank"
          >
            Download Doctors CSV
          </CSVLink>
        </Col>
      </Row>

      {/* Search Bar */}
      <Search
        placeholder="Search by name, specialization, or status"
        onSearch={handleSearch}
        className="search"
      />

      {/* Doctors List */}
      <Row gutter={[16, 16]}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredDoctors.map((doctor) => (
            <Col xs={24} sm={12} md={8} lg={6} key={doctor._id}>
              <Card hoverable className="doctor-card">
                <div className="doctor-card-img-container">
                  <img
                    alt="doctor-avatar"
                    src={
                      doctor.image ||
                      "https://www.w3schools.com/w3images/avatar2.png"
                    }
                    className="doctor-card-img"
                  />
                </div>
                <Card.Meta
                  className="doctor-card-meta"
                  title={`${doctor.firstName} ${doctor.lastName}`}
                  description={`Email: ${doctor.email}`}
                />
                <div className="doctor-card-details">
                  <p>
                    <strong>Contact:</strong> {doctor.Contact}
                  </p>

                  <p>
                    <strong>Status:</strong> {doctor.status}
                  </p>
                  <p>
                    <strong>Specialization:</strong> {doctor.specialization}
                  </p>
                  <p>
                    <strong>Experience:</strong> {doctor.Experience} years
                  </p>
                  <p>
                    <strong>Timings:</strong> {doctor.timings} hours/day
                  </p>
                </div>
                <div className="doctor-card-button-container">
                  <Space>
                    {doctor.status === "Pending" ? (
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => handleAccountStatus(doctor, "approved")}
                      >
                        Approve
                      </Button>
                    ) : (
                      <Button
                        type="default"
                        size="small"
                        onClick={() => handleAccountStatus(doctor, "Pending")}
                      >
                        Set to Pending
                      </Button>
                    )}
                    <Button
                      type="default"
                      size="small"
                      onClick={() => handelDelete(doctor._id)}
                    >
                      Delete
                    </Button>
                  </Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleShowModal(doctor)} // Open modal with selected doctor
                    style={{ marginTop: "10px" }}
                  >
                    View All Doctors
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Modal for Table View */}
      <Modal
        title="Doctors List"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
        width={1200}
        centered
        bodyStyle={{
          padding: "20px",
          maxHeight: "400px", // Set a max height
          overflowY: "auto", // Allow vertical scrolling
        }}
        style={{
          borderRadius: "10px",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          bordered
          size="middle"
          style={{ marginBottom: "20px" }}
        />
        <Button
          type="primary"
          onClick={handleCancelModal}
          style={{ width: "100%", backgroundColor: "#003366", color: "white" }}
        >
          Close
        </Button>
      </Modal>
    </Layout>
  );
};

export default Doctors;
