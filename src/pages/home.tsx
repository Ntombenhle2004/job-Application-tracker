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

// import { useEffect, useState } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";

// type Job = {
//   id?: number;
//   company: string;
//   role: string;
//   status: string;
//   date: string;
//   description: string;
//   userId: number;
// };

// export default function Home() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [message, setMessage] = useState("");
//   const [editingJob, setEditingJob] = useState<Job | null>(null);

//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const rawUser = localStorage.getItem("user");
//   const user = rawUser ? JSON.parse(rawUser) : null;

//   // Build query and fetch only jobs for this user
//   const fetchJobs = async () => {
//     if (!user?.id) {
//       setJobs([]);
//       return;
//     }

//     try {
//       const params = new URLSearchParams();
//       params.set("userId", String(user.id));

//       const search = searchParams.get("search");
//       if (search) params.set("q", search);

//       const filter = searchParams.get("status");
//       if (filter && filter !== "all") params.set("status", filter);

//       const sort = searchParams.get("sort");
//       if (sort) {
//         params.set("_sort", "date");
//         params.set("_order", sort);
//       }

//       const url = `http://localhost:3000/jobs?${params.toString()}`;
//       const res = await fetch(url);
//       const data = await res.json();
//       setJobs(data);
//     } catch (err) {
//       console.error("Fetch jobs error:", err);
//       setMessage("❌ Failed to load jobs (check JSON Server)");
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams, rawUser]);

//   // helpers to update URL query params while preserving others
//   const setParam = (key: string, value?: string) => {
//     const p = new URLSearchParams(searchParams);
//     if (value && value !== "") p.set(key, value);
//     else p.delete(key);
//     setSearchParams(p);
//   };

//   // ADD
//   const handleAddJob = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user?.id) {
//       setMessage("You must be logged in");
//       return;
//     }
//     const form = e.target as HTMLFormElement;
//     const newJob: Job = {
//       company: (form.elements.namedItem("name") as HTMLInputElement).value,
//       role: (form.elements.namedItem("role") as HTMLInputElement).value,
//       status: (form.elements.namedItem("status") as HTMLSelectElement).value,
//       date: (form.elements.namedItem("date") as HTMLInputElement).value,
//       description: (form.elements.namedItem("extraD") as HTMLTextAreaElement)
//         .value,
//       userId: user.id,
//     };

//     try {
//       const res = await fetch("http://localhost:3000/jobs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newJob),
//       });
//       if (!res.ok) throw new Error("POST failed");
//       setMessage("Job added!");
//       (form as HTMLFormElement).reset();
//       fetchJobs();
//     } catch (err) {
//       console.error("Add job error:", err);
//       setMessage("Failed to add job");
//     }
//   };

//   // DELETE
//   const handleDelete = async (id?: number) => {
//     if (!id) return;
//     if (!window.confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`http://localhost:3000/jobs/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("DELETE failed");
//       setMessage("Job deleted");
//       fetchJobs();
//     } catch (err) {
//       console.error("Delete job error:", err);
//       setMessage("Failed to delete job");
//     }
//   };

//   // START EDIT
//   const startEdit = (job: Job) => {
//     setEditingJob(job);
//     // scroll or focus logic removed — keep CSS intact
//   };

//   // SAVE EDIT
//   const handleSaveEdit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingJob?.id) return;

//     try {
//       const res = await fetch(`http://localhost:3000/jobs/${editingJob.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editingJob),
//       });
//       if (!res.ok) throw new Error("PUT failed");
//       setMessage("✅ Job updated");
//       setEditingJob(null);
//       fetchJobs();
//     } catch (err) {
//       console.error("Edit job error:", err);
//       setMessage("❌ Failed to update job");
//     }
//   };

//   return (
//     <div>
//       <nav>
//         <h2>JobTrack</h2>
//         <a>
//           <Link to="/home">Home</Link>
//           <Link to="/">Log Out</Link>
//         </a>
//       </nav>

//       <div className="mysection">
//         {message && <p>{message}</p>}

//         <div className="SearchBar">
//           <input
//             type="text"
//             id="search"
//             placeholder="Search"
//             defaultValue={searchParams.get("search") ?? ""}
//             onChange={(e) => setParam("search", e.target.value)}
//           />

//           <select
//             id="filterby"
//             name="filterby"
//             defaultValue={searchParams.get("status") ?? "all"}
//             onChange={(e) => setParam("status", e.target.value)}
//           >
//             <option value="all">All status</option>
//             <option value="applied">Applied</option>
//             <option value="interviewed">Interviewed</option>
//             <option value="rejected">Rejected</option>
//           </select>

//           <select
//             id="sortby"
//             name="sortby"
//             defaultValue={searchParams.get("sort") ?? ""}
//             onChange={(e) => setParam("sort", e.target.value)}
//           >
//             <option value="">Sort by date</option>
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </div>

//         {/* Add Job modal trigger (keeps your markup) */}
//         <a href="#myModal" className="btn">
//           Add Job
//         </a>

