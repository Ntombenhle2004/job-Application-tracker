// import { Link } from "react-router";
// import { FaSearch } from "react-icons/fa";

// export default function Home() {
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
//         <div className="SearchBar">
//           <FaSearch id="search-icon" size={16} />
//           <input type="text" id="search" placeholder="Search" />

//           <select id="filterby" name="filterby">
//             <option value="" disabled selected>
//               Filter by status
//             </option>
//             <option value="all">All status</option>
//             <option value="applied">Applied</option>
//             <option value="intervied">Intervied</option>
//             <option value="rejected">Rejected</option>
//           </select>

//           <select id="sortby" name="sortby">
//             <option value="" disabled selected>
//               Sort by date
//             </option>
//             <option value="new">Ascending</option>
//             <option value="old">Descending</option>
//           </select>
//         </div>
//         <a href="#myModal" className="btn">
//           Add Job
//         </a>
//         <div id="myModal" className="modal">
//           <div className="modal-content">
//             <a href="#" className="close">
//               &times;
//             </a>

//             <h2>Add Job</h2>

//             <form>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Company name"
//                 required
//               />
//               <br />

//               <input type="text" id="role" placeholder="Role" required />
//               <br />

//               <select id="status" name="status">
//                 <option value="" disabled selected>
//                   Status
//                 </option>
//                 <option value="applied">Applied</option>
//                 <option value=" interviewed">Interviewed</option>
//                 <option value="rejected">Rejected</option>
//               </select>

//               <br />

//               <input
//                 type="date"
//                 id="date"
//                 placeholder="Date applied"
//                 required
//               />
//               <br />

//               <textarea
//                 id="extraD"
//                 placeholder="Extra details about the company and the job such as job duties, requirements.."
//                 required
//               />
//               <br />

//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         </div>

//         <h3>Jobs Applied for:</h3>

//         <table>
//           <thead>
//             <tr>
//               <th>Company name</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Date applied</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>bjj</td>
//               <td>ghj</td>
//               <td>gfh</td>
//               <td>fghfh</td>
//               <td>gh</td>
//               <td>
//                 <button type="submit" id="details">Details</button>
//                 <button type="submit" id="update">
//                   Update
//                 </button>

//                 <button type="submit" id="delete">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

type Job = {
  id: number;
  company: string;
  role: string;
  status: string;
  date: string;
  details: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState({
    company: "",
    role: "",
    status: "",
    date: "",
    details: "",
  });
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [message, setMessage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fetch jobs with query params
  const fetchJobs = async () => {
    let url = "http://localhost:3000/jobs";

    const search = searchParams.get("search");
    const filter = searchParams.get("status");
    const sort = searchParams.get("sort");

    // Filtering/search handled client-side
    const res = await fetch(url);
    let data: Job[] = await res.json();

    if (search) {
      data = data.filter(
        (j) =>
          j.company.toLowerCase().includes(search.toLowerCase()) ||
          j.role.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter && filter !== "all") {
      data = data.filter((j) => j.status === filter);
    }

    if (sort === "asc") {
      data = data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sort === "desc") {
      data = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  // Add job
  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      if (res.ok) {
        setMessage("✅ Job added successfully!");
        setNewJob({ company: "", role: "", status: "", date: "", details: "" });
        fetchJobs();
      } else {
        setMessage("❌ Failed to add job.");
      }
    } catch {
      setMessage("❌ Error connecting to server.");
    }
  };

  // Delete job
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await fetch(`http://localhost:3000/jobs/${id}`, { method: "DELETE" });
      setMessage("🗑️ Job deleted successfully.");
      fetchJobs();
    }
  };

  // Prepare job for update
  const startEdit = (job: Job) => {
    setEditJob(job);
  };

  // Save job update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJob) return;

    await fetch(`http://localhost:3000/jobs/${editJob.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editJob),
    });

    setMessage("✏️ Job updated successfully.");
    setEditJob(null);
    fetchJobs();
  };

  // Search input handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      return params;
    });
  };

  // Filter handler
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set("status", value);
      } else {
        params.delete("status");
      }
      return params;
    });
  };

  // Sort handler
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      return params;
    });
  };

  return (
    <div>
      <nav>
        <h2>JobTrack</h2>
        <a>
          <Link to="/home">Home</Link>
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("user");
              
            }}
          >
            Log out
          </Link>
        </a>
      </nav>

      <div className="mysection">
        {message && <p style={{ color: "green" }}>{message}</p>}

        {/* Search + Filter + Sort */}
        <div className="SearchBar">
          <input
            type="text"
            placeholder="Search by company or role"
            defaultValue={searchParams.get("search") || ""}
            onChange={handleSearch}
          />

          <select
            value={searchParams.get("status") || ""}
            onChange={handleFilter}
          >
            <option value="">Filter by status</option>
            <option value="all">All</option>
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>

          <select value={searchParams.get("sort") || ""} onChange={handleSort}>
            <option value="">Sort by date</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Add Job Form */}
        <h2>Add Job</h2>
        <form onSubmit={handleAddJob}>
          <input
            type="text"
            placeholder="Company name"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Role"
            value={newJob.role}
            onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
            required
          />
          <br />
          <select
            value={newJob.status}
            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
            required
          >
            <option value="">Select Status</option>
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>
          <br />
          <input
            type="date"
            value={newJob.date}
            onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
            required
          />
          <br />
          <textarea
            placeholder="Extra details..."
            value={newJob.details}
            onChange={(e) => setNewJob({ ...newJob, details: e.target.value })}
          />
          <br />
          <button type="submit">Add Job</button>
        </form>

        {/* Update Job Form */}
        {/* {editJob && (
          <div>
            <h2>Edit Job</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editJob.company}
                onChange={(e) =>
                  setEditJob({ ...editJob, company: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                value={editJob.role}
                onChange={(e) =>
                  setEditJob({ ...editJob, role: e.target.value })
                }
              />
              <br />
              <select
                value={editJob.status}
                onChange={(e) =>
                  setEditJob({ ...editJob, status: e.target.value })
                }
              >
                <option value="applied">Applied</option>
                <option value="interviewed">Interviewed</option>
                <option value="rejected">Rejected</option>
              </select>
              <br />
              <input
                type="date"
                value={editJob.date}
                onChange={(e) =>
                  setEditJob({ ...editJob, date: e.target.value })
                }
              />
              <br />
              <textarea
                value={editJob.details}
                onChange={(e) =>
                  setEditJob({ ...editJob, details: e.target.value })
                }
              />
              <br />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditJob(null)}>
                Cancel
              </button>
            </form>
          </div>
        )} */}

        {/* Jobs Table */}
        <h3>Jobs Applied for:</h3>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td
                  style={{
                    color:
                      job.status === "applied"
                        ? "orange"
                        : job.status === "interviewed"
                        ? "green"
                        : "red",
                  }}
                >
                  {job.status}
                </td>
                <td>{job.date}</td>
                <td>{job.details}</td>
                <td>
                  <button>
                    <Link to={`/details?id=${job.id}`}>Details</Link>
                  </button>
                  <button onClick={() => startEdit(job)}>Update</button>
                  <button onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
