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
  const [isHoveringImage1, setIsHoveringImage1] = useState(false);
  const [isHoveringImage2, setIsHoveringImage2] = useState(false);
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
      setHoverTimeImage1(
        (prevTime) => prevTime + (Date.now() - hoverStartTimeImage1)
      );
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
      setHoverTimeImage2(
        (prevTime) => prevTime + (Date.now() - hoverStartTimeImage2)
      );
      setHoverStartTimeImage2(null);
    }
    setIsHoveringImage2(false); // Set hover state to false
  };

  // Function to save hover times and first hover sides to the database
  const saveHoverTimes = async () => {
    try {
      await axios.post("/api/hoverTimes", {
        image1Time: hoverTimeImage1,
        image2Time: hoverTimeImage2,
        firstHoverSideImage1,
        firstHoverSideImage2,
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
  }, [
    hoverTimeImage1,
    hoverTimeImage2,
    firstHoverSideImage1,
    firstHoverSideImage2,
  ]); // Runs when hover times or sides change

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
      </div>
    </>
  );
};

export default ImageHoverTracker;
