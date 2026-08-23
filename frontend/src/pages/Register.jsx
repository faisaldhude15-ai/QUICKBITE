import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      console.log(data);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Registration Failed");
    }
  };

  // 100% پرفیکٹ اور لچکدار اسٹائلنگ بلاک
  const styles = {
    container: {
      maxWidth: "450px",
      margin: "60px auto",
      padding: "40px 30px",
      background: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      textAlign: "center",
      fontFamily: "sans-serif",
      boxSizing: "border-box"
    },
    heading: {
      fontSize: "2.2rem",
      color: "#1a1a1a",
      marginBottom: "25px",
      fontWeight: "700"
    },
    form: {
      display: "flex",
      flexDirection: "column", 
      gap: "18px",
      width: "100%"
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "1rem",
      backgroundColor: "#f8fafc",
      color: "#334155",
      boxSizing: "border-box",
      display: "block"
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#ff5722",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "10px",
      display: "block"
    },
    error: {
      backgroundColor: "#fee2e2",
      color: "#dc2626",
      padding: "12px",
      borderRadius: "8px",
      fontSize: "0.95rem",
      marginBottom: "20px",
      border: "1px solid #fca5a5",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Register</h1>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;
