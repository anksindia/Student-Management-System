import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "./Students.css";

const API_URL = "https://localhost:7003/api/Students";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", email: "", mobileNo: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };


  const addStudent = async () => {
    try {
      await axios.post(API_URL, form);
      toast.success("Student added successfully!");
      setForm({ name: "", address: "", email: "", mobileNo: "" });
      fetchStudents();
    } catch (error) {
      toast.error("Error adding student");
    }
  };

 
  const saveStudent = async () => {
    if (!editId) return;
    try {
      await axios.put(`${API_URL}/${editId}`, form);
      toast.info("Student updated successfully!");
      setForm({ name: "", address: "", email: "", mobileNo: "" });
      setEditId(null);
      fetchStudents();
    } catch (error) {
      toast.error("Error updating student");
    }
  };


  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.warning("Student deleted!");
      fetchStudents();
    } catch (error) {
      toast.error("Error deleting student");
    }
  };

  return (
    <div className="students-container">
      <h2>Students Data</h2>

  
      <div className="students-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Mobile No"
          value={form.mobileNo}
          onChange={(e) => setForm({ ...form, mobileNo: e.target.value })}
        />

        {editId ? (
          <button onClick={saveStudent}>Save Changes</button>
        ) : (
          <button onClick={addStudent}>Add</button>
        )}
      </div>


      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Address</th><th>Email</th><th>Mobile</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) =>
            editId === s.id ? null : (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.address}</td>
                <td>{s.email}</td>
                <td>{s.mobileNo}</td>
                <td className="table-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setForm(s);
                      setEditId(s.id);
                      toast.info("Editing student...");
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteStudent(s.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

 
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
