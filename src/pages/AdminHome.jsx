import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminHome() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const res = await API.get("/request/all");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching requests");
    }
  };

 
  const approve = async (id) => {
    try {
      await API.put(`/request/approve/${id}`);
      fetchAllRequests();
    } catch {
      alert("Error approving");
    }
  };

 
  const reject = async (id) => {
    try {
      await API.put(`/request/reject/${id}`);
      fetchAllRequests();
    } catch {
      alert("Error rejecting");
    }
  };

 
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Home</h2>


      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => navigate(-1)}>⬅ Back</button>

        <button
          onClick={() => navigate("/admin-dashboard")}
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

     
      <h3>All Requests</h3>

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
            <p><b>User:</b> {r.username}</p>
            <p><b>Type:</b> {r.certificateType}</p>
            <p><b>Status:</b> {r.status}</p>

            {r.status === "PENDING" && (
              <>
                <button onClick={() => approve(r.id)}>Approve</button>

                <button
                  onClick={() => reject(r.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminHome;