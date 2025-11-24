// import React, { useEffect, useState } from "react";
// import axios from "../../services/axiosInstance";
// import "./adminDashboard.css";

// export default function AdminRequests() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   async function loadUsers() {
//     try {
//       const res = await axios.get("/admin/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error loading users", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function approveAgent(id) {
//     try {
//       await axios.put(`/admin/approve/${id}`);
//       alert("Agent approved successfully!");
//       loadUsers();
//     } catch (err) {
//       alert("Approval failed: " + (err.response?.data?.message || ""));
//     }
//   }

//   async function rejectAgent(id) {
//     const reason = prompt("Enter reason for rejection:");

//     if (!reason || reason.trim() === "") {
//       alert("Rejection reason is required.");
//       return;
//     }

//     try {
//       await axios.put(`/admin/reject/${id}`, { reason });
//       alert("Agent rejected successfully!");
//       loadUsers();
//     } catch (err) {
//       alert("Rejection failed: " + (err.response?.data?.message || ""));
//     }
//   }

//   if (loading) return <p className="loading">Loading...</p>;

//   return (
//     <div className="admin-container">
//       <h2 className="admin-title">Agent Approval Requests</h2>

//       <div className="admin-card">
//         <h3 className="section-title">New Registrations</h3>

//         {users.length === 0 ? (
//           <p>No new users found.</p>
//         ) : (
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Status</th>
//                 <th>Document</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((u) => (
//                 <tr key={u.id}>
//                   <td>{u.name}</td>
//                   <td>{u.email}</td>
//                   <td>{u.role.replace("ROLE_", "")}</td>

//                   <td
//                     className={
//                       u.status === "APPROVED"
//                         ? "status-approved"
//                         : u.status === "REJECTED"
//                         ? "status-rejected"
//                         : "status-pending"
//                     }
//                   >
//                     {u.status}
//                   </td>

//                   <td>
//                     {u.documentPath ? (
//                       <a
//                         href={`http://localhost:8080/uploads/${u.documentPath
//                           .split("/")
//                           .pop()}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="doc-link"
//                       >
//                         View
//                       </a>
//                     ) : (
//                       "-"
//                     )}
//                   </td>

//                   <td>
//                     {u.role === "ROLE_AGENT" && u.status === "PENDING" && (
//                       <>
//                         <button
//                           className="approve-btn"
//                           onClick={() => approveAgent(u.id)}
//                         >
//                           Approve
//                         </button>

//                         <button
//                           className="reject-btn"
//                           onClick={() => rejectAgent(u.id)}
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}

//                     {u.status === "APPROVED" && <span>✔ Approved</span>}
//                     {u.status === "REJECTED" && <span>✖ Rejected</span>}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./AdminRequests.css";

export default function AdminRequests() {
  const [agents, setAgents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await axios.get("/admin/users");

      // Separate agents and customers
      const agentsOnly = res.data.filter((u) => u.role === "ROLE_AGENT");
      const customersOnly = res.data.filter((u) => u.role === "ROLE_CUSTOMER");

      setAgents(agentsOnly);
      setCustomers(customersOnly);
    } catch (err) {
      console.error("Error loading users", err);
    } finally {
      setLoading(false);
    }
  }

  async function approveAgent(id) {
    try {
      await axios.put(`/admin/approve/${id}`);

      // Update UI instantly
      setAgents((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "APPROVED" } : u))
      );

      alert("Agent approved successfully!");
    } catch (err) {
      alert("Approval failed: " + (err.response?.data?.message || ""));
    }
  }

  async function rejectAgent(id) {
    const reason = prompt("Enter reason for rejection:");

    if (!reason || reason.trim() === "") {
      alert("Rejection reason is required.");
      return;
    }

    try {
      await axios.put(`/admin/reject/${id}`, { reason });

      // Update UI instantly
      setAgents((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "REJECTED" } : u))
      );

      alert("Agent rejected successfully!");
    } catch (err) {
      alert("Rejection failed: " + (err.response?.data?.message || ""));
    }
  }

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Agent Approval Requests</h2>

      {/* ========================= AGENTS TABLE ========================= */}
      <div className="admin-card modern-card">
        <h3 className="section-title">Agent Requests</h3>

        {agents.length === 0 ? (
          <p>No agent registrations found.</p>
        ) : (
          <table className="admin-table stylish-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>

                  <td
                    className={
                      u.status === "APPROVED"
                        ? "status-approved"
                        : u.status === "REJECTED"
                        ? "status-rejected"
                        : "status-pending"
                    }
                  >
                    {u.status}
                  </td>

                  <td>
                    {u.documentPath ? (
                      <a
                        href={`http://localhost:8080/uploads/${u.documentPath
                          .split("/")
                          .pop()}`}
                        target="_blank"
                        rel="noreferrer"
                        className="doc-link"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    {u.status === "PENDING" && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => approveAgent(u.id)}
                        >
                          Approve
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() => rejectAgent(u.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {u.status === "APPROVED" && (
                      <span className="approved-label">✔ Approved</span>
                    )}
                    {u.status === "REJECTED" && (
                      <span className="rejected-label">✖ Rejected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ========================= CUSTOMERS TABLE ========================= */}
      <div className="admin-card modern-card">
        <h3 className="section-title">Customers</h3>

        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <table className="admin-table stylish-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
