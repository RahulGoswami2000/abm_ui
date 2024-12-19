import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Component/Header/Header";
import { useAuth } from "../Auth/AuthContext";
import "./Rewards.css";
import Confetti from "react-confetti"; // Confetti for celebrations
import { useNavigate } from "react-router-dom";

interface RewardsData {
  completedTasks: number;
  totalPoints: number;
}

const Rewards: React.FC = () => {
  const API_BASE_URL = "https://abm-api-sutg.onrender.com";
  const { isAuthenticated, logout } = useAuth();
  const [rewardsData, setRewardsData] = useState<RewardsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const fetchRewardsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/rewards`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRewardsData(response.data.data);
      } catch (error) {
        console.error("Error fetching rewards data:", error);
      } finally {
        setIsLoading(false);
        setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
      }
    };

    fetchRewardsData();
  }, []);

  const calculateMaxPoints = (completedTasks: number) => {
    return completedTasks * 100;
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      {showConfetti && <Confetti />}
      <div className="rewards-page">
        {isLoading ? (
          <div className="loading-message">Loading your rewards...</div>
        ) : rewardsData ? (
          <div className="rewards-content">
            {/* Hero Section */}
            <div className="hero-section">
              <h1>🎉 Fantastic Job, Champ! 🎉</h1>
              <p>You've been crushing it! Keep up the amazing work.</p>
            </div>

            {/* Points Section */}
            <div className="points-card">
              <h2>Total Points Earned</h2>
              <div className="points-value">
                {rewardsData.totalPoints} /{" "}
                {calculateMaxPoints(rewardsData.completedTasks)}
              </div>
            </div>

            {/* Tasks Section */}
            <div className="tasks-section">
              <h3>Tasks You've Completed</h3>
              <div className="tasks-value">{rewardsData.completedTasks}</div>
              <p>Keep going! More tasks mean more rewards.</p>
            </div>

            {/* Achievements Section */}
            <div className="achievements-section">
              <h3>Your Achievements</h3>
              <div className="achievements-list">
                <div className="achievement-item">
                  🏆 <span>Task Master</span>
                </div>
                <div className="achievement-item">
                  🌟 <span>Points Collector</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="error-message">
            Oops! You don't have any task completed. Please try again later.
          </div>
        )}
      </div>
    </>
  );
};

export default Rewards;
