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

  const download = async (id) => {
    try {
      const res = await API.get(`/certificate/download/${id}`, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf");
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

      <button onClick={() => navigate("/student-home")}>Back</button>
      <button onClick={logout}>Logout</button>

      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            {req.name} - {req.status}

            {req.status === "APPROVED" && (
              <button onClick={() => download(req.id)}>
                Download
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;