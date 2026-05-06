import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for token and user on mount
    const storedUser = localStorage.getItem('clothiq_user');
    const storedToken = localStorage.getItem('clothiq_token');
    const storedRefreshToken = localStorage.getItem('clothiq_refresh_token');
    
    if (storedUser && storedToken && storedToken !== 'undefined') {
      try {
        if (storedUser !== 'undefined') {
          setUser(JSON.parse(storedUser));
        }
        setToken(storedToken);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('clothiq_user');
        localStorage.removeItem('clothiq_token');
        localStorage.removeItem('clothiq_refresh_token');
      }
    }
    setIsLoading(false);
  }, []);

  // Axios Interceptor for handling token expiration (401 Unauthorized)
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If error is 401 (Unauthorized), it means token is expired or invalid
        if (error.response?.status === 401) {
          const isLoginRequest = error.config.url.includes('/login');
          const hasToken = !!localStorage.getItem('clothiq_token');
          
          if (!isLoginRequest && hasToken) {
            console.warn("Token expired or unauthorized. Logging out...");
            
            // Check if we are already on the login page to avoid infinite loops
            if (!window.location.pathname.includes('/login')) {
              logout();
              alert("Your session has expired. Please log in again to continue.");
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [token]);

  const login = (userData, userToken, refreshToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('clothiq_user', JSON.stringify(userData));
    localStorage.setItem('clothiq_token', userToken);
    if (refreshToken) {
      localStorage.setItem('clothiq_refresh_token', refreshToken);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(`${BASE_URL}/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('clothiq_user');
      localStorage.removeItem('clothiq_token');
      localStorage.removeItem('clothiq_refresh_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
