import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentHome() {
  const [requests, setRequests] = useState([]);
  const [certificateType, setCertificateType] = useState("");

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

 
  useEffect(() => {
    if (!username) return;

    const fetchRequests = async () => {
      try {
        const res = await API.get(`/request/student/${username}`);
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching requests");
      }
    };

    fetchRequests();
  }, [username]);

 
  const createRequest = async () => {
    if (!certificateType) {
      alert("Enter certificate type");
      return;
    }

    try {
      await API.post("/request/add", {
        username,
        certificateType
      });

      setCertificateType("");

      
      const res = await API.get(`/request/student/${username}`);
      setRequests(res.data);

    } catch {
      alert("Error creating request");
    }
  };

 
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Home</h2>

     
      <div style={{ marginBottom: "15px" }}>
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

    
      <h3>Create Request</h3>

      <input
        type="text"
        placeholder="Certificate Type"
        value={certificateType}
        onChange={(e) => setCertificateType(e.target.value)}
      />

      <button onClick={createRequest} style={{ marginLeft: "10px" }}>
        Submit
      </button>

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

export default StudentHome;