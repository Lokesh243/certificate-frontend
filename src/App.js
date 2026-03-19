import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AdminHome from "./components/AdminHome";
import StudentHome from "./components/StudentHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Student */}
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;