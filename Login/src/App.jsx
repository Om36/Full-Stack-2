import { useState } from 'react'
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in
    return localStorage.getItem('user') ? true : false
  })

  const handleLogin = (userData) => {
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData))
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  )
}

export default App
