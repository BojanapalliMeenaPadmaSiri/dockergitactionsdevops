import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../dashboard.css";
import LogoutButton from "../../components/LogoutButton";

function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);

  // --- New Student Form ---
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });
  const [editingStudent, setEditingStudent] = useState(null);

  // --- New Parent Form ---
  const [newParent, setNewParent] = useState({ name: "", email: "" });
  const [editingParent, setEditingParent] = useState(null);

  // --- Attendance ---
  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]);

  // --- Grades ---
  const [selectedStudent, setSelectedStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [message, setMessage] = useState("");

  // ---------------- Fetch Helpers ----------------
  const fetchStudents = async () => {
    try {
      const res = await API.get("faculty/students");
      setStudents(res.data);
    } catch (err) {
      alert("Error fetching students: " + (err.response?.data || err.message));
    }
  };

  const fetchParents = async () => {
    try {
      const res = await API.get("faculty/parents");
      setParents(res.data);
    } catch (err) {
      alert("Error fetching parents: " + (err.response?.data || err.message));
    }
  };

  // Fetch on mount + when tab changes
  useEffect(() => {
    if (["students", "attendance", "grades"].includes(activeTab)) {
      fetchStudents();
    } else if (activeTab === "parents") {
      fetchParents();
    }
  }, [activeTab]);

  // ---------------- STUDENT CRUD ----------------
  const handleStudentChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
    try {
      const res = await API.post("faculty/students", newStudent);
      setStudents([...students, res.data]);
      setNewStudent({ name: "", email: "" });
    } catch (err) {
      alert("Error adding student: " + (err.response?.data || err.message));
    }
  };

  const saveStudent = async (id) => {
    try {
      const res = await API.put(`faculty/students/${id}`, editingStudent);
      setStudents(students.map((s) => (s.id === id ? res.data : s)));
      setEditingStudent(null);
    } catch (err) {
      alert("Error updating student: " + (err.response?.data || err.message));
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`faculty/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      alert("Error deleting student: " + (err.response?.data || err.message));
    }
  };

  // ---------------- PARENT CRUD ----------------
  const handleParentChange = (e) => {
    setNewParent({ ...newParent, [e.target.name]: e.target.value });
  };

  const handleAddParent = async () => {
    try {
      const res = await API.post("faculty/parents", newParent);
      setParents([...parents, res.data]);
      setNewParent({ name: "", email: "" });
    } catch (err) {
      alert("Error adding parent: " + (err.response?.data || err.message));
    }
  };

  const saveParent = async (id) => {
    try {
      const res = await API.put(`faculty/parents/${id}`, editingParent);
      setParents(parents.map((p) => (p.id === id ? res.data : p)));
      setEditingParent(null);
    } catch (err) {
      alert("Error updating parent: " + (err.response?.data || err.message));
    }
  };

  const deleteParent = async (id) => {
    try {
      await API.delete(`faculty/parents/${id}`);
      setParents(parents.filter((p) => p.id !== id));
    } catch (err) {
      alert("Error deleting parent: " + (err.response?.data || err.message));
    }
  };

  // ---------------- ATTENDANCE ----------------
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData({ ...attendanceData, [studentId]: status });
  };

  const submitAttendance = async () => {
    try {
      for (const studentId in attendanceData) {
        await API.post(`faculty/students/${studentId}/attendance`, {
          date: attendanceDate,
          status: attendanceData[studentId],
        });
      }
      alert("Attendance submitted successfully!");
      setAttendanceData({});
    } catch (err) {
      alert("Error saving attendance: " + (err.response?.data || err.message));
    }
  };

  // ---------------- GRADES ----------------
  const handleSubmitGrade = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !subject || !marks) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      await API.post(`/faculty/students/${selectedStudent}/grades`, {
        subject,
        marks: parseInt(marks),
      });
      setMessage("Grade submitted successfully ✅");
      setSubject("");
      setMarks("");
    } catch (err) {
      console.error("Error submitting grade:", err);
      setMessage("Failed to submit grade ❌");
    }
  };

  return (
    <div className="dashboard-container">
      <LogoutButton />
      <aside className="sidebar faculty-theme">
        <h2>Faculty</h2>
        <button onClick={() => setActiveTab("students")}>Students</button>
        <button onClick={() => setActiveTab("parents")}>Parents</button>
        <button onClick={() => setActiveTab("attendance")}>Attendance</button>
        <button onClick={() => setActiveTab("grades")}>Grades</button>
      </aside>

      <main className="main-content">
        <div className="content">
          <h2>Faculty Dashboard</h2>

          {/* ---------------- STUDENTS TAB ---------------- */}
          {activeTab === "students" && (
            <>
              <h3>Manage Students</h3>
              <div className="form-section">
                <input type="text" name="name" placeholder="Enter Name" value={newStudent.name} onChange={handleStudentChange} />
                <input type="email" name="email" placeholder="Enter Email" value={newStudent.email} onChange={handleStudentChange} />
                <button onClick={handleAddStudent}>Add Student</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Email</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>
                        {editingStudent?.id === s.id ? (
                          <input type="text" value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} />
                        ) : s.name}
                      </td>
                      <td>
                        {editingStudent?.id === s.id ? (
                          <input type="email" value={editingStudent.email} onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })} />
                        ) : s.email}
                      </td>
                      <td>
                        {editingStudent?.id === s.id ? (
                          <>
                            <button onClick={() => saveStudent(s.id)}>Save</button>
                            <button onClick={() => setEditingStudent(null)}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setEditingStudent(s)}>Edit</button>
                            <button onClick={() => deleteStudent(s.id)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* ---------------- PARENTS TAB ---------------- */}
          {activeTab === "parents" && (
            <>
              <h3>Manage Parents</h3>
              <div className="form-section">
                <input type="text" name="name" placeholder="Enter Name" value={newParent.name} onChange={handleParentChange} />
                <input type="email" name="email" placeholder="Enter Email" value={newParent.email} onChange={handleParentChange} />
                <button onClick={handleAddParent}>Add Parent</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Email</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {parents.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        {editingParent?.id === p.id ? (
                          <input type="text" value={editingParent.name} onChange={(e) => setEditingParent({ ...editingParent, name: e.target.value })} />
                        ) : p.name}
                      </td>
                      <td>
                        {editingParent?.id === p.id ? (
                          <input type="email" value={editingParent.email} onChange={(e) => setEditingParent({ ...editingParent, email: e.target.value })} />
                        ) : p.email}
                      </td>
                      <td>
                        {editingParent?.id === p.id ? (
                          <>
                            <button onClick={() => saveParent(p.id)}>Save</button>
                            <button onClick={() => setEditingParent(null)}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setEditingParent(p)}>Edit</button>
                            <button onClick={() => deleteParent(p.id)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* ---------------- ATTENDANCE TAB ---------------- */}
          {activeTab === "attendance" && (
            <>
              <h3>Mark Attendance</h3>
              <label>
                Date:{" "}
                <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} />
              </label>

              <table className="data-table">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.name}</td>
                      <td>
                        <select value={attendanceData[s.id] || ""} onChange={(e) => handleAttendanceChange(s.id, e.target.value)}>
                          <option value="">--Select--</option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={submitAttendance}>Submit Attendance</button>
            </>
          )}

          {/* ---------------- GRADES TAB ---------------- */}
          {activeTab === "grades" && (
            <>
              <h3>Assign Grades</h3>
              <form onSubmit={handleSubmitGrade} className="form-box">
                <label>Student:</label>
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                  <option value="">-- Select Student --</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>

                <label>Subject:</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter subject" />

                <label>Marks:</label>
                <input type="number" value={marks} onChange={(e) => setMarks(e.target.value)} placeholder="Enter marks" />

                <button type="submit">Submit Grade</button>
              </form>

              {message && <p>{message}</p>}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default FacultyDashboard;
