import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

 function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Login</h1>
      <div style={styles.inputGroup}>
        <label htmlFor="username" style={styles.label}>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button style={styles.button} >
        Login
      </button>
      {message && <p style={styles.message}>{message}</p>}
      <p style={styles.registerPrompt}>
        Don’t have an account?{' '}
        <span style={styles.registerLink} >
          Register
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '100px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#02075D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#041b8a',
  },
  message: {
    marginTop: '10px',
    textAlign: 'center',
    color: '#333',
  },
  registerPrompt: {
    marginTop: '15px',
    textAlign: 'center',
    color: '#333',
  },
  registerLink: {
    color: '#02075D',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default Login;
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import AuthContext from "../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const { data } = await axios.post("/api/auth/login", { email, password });
//       const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

//       localStorage.setItem("token", data.token);
//       login(data.user);
//       alert("Login successful!");
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import AuthContext from "../context/AuthContext"; // ✅ Import correctly

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // ✅ Check if AuthContext is available
//   const auth = useContext(AuthContext);
//   if (!auth) {
//     console.error("AuthContext is undefined! Ensure AuthProvider wraps this component.");
//     return <p>Error: AuthContext not found</p>;
//   }

//   const { login } = auth; // ✅ Now safe to use

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

//       localStorage.setItem("token", data.token);
//       login(data.user); // ✅ Now login function is called safely
//       alert("Login successful!");
//     } catch (error) {
//       alert(error.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
