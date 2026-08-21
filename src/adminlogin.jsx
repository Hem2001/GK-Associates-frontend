import { useState } from "react";

function AdminLogin({ goHome, login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      login();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "400px",
        }}
      >
        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "15px",
            background: "#071a3d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={goHome}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;