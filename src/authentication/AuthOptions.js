import React, { createContext, useState } from "react";

export const AuthOptions = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [customerId, setCustomerId] = useState(null);

  const login = (username,customerId) => {
    setAuth(true);
    setUsername(username);
    setCustomerId(customerId);
  };
  const logout = () => {
    setAuth(false);
    setUsername("");
    setCustomerId(null);
  };

  return (
    <AuthOptions.Provider value={{ auth, username, customerId, login, logout }}>
      {children}
    </AuthOptions.Provider>
  );
};
