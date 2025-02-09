"use client";

import * as React from "react";
import { useUser } from "@/context/UserContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/team-switcher";
import { NavUser } from "@/components/nav-user";
import { useSidebar } from "@/components/ui/sidebar";
// Si usas Next.js 13 (app router)
import { usePathname } from "next/navigation";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  if (!user) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={user.teams} />
      </SidebarHeader>
      <SidebarContent>
        <div className="p-4">
          {/* Solo se muestra el título completo cuando no está colapsado */}
          {!collapsed && (
            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              Módulos
            </h3>
          )}
          <ul className="space-y-2">
            {user.modules.map((module) => {
              const isActive = pathname === module.url;
              return (
                <li key={module.name}>
                  <a
                    href={module.url}
                    className={`flex w-full items-center p-2 rounded transition-colors duration-200 ease-in-out ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-200"
                    } ${collapsed ? "justify-center" : "gap-2"}`}
                  >
                    <div
                      // En estado expandido se usa un ancho mínimo para alinear el ícono junto al texto.
                      // En estado colapsado, basta con centrar el ícono sin forzar su contenedor a ocupar el 100%.
                      className={`flex justify-center ${!collapsed ? "min-w-[1.5rem]" : ""}`}
                    >
                      <module.icon className="h-4 w-4" />
                    </div>
                    {/* El nombre del módulo solo se muestra cuando el sidebar no está colapsado */}
                    {!collapsed && <span>{module.name}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
