import React from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaSignInAlt, FaUserPlus, FaUserShield } from "react-icons/fa";

export default function Students() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Title with Icon */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <FaUserGraduate size={40} color="#ffdd57" />
        <h1 style={{ fontSize: "2.8rem", margin: 0, fontWeight: "bold" }}>
          Student Management System
        </h1>
      </div>

      <p style={{ fontSize: "1.2rem", marginTop: "12px", color: "#e0e0e0" }}>
        Manage your student data with ease
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button
            style={btnStyle("#007bff", "#0056b3")}
          >
            <FaSignInAlt /> Login
          </button>
        </Link>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <button
            style={btnStyle("#28a745", "#1e7e34")}
          >
            <FaUserPlus /> Register
          </button>
        </Link>

        {/* New Admin Login Button */}
        <Link to="/AdminLogin" style={{ textDecoration: "none" }}>
          <button
            style={btnStyle("#ff5722", "#e64a19")}
          >
            <FaUserShield /> Login as Admin
          </button>
        </Link>
      </div>
    </div>
  );
}

function btnStyle(color, hover) {
  return {
    padding: "14px 28px",
    background: color,
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    onMouseOver: (e) => (e.target.style.background = hover),
    onMouseOut: (e) => (e.target.style.background = color),
  };
}
