import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AuthService, { User } from '../services/AuthService';

// Create context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refreshAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Use useCallback to memoize the refreshAuthState function
  const refreshAuthState = useCallback(() => {
    console.log('Refreshing auth state...');
    const currentUser = AuthService.initUser();
    console.log('Current user from localStorage:', currentUser);
    
    if (currentUser.isAuthenticated) {
      setUser(currentUser);
      setIsAuthenticated(true);
      console.log('User is authenticated, state updated');
    } else {
      setUser(null);
      setIsAuthenticated(false);
      console.log('User is not authenticated');
    }
  }, []);

  useEffect(() => {
    // Check if user is already authenticated on component mount
    console.log('AuthProvider mounted, checking authentication');
    refreshAuthState();
    
    // Add event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        console.log('User data changed in localStorage, refreshing state');
        refreshAuthState();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshAuthState]); // Add refreshAuthState to dependencies

  const login = useCallback(() => {
    AuthService.googleAuth();
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    refreshAuthState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
