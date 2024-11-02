// src/Pages/Profile/Profile.tsx

import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import axios from "axios";
import Header from "../../Component/Header/Header";
import { useAuth } from "../Auth/AuthContext";

const Profile: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const API_BASE_URL = "http://localhost:8080";
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust if you use a different storage method
        const response = await axios.get(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.data;
        
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      // Placeholder API endpoint
      const response = await axios.put("/api/profile", {
        firstName,
        lastName,
        email
      });
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: "2rem",
            maxWidth: "500px",
            width: "100%",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Edit Profile
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box mt={3} textAlign="center">
            <Button
              onClick={handleSave}
              color="primary"
              variant="contained"
              fullWidth
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;