//         <div id="myModal" className="modal">
//           <div className="modal-content">
//             <a href="#" className="close">
//               &times;
//             </a>

//             <h2>Add Job</h2>

//             <form onSubmit={handleAddJob}>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Company name"
//                 required
//               />
//               <br />
//               <input
//                 type="text"
//                 id="role"
//                 name="role"
//                 placeholder="Role"
//                 required
//               />
//               <br />
//               <select id="status" name="status" defaultValue="applied">
//                 <option value="applied">Applied</option>
//                 <option value="interviewed">Interviewed</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//               <br />
//               <input type="date" id="date" name="date" required />
//               <br />
//               <textarea
//                 id="extraD"
//                 name="extraD"
//                 placeholder="Extra details about the company and the job such as job duties, requirements.."
//                 required
//               />
//               <br />
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         </div>

//         {/* Edit Form (rendered inline; keeps your CSS untouched) */}
//         {editingJob && (
//           <div className="edit-section">
//             <h3>Edit Job</h3>
//             <form onSubmit={handleSaveEdit}>
//               <input
//                 type="text"
//                 value={editingJob.company}
//                 onChange={(e) =>
//                   setEditingJob({ ...editingJob, company: e.target.value })
//                 }
//                 required
//               />
//               <br />
//               <input
//                 type="text"
//                 value={editingJob.role}
//                 onChange={(e) =>
//                   setEditingJob({ ...editingJob, role: e.target.value })
//                 }
//                 required
//               />
//               <br />
//               <select
//                 value={editingJob.status}
//                 onChange={(e) =>
//                   setEditingJob({ ...editingJob, status: e.target.value })
//                 }
//               >
//                 <option value="applied">Applied</option>
//                 <option value="interviewed">Interviewed</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//               <br />
//               <input
//                 type="date"
//                 value={editingJob.date}
//                 onChange={(e) =>
//                   setEditingJob({ ...editingJob, date: e.target.value })
//                 }
//               />
//               <br />
//               <textarea
//                 value={editingJob.description}
//                 onChange={(e) =>
//                   setEditingJob({ ...editingJob, description: e.target.value })
//                 }
//               />
//               <br />
//               <button type="submit">Save</button>
//               <button type="button" onClick={() => setEditingJob(null)}>
//                 Cancel
//               </button>
//             </form>
//           </div>
//         )}

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
//             {jobs.map((job) => (
//               <tr key={job.id}>
//                 <td>{job.company}</td>
//                 <td>{job.role}</td>
//                 <td
//                   style={{
//                     color:
//                       job.status === "applied"
//                         ? "orange"
//                         : job.status === "interviewed"
//                         ? "green"
//                         : "red",
//                   }}
//                 >
//                   {job.status}
//                 </td>
//                 <td>{job.date}</td>
//                 <td>{job.description}</td>
//                 <td>
//                   <Link to={`/details/${job.id}`}>
//                     <button id="details">Details</button>
//                   </Link>
//                   <button id="update" onClick={() => startEdit(job)}>
//                     Update
//                   </button>
//                   <button id="delete" onClick={() => handleDelete(job.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {jobs.length === 0 && (
//               <tr>
//                 <td colSpan={6}>No jobs found — add some!</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

