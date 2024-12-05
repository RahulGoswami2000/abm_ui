import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
// Create the AuthContext with a default value (e.g., an empty object)
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Custom hook for accessing auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Define props type for AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const API_BASE_URL = "https://abm-api-sutg.onrender.com";
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for an existing auth state
    const storedAuthState = localStorage.getItem("isAuthenticated");
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });

  // Update localStorage when isAuthenticated changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = () => setIsAuthenticated(true);
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
