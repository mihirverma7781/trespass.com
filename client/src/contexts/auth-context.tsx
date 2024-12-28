"use client";

import {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";

// Define the type for the context value
interface AuthContextType {
  currentUser: any;
  setCurrentUser: Dispatch<SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType | any>(null);

export const AuthProvider = ({
  children,
  userData,
}: {
  children: ReactNode;
  userData: any;
}) => {
  const [currentUser, setCurrentUser] = useState(userData);

  return (
    <AuthContext.Provider
      value={{ userData: currentUser, setUserData: setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const currentUser = useContext(AuthContext);
  if (!currentUser) {
    throw new Error("useData must be used within a DataProvider");
  }
  return currentUser;
};
