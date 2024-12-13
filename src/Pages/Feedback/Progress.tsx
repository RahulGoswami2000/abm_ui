import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from "recharts";
import Header from "../../Component/Header/Header";
import { useAuth } from "../Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css";

// Define data types
interface BarChartData {
  name: string;
  minutes: number;
}

interface PieChartData {
  name: string;
  value: number;
}

interface TimingData {
  task_id: number;
  cannabisTime: number;
  neutralTime: number;
}

const Progress: React.FC = () => {
  const API_BASE_URL = "http://localhost:8080";
  const { isAuthenticated, logout } = useAuth();

  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [timeSpentFirst, setTimeSpentFirst] = useState<number>(0);
  const [timeSpentSecond, setTimeSpentSecond] = useState<number>(0);
  const [firstImageHovered, setFirstImageHovered] = useState<boolean | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState<boolean>(false);
  const [timings, setTimings] = useState<TimingData[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/task/get-time`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        localStorage.setItem("timeSpentFirst", data.data.timeOnNegative);
        localStorage.setItem("timeSpentSecond", data.data.timeOnPositive);

        // Prepare Bar Chart data
        setBarChartData([
          { name: "Cannabis cue", minutes: data.data.timeOnNegative },
          { name: "Neutral", minutes: data.data.timeOnPositive },
        ]);

        // Prepare Pie Chart data
        setPieChartData([
          { name: "Cannabis cue", value: data.data.negativePercentage },
          { name: "Neutral", value: data.data.positivePercentage },
        ]);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();

    // Retrieve time data for feedback
    const timeFirst = localStorage.getItem("timeSpentFirst");
    const timeSecond = localStorage.getItem("timeSpentSecond");
    const firstHovered = localStorage.getItem("firstHovered");

    if (timeFirst) setTimeSpentFirst(Number(timeFirst));
    if (timeSecond) setTimeSpentSecond(Number(timeSecond));
    if (firstHovered) setFirstImageHovered(firstHovered === "true");
  }, []);

  const generateFeedback = async () => {
    setIsFeedbackLoading(true);

    const inputPrompt = `The user spent ${timeSpentFirst} seconds on the weed image and ${timeSpentSecond} seconds on the neutral image. Provide feedback on engagement and suggestions for improvement to user as how they can focus on positive aspect.`;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/get-feedback",
        {
          prompt: inputPrompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data;

      const choices = JSON.parse(data).choices;

      const generatedResponse = choices?.[0]?.message?.content;
      setFeedback(
        generatedResponse ||
          "Sorry, we couldn't generate feedback at the moment."
      );
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedback("Failed to generate feedback. Please try again later.");
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const fetchTimings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/get-timings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      console.log(data);

      if (Array.isArray(data)) {
        if (data.length != 0) {
          const timingsArray = data.map((item) => ({
            task_id: item.task_id, // Task ID
            cannabisTime: item.negative, // Cannabis time (negative)
            neutralTime: item.positive, // Neutral time (positive)
          }));
          setTimings(timingsArray);
        } else {
          toast.error("No task submitted");
        }
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching timings:", error);
    }
  };

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center", color: "#4a5cfb" }}>
          Progress Overview
        </h2>

        {/* Feedback Section */}
        <div className="feedback-section" style={{ marginBottom: "40px" }}>
          <h3 style={{ textAlign: "center", color: "#4a5cfb" }}>Feedback</h3>
          <button
            onClick={generateFeedback}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px 20px",
              backgroundColor: "#4a5cfb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Generate Feedback
          </button>
          <div style={{ textAlign: "center", padding: "20px" }}>
            {isFeedbackLoading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="loading-spinner"
                  style={{ marginBottom: "10px" }}
                ></div>
                <p style={{ fontSize: "1.2rem", color: "#4a5cfb" }}>
                  Generating feedback, please wait...
                </p>
              </div>
            ) : feedback ? (
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "15px 20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  textAlign: "left",
                  color: "#333",
                }}
              >
                <h3 style={{ color: "#4a5cfb", marginBottom: "10px" }}>
                  Personalized Feedback
                </h3>
                <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                  {feedback}
                </p>
              </div>
            ) : (
              <div style={{ padding: "20px", fontSize: "1rem", color: "#666" }}>
                Click the button above to receive personalized feedback.
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center" }}>Loading data...</div>
        ) : (
          <>
            {/* Bar Chart */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ color: "#4a5cfb" }}>
                Time Spent Comparison (Bar Chart)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Minutes",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="minutes" name="Minutes Spent" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#4a5cfb" }}>Percentage Time Spent</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="60%"
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <PieTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <button
                onClick={fetchTimings}
                style={{
                  display: "block",
                  margin: "20px auto",
                  padding: "10px 20px",
                  backgroundColor: "#4a5cfb",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Show Timings
              </button>
              {timings && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 style={{ color: "#4a5cfb" }}>Detailed Time Spent</h3>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      textAlign: "left",
                      marginTop: "20px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            borderBottom: "2px solid #4a5cfb",
                            padding: "10px",
                          }}
                        >
                          Task
                        </th>
                        <th
                          style={{
                            borderBottom: "2px solid #4a5cfb",
                            padding: "10px",
                          }}
                        >
                          Cannabis (Time Spent)
                        </th>
                        <th
                          style={{
                            borderBottom: "2px solid #4a5cfb",
                            padding: "10px",
                          }}
                        >
                          Neutral (Time Spent)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {timings.map((timing, index) => (
                        <tr key={index}>
                          <td style={{ padding: "10px" }}>Task {index + 1}</td>
                          <td style={{ padding: "10px" }}>
                            {timing.cannabisTime || "0"}
                          </td>
                          <td style={{ padding: "10px" }}>
                            {timing.neutralTime || "0"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
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

export default Progress;
