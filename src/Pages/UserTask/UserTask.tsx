import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";
import Header from "../../Component/Header/Header";
import "./ImageHoverTracker.css";
import { Box, Button, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css";

const imageSets = {
  0: [
    "1C.jpg",
    "2C.jpg",
    "3C.jpg",
    "4C.jpg",
    "5C.jpg",
    "6C.jpg",
    "7C.jpg",
    "8C.jpg",
    "9C.jpg",
    "10C.jpg",
    "11C.jpg",
    "12C.jpg",
    "13C.jpg",
    "14C.jpg",
    "15C.jpg",
  ],
  1: [
    "17C.jpg",
    "18C.jpg",
    "19C.jpg",
    "20C.jpg",
    "21C.jpg",
    "22C.jpg",
    "23C.jpg",
    "24C.jpg",
    "25C.jpg",
    "26C.jpg",
    "27C.jpg",
    "28C.jpg",
    "29C.jpg",
    "30C.jpg",
    "31C.jpg",
  ],
  2: [
    "36C2.jpg",
    "37C2.jpg",
    "38C2.jpg",
    "39C.jpg",
    "40C.jpg",
    "41C.jpg",
    "42C.jpg",
    "43C.jpg",
    "44C.jpg",
    "45C.jpg",
    "46C.jpg",
    "47C.jpg",
    "48C.jpg",
    "49C.jpg",
    "50C.jpg",
  ],
};

const imagesRight = [
  "N20.JPG",
  "N21.JPG",
  "N22.JPG",
  "N23.JPG",
  "N24.JPG",
  "N25.JPG",
  "N26.JPG",
  "N27.JPG",
  "N28.JPG",
  "N29.JPG",
  "N30.JPG",
  "N31.JPG",
  "N32.JPG",
  "N33.JPG",
  "N34.JPG",
  "N35.JPG",
  // "N36.JPG",
  // "N37.JPG",
  // "N38.JPG",
  // "N39.JPG",
  // "N40.JPG",
  // "N41.JPG",
  // "N42.JPG",
  // "N43.JPG",
  // "N44.JPG",
  // "N45.JPG",
  // "N46.JPG",
  // "N47.JPG",
  // "N48.JPG",
  // "N49.JPG",
  // "N50.JPG",
];

const ImageHoverTracker: React.FC = () => {
  const API_BASE_URL = "http://localhost:8080";

  const { isAuthenticated, logout } = useAuth();
  const [hoverTimeImage1, setHoverTimeImage1] = useState<number>(0);
  const [hoverTimeImage2, setHoverTimeImage2] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [isHoveringImage1, setIsHoveringImage1] = useState(false);
  const [isHoveringImage2, setIsHoveringImage2] = useState(false);
  const [imagesLeft, setImagesLeft] = useState<string[]>([]);
  const [isLastImageOfBatch, setIsLastImageOfBatch] = useState(false);
  const [isLastBatch, setIsLastBatch] = useState(false);
  const [isLastBatchSubmitted, setIsLastBatchSubmitted] = useState(false);
  const [totalHoverTimeImage1, setTotalHoverTimeImage1] = useState<number>(0);
  const [totalHoverTimeImage2, setTotalHoverTimeImage2] = useState<number>(0);

  const [hoverStartTimeImage1, setHoverStartTimeImage1] = useState<
    number | null
  >(null);
  const [hoverStartTimeImage2, setHoverStartTimeImage2] = useState<
    number | null
  >(null);
  const [mousePositionImage1, setMousePositionImage1] = useState({
    x: 0,
    y: 0,
  });
  const [mousePositionImage2, setMousePositionImage2] = useState({
    x: 0,
    y: 0,
  });
  const [firstHoverSideImage1, setFirstHoverSideImage1] = useState<
    string | null
  >(null);
  const [firstHoverSideImage2, setFirstHoverSideImage2] = useState<
    string | null
  >(null);

  useEffect(() => {
    const preference = parseInt(localStorage.getItem("preference")!);
    const selectedSet = imageSets[preference as keyof typeof imageSets] || [];
    if (preference === 0 || preference === 1 || preference === 2) {
      setImagesLeft(imageSets[preference]);
    } else {
      console.error("Invalid preference value in local storage");
      setImagesLeft([]); // Default to an empty array if preference is invalid
    }
  }, []);

  // Handle mouse enter and leave for image 1
  const handleMouseEnterImage1 = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    // Determine which side of the image was hovered over first
    if (!firstHoverSideImage1) {
      const side = mouseX < rect.width / 2 ? "left" : "right";
      setFirstHoverSideImage1(side);
      console.log(`First hover on Image 1: ${side}`);
    }

    setHoverStartTimeImage1(Date.now());
    setIsHoveringImage1(true); // Set hover state to true
  };
  const handleMouseLeaveImage1 = () => {
    if (hoverStartTimeImage1 !== null) {
      const timeSpent = Date.now() - hoverStartTimeImage1;
      setHoverTimeImage1((prevTime) => prevTime + timeSpent);
      setHoverStartTimeImage1(null);
    }
    setIsHoveringImage1(false); // Set hover state to false
  };

  // Handle mouse enter and leave for image 2
  const handleMouseEnterImage2 = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    // Determine which side of the image was hovered over first
    if (!firstHoverSideImage2) {
      const side = mouseX < rect.width / 2 ? "left" : "right";
      setFirstHoverSideImage2(side);
      console.log(`First hover on Image 2: ${side}`);
    }

    setHoverStartTimeImage2(Date.now());
    setIsHoveringImage2(true); // Set hover state to true
  };
  const handleMouseLeaveImage2 = () => {
    if (hoverStartTimeImage2 !== null) {
      const timeSpent = Date.now() - hoverStartTimeImage2;
      setHoverTimeImage2((prevTime) => prevTime + timeSpent);
      setHoverStartTimeImage2(null);
    }
    setIsHoveringImage2(false); // Set hover state to false
  };

  const handleNext = () => {
    if (currentIndex < currentBatchLeft.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const imagesPerBatch = 10;
  const totalImages = Math.min(imagesLeft.length, imagesRight.length);
  const totalBatches = Math.ceil(totalImages / imagesPerBatch);

  const currentBatchStart = currentBatchIndex * imagesPerBatch;
  const currentBatchEnd = currentBatchStart + imagesPerBatch;
  const currentBatchLeft = imagesLeft.slice(currentBatchStart, currentBatchEnd);
  const currentBatchRight = imagesRight.slice(
    currentBatchStart,
    currentBatchEnd
  );

  const currentLeftImage = currentBatchLeft[currentIndex];
  const currentRightImage = currentBatchRight[currentIndex];

  // Go to the previous image
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Function to save hover times and first hover sides to the database
  const saveHoverTimes = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE_URL}/task/create`,
        {
          time_on_negative: hoverTimeImage1 / 360,
          time_on_positive: hoverTimeImage2 / 360,
          firstHoverSideImage1,
          firstHoverSideImage2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error saving hover times", error);
    }
  };

  // Handle mouse movement for image 1
  const handleMouseMoveImage1 = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect(); // Get image's position relative to the page
    setMousePositionImage1({
      x: event.clientX - rect.left, // Calculate the mouse position relative to the image
      y: event.clientY - rect.top,
    });
  };

  // Handle mouse movement for image 2
  const handleMouseMoveImage2 = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect(); // Get image's position relative to the page
    setMousePositionImage2({
      x: event.clientX - rect.left, // Calculate the mouse position relative to the image
      y: event.clientY - rect.top,
    });
  };

  useEffect(() => {
    const lastImageIndex = currentBatchLeft.length - 1;
    const lastBatchIndex = totalBatches - 1;

    // Check if we're on the last image of the current batch
    if (currentIndex === lastImageIndex) {
      setIsLastImageOfBatch(true);
    } else {
      setIsLastImageOfBatch(false);
    }

    // Check if we're on the last batch
    if (currentBatchIndex === lastBatchIndex) {
      setIsLastBatch(true);
    } else {
      setIsLastBatch(false);
    }
  }, [currentIndex, currentBatchLeft.length, currentBatchIndex, totalBatches]);

  const handleSubmit = async () => {
    try {
      await saveHoverTimes();

      if (isLastImageOfBatch && isLastBatch) {
        setIsLastBatchSubmitted(true);
      } else {
        setCurrentBatchIndex((prevBatch) => prevBatch + 1);
        setCurrentIndex(0);
      }
      toast.success("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting hover data", error);
    }
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <div className="image-container">
        {/* Image 1 */}
        {currentLeftImage && (
          <div
            className="image-wrapper"
            onMouseEnter={handleMouseEnterImage1}
            onMouseLeave={handleMouseLeaveImage1}
            onMouseMove={handleMouseMoveImage1}
          >
            <img
              src={require(`../../assests/cannabis/${currentLeftImage}`)}
              alt={`image ${currentIndex + 1}`}
              className="image"
            />
            <div
              className="overlay"
              style={
                {
                  "--mouse-x": `${mousePositionImage1.x}px`,
                  "--mouse-y": `${mousePositionImage1.y}px`,
                  maskImage: isHoveringImage1
                    ? "radial-gradient(circle at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 15%, rgba(0, 0, 0, 0.6) 16%)"
                    : "none",
                  WebkitMaskImage: isHoveringImage1
                    ? "radial-gradient(circle at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 15%, rgba(0, 0, 0, 0.6) 16%)"
                    : "none",
                } as React.CSSProperties
              }
            />
          </div>
        )}
        {/* Image 2 */}
        {currentRightImage && (
          <div
            className="image-wrapper"
            onMouseEnter={handleMouseEnterImage2}
            onMouseLeave={handleMouseLeaveImage2}
            onMouseMove={handleMouseMoveImage2}
          >
            <img
              src={require(`../../assests/neutral/${currentRightImage}`)}
              alt={`Image ${currentIndex + 1}`}
              className="image"
            />
            <div
              className="overlay"
              style={
                {
                  "--mouse-x": `${mousePositionImage2.x}px`,
                  "--mouse-y": `${mousePositionImage2.y}px`,
                  maskImage: isHoveringImage2
                    ? "radial-gradient(circle at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 15%, rgba(0, 0, 0, 0.6) 16%)"
                    : "none",
                  WebkitMaskImage: isHoveringImage2
                    ? "radial-gradient(circle at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 15%, rgba(0, 0, 0, 0.6) 16%)"
                    : "none",
                } as React.CSSProperties
              }
            />
          </div>
        )}
      </div>
      <Box mt={3} textAlign="center">
        <div
          className="controls"
          style={{ display: "flex", justifyContent: "center", gap: "16px" }}
        >
          {isLastBatchSubmitted ? (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Refresh to do the task again.
            </Typography>
          ) : (
            <>
              {currentIndex > 0 && (
                <Button
                  onClick={handlePrevious}
                  color="primary"
                  variant="contained"
                  style={{ marginRight: "16px", width: "120px" }}
                >
                  Previous
                </Button>
              )}
              {isLastImageOfBatch ? (
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  style={{ width: "120px" }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  color="primary"
                  variant="contained"
                  style={{ width: "120px" }}
                >
                  Next
                </Button>
              )}
            </>
          )}
        </div>

        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2 }} mt={2}>
          Not sure how to do a task? Go to the <a href="/tutorial">tutorials</a>{" "}
          and find out.
        </Typography>
      </Box>
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

export default ImageHoverTracker;
