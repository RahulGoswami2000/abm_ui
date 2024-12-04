import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios
import Header from "../../Component/Header/Header";
import { useAuth } from "../Auth/AuthContext";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css";
import "./Tutorial.css";
import { title } from "process";

const Tutorial: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  const steps = [
    {
      title: "Create an Account",
      description:
        "Start by registering an account. Provide your details and confirm your preferences.",
    },
    {
      title: "Explore the Dashboard",
      description:
        "Navigate through your dashboard to view your progress and check the motivational content.",
    },
    {
      title: "Complete your tasks",
      description:
        "Go to your task, and hover on the images to find out what you like.",
    },
    {
      title: "Check your progress and see your feedback",
      description:
        "Get your feedback on how you are doing task and analyze with the graphs provided.",
    },
    {
      title: "Go find out your reward points",
      description:
        "See how many points you have collected so far and how many tasks are completed.",
    },
    {
      title: "Checkout tutorials",
      description: "Go look at the detailed video on how to do a task.",
    },
    {
      title: "Customize profile",
      description: "Update your profile and your details",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/contact/send-message", // Replace with your API endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle successful response
      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setIsModalOpen(false);
        setFormData({ subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send the message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <div className="tutorial-page">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome to the Tutorial 📚</h1>
          <p>
            Learn how to navigate and make the most of our platform. Follow
            along with the video and detailed steps below.
          </p>
        </div>

        {/* Video Section */}
        <div className="content-section">
          <div className="video-box">
            <video
              controls
              className="tutorial-video"
              poster="https://via.placeholder.com/800x450?text=Video+Preview"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <p className="video-caption">Watch the tutorial to get started!</p>
          </div>
        </div>

        {/* Step-by-Step Guide with Dropdown */}
        <div className="guide-section">
          <h2>Step-by-Step Guide</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step ${openStep === index ? "open" : ""}`}
              >
                <div
                  className="step-title"
                  onClick={() => toggleStep(index)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <span>{step.title}</span>
                  <span>{openStep === index ? "▲" : "▼"}</span>
                </div>
                {openStep === index && (
                  <p className="step-description">{step.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <h2>Need Assistance?</h2>
          <p>
            If you have any questions or run into issues, feel free to reach out
            to our support team or visit our FAQ page.
          </p>
          <button className="help-button" onClick={() => setIsModalOpen(true)}>
            Contact Support
          </button>
        </div>

        {/* Contact Support Modal */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <h2>Contact Support</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  {loading ? (
                    <ClipLoader color="#4a5cfb" loading={loading} size={20} />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
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

export default Tutorial;
