import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function StudentHome() {
  const [certificateType, setCertificateType] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const submitRequest = async () => {
    try {
      await API.post("/request/create", {
        certificateType,
        reason,
      });

      alert("Request submitted");
      navigate("/student-dashboard");
    } catch (err) {
      alert("Error submitting request");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Student Home</h2>

      <button onClick={logout}>Logout</button>

      <br /><br />

      <input
        type="text"
        placeholder="Certificate Type"
        value={certificateType}
        onChange={(e) => setCertificateType(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <br /><br />

      <button onClick={submitRequest}>Submit Request</button>
    </div>
  );
}

export default StudentHome;