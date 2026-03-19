import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/request/all")
      .then(res => setRequests(res.data))
      .catch(() => alert("Error"));
  }, []);

  const approve = (id) => {
    API.put(`/request/approve/${id}`).then(() => window.location.reload());
  };

  const reject = (id) => {
    API.put(`/request/reject/${id}`).then(() => window.location.reload());
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {requests.map(r => (
        <div key={r.id}>
          {r.certificateType} - {r.status}
          <button onClick={() => approve(r.id)}>Approve</button>
          <button onClick={() => reject(r.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;