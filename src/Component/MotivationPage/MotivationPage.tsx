import React from "react";
import { Box, Typography, Card, CardMedia, Divider } from "@mui/material";
import skyImage from "../../assests/mentalhealth.jpeg";
import habit1 from "../../assests/habit 1.jpg";
import habit2 from "../../assests/habit 2.jpg";
import habit3 from "../../assests/habit 3.jpg";
import habit4 from "../../assests/habit 4.jpg";
import habit5 from "../../assests/habit 5.jpg";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MotivationalPage: React.FC = () => {
  const motivationalContent = `
    Breaking free from habits like smoking weed can be challenging, but with dedication, support, and the right tools, a better lifestyle is within reach. 
    Use this app as a guide and motivator, helping you track progress and stay focused on your goals.
    Remember, every step you take brings you closer to a healthier, happier you!
  `;

  const tutorialContent = `Wondering how to do your first task? Go to settings find the tutorial and start collecting the reward points.`;

  // List of motivational image URLs (replace with URLs relevant to your theme)
  const images = [
    `${habit1}`,
    `${habit2}`,
    `${habit3}`,
    `${habit4}`,
    `${habit5}`,
  ];

  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
    { x: 4, y: 5 },
    { x: 5, y: 7 },
    { x: 6, y: 8 },
    { x: 7, y: 10 },
  ];

  return (
    <Box sx={{ padding: 4, textAlign: "center", backgroundColor: "#f5f5f5" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${skyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 6,
          borderRadius: 2,
          color: "#fff",
          marginBottom: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          A Healthier You Starts Here
        </Typography>
        <Typography
          variant="h6"
          sx={{ maxWidth: 600, mx: "auto", fontWeight: 500 }}
        >
          Use this app to stay motivated, track progress, and achieve your goals
          in leaving habits behind for good.
        </Typography>
      </Box>

      {/* Motivational Content */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Your Journey to Success
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          maxWidth: 700,
          mx: "auto",
          lineHeight: 1.8,
          fontSize: "1.1rem",
        }}
      >
        {motivationalContent}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Want to checkout your first task?
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          maxWidth: 700,
          mx: "auto",
          lineHeight: 1.8,
          fontSize: "1.1rem",
        }}
      >
        {tutorialContent}
      </Typography>
      <Divider sx={{ width: "80%", mx: "auto", mb: 4 }} />

      {/* Scrollable Image Gallery */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          paddingBottom: 2,
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            sx={{ minWidth: 300, boxShadow: 3, borderRadius: 2 }}
          >
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt="Motivational content"
              sx={{ borderRadius: 2 }}
            />
          </Card>
        ))}
      </Box>
      <Divider sx={{ width: "80%", mx: "auto", mb: 4, mt: 3 }} />
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Progress Tracker
        </Typography>
        <Typography variant="body2" paragraph>
          Below is a visual representation of your journey so far. Stay
          motivated and keep moving forward!
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{ value: "Days", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{ value: "Progress", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MotivationalPage;
