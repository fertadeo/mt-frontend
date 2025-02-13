// UserContext.tsx

"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

export interface Team {
  name: string;
  logo: string;
  plan: string;
}

export interface Module {
  name: string;
  url: string;
  icon: string;
}

export interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  domain: string;
  password: string;
  avatar: string;
  teams: Team[];
  modules: Module[];
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Manejar la hidratación
  useEffect(() => {
    setIsClient(true);
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  const setUserWithSerialization = (newUser: User | null) => {
    if (newUser) {
      const serializableUser = {
        ...newUser,
        teams: newUser.teams.map(team => ({
          ...team,
          logo: typeof team.logo === 'string' ? team.logo : 'default-logo',
        })),
        modules: newUser.modules.map(module => ({
          ...module,
          icon: typeof module.icon === 'string' ? module.icon : 'default-icon',
        })),
      };
      setUser(serializableUser);
      localStorage.setItem('user', JSON.stringify(serializableUser));
    } else {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  // No renderizar nada hasta que estemos en el cliente
  if (!isClient) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithSerialization }}>
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
