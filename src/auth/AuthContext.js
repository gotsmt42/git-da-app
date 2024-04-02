import { createContext, useContext, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check for JWT in local storage or wherever you store the token
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate({ state: { from: location } });

      setLoggedIn(true);
    }
  }, []);

  console.log("Login: " + isLoggedIn);

  const login = (newToken, payload) => {
    // Store the token in local storage or wherever you prefer
    localStorage.setItem("payload", JSON.stringify(payload));
    localStorage.setItem("token", newToken);

    setLoggedIn(true);
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem("payload");
    localStorage.removeItem("token");

    setLoggedIn(false);
    navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
