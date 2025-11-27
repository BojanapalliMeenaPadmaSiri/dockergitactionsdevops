import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../dashboard.css";
import LogoutButton from "../../components/LogoutButton";

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("grades");
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Student info from localStorage
  const studentId = localStorage.getItem("studentId");
  const studentName = localStorage.getItem("studentName");

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) {
        setError("No student logged in. Please login again.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching data for student:", studentId);

        // ✅ Fetch Grades, Attendance, and Courses in parallel
        const [gradesRes, attendanceRes, coursesRes] = await Promise.all([
          API.get(`/students/${studentId}/grades`),
          API.get(`/students/${studentId}/attendance`),
          API.get(`/students/${studentId}/courses`),
        ]);

        console.log("Grades:", gradesRes.data);
        console.log("Attendance:", attendanceRes.data);
        console.log("Courses:", coursesRes.data);

        setGrades(gradesRes.data || []);
        setAttendance(attendanceRes.data || []);
        setCourses(coursesRes.data || []);
        setError("");
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load student data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <div className="dashboard-container">
      <LogoutButton />
      <aside className="sidebar-student-theme">
        <h2>Student</h2>
        <button
          onClick={() => setActiveTab("grades")}
          className={activeTab === "grades" ? "active" : ""}
        >
          Grades
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={activeTab === "attendance" ? "active" : ""}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveTab("courses")}
          className={activeTab === "courses" ? "active" : ""}
        >
          Courses
        </button>
      </aside>

      <main className="main-content">
        <div className="content">
          <h2>Welcome, {studentName || "Student"}</h2>
          <h3>Student Dashboard</h3>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* ---------------- GRADES TAB ---------------- */}
          {!loading && !error && activeTab === "grades" && (
            <>
              <h3>Grades</h3>
              {grades.length === 0 ? (
                <p>No grades available.</p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Marks</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g, i) => (
                      <tr key={i}>
                        <td>{g.subject}</td>
                        <td>{g.marks}</td>
                        <td>{g.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* ---------------- ATTENDANCE TAB ---------------- */}
          {!loading && !error && activeTab === "attendance" && (
            <>
              <h3>Attendance</h3>
              {attendance.length === 0 ? (
                <p>No attendance records available.</p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((a, i) => (
                      <tr key={i}>
                        <td>{a.date}</td>
                        <td>{a.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* ---------------- COURSES TAB ---------------- */}
          {!loading && !error && activeTab === "courses" && (
            <>
              <h3>Your Registered Courses</h3>
              {courses.length === 0 ? (
                <p>No registered courses found.</p>
              ) : (
                <div className="course-grid">
                  {courses.map((course, index) => (
                    <div key={index} className="course-card">
                      <h4>{course.name}</h4>
                      <p><strong>Code:</strong> {course.code}</p>
                      <p><strong>Instructor:</strong> {course.instructor}</p>
                      <p><strong>Credits:</strong> {course.credits}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
