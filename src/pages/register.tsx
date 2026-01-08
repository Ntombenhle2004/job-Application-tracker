import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const check = await fetch(
        ` https://json-server-e3b5.onrender.com/users?username=${encodeURIComponent(
          userName
        )}`
      );
      const existing = await check.json();
      if (existing.length > 0) {
        setMessage("Username already exists");
        return;
      }

      const res = await fetch(" https://json-server-e3b5.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password }),
      });

      if (!res.ok) throw new Error("Failed to register");
      setMessage("Registered. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1100);
    } catch (err) {
      console.error("Register error:", err);
      setMessage("Failed to register (check JSON Server).");
    }
  };

  return (
    <div>
      <nav>
        <h2>JobTrack</h2>
      </nav>
      <div className="register">
        <h1>Sign up</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            id="userName"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" id="signup">
            Sign up
          </button>
        </form>

        {message && <p>{message}</p>}
        <p>
          Already has an account? <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
}

