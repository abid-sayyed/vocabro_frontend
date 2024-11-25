"use client";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import AuthenticationContext from "./AuthenticationContext";
import { HttpHookService } from "@/services/HttpHookService";

const AuthenticationContextProvider = ({ children }: { children: ReactNode }) => {
  // Helper function to get login state from localStorage
  const getLoginState = (): boolean => {
    if (typeof window !== "undefined") {
      const storedLoginState = localStorage.getItem("isLoggedIn");
      return storedLoginState ? JSON.parse(storedLoginState) : false;
    }
    return false;
  };

  const [loginState, setLoginState] = useState<boolean>(getLoginState);
  const { sepcialPost } = HttpHookService();

  const validateUserUsingRefreshToken = async (): Promise<boolean> => {
    try {
      const response = await sepcialPost("/user/refresh-token");
      return response.status === 200;
    } catch (error) {
      console.error("Error validating user using refresh token:", error);
      return false;
    }
  };

  //first time login state update
  const updateLoginState = async () => {
    if (!loginState) {
      const isValid = await validateUserUsingRefreshToken();
      if (isValid) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        setLoginState(true);
      }else {
        localStorage.setItem("isLoggedIn", JSON.stringify(false)); // login state is already false
    }
    }
  };

  useEffect(() => {

    if (!getLoginState()) {
      return;
    }
    if (!loginState || getLoginState()) { // storage login state is true but login state is false. so update it using refresh token
      updateLoginState();
    }
  }
  , []); 

  

  // Handle login state validation and set interval for refreshing token
  useEffect(() => {
    if (loginState) {
      const interval = setInterval(async () => {
        const isValid = await validateUserUsingRefreshToken();
        if (!isValid) {
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
          setLoginState(false);
        }
      }, 10 * 60 * 1000); // Refresh every 10 minutes

      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [loginState]); // Only run the effect when loginState changes
  

  return (
    <AuthenticationContext.Provider value={{ loginState, setLoginState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
