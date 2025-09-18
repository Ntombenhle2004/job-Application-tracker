import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";

export default function Home() {
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
        <div className="SearchBar">
          <FaSearch id="search-icon" size={16} />
          <input type="text" id="search" placeholder="Search" />

          <select id="filterby" name="filterby">
            <option value="" disabled selected>
              Filter by status
            </option>
            <option value="all">All status</option>
            <option value="applied">Applied</option>
            <option value="intervied">Intervied</option>
            <option value="rejected">Rejected</option>
          </select>

          <select id="sortby" name="sortby">
            <option value="" disabled selected>
              Sort by date
            </option>
            <option value="new">Ascending</option>
            <option value="old">Descending</option>
          </select>
        </div>
        <a href="#myModal" className="btn">
          Add Job
        </a>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <a href="#" className="close">
              &times;
            </a>

            <h2>Add Job</h2>

            <form>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Company name"
                required
              />
              <br />

              <input type="text" id="role" placeholder="Role" required />
              <br />

              <select id="status" name="status">
                <option value="" disabled selected>
                  Status
                </option>
                <option value="applied">Applied</option>
                <option value=" interviewed">Interviewed</option>
                <option value="rejected">Rejected</option>
              </select>

              <br />

              <input
                type="date"
                id="date"
                placeholder="Date applied"
                required
              />
              <br />

              <textarea
                id="extraD"
                placeholder="Extra details about the company and the job such as job duties, requirements.."
                required
              />
              <br />

              <button type="submit">Submit</button>
            </form>
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
            <tr>
              <td>bjj</td>
              <td>ghj</td>
              <td>gfh</td>
              <td>fghfh</td>
              <td>gh</td>
              <td>
                <button type="submit" id="update">
                  Update
                </button>
                <button type="submit" id="delete">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
