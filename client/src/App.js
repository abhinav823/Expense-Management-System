import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes() {
  if (localStorage.getItem("user")) {
    return <HomePage />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
