import React from "react";
import { useNavigate } from "react-router-dom";

function StudentHome() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Student Home</h2>

      <button onClick={() => navigate("/student-dashboard")}>
        Go to Dashboard
      </button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default StudentHome;