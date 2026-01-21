import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: '',
  });

  const login = (userName) => {
    setAuthState({
      isLoggedIn: true,
      userName: userName,
    });
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      userName: '',
    });
  };

  const value = {
    ...authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
