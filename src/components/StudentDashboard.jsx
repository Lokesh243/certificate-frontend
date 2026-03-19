import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentDashboard() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  
  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const res = await API.get(`/request/student/${username}`);
        setRequests(res.data);
      } catch {
        alert("Error fetching requests");
      }
    };

    fetchData();
  }, [username]);

  
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>

      
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => navigate(-1)}>⬅ Back</button>

        <button
          onClick={logout}
          style={{ marginLeft: "10px" }}
        >
          Logout
        </button>
      </div>

      <hr />

    
      <h3>Your Requests</h3>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        requests.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px"
            }}
          >
            <p><b>Type:</b> {r.certificateType}</p>
            <p><b>Status:</b> {r.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default StudentDashboard;