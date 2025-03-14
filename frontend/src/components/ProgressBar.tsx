import React, { useEffect, useState } from "react";

const ProgressBar: React.FC = () => {
  const dailyGoal = 30;
  const completedTime = 20; // Change this value to test different progress

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      let num = (completedTime / dailyGoal) * 100;
      num = Math.round(num);
      setPercentage(num);
    };

    calculatePercentage();
  }, [completedTime]);

  const getEmoji = () => {
    if (percentage === 0) return "😞";
    if (percentage < 50) return "🙂"; 
    if (percentage < 100) return "😊";
    return "😎";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎯 Daily Goal</h1>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.completed, width: `${percentage}%` }} />
      </div>

      <p style={styles.progressText}>
        {percentage}% of {dailyGoal}m Completed {getEmoji()}
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold" as "bold",
    color: "#333",
    marginBottom: "15px",
  },
  progressBar: {
    width: "100%",
    height: "20px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  completed: {
    height: "100%",
    backgroundColor: "#4CAF50",
    transition: "width 0.5s ease-in-out",
  },
  progressText: {
    fontSize: "18px",
    fontWeight: "500" as "500",
    color: "#333",
  },
};

export default ProgressBar;