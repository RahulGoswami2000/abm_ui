import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Pages/Auth/AuthContext";
import Login from "./Pages/Auth/Login";
import LoginSignUp from "./Pages/Auth/Signup";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>

      <Routes>
        <Route path="/auth" element={<LoginSignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
