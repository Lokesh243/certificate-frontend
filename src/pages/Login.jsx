import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password
      });

      // 🔥 IMPORTANT FIX
      if (!res.data) {
        alert("Invalid credentials");
        return;
      }

      // store user
      localStorage.setItem("user", JSON.stringify(res.data));

      // navigate based on role
      if (res.data.role === "ADMIN") {
        navigate("/admin-home");
      } else {
        navigate("/student-home");
      }

    } catch (error) {
      alert("Error connecting to server");
    }
  };

  return (
    <div>
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