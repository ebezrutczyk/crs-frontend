import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("https://localhost:7135/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, Password: password }),
    });

    if (response.status === 401) {
      setError("Incorrect email or password.");
      return;
    }

    if (!response.ok) {
      let message = "Login failed.";

      try {
        const data = await response.json();
        message = data.message || data.title || message;
      } catch {
        message = await response.text();
      }

      setError(message);
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
      <h2 style={{ textAlign: "center" }}>Login</h2>

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
        Login
      </button>
    </form>
  );
}

