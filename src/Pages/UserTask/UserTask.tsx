import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";
import Header from "../../Component/Header/Header";
import image from "../../assests/mentalhealth.jpeg";
import image1 from "../../assests/sky.jpg";
import "./ImageHoverTracker.css";

const ImageHoverTracker: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [hoverTimeImage1, setHoverTimeImage1] = useState<number>(0);
  const [hoverTimeImage2, setHoverTimeImage2] = useState<number>(0);
  const [hoverStartTimeImage1, setHoverStartTimeImage1] = useState<number | null>(null);
  const [hoverStartTimeImage2, setHoverStartTimeImage2] = useState<number | null>(null);
  const [mousePositionImage1, setMousePositionImage1] = useState({ x: 0, y: 0 });
  const [mousePositionImage2, setMousePositionImage2] = useState({ x: 0, y: 0 });

  // Handle mouse enter and leave for image 1
  const handleMouseEnterImage1 = () => setHoverStartTimeImage1(Date.now());
  const handleMouseLeaveImage1 = () => {
    if (hoverStartTimeImage1 !== null) {
      setHoverTimeImage1(prevTime => prevTime + (Date.now() - hoverStartTimeImage1));
      setHoverStartTimeImage1(null);
    }
  };

  // Handle mouse enter and leave for image 2
  const handleMouseEnterImage2 = () => setHoverStartTimeImage2(Date.now());
  const handleMouseLeaveImage2 = () => {
    if (hoverStartTimeImage2 !== null) {
      setHoverTimeImage2(prevTime => prevTime + (Date.now() - hoverStartTimeImage2));
      setHoverStartTimeImage2(null);
    }
  };

  // Function to save hover times to the database
  const saveHoverTimes = async () => {
    try {
      await axios.post("/api/hoverTimes", {
        image1Time: hoverTimeImage1,
        image2Time: hoverTimeImage2,
      });
    } catch (error) {
      console.error("Error saving hover times", error);
    }
  };

  // Save hover times on component update/unmount
  useEffect(() => {
    // Async function inside useEffect
    const save = async () => {
      await saveHoverTimes();
    };

    // Call the async function
    save();

    // Cleanup function
    return () => {
      // Optionally save again before unmount (if needed)
      save();
    };
  }, [hoverTimeImage1, hoverTimeImage2]); // Runs when hover times change

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

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <div className="image-container">
        {/* Image 1 */}
        <div
          className="image-wrapper"
          onMouseEnter={handleMouseEnterImage1}
          onMouseLeave={handleMouseLeaveImage1}
          onMouseMove={handleMouseMoveImage1}
        >
          <img src={image} alt="Image 1" className="image" />
          <div
            className="overlay"
            style={{
              "--mouse-x": `${mousePositionImage1.x}px`,
              "--mouse-y": `${mousePositionImage1.y}px`,
            } as React.CSSProperties}
          ></div>
          <p className="hover-time">Time spent on Image 1: {(hoverTimeImage1 / 1000).toFixed(2)}s</p>
        </div>

        {/* Image 2 */}
        <div
          className="image-wrapper"
          onMouseEnter={handleMouseEnterImage2}
          onMouseLeave={handleMouseLeaveImage2}
          onMouseMove={handleMouseMoveImage2}
        >
          <img src={image1} alt="Image 2" className="image" />
          <div
            className="overlay"
            style={{
              "--mouse-x": `${mousePositionImage2.x}px`,
              "--mouse-y": `${mousePositionImage2.y}px`,
            } as React.CSSProperties}
          ></div>
          <p className="hover-time">Time spent on Image 2: {(hoverTimeImage2 / 1000).toFixed(2)}s</p>
        </div>
      </div>
    </>
  );
};

export default ImageHoverTracker;
