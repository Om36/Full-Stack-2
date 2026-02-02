// src/components/Dashboard.jsx
import { AppBar, Toolbar, Typography, Drawer, Box, Grid, Card, CardContent, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import { useState } from "react";

const Sidebar = styled(Box)`
  width: 240px;
  padding: 16px;
`;

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Navbar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer open={open} onClose={() => setOpen(false)} variant="temporary">
        <Sidebar>
          <Typography variant="h6">Menu</Typography>
          <Typography>Home</Typography>
          <Typography>Reports</Typography>
          <Typography>Settings</Typography>
        </Sidebar>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Card {item}</Typography>
                  <Typography variant="body2">
                    Responsive card grid adapts to screen width.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}