import { createContext, useRef, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
