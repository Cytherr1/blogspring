"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext<string | null>(null)

export function AuthProvider({ children } : { 
	children : React.ReactNode
}) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if(localStorage.getItem("userId")) {
      setUserId(localStorage.getItem("userId"))
    }
  } ,[userId])

  return (
    <AuthContext.Provider value={userId}>
      {
        children
      }
    </AuthContext.Provider>
  );
}