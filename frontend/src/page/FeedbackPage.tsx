import { useState, CSSProperties } from "react";
import { useLocation } from "react-router-dom";
const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
import { useNavigate } from "react-router-dom";


const FeedbackPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const userUuid = location.state?.userUuid; // Retrieve the user UUID

    const [feedbackType, setFeedbackType] = useState(""); // "like" or "report"
    const [selectedReason, setSelectedReason] = useState("");
    const [customMessage, setCustomMessage] = useState("");


    const likeOptions = [
        "Good audio quality",
        "Nice conversation",
        "Clear video",
        "Polite person",
        "Other",
    ];

    const reportOptions = [
        "Inappropriate behavior",
        "Technical issue",
        "Poor video/audio quality",
        "Spam or scam",
        "Other",
    ];

    const handleSubmit = async () => {
        if (!feedbackType) {
            alert("Please select 'Like' or 'Report'.");
            return;
        }
    
        if (!selectedReason && !customMessage) {
            alert("Please select a reason or enter a message.");
            return;
        }
    
        try {
            const response = await fetch(`${serverDomain}/users/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userUuid,
                    type: feedbackType, // "like" or "report"
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Feedback submitted successfully.");
                navigate("/");
                
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Something went wrong.");
        }
    };
    

    return (
        <div style={containerStyle}>
            <div style={modalStyle}>
                <h2 style={{ marginBottom: "10px" }}>Feedback</h2>

                {/* Like or Report Selection */}
                <div style={toggleButtonContainer}>
                    <button 
                        onClick={() => { setFeedbackType("like"); setSelectedReason(""); setCustomMessage(""); }} 
                        style={feedbackType === "like" ? selectedButtonStyle : buttonStyle}>
                        👍 I Liked the Call
                    </button>
                    <button 
                        onClick={() => { setFeedbackType("report"); setSelectedReason(""); setCustomMessage(""); }} 
                        style={feedbackType === "report" ? selectedButtonStyle : buttonStyle}>
                        ⚠️ Report
                    </button>
                </div>

                {/* Feedback Options */}
                {feedbackType && (
                    <div>
                        <p style={{ marginTop: "10px" }}>
                            {feedbackType === "like" ? "What did you like?" : "Why are you reporting?"}
                        </p>

                        {(feedbackType === "like" ? likeOptions : reportOptions).map((option) => (
                            <label key={option} style={radioStyle}>
                                <input
                                    type="radio"
                                    name="feedback"
                                    value={option}
                                    checked={selectedReason === option}
                                    onChange={() => setSelectedReason(option)}
                                    style={{ marginRight: "10px" }}
                                />
                                {option}
                            </label>
                        ))}

                        {/* Custom Message */}
                        {selectedReason === "Other" && (
                            <textarea
                                placeholder="Describe in detail..."
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                style={textareaStyle}
                            />
                        )}
                    </div>
                )}

                {/* Buttons */}
                <div style={buttonContainerStyle}>
                    <button  style={submitButtonStyle} onClick={handleSubmit}>Submit</button>
                    <button  style={cancelButtonStyle}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

// Inline Styles
const containerStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modalStyle: CSSProperties = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
};

const toggleButtonContainer: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
};

const buttonStyle: CSSProperties = {
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "1px solid gray",
    backgroundColor: "white",
};

const selectedButtonStyle: CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#ff4d4d",
    color: "white",
};

const radioStyle: CSSProperties = {
    display: "block",
    margin: "10px 0",
    cursor: "pointer",
};

const textareaStyle: CSSProperties = {
    width: "100%",
    height: "80px",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

const buttonContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
};

const submitButtonStyle: CSSProperties = {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
};

const cancelButtonStyle: CSSProperties = {
    backgroundColor: "#ccc",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
};

export default FeedbackPage;
