import { Link } from "react-router";

export default function Jobdetails() {
  return (
    <div>
      <nav>
        <h2>JobTrack</h2>
        <a>
          <Link to="/home">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </a>
      </nav>
    </div>
  );
}
