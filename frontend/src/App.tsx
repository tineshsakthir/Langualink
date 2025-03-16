
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './components/Landing';
import { Room } from './components/Room';
import  Home  from "./page/Home";
import Login from "./page/Login";
import Settings from "./page/Settings";
import ContactUs from "./page/ContactUs";
import EditProfile from "./page/EditProfile";
import FeedbackPage from "./page/FeedbackPage";
import AvailableRooms from "./page/AvailableRooms";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/available-rooms" element={<AvailableRooms />} />







      </Routes>
    </BrowserRouter>
  )
}

export default App
