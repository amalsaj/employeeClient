import React, { useState, useEffect } from "react";
import "./leave.css";
import { FaCheck, FaTimes, FaAngleDown } from "react-icons/fa";

const AttendanceLeavePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedOption, setSelectedOption] = useState("attendance");

  useEffect(() => {
    setAttendanceData([
      { id: 1, name: "John Doe", date: "2024-09-25", status: "Present" },
      { id: 2, name: "Jane Smith", date: "2024-09-25", status: "Absent" },
    ]);
    setLeaveRequests([
      {
        id: 1,
        name: "John Doe",
        type: "Sick Leave",
        from: "2024-09-28",
        to: "2024-09-29",
        status: "Pending",
      },
      {
        id: 2,
        name: "Jane Smith",
        type: "Annual Leave",
        from: "2024-10-05",
        to: "2024-10-10",
        status: "Approved",
      },
    ]);
  }, []);

  const handleLeaveApproval = (requestId, newStatus) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="attendance-leave-container">
      <header className="header">
        <h1>Attendance & Leave Management</h1>
        <div className="dropdown-container">
          <label htmlFor="attendance-leave-dropdown">Select View:</label>
          <div className="custom-select">
            <select
              id="attendance-leave-dropdown"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="attendance">Attendance</option>
              <option value="leave">Leave</option>
            </select>
            <FaAngleDown className="dropdown-icon" />
          </div>
        </div>
      </header>

      <div className="content-container">
        {selectedOption === "attendance" ? (
          <section className="attendance-section">
            <h2>Attendance Records</h2>
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.name}</td>
                      <td>{entry.date}</td>
                      <td>
                        <span
                          className={`status ${entry.status.toLowerCase()}`}
                        >
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="leave-section">
            <h2>Leave Requests</h2>
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.name}</td>
                      <td>{request.type}</td>
                      <td>{request.from}</td>
                      <td>{request.to}</td>
                      <td>
                        <span
                          className={`status ${request.status.toLowerCase()}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td>
                        {request.status === "Pending" ? (
                          <div className="actions">
                            <button
                              className="approve-btn"
                              onClick={() =>
                                handleLeaveApproval(request.id, "Approved")
                              }
                            >
                              <FaCheck /> Approve
                            </button>
                            <button
                              className="reject-btn"
                              onClick={() =>
                                handleLeaveApproval(request.id, "Rejected")
                              }
                            >
                              <FaTimes /> Reject
                            </button>
                          </div>
                        ) : (
                          request.status
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AttendanceLeavePage;
