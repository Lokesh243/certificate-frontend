import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Admin Home</h2>

      <button onClick={() => navigate("/admin-dashboard")}>
        Go to Dashboard
      </button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminHome;