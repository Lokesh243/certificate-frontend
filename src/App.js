import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AdminHome from "./pages/AdminHome";
import StudentHome from "./pages/StudentHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Login />} />

       
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;