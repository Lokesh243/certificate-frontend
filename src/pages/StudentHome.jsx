import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentHome() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchRequests();
  }, []); // eslint-disable-line

  const fetchRequests = async () => {
    try {
      const res = await API.get(`/api/request/student/${username}`);
      setRequests(res.data);
    } catch (err) {
      alert("Error loading requests");
    }
  };

  // ✅ Download certificate
  const downloadCertificate = async (id) => {
    try {
      const res = await API.get(`/certificate/download/${id}`, {
        responseType: "blob",
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

  // ✅ Logout
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Home</h2>

      {/* ✅ Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate(-1)}>⬅ Back</button>

        <button
          onClick={() => navigate("/student-dashboard")}
          style={{ marginLeft: "10px" }}
        >
          Dashboard
        </button>

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
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px",
            }}
          >
            <p><b>Type:</b> {req.certificateType}</p>
            <p><b>Status:</b> {req.status}</p>

            {/* ✅ Download if approved */}
            {req.status === "APPROVED" && (
              <button onClick={() => downloadCertificate(req.id)}>
                Download Certificate
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StudentHome;