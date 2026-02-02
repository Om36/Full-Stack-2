// src/App.jsx
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <Box>
      {/* Simple navigation */}
      <Box sx={{ display: "flex", gap: 2, p: 2, justifyContent: "center" }}>
        <Button variant="contained" onClick={() => setPage("landing")}>Landing Page</Button>
        <Button variant="contained" onClick={() => setPage("dashboard")}>Dashboard</Button>
        <Button variant="contained" onClick={() => setPage("admin")}>Admin Panel</Button>
      </Box>

      {/* Render page */}
      {page === "landing" && <LandingPage />}
      {page === "dashboard" && <Dashboard />}
      {page === "admin" && <AdminPanel />}
    </Box>
  );
}