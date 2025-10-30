import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashbord.css";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const STUDENTS_API = "https://localhost:7003/api/Students";
const SUBJECTS_API = "https://localhost:7003/api/Subjects";
const USERS_API = "https://localhost:7003/api/Users";

export default function AdminDashboard() {
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverDelete, setHoverDelete] = useState(false);
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem("admin"));

    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [users, setUsers] = useState([]);

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [form, setForm] = useState({
        name: "",
        address: "",
        email: "",
        mobileNo: "",
    });
    const [editId, setEditId] = useState(null);

    //  check if Admin not logged in
    useEffect(() => {
        if (!admin) {
            toast.error("Please login as Admin first!");
            navigate("/AdminLogin");
        }
    }, [admin, navigate]);

    //  fetch data
    useEffect(() => {
        fetchStudents();
        fetchSubjects();
        fetchUsers();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch(STUDENTS_API);
            if (!res.ok) throw new Error("Failed to fetch students");
            const data = await res.json();
            setStudents(data);
        } catch {
            toast.error("Failed to fetch students");
        }
    };

    const fetchSubjects = async () => {
        try {
            const res = await fetch(SUBJECTS_API);
            if (!res.ok) throw new Error("Failed to fetch subjects");
            const data = await res.json();
            setSubjects(data);
        } catch {
            toast.error("Failed to fetch subjects");
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(USERS_API);
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch {
            toast.error("Failed to fetch users");
        }
    };

    //  CRUD for students
    const handleSubjectChange = (id) => {
        setSelectedSubjects((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const validateForm = () => {
        if (
            !form.name.trim() ||
            !form.address.trim() ||
            !form.email.trim() ||
            !form.mobileNo.trim()
        ) {
            toast.error("Please fill all fields!");
            return false;
        }
        if (selectedSubjects.length === 0) {
            toast.error("Please select at least one subject!");
            return false;
        }
        return true;
    };

    const addStudent = async () => {
        if (!validateForm()) return;
        try {
            const res = await fetch(STUDENTS_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    subjects: selectedSubjects,
                }),
            });
            if (!res.ok) throw new Error("Error adding student");
            toast.success("Student added successfully!");
            setForm({ name: "", address: "", email: "", mobileNo: "" });
            setSelectedSubjects([]);
            fetchStudents();
        } catch {
            toast.error("Error adding student");
        }
    };

    const saveStudent = async () => {
        if (!validateForm()) return;
        if (!editId) return;
        try {
            const res = await fetch(`${STUDENTS_API}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    subjects: selectedSubjects,
                }),
            });
            if (!res.ok) throw new Error("Error updating student");
            toast.info("Student updated successfully!");
            setForm({ name: "", address: "", email: "", mobileNo: "" });
            setSelectedSubjects([]);
            setEditId(null);
            fetchStudents();
        } catch {
            toast.error("Error updating student");
        }
    };

    const deleteStudent = async (id) => {
        try {
            const res = await fetch(`${STUDENTS_API}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error deleting student");
            toast.warning("Student deleted!");
            fetchStudents();
        } catch {
            toast.error("Error deleting student");
        }
    };

    const startEdit = (student) => {
        setForm({
            name: student.name,
            address: student.address,
            email: student.email,
            mobileNo: student.mobileNo,
        });
        setSelectedSubjects(student.subjects || []);
        setEditId(student.id);
        toast.info("Editing student...");
    };

    //  logout
    const handleLogout = () => {
        localStorage.removeItem("admin");
        localStorage.removeItem("adminToken");
        toast.info("Logged out successfully!");
        navigate("/");
    };

    if (!admin) return null;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                padding: "20px",
            }}
        >
            {/* Admin Info */}
            <div
                style={{
                    maxWidth: "900px",
                    margin: "20px auto",
                    padding: "15px 20px",
                    textAlign: "center",
                    color: "#f1f1f1",
                }}
            >
                <h2 style={{ marginBottom: "10px", color: "#4cafef", fontWeight: 600 }}>
                    Welcome, {admin?.name || "Admin"}!
                </h2>
                <p><strong>Email:</strong> {admin?.email || "-"}</p>
                <p><strong>Role:</strong> {admin?.role || "Admin"}</p>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        background: "#ff4d4f",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Logout <FaSignOutAlt />
                </button>
            </div>

            {/* Users Table */}
            <div className="students-container" style={{ marginBottom: "15px" }}>
                <h2>All Users</h2>
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roll No</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.rollNumber || "-"}</td>
                                <td>{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Students Section */}
            <div className="students-container">
                <h2>Manage Students</h2>
                <div className="students-form">
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        placeholder="Mobile No"
                        type="tel"
                        value={form.mobileNo}
                        onChange={(e) => setForm({ ...form, mobileNo: e.target.value })}
                    />
                    <input
                        placeholder="Address"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />

                    <div className="subjects-checkbox">
                        <h4>Select Subjects:</h4>
                        {subjects.map((sub) => (
                            <label key={sub.id} style={{ display: "block" }}>
                                <input
                                    type="checkbox"
                                    value={sub.id}
                                    checked={selectedSubjects.includes(sub.id)}
                                    onChange={() => handleSubjectChange(sub.id)}
                                />
                                {sub.subjectName}
                            </label>
                        ))}
                    </div>

                    {editId ? (
                        <button id="add" onClick={saveStudent}>
                            Save Changes
                        </button>
                    ) : (
                        <button id="add" onClick={addStudent}>
                            Add
                        </button>
                    )}
                </div>

                <table className="students-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Subjects</th>
                            <th>Actions</th>
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
                                    <td>{s.subjectNames?.join(", ")}</td>
                                    <td>
                                        <button
                                            style={{
                                                background: "#ff9800",
                                                color: "white",
                                                border: "none",
                                                padding: "5px 10px",
                                                cursor: "pointer",
                                                borderRadius: "6px",
                                                transition: "0.2s",
                                            }}
                                            onClick={() => startEdit(s)}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "#e68900")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "#ff9800")}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            style={{
                                                background: "#f44336",
                                                color: "white",
                                                border: "none",
                                                padding: "5px 10px",
                                                cursor: "pointer",
                                                marginLeft: "5px",
                                                borderRadius: "6px",
                                                transition: "0.2s",
                                            }}
                                            onClick={() => deleteStudent(s.id)}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "#c62828")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "#f44336")}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>

                </table>
            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}
