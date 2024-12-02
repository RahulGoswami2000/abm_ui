// LoginSignUp.tsx
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  Tabs,
  Tab,
  Dialog,
} from "@mui/material";
import Preferences from "../../Component/Preferences/Preferences";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080";

const LoginSignUp: React.FC = () => {
  const { login } = useAuth();
  const [value, setValue] = useState(0);
  const [id, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setErrorMessage("");
  };

  const handleClosePreferences = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const endpoint = value === 0 ? "/login" : "/create-user";
    const payload =
      value === 0
        ? { email: formData.email, password: formData.password }
        : {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
          };

    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Success:", response.data);

      if (value === 1) {
        localStorage.setItem("user_id", response.data.data.user_id);
        setUserId(response.data.data.user_id);
        setIsDialogOpen(true); // Open dialog on successful signup
      }

      if (value === 0) {
        localStorage.setItem("token", response.data.data.accessToken);
        login();
        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2, // No background color
      }}
    >
      <Paper elevation={10} sx={{ padding: 4, width: "100%", borderRadius: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" sx={{ fontWeight: "bold" }} />
          <Tab label="Sign Up" sx={{ fontWeight: "bold" }} />
        </Tabs>
        <Grid container spacing={4} sx={{ padding: 2 }}>
          {/* Informational Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 3,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {value === 0 ? "Welcome Back!" : "Create Your Account"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {value === 0
                  ? "Access your dashboard and manage your tasks easily."
                  : "Sign up to get started and unlock all features."}
              </Typography>
            </Box>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                {value === 0 ? "Login" : "Sign Up"}
              </Typography>
              {value === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 8 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 8 } }}
                    />
                  </Grid>
                </Grid>
              )}
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 8 } }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 8 } }}
              />
              {errorMessage && (
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  borderRadius: 8,
                  padding: "12px",
                  background: "#1976D2",
                  color: "#fff",
                }}
                type="submit"
              >
                {value === 0 ? "Log In" : "Sign Up"}
              </Button>
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                {value === 0 ? "New user? " : "Already have an account? "}
                <Link
                  href="#"
                  color="primary"
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "#1565C0",
                    },
                  }}
                  onClick={() => setValue(value === 0 ? 1 : 0)}
                >
                  {value === 0 ? "Sign up" : "Log in"}
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          {id && <Preferences id={id} onClose={handleClosePreferences} />}
        </Dialog>
      </Paper>
    </Container>
  );
};

export default LoginSignUp;
