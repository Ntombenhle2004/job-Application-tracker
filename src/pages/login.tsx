import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(
        `http://localhost:3000/users?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`
      );
      const data = await res.json();
      if (data.length === 1) {
        localStorage.setItem("user", JSON.stringify(data[0]));
        setMessage("Login successful. Redirecting...");
        setTimeout(() => navigate("/home"), 700);
      } else {
        setMessage("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login failed (check JSON Server)");
    }
  };

  return (
    <div>
      <nav>
        <h2>JobTrack</h2>
      </nav>
      <div className="register">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" id="login">
            Login
          </button>
        </form>

        {message && <p>{message}</p>}
        <p>
          don't have an account? <Link to="/register">register</Link>
        </p>
      </div>
    </div>
  );
}
