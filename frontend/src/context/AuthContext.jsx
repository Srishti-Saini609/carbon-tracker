import { createContext, useState, useEffect, useContext } from 'react';
import * as apiService from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount — with safe JSON parse
    try {
      const storedUser = localStorage.getItem('carbon_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.token) {
          setUser(parsed);
        } else {
          localStorage.removeItem('carbon_user');
        }
      }
    } catch {
      // Corrupted localStorage data
      localStorage.removeItem('carbon_user');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await apiService.login({ email, password });
    setUser(data);
    localStorage.setItem('carbon_user', JSON.stringify(data));
    return data;
  };

  const register = async (name, email, password) => {
    const data = await apiService.register({ name, email, password });
    setUser(data);
    localStorage.setItem('carbon_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carbon_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
