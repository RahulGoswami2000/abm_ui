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

// Define data types
interface BarChartData {
  name: string;
  minutes: number;
}

interface PieChartData {
  name: string;
  value: number;
}

const Progress: React.FC = () => {
  const API_BASE_URL = "http://localhost:8080";
  const { isAuthenticated, logout } = useAuth();
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(data);

        // Prepare Bar Chart data
        setBarChartData([
          { name: "Negative", minutes: data.data.timeOnNegative },
          { name: "Neutral", minutes: data.data.timeOnPositive },
        ]);

        // Prepare Pie Chart data
        setPieChartData([
          { name: "Negative", value: data.data.negativePercentage },
          { name: "Neutral", value: data.data.positivePercentage },
        ]);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center", color: "#4a5cfb" }}>
          Progress Overview
        </h2>

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
          </>
        )}
      </div>
    </>
  );
};

export default Progress;