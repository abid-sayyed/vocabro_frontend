// AuthenticationContext.tsx (or whatever your file is named)
import React from 'react';

// Define the interface for the context value
interface AuthenticationContextValue {
  loginState: boolean;
  setLoginState: (value: boolean) => void;
}

// Define the default context value
const defaultAuthContextValue: AuthenticationContextValue = {
  loginState: false,
  setLoginState: () => {}, // This is a placeholder, but should be defined in the provider
};

// Create the context

const AuthenticationContext = React.createContext<AuthenticationContextValue >(defaultAuthContextValue);

export default AuthenticationContext;
