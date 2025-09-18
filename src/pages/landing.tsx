import { Link } from "react-router";

export default function Landing() {
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
      <div className="mysection">
        <div className="row1">
          <h1>Stay organized in your job search</h1>
          <p>
            Our Job Tracker App gives you the tools to organize your search with
            ease. Track all your applications in one place, set reminders for
            follow-ups, and keep your contacts and interviews neatly arranged.
            With everything under control, you can focus less on the stress and
            more on landing the role that’s right for you.
          </p>
          <button>
            <Link to="/login">Get Started</Link>
          </button>
        </div>
        <div className="row2">
          <img src=""></img>
        </div>
      </div>
    </div>
  );
}
