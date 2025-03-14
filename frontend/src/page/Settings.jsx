import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);

  return (
    <div style={styles.container}>
      <div style={styles.settingsBox}>
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backButton}>←</button>
          <h2 style={styles.heading}>Settings</h2>
        </div>

        <div style={styles.settingItem}>
          <span style={styles.settingText}>Enable Notifications</span>
          <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} style={styles.toggleSwitch} />
        </div>

        <div style={styles.settingItem}>
          <span style={styles.settingText}>Dark Mode</span>
          <input type="checkbox" checked={darkModeEnabled} onChange={toggleDarkMode} style={styles.toggleSwitch} />
        </div>

        <div style={styles.settingItem}>
          <span style={styles.settingText}>Manage Account</span>
        </div>

        <div style={styles.settingItem}>
          <span style={styles.settingText}>Privacy Policy</span>
        </div>

        <div style={styles.settingItem}>
          <span style={styles.settingText}>Help & Support</span>
        </div>

        <div style={styles.deactivate}>
          <span style={styles.settingText}>Deactivate Account</span>
          <button style={styles.deactivateButton}>Deactivate</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "white",
  },
  settingsBox: {
    width: "400px",
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  backButton: {
    fontSize: "22px",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "green",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginLeft: "15px",
    color: "green",
  },
  settingItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #333",
  },
  settingText: {
    fontSize: "16px",
    color: "#ddd",
  },
  toggleSwitch: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  deactivate: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deactivateButton: {
    color: "red",
    border: "1px solid red",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    background: "none",
    fontSize: "14px",
    transition: "all 0.3s",
  },
};

export default Settings;
