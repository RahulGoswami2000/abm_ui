import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Pages/Auth/AuthContext";
import LoginSignUp from "./Pages/Auth/Signup";
import PrivateRoute from "./Pages/Auth/PrivateRoute";
import Dashboard from "./Pages/Home/Dashboard";
import Profile from "./Pages/Profile/Profile";
import ImageHoverTracker from "./Pages/UserTask/UserTask";
import Home from "./Pages/Lander/Home";
import Progress from "./Pages/Feedback/Progress";
import Rewards from "./Pages/Rewards/Rewards";
import Tutorial from "./Pages/Tutorial/Tutorial";
import CannabisSurvey from "./Pages/Auth/Survey";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<LoginSignUp />}></Route>
        <Route path="/survey" element={<CannabisSurvey />}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <Progress />
            </PrivateRoute>
          }
        />
        <Route
          path="/rewards"
          element={
            <PrivateRoute>
              <Rewards />
            </PrivateRoute>
          }
        />
        <Route
          path="/tutorial"
          element={
            <PrivateRoute>
              <Tutorial />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-task"
          element={<ImageHoverTracker></ImageHoverTracker>}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
