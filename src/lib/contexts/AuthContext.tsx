import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, getCurrentUser, isAuthenticated, logout, updateUserPreferences } from "@/lib/services/authService";
import { Language } from "@/lib/translations";

// Define the context shape
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setUserLanguage: (language: Language) => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  logout: () => {},
  updateUser: () => {},
  setUserLanguage: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = isAuthenticated();
      if (isLoggedIn) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  // Update user data
  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    updateUserPreferences(data);
    setUser(updatedUser);
  };

  // Set user language preference
  const setUserLanguage = (language: Language) => {
    updateUser({ language });
  };

  // Context value
  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    logout: handleLogout,
    updateUser,
    setUserLanguage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
