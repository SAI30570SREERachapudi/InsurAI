// import React, { useState } from "react";
// import axios from "../services/axiosInstance";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       // Store JWT token (optional if using cookies) and user role for routing
//       if (res.data.token) localStorage.setItem("token", res.data.token);
//       if (res.data.role) localStorage.setItem("role", res.data.role);

//       alert("Login successful ✅");

//       // Redirect based on user role
//       const role = res.data.role;
//       if (role === "ROLE_CUSTOMER") {
//         window.location.href = "/dashboard/customer";
//       } else if (role === "ROLE_AGENT") {
//         window.location.href = "/dashboard/agent";
//       } else if (role === "ROLE_ADMIN") {
//         window.location.href = "/dashboard/admin";
//       } else {
//         window.location.href = "/unauthorized";
//       }
//     } catch (err) {
//       console.error("Login Error:", err);
//       alert(err.response?.data?.message || "Login failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="center"
//       style={{
//         height: "85vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         className="card"
//         style={{
//           width: 340,
//           padding: 20,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           borderRadius: 8,
//         }}
//       >
//         <h2 style={{ marginTop: 0, textAlign: "center" }}>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             required
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{
//               width: "100%",
//               padding: 8,
//               marginBottom: 10,
//               border: "1px solid #ccc",
//               borderRadius: 4,
//             }}
//           />
//           <input
//             required
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{
//               width: "100%",
//               padding: 8,
//               marginBottom: 10,
//               border: "1px solid #ccc",
//               borderRadius: 4,
//             }}
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: 10,
//               background: "#1e3a8a",
//               color: "white",
//               border: "none",
//               borderRadius: 4,
//               cursor: "pointer",
//             }}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "../services/axiosInstance";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { email, password });
      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.role) localStorage.setItem("role", res.data.role);
      // redirect based on role
      const role = res.data.role;
      if (role === "ROLE_ADMIN") window.location.href = "/dashboard/admin";
      else if (role === "ROLE_AGENT") window.location.href = "/dashboard/agent";
      else window.location.href = "/dashboard/customer";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          width: 360,
          padding: 24,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
          />
          <input
            required
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 10,
              background: "#1e3a8a",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
