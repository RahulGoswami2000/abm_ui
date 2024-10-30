// Login.tsx
import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";

const Login: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Grid container>
          {/* Left Side: Informational Text */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ textAlign: "center", padding: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Welcome!
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Please login to access your dashboard and get relief from weed.
              </Typography>
            </Box>
          </Grid>
          {/* Right Side: Login Form */}
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Login
              </Typography>
              <TextField label="Email" variant="outlined" fullWidth required />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Log In
              </Button>

              {/* Sign Up Link */}
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                New user?{" "}
                <Link href="/signup" color="primary">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
