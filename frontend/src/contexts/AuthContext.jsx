import React, { useState } from "react";
import api from "../api";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [token, setToken] = useState(null);

  const login = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = async () => {
    try {
      await api.signout();
      localStorage.removeItem("selectedTask");
    } catch (error) {
      alert("Не удалось выйти из системы.");
    } finally {
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
