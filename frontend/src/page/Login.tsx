import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // React Router for navigation
const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/login"); // Redirect to home if logged in
    }
  }, []);

  // Handle normal login
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form from refreshing

    try {
      const response = await axios.post(`${serverDomain}/users/login`, {
        email,
        password,
      });

      console.log(response)

      if (response.status === 200) {
        // Navigate to Home Page
        //setup redux and navigate to home page

        navigate("/");

        // Store Token in LocalStorage
        console.log("Token:", response.data.token);
        
        localStorage.setItem("authToken", response.data.token);
      } else {
        alert("Login Failed: Invalid credentials");
      }
    } catch (error) {
      alert("Login Failed: Invalid credentials");
      console.error("Login Error:", error);
    }
  };

  // Handle Google Login (Dummy Function)
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h1>LanguaLink</h1>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              required
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={styles.loginButton}>
            Login
          </button>
        </form>
        <div style={styles.divider}>or</div>
        <button style={styles.googleLoginButton} onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

// Styles
import { CSSProperties } from "react";
const styles: { [key: string]: CSSProperties } = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },
  loginBox: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1.5rem",
  },
  inputGroup: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  loginButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  divider: {
    margin: "1rem 0",
    fontSize: "0.9rem",
    color: "#888",
  },
  googleLoginButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#db4437",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Login;
