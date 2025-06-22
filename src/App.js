// client/src/App.js
import { useState, useEffect } from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PatientDashboard from './pages/PatientDashboard';
import CaretakerDashboard from './pages/CaretakerDashboard';
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveToken, getValidToken } from './utils/auth.js'; 


export default function App() {
  const [token, setToken] = useState(getValidToken());
  const [role, setRole] = useState(localStorage.getItem('selectedRole'));

  useEffect(() => {
    if (role) {
      localStorage.setItem('selectedRole', role);
    }
  }, [role]);

  const handleAuth = (newToken) => {
    setToken(newToken);
    saveToken(newToken); // 👈 Save token with expiry
  };


  return (
    <div id='container'>
       <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage setRole={setRole} />} />
        <Route path="/login" element={<LoginPage onAuth={handleAuth} />} />
        <Route path="/signup" element={<SignupPage onAuth={handleAuth} />} />
        <Route
          path="/dashboard"
          element={
            token ? (
              role === 'caretaker' ? (
                <CaretakerDashboard token={token} />
              ) : (
                <PatientDashboard token={token} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
