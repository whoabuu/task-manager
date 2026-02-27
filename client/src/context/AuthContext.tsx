import  { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react'; 
import api from '../api/axios';

// 1. Define the TypeScript Types
interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 2. Create the Context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in when the app loads (Page Refresh)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // We will build this quick backend route next!
        const response = await api.get('/auth/me'); 
        setUser(response.data);
      } catch (error) {
        // If it fails, it just means the cookie is missing or expired. No big deal.
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    setUser(response.data.user || response.data); // Adjust depending on exact backend response shape
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    setUser(response.data.user || response.data);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {/* Do not render the app until we know if the user is logged in or not */}
      {!isLoading ? children : <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}
    </AuthContext.Provider>
  );
};

// 4. Create a custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};