import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean; // Prop for authentication state
  onLogout: () => void; // Function to handle logout
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for dropdown menu
  const navigate = useNavigate();
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close menu
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function
    handleMenuClose(); // Close the menu
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to Profile page
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#4a5cfb" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            MindMouse
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              component={Link}
              to="/dashboard"
              color="inherit"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/user-task"
              color="inherit"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              Tasks
            </Button>
            <Button
              component={Link}
              to="/progress"
              color="inherit"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              Progress
            </Button>
            {isAuthenticated && (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenuClick}
                  sx={{ "&:hover": { textDecoration: "underline" } }}
                >
                  Settings
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      border: "1px solid #ccc",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      "& .MuiMenuItem-root:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    },
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/rewards"
                    onClick={handleMenuClose}
                  >
                    Rewards
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/tutorial"
                    onClick={handleMenuClose}
                  >
                    Tutorial
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