type Job = {
  id?: number;
  company: string;
  role: string;
  status: string;
  date: string;
  description: string;
  userId: number;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [message, setMessage] = useState("");
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  // Build query and fetch only jobs for this user
  const fetchJobs = async () => {
    if (!user?.id) {
      setJobs([]);
      return;
    }

    try {
      // Only fetch jobs for this user - do filtering/sorting client-side
      const params = new URLSearchParams();
      params.set("userId", String(user.id));

      const url = `http://localhost:3000/jobs?${params.toString()}`;
      const res = await fetch(url);
      let data = await res.json();

      // Client-side filtering and sorting
      const search = searchParams.get("search");
      const filter = searchParams.get("status");
      const sort = searchParams.get("sort");

      // Apply search filter (search in company and role)
      if (search && search.trim() !== "") {
        const searchLower = search.toLowerCase();
        data = data.filter(
          (job: Job) =>
            job.company.toLowerCase().includes(searchLower) ||
            job.role.toLowerCase().includes(searchLower)
        );
      }

      // Apply status filter
      if (filter && filter !== "all") {
        data = data.filter((job: Job) => job.status === filter);
      }

      // Apply sorting
      if (sort) {
        data.sort((a: Job, b: Job) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sort === "asc" ? dateA - dateB : dateB - dateA;
        });
      }

      setJobs(data);
    } catch (err) {
      console.error("Fetch jobs error:", err);
      setMessage("❌ Failed to load jobs (check JSON Server)");
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, rawUser]);

  // helpers to update URL query params while preserving others
  const setParam = (key: string, value?: string) => {
    const p = new URLSearchParams(searchParams);
    if (value && value !== "") p.set(key, value);
    else p.delete(key);
    setSearchParams(p);
  };

  // ADD
  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setMessage("You must be logged in");
      return;
    }
    const form = e.target as HTMLFormElement;
    const newJob: Job = {
      company: (form.elements.namedItem("name") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      status: (form.elements.namedItem("status") as HTMLSelectElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      description: (form.elements.namedItem("extraD") as HTMLTextAreaElement)
        .value,
      userId: user.id,
    };

    try {
      const res = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error("POST failed");
      setMessage("Job added!");
      (form as HTMLFormElement).reset();
      // Close modal by navigating to remove hash
      window.location.hash = "";
      fetchJobs();
    } catch (err) {
      console.error("Add job error:", err);
      setMessage("Failed to add job");
    }
  };

  // DELETE
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("DELETE failed");
      setMessage("Job deleted");
      fetchJobs();
    } catch (err) {
      console.error("Delete job error:", err);
      setMessage("Failed to delete job");
    }
  };

  // START EDIT - Open edit modal
  const startEdit = (job: Job) => {
    setEditingJob(job);
    // Open edit modal by setting hash
    window.location.hash = "editModal";
  };

  // SAVE EDIT
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob?.id) return;

    try {
      const res = await fetch(`http://localhost:3000/jobs/${editingJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });
      if (!res.ok) throw new Error("PUT failed");
      setMessage("✅ Job updated");
      setEditingJob(null);
      // Close modal
      window.location.hash = "";
      fetchJobs();
    } catch (err) {
      console.error("Edit job error:", err);
      setMessage("❌ Failed to update job");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingJob(null);
    window.location.hash = "";
  };

  return (
    <div>
      <nav>
        <h2>JobTrack</h2>
        <a>
          <Link to="/home">Home</Link>
          <Link to="/">Log Out</Link>
        </a>
      </nav>

      <div className="mysection">
        {message && <p>{message}</p>}

        <div className="SearchBar">
          <input
            type="text"
            id="search"
            placeholder="Search"
            defaultValue={searchParams.get("search") ?? ""}
            onChange={(e) => setParam("search", e.target.value)}
          />

          <select
            id="filterby"
            name="filterby"
            defaultValue={searchParams.get("status") ?? "all"}
            onChange={(e) => setParam("status", e.target.value)}
          >
            <option value="all">All status</option>
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            id="sortby"
            name="sortby"
            defaultValue={searchParams.get("sort") ?? ""}
            onChange={(e) => setParam("sort", e.target.value)}
          >
            <option value="">Sort by date</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Add Job modal trigger */}
        <a href="#myModal" className="btn">
          Add Job
        </a>

        {/* Add Job Modal */}
        <div id="myModal" className="modal">
          <div className="modal-content">
            <a href="#" className="close">
              &times;
            </a>

            <h2>Add Job</h2>

            <form onSubmit={handleAddJob}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Company name"
                required
              />
              <br />
              <input
                type="text"
                id="role"
                name="role"
                placeholder="Role"
                required
              />
              <br />
              <select id="status" name="status" defaultValue="applied">
                <option value="applied">Applied</option>
                <option value="interviewed">Interviewed</option>
                <option value="rejected">Rejected</option>
              </select>
              <br />
              <input type="date" id="date" name="date" required />
              <br />
              <textarea
                id="extraD"
                name="extraD"
                placeholder="Extra details about the company and the job such as job duties, requirements.."
                required
              />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        {/* Edit Job Modal - using same modal structure */}
        <div id="editModal" className="modal">
          <div className="modal-content">
            <a href="#" className="close" onClick={cancelEdit}>
              &times;
            </a>

            <h2>Edit Job</h2>

            {editingJob && (
              <form onSubmit={handleSaveEdit}>
                <input
                  type="text"
                  value={editingJob.company}
                  placeholder="Company name"
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, company: e.target.value })
                  }
                  required
                />
                <br />
                <input
                  type="text"
                  value={editingJob.role}
                  placeholder="Role"
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, role: e.target.value })
                  }
                  required
                />
                <br />
                <select
                  value={editingJob.status}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, status: e.target.value })
                  }
                >
                  <option value="applied">Applied</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="rejected">Rejected</option>
                </select>
                <br />
                <input
                  type="date"
                  value={editingJob.date}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, date: e.target.value })
                  }
                  required
                />
                <br />
                <textarea
                  value={editingJob.description}
                  placeholder="Extra details about the company and the job..."
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      description: e.target.value,
                    })
                  }
                  required
                />
                <br />
                <button type="submit">Save</button>
                <button type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>

        <h3>Jobs Applied for:</h3>

        <table>
          <thead>
            <tr>
              <th>Company name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date applied</th>
              <th>Description</th>
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
                <td>{job.description}</td>
                <td>
                  <Link to={`/details/${job.id}`}>
                    <button id="details">Details</button>
                  </Link>
                  <button id="update" onClick={() => startEdit(job)}>
                    Update
                  </button>
                  <button id="delete" onClick={() => handleDelete(job.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={6}>No jobs found — add some!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
