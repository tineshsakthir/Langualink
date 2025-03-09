import React from "react";
import { FaLanguage, FaPhoneAlt, FaEnvelope, FaCog, FaUserEdit, FaSignOutAlt,FaFire } from "react-icons/fa"; // Importing icons
import { useState,useEffect ,useRef} from "react";
// import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      height: "100vh",
    },
    sider: {
      width: "250px",
      backgroundColor: "#333",
      color: "white",
      padding: "20px",
    },
    header: {
      backgroundColor: "#222",
      color: "white",
      padding: "15px",
      textAlign: "center",
      display: "flex",
        justifyContent: "space-between",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: 1,
      padding: "20px",
      backgroundColor: "#f4f4f4",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    listItem: {
      padding: "10px",
      cursor: "pointer",

    },
    listItemHover: {
      backgroundColor: "#444",
    },
  };
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const [greeting, setGreeting] = useState("");
  const [streak, setStreak] = useState(5); 

  const menuItems = [
    { name: "Change Language", icon: <FaLanguage style={styles.icon} /> },
    { name: "Call History", icon: <FaPhoneAlt style={styles.icon} /> },
    { name: "Contact Us", icon: <FaEnvelope style={styles.icon} /> },
    { name: "Settings", icon: <FaCog style={styles.icon} /> },
    { name: "Edit Profile", icon: <FaUserEdit style={styles.icon} /> },
    { name: "Logout", icon: <FaSignOutAlt style={styles.icon} /> },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sider}>
        <h2>LanguaLink</h2>
        <ul style={styles.list}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              style={styles.listItem}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#444")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {item.icon}
              <div style={{ display: "inline-block", marginLeft: "10px" }}>
              {item.name}
            </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div style={styles.main}>
      <header style={styles.header}>
      <div>{greeting}! Sudarsanam G 👋</div>
      <div style={styles.streak}>
        <FaFire style={styles.fireIcon} />
        {streak}-Day Streak
      </div>
    </header>
        <div style={styles.content}>
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "#28a745", // Green background
    padding: "1.5rem",
    borderRadius: "8px",
  }}
>
  <button
    style={{
      padding: "0.75rem 1.5rem",
      backgroundColor: "#fff",
      color: "#28a745",
      border: "2px solid #28a745",
      borderRadius: "6px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#218838";
      e.currentTarget.style.color = "#fff";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "#fff";
      e.currentTarget.style.color = "#28a745";
    }}

    onClick={() => {
        navigate("/landing");
    }}
  >
    Connect with co-learners
  </button>

  <button
    style={{
      padding: "0.75rem 1.5rem",
      backgroundColor: "#fff",
      color: "#28a745",
      border: "2px solid #28a745",
      borderRadius: "6px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#218838";
      e.currentTarget.style.color = "#fff";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "#fff";
      e.currentTarget.style.color = "#28a745";
    }}
  >
    Create a room
  </button>
</div>
  <div>
    {/* <ProgressBar /> */}
  </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
