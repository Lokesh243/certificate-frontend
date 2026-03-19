
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Home</h2>

      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Logout
      </button>

      <hr />

      <h3>Actions</h3>

      <button onClick={() => navigate("/admin-dashboard")}>
        View Requests
      </button>
    </div>
  );
}

export default AdminHome;