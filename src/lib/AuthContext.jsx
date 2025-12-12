import React, { createContext, useState, useContext, useEffect } from 'react';

// Simplified Auth Context for HustleXP
// This is a minimal auth context for the landing page - can be expanded later with Firebase Auth

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  // For the landing page, we don't need auth - just render the content
  useEffect(() => {
    // No authentication needed for the coming-soon landing page
    setIsLoadingAuth(false);
    setIsLoadingPublicSettings(false);
  }, []);

  const navigateToLogin = () => {
    // Placeholder - can implement Firebase Auth later
    console.log('Login not implemented yet');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoadingAuth,
      isLoadingPublicSettings,
      isAuthenticated,
      user,
      authError,
      navigateToLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
