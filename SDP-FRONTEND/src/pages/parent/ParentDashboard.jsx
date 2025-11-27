import React, { useState } from "react";
import API from "../../services/api";
import "../dashboard.css";
import LogoutButton from "../../components/LogoutButton";

function ParentDashboard() {
  // Only Children tab remains
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await API.get(`/parents/student/${studentId}`);
      setStudent(res.data);
    } catch (err) {
      alert("Student not found!");
      setStudent(null);
    }
  };

  return (
    <div className="dashboard-container">
      <LogoutButton />
      <aside className="sidebar parent-theme">
        <h2>Parent</h2>
        <button>Children</button>
      </aside>

      <main className="main-content">
        <div className="content">
          <h2>Parent Dashboard</h2>

          <h3>Find Student by ID</h3>
          <div>
            <input
              type="number"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <button onClick={fetchStudent}>Fetch Student</button>
          </div>

          {student && (
            <div className="student-card">
              <h3>Student Details</h3>
              <p><b>ID:</b> {student.id}</p>
              <p><b>Name:</b> {student.name}</p>
              <p><b>Email:</b> {student.email}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ParentDashboard;
