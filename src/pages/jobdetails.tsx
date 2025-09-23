import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Job = {
  id: number;
  company: string;
  role: string;
  status: string;
  date: string;
  description: string;
  userId: number;
};

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error("Error fetching job details:", err));
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div>
      <nav>
        <h2>JobTrack</h2>
        <a>
          <Link to="/home">Home</Link>
          <Link to="/">Log out</Link>
        </a>
      </nav>

      <div className="section">
        <h2>Job Details</h2>
        <h3>Company</h3>
        <p> {job.company}</p>

        <h3>Role</h3>
        <p>{job.role}</p>

        <h3> Status</h3>
        <p>{job.status}</p>

        <h3> Date </h3>
        <p>{job.date}</p>

        <h3> Description </h3>
        <p>{job.description}</p>
      </div>
    </div>
  );
}
