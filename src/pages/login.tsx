// import { Link } from "react-router";

// export default function Login() {
//   return (
//     <div>
//        <nav>
//         <h2>JobTrack</h2>
//         </nav>
//       <div className="register">
//         <h1>Login</h1>
//         <form>
//           <input type="email" id="username" placeholder="Username" required /> <br />
//           <input type="text" id="username" placeholder="Password" required/> <br/>
//           <button type="submit" id="login">
//            Login
//           </button>
//         </form>
//         <p>
//         don't have an account? <Link to="/register">register</Link> 
//         </p>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // If we were navigated here with a message (e.g. after signup), show it
//   useEffect(() => {
//     // location.state may be undefined
//     const state: any = location.state;
//     if (state && state.message) {
//       setMessage(state.message);
//       // Optionally clear this state so message isn't shown again on back/refresh
//       // (You could also implement a flash message store)
//     }
//   }, [location.state]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);

//     if (!username.trim() || !password.trim()) {
//       setMessage("Please enter both username and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `http://localhost:3000/users?username=${encodeURIComponent(
//           username
//         )}&password=${encodeURIComponent(password)}`
//       );
//       if (!res.ok) throw new Error("Network error");
      

//       const users = await res.json();
//       if (users.length === 0) {
//         setMessage("Invalid username or password.");
//         setLoading(false);
//         return;
//       }

//       const user = users[0];
     
//       localStorage.setItem("user", JSON.stringify(user));
    
//       navigate("/home", {
//         state: {
//           message: `Welcome back, ${user.username}! You are now logged in.`,
//         },
        
//       });
        
//     } catch (err) {
//       setMessage(
//         "Login error: " + (err instanceof Error ? err.message : "unknown")
//       );
//     } finally {
//       setLoading(false);
//     }
//      console.log("hello");
//   };

//   return (
//     <div>
//       <nav>
//         <h2>JobTrack</h2>
//       </nav>

//       <div className="register">
//         <h1>Login</h1>

//         {message && <div className="info-message">{message}</div>}

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             id="login-username"
//             placeholder="Email"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <br />

//           <input
//             type="password"
//             id="login-password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <br />

//           <button type="submit" id="login" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p>
//           Don't have an account? <Link to="/register">register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

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
        // save user object as returned by json-server (has id)
        localStorage.setItem("user", JSON.stringify(data[0]));
        setMessage("✅ Login successful. Redirecting...");
        setTimeout(() => navigate("/home"), 700);
      } else {
        setMessage("❌ Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ Login failed (check JSON Server)");
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
