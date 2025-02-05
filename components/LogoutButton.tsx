"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    // Limpia el usuario del contexto
    setUser(null);
    // Redirige a la página de login
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}
