// UserContext.tsx

"use client";

import React, { createContext, useState, useContext } from "react";

export interface Team {
  name: string;
  logo: React.ElementType; // Ahora es un componente, no un string (URL por ejemplo)
  plan: string;
}

export interface Module {
  name: string;
  url: string;
  icon: React.ElementType;
}

export interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  domain: string;
  password: string;
  avatar: string;
  teams: Team[]; // Actualizado a un arreglo de objetos Team
  modules: Module[];
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
