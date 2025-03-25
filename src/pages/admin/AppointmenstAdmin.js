import React, { useEffect, useState } from "react";
import { Button, Tooltip, message, Spin, Modal, Card } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Layout from "../../components/Layout";
import { CSVLink } from "react-csv"; // Import CSVLink
import "../../styles/AdminAppointments.css";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [cardViewModalVisible, setCardViewModalVisible] = useState(false); // For Card view modal

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/api/v1/admin/getAlltheAppoinmentsAdmin"
      );
      if (response.data.success) {
        setAppointments(response.data.data);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      message.error("Failed to fetch appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.userInfo?.name?.toLowerCase().includes(searchText) ||
      `${appointment.doctorInfo?.firstName} ${appointment.doctorInfo?.lastName}`
        .toLowerCase()
        .includes(searchText)
  );

  const handleDelete = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `/api/v1/admin/deleteAppointment/${appointmentId}`
      );
      if (response.data.success) {
        message.success(response.data.message);
        setAppointments(
          appointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete appointment. Please try again.");
    }
  };

  const handleViewDetails = (record) => {
    setSelectedAppointment(record);
    setViewModalVisible(true);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.put(
        `/api/v1/admin/updateAppointmentStatus/${appointmentId}`,
        { status: newStatus }
      );
      if (response.data.success) {
        message.success(`Status updated to ${newStatus}`);
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
        if (newStatus === "approved") {
          Modal.info({
            title: "User Notification",
            content:
              "The user will see the approved status in their dashboard.",
            okText: "Got it",
          });
        }
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to update status. Please try again.");
    }
  };

  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}:00`);
    return date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Prepare data for CSV export
  const csvData = filteredAppointments.map((appointment) => ({
    "Patient Name": appointment.userInfo?.name || "N/A",
    "Doctor Name": `${appointment.doctorInfo?.firstName || ""} ${
      appointment.doctorInfo?.lastName || ""
    }`,
    Specialization: appointment.doctorInfo?.specialization || "N/A",
    Contact: appointment.doctorInfo?.Contact || "N/A",
    Date: new Date(appointment.date).toLocaleDateString(),
    Time: formatTime(appointment.time),
    Status:
      appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1),
  }));

  return (
    <Layout>
      <div className="admin-appointments">
        <h1>Admin Appointments</h1>
        {/* CSV Export Button */}
        <CSVLink
          data={csvData}
          filename={"appointments.csv"}
          className="csv-export-btn"
          target="_blank"
        >
          <Button type="primary" className="csv">
            Export to CSV(Excel)
          </Button>
        </CSVLink>
        <input
          type="text"
          className="search-input"
          placeholder="Search by patient or doctor name"
          onChange={handleSearch}
        />
        <div className="responsive-table">
          <Spin spinning={loading}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Card View</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.userInfo?.name || "N/A"}</td>
                    <td>{`${appointment.doctorInfo?.firstName || ""} ${
                      appointment.doctorInfo?.lastName || ""
                    }`}</td>
                    <td>{appointment.doctorInfo?.specialization || "N/A"}</td>
                    <td>{appointment.doctorInfo?.Contact || "N/A"}</td>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{formatTime(appointment.time)}</td>
                    <td
                      style={{
                        color:
                          appointment.status === "pending" ? "orange" : "green",
                      }}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </td>
                    <td>
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewDetails(appointment)}
                      >
                        View
                      </button>
                      <button
                        className="action-btn delete-btn view-btn"
                        onClick={() => handleDelete(appointment._id)}
                      >
                        Delete
                      </button>

                      {appointment.status !== "approved" && (
                        <button
                          className="action-btn approve-btn view-btn"
                          onClick={() =>
                            handleStatusChange(appointment._id, "approved")
                          }
                        >
                          Approve
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="action-btn card-view-btn view-btn"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setCardViewModalVisible(true); // Show the Card View modal
                        }}
                      >
                        Card view
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Spin>
        </div>

        {/* View Modal */}
        <Modal
          title="Appointment Details"
          visible={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={[
            <Button
              key="delete"
              danger
              onClick={() => {
                if (selectedAppointment) {
                  handleDelete(selectedAppointment._id);
                  setViewModalVisible(false);
                }
              }}
            >
              Delete Appointment
            </Button>,
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Close
            </Button>,
          ]}
          centered
          width={600}
        >
          {selectedAppointment && (
            <div>
              <p>
                <strong>Patient Name:</strong>{" "}
                {selectedAppointment.userInfo?.name || "N/A"}
              </p>
              <p>
                <strong>Doctor Name:</strong>{" "}
                {`${selectedAppointment.doctorInfo?.firstName || ""} ${
                  selectedAppointment.doctorInfo?.lastName || ""
                }`}
              </p>
              <p>
                <strong>Specialization:</strong>{" "}
                {selectedAppointment.doctorInfo?.specialization || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedAppointment.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {formatTime(selectedAppointment.time)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedAppointment.status.charAt(0).toUpperCase() +
                  selectedAppointment.status.slice(1)}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                {selectedAppointment.doctorInfo?.Contact || "N/A"}
              </p>
            </div>
          )}
        </Modal>

        {/* Card View Modal */}
        <Modal
          title="Appointment Card View"
          visible={cardViewModalVisible}
          onCancel={() => setCardViewModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setCardViewModalVisible(false)}>
              Close
            </Button>,
          ]}
          centered
          width={600}
        >
          {selectedAppointment && (
            <Card
              hoverable
              style={{ width: "100%" }}
              title={`Appointment with Dr. ${selectedAppointment.doctorInfo?.firstName}`}
            >
              <p>
                <strong>Patient Name:</strong>{" "}
                {selectedAppointment.userInfo?.name || "N/A"}
              </p>
              <p>
                <strong>Doctor Name:</strong>{" "}
                {`${selectedAppointment.doctorInfo?.firstName || ""} ${
                  selectedAppointment.doctorInfo?.lastName || ""
                }`}
              </p>
              <p>
                <strong>Specialization:</strong>{" "}
                {selectedAppointment.doctorInfo?.specialization || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedAppointment.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {formatTime(selectedAppointment.time)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedAppointment.status.charAt(0).toUpperCase() +
                  selectedAppointment.status.slice(1)}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                {selectedAppointment.doctorInfo?.Contact || "N/A"}
              </p>
            </Card>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default AdminAppointments;
