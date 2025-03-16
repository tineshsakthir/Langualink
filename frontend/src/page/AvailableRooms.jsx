import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch rooms from API
    fetch("https://your-api.com/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const handleJoin = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const dummyRooms = [
    { id: 1, name: "Chill Beats", description: "A room to vibe with lo-fi and chill beats." },
    { id: 2, name: "Bollywood Retro", description: "Classic Bollywood songs from the golden era." },
    { id: 3, name: "EDM Party", description: "Non-stop electronic dance music for party lovers!" },
    { id: 4, name: "Tamil Hits", description: "The best Tamil songs of all time." },
    { id: 5, name: "K-Pop Vibes", description: "Join and groove to the latest K-Pop hits." },
    { id: 6, name: "Rock Legends", description: "For fans of classic and modern rock music." },
    { id: 7, name: "Hip-Hop Underground", description: "Best underground and mainstream hip-hop tracks." }
  ];

  return (
    <div style={styles.container}>
      <motion.h1 
        style={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Rooms
      </motion.h1>

      <div style={styles.grid}>
        {dummyRooms.length > 0 ? (
          dummyRooms.map((room) => (
            <motion.div 
              key={room.id} 
              style={styles.card}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 style={styles.roomName}>{room.name}</h2>
              <p style={styles.roomDesc}>{room.description}</p>
              <button 
                style={styles.joinButton} 
                onClick={() => handleJoin(room.id)}
              >
                Join Room
              </button>
            </motion.div>
          ))
        ) : (
          <p style={styles.noRooms}>No rooms available</p>
        )}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    width: "100%",
  },
  card: {
    backgroundColor: "#16213e",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
  },
  roomName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  roomDesc: {
    fontSize: "1rem",
    marginBottom: "15px",
    color: "#b0b0b0",
  },
  joinButton: {
    backgroundColor: "#e94560",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s ease",
  },
  noRooms: {
    fontSize: "1.2rem",
    color: "#b0b0b0",
  },
};

export default AvailableRooms;
