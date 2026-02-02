// src/components/AdminPanel.jsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box } from "@mui/material";
import { useState } from "react";

export default function AdminPanel() {
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            textTransform: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#1976d2" : "#121212",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" onClick={() => setMode(mode === "light" ? "dark" : "light")}>
            Toggle Theme
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Users</Typography>
                <Typography>Manage users here</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Analytics</Typography>
                <Typography>View statistics</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Settings</Typography>
                <Typography>System configuration</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}