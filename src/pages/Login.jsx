import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
   
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await API.post("/login", {
        username: username,
        password: password,
      });

     
      const data = res.data;

      
      localStorage.setItem("user", JSON.stringify(data));

      
      if (data.role === "ADMIN") {
        navigate("/admin-home");
      } else {
        navigate("/student-home");
      }

    } catch (err) {
      

      if (err.response) {
        
       alert(
  typeof err.response.data === "string"
    ? err.response.data
    : "Invalid credentials"
);
      } else {
        
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