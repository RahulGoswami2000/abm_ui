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
  const {login} = useAuth();
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
        background: "#ffffff",
        padding: 2,
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: "100%", borderRadius: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" sx={{ fontWeight: "bold" }} />
          <Tab label="Sign Up" sx={{ fontWeight: "bold" }} />
        </Tabs>

        <Grid container spacing={2}>
          {/* Left Side: Informational Text */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
              color: "#000",
              padding: 3,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0)",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {value === 0 ? "Welcome!" : "Join Us!"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {value === 0
                  ? "Please login to access your dashboard. Stay connected and manage your account easily."
                  : "Create an account to start managing your tasks easily."}
              </Typography>
            </Box>
          </Grid>

          {/* Right Side: Login or Signup Form */}
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
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
                <>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </>
              )}
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
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
                sx={{ mt: 2 }}
                type="submit"
              >
                {value === 0 ? "Log In" : "Sign Up"}
              </Button>
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                {value === 0 ? "New user? " : "Already have an account? "}
                <Link
                  href="#"
                  color="primary"
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
