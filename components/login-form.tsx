"use client";

// import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, User } from "@/context/UserContext"; // Asegúrate de exportar User desde el contexto
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// --- Definición de módulos y función de mapeo ---
import {
  GalleryVerticalEnd,
  Users,
  ShoppingCart,
  Truck,
  Settings2,
  PieChart,
  AudioWaveform,
  Frame,
} from "lucide-react";
import React from "react";

const centralModules = [
  { name: "Clientes", url: "/clientes", icon: Users },
  { name: "Productos", url: "/productos", icon: ShoppingCart },
  { name: "Proveedores", url: "/proveedores", icon: Truck },
];

const extraModulesByRole: Record<string, { name: string; url: string; icon: React.ElementType }[]> = {
  admin: [
    { name: "Administración", url: "/administracion", icon: Settings2 },
    { name: "Facturación", url: "/facturacion", icon: PieChart },
    { name: "Bidones", url: "/bidones", icon: AudioWaveform },
    { name: "Cortinas a Medida", url: "/cortinas", icon: Frame },
  ],
  sales: [
    { name: "Facturación", url: "/facturacion", icon: PieChart },
    { name: "Cortinas a Medida", url: "/cortinas", icon: Frame },
  ],
  procurement: [
    { name: "Administración", url: "/administracion", icon: Settings2 },
  ],
  logistics: [
    { name: "Bidones", url: "/bidones", icon: AudioWaveform },
  ],
  basic: [] // El usuario básico solo tiene los módulos centrales.
};

function getModulesForUser(role: string) {
  return [
    ...centralModules,
    ...(extraModulesByRole[role] || [])
  ];
}

// --- Lista de usuarios simulados (sin la propiedad "modules") ---
const simulatedUsers = [
  {
    id: 1,
    role: "admin",
    name: "Admin User",
    email: "admin@example.com",
    domain: "admin.example.com",
    password: "Admin1234",
    avatar: "/avatars/admin.jpg",
    teams: [
      { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
    ],
  },
  {
    id: 2,
    role: "sales",
    name: "Sales User",
    email: "sales@example.com",
    domain: "sales.example.com",
    password: "Sales1234",
    avatar: "/avatars/sales.jpg",
    teams: [
      { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
    ],
  },
  {
    id: 3,
    role: "procurement",
    name: "Procurement User",
    email: "procurement@example.com",
    domain: "procurement.example.com",
    password: "Proc1234",
    avatar: "/avatars/procurement.jpg",
    teams: [
      { name: "Acme Corp.", logo: GalleryVerticalEnd, plan: "Startup" },
    ],
  },
  {
    id: 4,
    role: "logistics",
    name: "Logistics User",
    email: "logistics@example.com",
    domain: "logistics.example.com",
    password: "Logi1234",
    avatar: "/avatars/logistics.jpg",
    teams: [
      { name: "Evil Corp.", logo: GalleryVerticalEnd, plan: "Free" },
    ],
  },
  {
    id: 5,
    role: "basic",
    name: "Basic User",
    email: "basic@example.com",
    domain: "basic.example.com",
    password: "Basic1234",
    avatar: "/avatars/basic.jpg",
    teams: [
      { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
    ],
  },
];

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const { setUser, user } = useUser();

  // Solo establecer el usuario si no existe
  React.useEffect(() => {
    if (!user) {
      const devUser: User = {
        ...simulatedUsers[0],
        modules: getModulesForUser('admin').map(module => ({
          name: module.name,
          url: module.url,
          icon: 'default-icon'
        })),
        teams: simulatedUsers[0].teams.map(team => ({
          name: team.name,
          logo: 'default-logo',
          plan: team.plan
        }))
      };
      
      setUser(devUser);
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">LOGIN</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Ingresá tus credenciales
        </p>
      </div>

      {/* {globalError && (
        <p className="text-red-500 text-sm text-center">{globalError}</p>
      )} */}

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label>Dominio de Empresa</Label>
          <Input
            id="dominio"
            name="dominio"
            type="text"
            placeholder="admin.example.com"
            required
          />
          {/* {domainError && (
            <p className="text-red-500 text-sm">{domainError}</p>
          )} */}
          {/*<p className="text-sm text-muted-foreground">
            Ingresa el dominio de tu empresa.
          </p>*/}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          {/* {emailError && (
            <p className="text-red-500 text-sm">{emailError}</p>
          )} */}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Olvidaste el Password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
          {/* {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )} */}
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>

      <div className="text-center text-sm">
        ¿No tienes cuenta?{" "}
        <a href="#" className="underline underline-offset-4">
          Escríbenos
        </a>
      </div>
    </form>
  );
}
