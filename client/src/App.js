import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation , Navigate } from "react-router-dom";
import './App.css';
import { AppProvider } from "./contexts/AppContext";
import Login from './components/Login.js';
import Register from './components/Register.js';
import BannerPage from './components/BannerPage.js';

function App() {
  // const ProtectedRoute = ({ children, role }) => {
  //   const { user } = useContext(AuthContext);
  //   if (!user) return <Navigate to="/login" />;
  //   if (role && user.role !== role) return <Navigate to="/" />;
  //   return children;
  // };
  
    return (
      <AppProvider>
    <Router>
      
      <Routes>
        <Route path="/" element={<BannerPage/>} />
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

        {/* <Route
        path="/products"
        element={
          <ProtectedRoute role="admin">
            <Products />
          </ProtectedRoute>
        }
      /> */}

      </Routes>
    </Router>
    </AppProvider>
  );
}


export default App;
