"use client";

import { useState } from "react";

export default function SimpleFormSPA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Simple Form SPA</h1>
        <p style={subtitleStyle}>Experiment – 4</p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>

        {submitted && (
          <div style={resultBox}>
            <h3 style={{ marginBottom: "10px" }}>Submitted Data</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Course:</strong> {formData.course}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- THEME STYLES ---------- */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  fontFamily: "Arial, sans-serif",
};

const cardStyle = {
  background: "#ffffff",
  padding: "30px",
  width: "360px",
  borderRadius: "12px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
};

const titleStyle = {
  textAlign: "center" as const,
  marginBottom: "5px",
  color: "#333",
};

const subtitleStyle = {
  textAlign: "center" as const,
  marginBottom: "20px",
  color: "#777",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#444",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#667eea",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

const resultBox = {
  marginTop: "20px",
  padding: "15px",
  borderRadius: "8px",
  background: "#f4f6ff",
  color: "#333",
};
