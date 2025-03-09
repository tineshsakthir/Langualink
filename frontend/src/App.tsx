
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './components/Landing';
import { Room } from './components/Room';
import  Home  from "./page/Home";
import Login from "./page/Login";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
