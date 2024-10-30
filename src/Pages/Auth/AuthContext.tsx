import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Create the AuthContext with a default value (e.g., an empty object)
const AuthContext = createContext({
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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for an existing auth state
    return JSON.parse(localStorage.getItem("isAuthenticated") || "false");
  });

  // Update localStorage when isAuthenticated changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
