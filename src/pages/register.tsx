// import { Link } from "react-router";

// export default function Register() {
//   return (
//     <div>
//       <nav>
//         <h2>JobTrack</h2>
//       </nav>
//       <div className="register">
//         <h1>Sign up</h1>
//         <form>
//           <input type="email" id="userName" placeholder="Username" required />{" "}
//           <br />
//           <input
//             type="text"
//             id="userName"
//             placeholder="Password"
//             required
//           />
//           <br />
//           <button type="submit" id="signup">
//             Sign up
//           </button>
//         </form>
//         <p>
//           Already has an account? <Link to="/login">login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }





// 


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user exists
    const res = await fetch(
      ` http://localhost:3000/users?username=${username}`
    );
    


    
    const existing = await res.json();
    if (existing.length > 0) {
      setMessage("❌ Username already taken.");
      return;
    }

    // Create new user
    const user = { username, password };
    const addUser = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (addUser.ok) {
      setMessage("✅ Registered successfully!");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      setMessage("❌ Registration failed.");
    }
  };

  return (
    <div>
      <nav>
        <h2>JobTrack</h2>
      </nav>
      <div className="register">
        <h1>Sign up</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Sign up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
