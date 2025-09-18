import { Link } from "react-router";

export default function Login() {
  return (
    <div>
       <nav>
        <h2>JobTrack</h2>
        </nav>
      <div className="register">
        <h1>Login</h1>
        <form>
          <input type="email" id="username" placeholder="Username" required /> <br />
          <input type="text" id="username" placeholder="Password" required/> <br/>
          <button type="submit" id="login">
           Login
          </button>
        </form>
        <p>
        don't have an account? <Link to="/register">register</Link> 
        </p>
      </div>
    </div>
  );
}
