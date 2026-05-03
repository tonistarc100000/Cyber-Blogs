//

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("adminName");
    if (token) setAdmin({ token, name });
  }, []);

  const loginAdmin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("adminName", data.name);
    setAdmin(data);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
