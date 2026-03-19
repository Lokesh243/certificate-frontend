import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/request/all");
      setRequests(res.data);
    } catch (err) {
      alert("Error fetching requests");
    }
  };

  const approve = async (id) => {
    try {
      await API.put(`/request/approve/${id}`);
      fetchRequests();
    } catch (err) {
      alert("Error approving request");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate("/admin-home")}>Back</button>
      <button onClick={logout}>Logout</button>

      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            {req.name} - {req.status}

            {req.status !== "APPROVED" && (
              <button onClick={() => approve(req.id)}>
                Approve
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;