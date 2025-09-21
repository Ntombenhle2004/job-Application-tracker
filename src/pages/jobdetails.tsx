// import { Link } from "react-router";

// export default function Jobdetails() {
//   return (
//     <div>
//       <nav>
//         <h2>JobTrack</h2>
//         <a>
//           <Link to="/home">Home</Link>
       
//           <Link to="/">Log out</Link>
//         </a>
//       </nav>
//       <div className="mysection">
//         <h2>Job details      </h2>
//         <h3>Company name</h3>
//         <p></p>
//         <h3>Role</h3>
//         <p></p>
//         <h3>Status</h3>
//         <p></p>
//         <h3>Date applied</h3>
//         <p></p>
//         <h3>description</h3>
//         <p></p>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";

// type Job = {
//   id: number;
//   company: string;
//   role: string;
//   status: string;
//   date: string;
//   details: string;
// };

// export default function Jobdetails() {
//   const [job, setJob] = useState<Job | null>(null);
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:5000/jobs/${id}`)
//         .then((res) => res.json())
//         .then((data) => setJob(data));
//     }
//   }, [id]);

//   if (!job) return <p>Loading...</p>;

//   return (
//     <div>
//       <nav>
//         <h2>JobTrack</h2>
//         <a>
//           <Link to="/home">Home</Link>
//           <Link to="/">Log out</Link>
//         </a>
//       </nav>
//       <div className="mysection">
//         <h2>Job Details</h2>
//         <h3>Company name</h3>
//         <p>{job.company}</p>
//         <h3>Role</h3>
//         <p>{job.role}</p>
//         <h3>Status</h3>
//         <p>{job.status}</p>
//         <h3>Date applied</h3>
//         <p>{job.date}</p>
//         <h3>Description</h3>
//         <p>{job.details}</p>
//       </div>
//     </div>
//   );
// }



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

      <div className="mysection">
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
