import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [nickName, setNickName] = useState(user.nickName || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [dob, setDob] = useState(user.dob || "");
  const [gender, setGender] = useState(user.gender || "");
  const [profileImage, setProfileImage] = useState(user.profileImage || null);

//   useEffect(() => {
//     if (user) {
//       setFirstName(user.firstName);
//       setLastName(user.lastName);
//       setNickName(user.nickName);
//       setPhoneNumber(user.phoneNumber);
//       setDob(user.dob);
//       setGender(user.gender);
//       setProfileImage(user.profileImage);
//     }
//   }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    let userUuid = user.userUuid;
    let updatedUser = {
      userUuid,
      firstName,
      lastName,
      phoneNumber,
      dob,
      gender,
    };

    try {
      await axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/users/update-user`, updatedUser);
      dispatch(setUser(updatedUser));
      navigate(-1);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="edit-profile">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <h2>Edit Profile</h2>

      {/* Profile Image */}
      <label className="profile-image">
        {profileImage ? (
          <img src={profileImage} alt="Profile" />
        ) : (
          <span>Tap to Change</span>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      {/* Input Fields */}
      <div className="form-group">
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Nick Name</label>
        <input type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <button className="save-button" onClick={handleSubmit}>Save</button>

      {/* Internal CSS */}
      <style>
        {`
          .edit-profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background: black;
            color: white;
            min-height: 100vh;
          }

          .back-button {
            align-self: flex-start;
            color: green;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 18px;
          }

          h2 {
            margin: 10px 0;
          }

          .profile-image {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: gray;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            overflow: hidden;
            margin-bottom: 15px;
          }

          .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .profile-image input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }

          .form-group {
            width: 100%;
            max-width: 300px;
            margin-bottom: 10px;
          }

          .form-group label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
          }

          .form-group input,
          .form-group select {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            border: 1px solid white;
            border-radius: 4px;
            background: black;
            color: white;
          }

          .save-button {
            background: green;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }

          .save-button:hover {
            background: darkgreen;
          }
        `}
      </style>
    </div>
  );
};

export default EditProfile;
