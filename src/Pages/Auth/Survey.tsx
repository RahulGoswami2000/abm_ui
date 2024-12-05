import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "1. How often do you use cannabis?",
    options: [
      "Never",
      "Monthly or less",
      "2-4 times a month",
      "2-3 times a week",
      "4+ times a week",
    ],
  },
  {
    id: 2,
    question:
      '2. How many hours were you "stoned" on a typical day when you had been using cannabis?',
    options: ["Less than 1", "1-2", "3-4", "5-6", "7 or more"],
  },
  {
    id: 3,
    question:
      "3. How often during the past 6 months did you find that you were not able to stop using cannabis once you had started?",
    options: [
      "Never",
      "Less than monthly",
      "Monthly",
      "Weekly",
      "Daily/almost daily",
    ],
  },
  {
    id: 4,
    question:
      "4. How often during the past 6 months did you fail to do what was normally expected from you because of using cannabis?",
    options: [
      "Never",
      "Less than monthly",
      "Monthly",
      "Weekly",
      "Daily or almost daily",
    ],
  },
  {
    id: 5,
    question:
      "5. How often in the past 6 months have you devoted a great deal of your time to getting, using, or recovering from cannabis?",
    options: [
      "Never",
      "Less than monthly",
      "Monthly",
      "Weekly",
      "Daily/almost daily",
    ],
  },
  {
    id: 6,
    question:
      "6. How often in the past 6 months have you had a problem with your memory or concentration after using cannabis?",
    options: [
      "Never",
      "Less than monthly",
      "Monthly",
      "Weekly",
      "Daily or almost daily",
    ],
  },
  {
    id: 7,
    question:
      "7. How often do you use cannabis in situations that could be physically hazardous, such as driving, operating machinery, or caring for children?",
    options: [
      "Never",
      "Less than monthly",
      "Monthly",
      "Weekly",
      "Daily/almost daily",
    ],
  },
  {
    id: 8,
    question:
      "8. Have you ever thought about cutting down, or stopping, your use of cannabis?",
    options: [
      "Never",
      "Yes, but not in the past 6 months",
      "Yes, during the past 6 months",
    ],
  },
];

const CannabisSurvey: React.FC = () => {
  const [useCannabis, setUseCannabis] = useState<null | boolean>(null);
  const [responses, setResponses] = useState<Map<number, string>>(new Map());
  const navigate = useNavigate();

  const handleResponseChange = (questionId: number, answer: string) => {
    setResponses((prev) => new Map(prev).set(questionId, answer));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("user_id")!;
    if (useCannabis && responses.size !== questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const formattedResponses: Record<string, string | boolean> = {
      user_id: userId,
    };

    responses.forEach((value, key) => {
      formattedResponses[`question_${key}`] = value;
    });

    try {
      // Send a POST request to your backend API
      const response = await axios.post(
        "https://abm-api-sutg.onrender.com/save-survey",
        formattedResponses
      );

      console.log("Survey submitted successfully:", response.data);
      toast.success("Please login! Click on cancel X", {
        onClose: () => {
          // Navigate after the toast finishes
          navigate("/auth");
        },
      });
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error("Failed to submit survey. Please try again later.");
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Cannabis Use Survey
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Answer the following questions truthfully to help us understand your
            cannabis use.
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Have you used any cannabis over the past six months?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card
                  onClick={() => setUseCannabis(true)}
                  sx={{
                    backgroundColor: useCannabis === true ? "#8884d8" : "white",
                    color: useCannabis === true ? "white" : "black",
                    border: "1px solid #8884d8",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardActionArea>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6">Yes</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  onClick={() => setUseCannabis(false)}
                  sx={{
                    backgroundColor:
                      useCannabis === false ? "#8884d8" : "white",
                    color: useCannabis === false ? "white" : "black",
                    border: "1px solid #8884d8",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardActionArea>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6">No</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {useCannabis && (
            <Box sx={{ mt: 4 }}>
              {questions.map((q) => (
                <Box key={q.id} sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {q.question}
                  </Typography>
                  <Grid container spacing={1} justifyContent="space-evenly">
                    {q.options.map((option) => (
                      <Grid item xs="auto" key={option}>
                        <Card
                          onClick={() => handleResponseChange(q.id, option)}
                          sx={{
                            minWidth: "80px", // Ensures compact cards
                            backgroundColor:
                              responses.get(q.id) === option
                                ? "#8884d8"
                                : responses.has(q.id)
                                ? "white"
                                : "#f8d7da",
                            color:
                              responses.get(q.id) === option
                                ? "white"
                                : responses.has(q.id)
                                ? "black"
                                : "#721c24",
                            border: "1px solid #8884d8",
                            textAlign: "center",
                            transition: "0.3s",
                            "&:hover": { boxShadow: 6 },
                          }}
                        >
                          <CardActionArea>
                            <CardContent>
                              <Typography variant="body2">{option}</Typography>{" "}
                              {/* Smaller font */}
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>
          )}
          {(useCannabis === false || useCannabis === true) && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                mt: 3,
                display: "block",
                mx: "auto",
                px: 4,
                py: 1,
                fontWeight: "bold",
              }}
            >
              Submit
            </Button>
          )}
        </Paper>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CannabisSurvey;
