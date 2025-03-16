import React, { useState, useEffect } from "react";
import { FaLanguage, FaPhoneAlt, FaEnvelope, FaCog, FaUserEdit, FaSignOutAlt, FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import BarChart from "../components/BarChart";
import { useSelector } from "react-redux";
import axios from "axios";
const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;



const Home = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [streak, setStreak] = useState(5);
  const user = useSelector((state: any) => state.auth);
  const [isDisabled, setIsDisabled] = useState(false);



  const token = localStorage.getItem("authToken");
  useEffect(() => {

    if(user.firstName==='') {
      navigate("/login");
    }
  }, []);


  useEffect( () => {
    //get user and if is active then make connect to one to one as disabled
    const fetchData = async () => {
    const user = await axios.get(`${serverDomain}/users/me?token=${token}`);
   
    if(user.data.user.isActive){
      //disable the button
      setIsDisabled(true);
      alert('You are suspended for temperoery')
    }
  }

  fetchData();

  },[])

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
      alignItems: "center",
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
      display: "flex",
      alignItems: "center",
      gap: "10px",
      transition: "background 0.3s",
    },
    listItemHover: {
      backgroundColor: "#444",
    },
    streak: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontWeight: "bold",
    },
    fireIcon: {
      color: "orange",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      backgroundColor: "#28a745",
      padding: "1.5rem",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    button: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#fff",
      color: "#28a745",
      border: "2px solid #28a745",
      borderRadius: "6px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  const menuItems = [
    { name: "Change Language", icon: <FaLanguage /> },
    { name: "Call History", icon: <FaPhoneAlt /> },
    { name: "Contact Us", icon: <FaEnvelope /> ,nav: "/contact-us" },
    { name: "Settings", icon: <FaCog /> ,nav: "/settings" },
    { name: "Edit Profile", icon: <FaUserEdit /> ,nav: "/edit-profile" },
    { name: "Logout", icon: <FaSignOutAlt /> , nav: "/login" },
  ];

  const data = [
    { day: "Sun", time: 30 },
    { day: "Mon", time: 40 },
    { day: "Tue", time: 35 },
    { day: "Wed", time: 50 },
    { day: "Thu", time: 45 },
    { day: "Fri", time: 60 },
    { day: "Sat", time: 55 },
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
              <span onClick={()=>{
                if(item.nav){
                  if(item.name === "Logout"){
                    localStorage.removeItem("authToken");
                  }
                  navigate(item.nav)
                }
              }}>{item.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div style={styles.main}>
   
        <header style={styles.header}>
          <div>{greeting}! {user.firstName} 👋</div>
          <div style={styles.streak}>
            <FaFire style={styles.fireIcon} />
            {streak}-Day Streak
          </div>
        </header>
        <div style={{ marginTop: "20px",marginBottom:'40px' }}>
            <ProgressBar  />
          </div>
        <div style={styles.content}>
          {/* Button Section */}
          
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#218838";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#28a745";
              }}
              onClick={() =>{
                if(!isDisabled){
                  alert('You are suspended for temperoery')
                  return 
                }
                 navigate("/landing")

              }}

              disabled={!isDisabled}
            >
              Connect with co-learners
            </button>

            <button
              style={styles.button}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#218838";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#28a745";
              }}

              
              disabled={!isDisabled}

            >
              Create a room
            </button>

            <button
              style={styles.button}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#218838";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#28a745";
              }}

              
              disabled={!isDisabled}

            >
              Join a room
            </button>
          </div>

          {/* Progress Bar Section */}
         

          <div style={{ marginTop: "80px" }}>
            <BarChart data={data} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
