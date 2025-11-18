// import React, { useState } from "react";
// import axios from "../services/axiosInstance";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("ROLE_CUSTOMER");
//   const [document, setDocument] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append(
//         "user",
//         new Blob([JSON.stringify({ name, email, password, role })], {
//           type: "application/json",
//         })
//       );
//       if (role === "ROLE_AGENT" && document)
//         formData.append("document", document);
//       const headers = { "Content-Type": "multipart/form-data" };
//       await axios.post("/auth/register", formData, { headers });
//       alert(
//         "Registered successfully. If you registered as agent, wait for admin verification."
//       );
//       window.location.href = "/login";
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "80vh",
//       }}
//     >
//       <div
//         style={{
//           width: 420,
//           padding: 24,
//           background: "#fff",
//           borderRadius: 8,
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             required
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ width: "100%", padding: 8, marginBottom: 10 }}
//           />
//           <input
//             required
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: "100%", padding: 8, marginBottom: 10 }}
//           />
//           <input
//             required
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: "100%", padding: 8, marginBottom: 10 }}
//           />
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             style={{ width: "100%", padding: 8, marginBottom: 10 }}
//           >
//             <option value="ROLE_CUSTOMER">Customer</option>
//             <option value="ROLE_AGENT">Agent</option>
//           </select>
//           {role === "ROLE_AGENT" && (
//             <input
//               type="file"
//               accept="image/*,.pdf"
//               onChange={(e) => setDocument(e.target.files[0])}
//               style={{ marginBottom: 10 }}
//             />
//           )}
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: 10,
//               background: "#16a34a",
//               color: "#fff",
//               border: "none",
//               borderRadius: 4,
//             }}
//           >
//             {loading ? "Submitting..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "../services/axiosInstance";
import "./Form.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "user",
        new Blob([JSON.stringify({ name, email, password, role })], {
          type: "application/json",
        })
      );
      if (role === "ROLE_AGENT" && document)
        formData.append("document", document);
      const headers = { "Content-Type": "multipart/form-data" };
      await axios.post("/auth/register", formData, { headers });

      alert(
        "Registered successfully! If you registered as an agent, please wait for admin verification."
      );
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">Join InsurAI in a few simple steps</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            required
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
          />
          <input
            required
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            required
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="register-select"
          >
            <option value="ROLE_CUSTOMER">Customer</option>
            <option value="ROLE_AGENT">Agent</option>
          </select>

          {role === "ROLE_AGENT" && (
            <div className="file-upload">
              <label className="file-label">
                Upload Verification Document:
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setDocument(e.target.files[0])}
                className="file-input"
              />
            </div>
          )}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
