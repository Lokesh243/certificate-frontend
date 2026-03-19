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

  // ✅ APPROVE
  const approve = async (id) => {
    try {
      await API.put(`/request/approve/${id}`);
      fetchRequests(); // refresh
    } catch (err) {
      alert("Approve failed");
    }
  };

  // ✅ REJECT
  const reject = async (id) => {
    try {
      await API.put(`/request/reject/${id}`);
      fetchRequests();
    } catch (err) {
      alert("Reject failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.certificateType}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
              <td>
                <button onClick={() => approve(req.id)}>Approve</button>
                <button onClick={() => reject(req.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;