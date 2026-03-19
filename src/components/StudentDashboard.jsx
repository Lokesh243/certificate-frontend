import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
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

  // ✅ DOWNLOAD
  const downloadCertificate = async (id) => {
    try {
      const response = await API.get(`/request/download/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Download failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Download</th>
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
                {req.status === "APPROVED" ? (
                  <button onClick={() => downloadCertificate(req.id)}>
                    Download
                  </button>
                ) : (
                  "Not Available"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashboard;