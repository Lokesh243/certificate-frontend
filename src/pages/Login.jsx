import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 🔒 Basic validation
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await API.post("/login", {
        username: username,
        password: password,
      });

      // ✅ SUCCESS (status 200)
      const data = res.data;

      // Save user
      localStorage.setItem("user", JSON.stringify(data));

      // Role-based navigation
      if (data.role === "ADMIN") {
        navigate("/admin-home");
      } else {
        navigate("/student-home");
      }

    } catch (err) {
      // 🔥 IMPORTANT FIX (JSON bug handled here)

      if (err.response) {
        // Backend responded (like 401)
        alert(err.response.data || "Invalid credentials");
      } else {
        // Server down / network issue
        alert("Server not reachable");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;