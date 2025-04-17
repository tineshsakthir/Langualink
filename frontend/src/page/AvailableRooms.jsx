import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;



const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [name , setName] = useState("");
  const [description , setDescription] = useState("");

  

  useEffect(() => {
    // Fetch rooms from API
    fetch(`${serverDomain}/rooms/get-all-rooms`)
      .then((res) => res.json())
      .then((data) => setRooms(data.rooms))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const handleJoin = (roomId) => {
    // navigate(`/room/${roomId}`);
    window.location.replace(`http://localhost:3001/room/${roomId}`)
    // / http://localhost:3001/room/1a54a500-1ad0-11f0-891a-eb308cd037d1

  };

  const dummyRooms = [
    { id: 1, name: "Chill Beats", description: "A room to vibe with lo-fi and chill beats.",roomId: "1a54a500-1ad0-11f0-891a-eb308cd037d1" },
    { id: 2, name: "Bollywood Retro", description: "Classic Bollywood songs from the golden era.",roomId: "1a54a500-1ad0-11f0-891a-eb308cd037d1" },
    { id: 2, name: "Bollywood Retro", description: "Classic Bollywood songs from the golden era."   ,roomId: "1a54a500-1ad0-11f0-891a-eb308cd037d1" },
    { id: 3, name: "EDM Party", description: "Non-stop electronic dance music for party lovers!" },
    { id: 4, name: "Tamil Hits", description: "The best Tamil songs of all time." },
    { id: 5, name: "K-Pop Vibes", description: "Join and groove to the latest K-Pop hits." },
    { id: 6, name: "Rock Legends", description: "For fans of classic and modern rock music." },
    { id: 7, name: "Hip-Hop Underground", description: "Best underground and mainstream hip-hop tracks." }
  ];


  const handleCreateRoom =async () => {
    try {
      const response = await axios.post(`${serverDomain}/rooms/create-room`, {
        name: name,
        description: description,
      });
      setName("");
      setDescription("");
      setShowPopup(false);
      const roomid = response.data.room.roomUuid;
      handleJoin(roomid);

    } catch (error) {
      console.error("Error creating room:", error);
      
    }
  }


  return (
    <div style={styles.container}>
      {showPopup && <div style={styles.overlay}/>}

      {showPopup && (
  <div style={styles.overlay}>
    <div style={styles.popup}>
      <div style={styles.popupHeader}>
        <h2 style={styles.popupTitle}>Create a new room</h2>
        <h2 style={styles.closeButton} onClick={() => setShowPopup(false)}>X</h2>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setShowPopup(false); }}>
        <input
          type="text"
          placeholder="Room Name"
          required
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room Description"
          required
          style={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          style={styles.submitButton}
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </form>
    </div>
  </div>
)}


      <div style={{  display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <motion.h1 
        style={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Rooms
        
      </motion.h1>
      <div style={{backgroundColor:'blue',display:'inline-block',padding:'10px',borderRadius:'5px',marginLeft:'20px',cursor:'pointer' ,height:'30px',marginBottom:'30px'}} onClick={()=>{setShowPopup(true)}}>
          <span>+ Create room</span>
      </div>
        </div>
      

      <div style={styles.grid}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <motion.div 
              key={room.id} ls
              style={styles.card}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 style={styles.roomName}>{room.name}</h2>
              <p style={styles.roomDesc}>{room.description}</p>
              <button 
                style={styles.joinButton} 
                onClick={() =>{ handleJoin(room.roomUuid)
                  console.log(room)
                }}
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
    position: "relative",
    height: "100vh"
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
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  popup :{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    zIndex: "20",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  },
  
 
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  popupTitle: {
    margin: 0,
    fontSize: '24px'
  },
  closeButton: {
    margin: 0,
    backgroundColor: 'red',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px'
  },
  submitButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    width: '100%',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default AvailableRooms;
