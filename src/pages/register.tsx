import { Link } from "react-router";

export default function Register() {
  return (
    <div>
      <nav>
        <h2>JobTrack</h2>
      </nav>
      <div className="register">
        <h1>Sign up</h1>
        <form>
          <input type="email" id="userName" placeholder="Username" required />{" "}
          <br />
          <input
            type="text"
            id="userName"
            placeholder="Password"
            required
          />
          <br />
          <button type="submit" id="signup">
            Sign up
          </button>
        </form>
        <p>
          Already has an account? <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
}
