import React, { useState } from "react";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://localhost:7135/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, userName: username, email, password }),
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || "Registration failed.");
        return;
      }

      const user = await response.json();

      localStorage.setItem("token", user.token);
      localStorage.setItem("username", user.userName);

      window.location.href = "/";
    } catch {
      setError("Could not connect to the server.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "20px",
        margin: "40px auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Register</h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #aaa",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #aaa",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #aaa",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #aaa",
          }}
        />
      </div>

      {error && (
        <div
          style={{
            color: "white",
            background: "red",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        style={{
          padding: "10px",
          background: "black",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "120px",
        }}
      >
        Register
      </button>
    </form>
  );
}
