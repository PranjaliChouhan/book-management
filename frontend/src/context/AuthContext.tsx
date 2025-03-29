import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  useEffect(() => {
    console.log("AuthContext useEffect running with token:", token ? "exists" : "null");
    if (token) {
      console.log("Setting Authorization header and fetching profile");
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      fetchProfile();
    } else {
      console.log("Clearing Authorization header and auth state");
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      console.log('Authorization header:', api.defaults.headers.common['Authorization']);
      
      const { data } = await api.get('/api/auth/profile');
      console.log('Profile data:', data);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      // Only clear token for specific errors, not for all profile fetch errors
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.log("Clearing token due to auth error");
        setToken(null);
      } else {
        // For other errors (network, etc), still set authenticated
        console.log("Setting authenticated despite profile fetch error");
        setIsAuthenticated(true);
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      console.log('Login response:', data);
      setToken(data.token);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      console.log('Registration response:', data);
      setToken(data.token);
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 