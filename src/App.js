
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function Admin() {
  return <h2>Admin Dashboard</h2>;
}

function Student() {
  return <h2>Student Dashboard</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;