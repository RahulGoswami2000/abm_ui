// // Preferences.tsx
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Typography,
// } from "@mui/material";
// import axios from "axios";

// interface WeedOption {
//   weed_id: number;
//   name: string;
// }

// interface PreferenceProps {
//   id: number;
// }
// const API_BASE_URL = "http://localhost:8080";
// const Preferences: React.FC<PreferenceProps> = ({ id }) => {
//   const [selectedWeedId, setSelectedWeedId] = useState<number | null>(null);
//   //     const weedOptions = ['Blue Dream', 'Sour Diesel', 'OG Kush', 'Pineapple Express', 'Purple Haze'];
//   const [weedOptions, setWeedOptions] = useState<string[]>([]);
//   const [error, setError] = useState('');
//   //     const handleWeedSave = () => {
//   //         alert(`Saved: ${selectedWeed}`);
//   //     };
//   useEffect(() => {
//     // Fetch weed options from API on component mount
//     const fetchWeedOptions = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/weed-list`);
//         const options = response.data.data.map(
//           (item: { name: string }) => item.name
//         );

//         setWeedOptions(options);
//       } catch (error) {
//         console.error("Error fetching weed options:", error);
//       }
//     };
//     fetchWeedOptions();
//   }, [id]);

//   const handleWeedChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     const selectedWeedName = event.target.value as string;
//     const selectedWeed = weedOptions.find((weed) => weed.name === selectedWeedName);
//     setSelectedWeedId(selectedWeed ? selectedWeed.weed_id : null);
//   };

//   const handleWeedSave = async () => {
//     if (selectedWeedId !== null) {
//       try {
//         await axios.post(`http://localhost:8080/save-preference`, {
//           id,
//           weed_id: selectedWeedId,
//         }, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         alert(`Preference saved successfully! Weed ID: ${selectedWeedId}`);
//       } catch (err) {
//         setError('Failed to save preference. Please try again later.');
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           mt: 8,
//           p: 4,
//           boxShadow: 3,
//           bgcolor: "background.paper",
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Select Your Weed Preference
//         </Typography>

//         <FormControl fullWidth>
//           <InputLabel>Select Weed</InputLabel>
//           <Select
//             value={selectedWeedId ? weedOptions.find(weed => weed.weed_id === selectedWeedId)?.name : ''}
//             onChange={handleWeedChange}
//             label="Select Weed"
//           >
//             {weedOptions.map((weed) => (
//               <MenuItem key={weed.weed_id} value={weed.name}>
//                 {weed.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button
//           onClick={handleWeedSave}
//           variant="contained"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Save
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Preferences;
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

interface WeedOption {
  weed_id: number;
  name: string;
}

interface PreferenceProps {
  id: number;
  onClose: () => void;
}

const Preferences: React.FC<PreferenceProps> = ({ id, onClose }) => {
  const [weedOptions, setWeedOptions] = useState<WeedOption[]>([]);
  const [selectedWeedId, setSelectedWeedId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeedOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/weed-list`);

        setWeedOptions(response.data.data); // Sets weedOptions as array of {weed_id, name}
      } catch (err) {
        setError("Failed to load options. Please try again later.");
      }
    };

    fetchWeedOptions();
  }, [id]);

  const handleWeedChange = (event: SelectChangeEvent<string>) => {
    const selectedWeedName = event.target.value;
    const selectedWeed = weedOptions.find(
      (weed) => weed.name === selectedWeedName
    );
    setSelectedWeedId(selectedWeed ? selectedWeed.weed_id : null);
  };

  const handleWeedSave = async () => {
    if (selectedWeedId !== null) {
      try {
        await axios.post(`http://localhost:8080/save-preferences/${id}`, null, {
          params: { weed_id: selectedWeedId },
        });
        onClose();
      } catch (err) {
        setError("Failed to save preference. Please try again later.");
      }
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
          Select Your Weed Preference
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Select Weed</InputLabel>
          <Select
            value={
              selectedWeedId
                ? weedOptions.find((weed) => weed.weed_id === selectedWeedId)
                    ?.name
                : ""
            }
            onChange={handleWeedChange}
            label="Select Weed"
          >
            {weedOptions.map((weed) => (
              <MenuItem key={weed.weed_id} value={weed.name}>
                {weed.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={handleWeedSave}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={selectedWeedId === null}
        >
          Save
        </Button>

        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default Preferences;
