// src/components/LandingPage.jsx
import { Container, Grid, Typography, Box } from "@mui/material";

export default function LandingPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to Our Platform
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Simple. Responsive. Material UI.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: "primary.light", borderRadius: 2 }}>
              <Typography variant="h5">Feature One</Typography>
              <Typography>
                This section stacks on mobile and aligns side-by-side on larger screens.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: "secondary.light", borderRadius: 2 }}>
              <Typography variant="h5">Feature Two</Typography>
              <Typography>
                Material UI Grid makes responsive layouts easy.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}