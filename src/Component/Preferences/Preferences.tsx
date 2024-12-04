import React, { useState } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import image1 from "../../assests/cannabis/3C.jpg";
import image2 from "../../assests/cannabis/1C.jpg";
import image3 from "../../assests/cannabis/2C.jpg";
import { useNavigate } from "react-router-dom";

interface PreferenceProps {
  id: number;
  onClose: () => void;
}

const Preferences: React.FC<PreferenceProps> = ({ id, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const imageSources = [image1, image2, image3];

  const handleImageSelect = (imageIndex: number) => {
    setSelectedImage(imageIndex);
    setError(""); // Clear error if a new image is selected
  };

  const handleSave = () => {
    if (selectedImage !== null) {
      // Save selected image index to localStorage
      localStorage.setItem(`preference`, selectedImage.toString());
      navigate("/survey");
      onClose();
    } else {
      setError("Please select an image before saving.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 4,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Select Your Preference
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Select style of cannabis images for the future task.
        </Typography>

        {/* Image Selection */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 4,
            mb: 4,
          }}
        >
          {imageSources.map((src, index) => (
            <Box
              key={index}
              sx={{
                border:
                  selectedImage === index ? "3px solid blue" : "1px solid gray",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => handleImageSelect(index)}
            >
              <img
                src={src}
                alt={`Option ${index + 1}`}
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>

        <Button
          onClick={handleSave}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Save
        </Button>

        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default Preferences;
