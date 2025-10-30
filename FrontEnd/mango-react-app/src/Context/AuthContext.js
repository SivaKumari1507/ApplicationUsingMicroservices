import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('token', tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('cartCount');
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken && !isTokenExpired(storedToken)) {
      const decoded = jwtDecode(storedToken);
      const restoredUser = {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      };
      setUser(restoredUser);
      setToken(storedToken);
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);