import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashbord.css";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";


const API_URL = "https://localhost:7003/api/Students";
const SUBJECTS_API = "https://localhost:7003/api/Subjects";



export default function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            toast.error("Please login first!");
            navigate("/");
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [form, setForm] = useState({
        name: "",
        address: "",
        email: "",
        mobileNo: "",
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchSubjects();
    }, []);


    const fetchStudents = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Failed to fetch students");
            const data = await res.json();
            setStudents(data);
        } catch (error) {
            toast.error("Failed to fetch students");
        }
    };

    const fetchSubjects = async () => {
        try {
            const res = await fetch(SUBJECTS_API);
            if (!res.ok) throw new Error("Failed to fetch subjects");
            const data = await res.json();
            setSubjects(data);
        } catch (error) {
            toast.error("Failed to fetch subjects");
        }
    };


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
            const res = await fetch(API_URL, {
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
        } catch (error) {
            toast.error("Error adding student");
        }
    };


    const saveStudent = async () => {
        if (!validateForm()) return;
        if (!editId) return;

        try {
            const res = await fetch(`${API_URL}/${editId}`, {
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
        } catch (error) {
            toast.error("Error updating student");
        }
    };


    const deleteStudent = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error deleting student");
            toast.warning("Student deleted!");
            fetchStudents();
        } catch (error) {
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
    const handleLogout = () => {
        localStorage.removeItem("user");
        toast.info("Logged out successfully!");
        navigate("/login");
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            padding: "20px",
        }}>


            <div
                style={{
                    maxWidth: "900px",
                    margin: "20px auto",
                    padding: "15px 20px",
                    // background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                    textAlign: "center",
                    color: "#f1f1f1",

                }}
            >
                <h2 style={{ marginBottom: "10px", color: "#4cafef", fontWeight: 600 }}>
                    Welcome, {user?.name || "Guest"}!
                </h2>
                <p style={{ margin: "5px 0", fontSize: "15px" }}>
                    <strong>Email:</strong> {user?.email || "-"}
                </p>
                <p style={{ margin: "5px 0", fontSize: "15px" }}>
                    <strong>Roll Number:</strong> {user?.rollNumber||"-"}
                </p>

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
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#d9363e")}
                    onMouseOut={(e) => (e.target.style.background = "#ff4d4f")}
                >
                    Logout <FaSignOutAlt />
                </button>


            </div>


            <div className="students-container">
                <h2>Students Data</h2>

                {/* Form */}
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
                        value={form.mobileNo}
                        type="tel"
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
                            <label key={sub.id} style={{ display: "block", margin: "5px 0" }}>
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

                {/* Students Table */}
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
                                    <td className="table-actions">
                                        <button className="edit-btn" onClick={() => startEdit(s)}>
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteStudent(s.id)}
                                        >
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
        </div>
    );
}
