import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../dashboard.css";
import LogoutButton from "../../components/LogoutButton";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students");

  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [parents, setParents] = useState([]);

  const [newEntry, setNewEntry] = useState({ name: "", email: "" });

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchData("students", setStudents);
    fetchData("faculty", setFaculty);
    fetchData("parents", setParents);
  }, []);

  const fetchData = async (type, setter) => {
    try {
       const res = await API.get(`/admin/${type}`);
      setter(res.data);
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
    }
  };

  const handleAdd = async (type, setter) => {
    try {
      await API.post(`/admin/${type}`, newEntry);
      fetchData(type, setter);
      setNewEntry({ name: "", email: "" });
    } catch (err) {
      console.error(`Error adding ${type}:`, err);
    }
  };

  const handleDelete = async (type, setter, id) => {
    try {
      await API.delete(`/admin/${type}/${id}`);
      fetchData(type, setter);
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditingData({ name: entry.name, email: entry.email });
  };

  const handleUpdate = async (type, setter, id) => {
    try {
      await API.put(`/admin/${type}/${id}`, editingData);
      fetchData(type, setter);
      setEditingId(null);
      setEditingData({ name: "", email: "" });
    } catch (err) {
      console.error(`Error updating ${type}:`, err);
    }
  };

  const renderTable = (data, type, setter) => (
    <div className="content">
      <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>

      {/* Add Form */}
      <div className="form-inline">
        <input
          type="text"
          placeholder="Name"
          value={newEntry.name}
          onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEntry.email}
          onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })}
        />
        <button onClick={() => handleAdd(type, setter)}>Add</button>
      </div>

      {/* Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>
                {editingId === entry.id ? (
                  <input
                    type="text"
                    value={editingData.name}
                    onChange={(e) =>
                      setEditingData({ ...editingData, name: e.target.value })
                    }
                  />
                ) : (
                  entry.name
                )}
              </td>
              <td>
                {editingId === entry.id ? (
                  <input
                    type="email"
                    value={editingData.email}
                    onChange={(e) =>
                      setEditingData({ ...editingData, email: e.target.value })
                    }
                  />
                ) : (
                  entry.email
                )}
              </td>
              <td>
                {editingId === entry.id ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={() => handleUpdate(type, setter, entry.id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(entry)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(type, setter, entry.id)
                      }
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin</h2>
        <button onClick={() => setActiveTab("students")}>Students</button>
        <button onClick={() => setActiveTab("faculty")}>Faculty</button>
        <button onClick={() => setActiveTab("parents")}>Parents</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2>Admin Dashboard</h2>
          <LogoutButton />
        </div>

        {activeTab === "students" && renderTable(students, "students", setStudents)}
        {activeTab === "faculty" && renderTable(faculty, "faculty", setFaculty)}
        {activeTab === "parents" && renderTable(parents, "parents", setParents)}
      </div>
    </div>
  );
}

export default AdminDashboard;
