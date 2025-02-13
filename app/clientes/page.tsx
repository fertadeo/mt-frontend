"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

// COMPONENTES DEL DASHBOARD (Sidebar, Header, Breadcrumb, etc.)
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// COMPONENTES DEL MODULO DE CLIENTES
import ClientsList from "@/components/clientes/ClientsList";
import ClientDetail from "@/components/clientes/ClientDetail";
import ClientForm from "@/components/clientes/ClientForm";
import Modal from "@/components/ui/Modal";
import { Client } from "@/components/clientes/types";

// --------------------------
// Dummy data: se simulan 15 clientes
// (aquí se muestran 15 clientes ficticios; en el futuro, estos datos se obtendrán del backend)
// --------------------------
const initialClients: Client[] = [
  {
    id: "1",
    apellido: "Pérez",
    nombre: "Juan",
    correo: "juan@example.com",
    telefono: "123456789",
    direccion: "Calle 1, Ciudad",
    fechaRegistro: "2023-01-01",
    estado: "activo",
    transactions: [
      { id: "t1", fecha: "2023-02-01", monto: 100, estado: "completado" },
      { id: "t2", fecha: "2023-03-10", monto: 50, estado: "pendiente" },
    ],
    notes: "Cliente VIP. Le interesan promociones.",
  },
  {
    id: "2",
    apellido: "García",
    nombre: "María",
    correo: "maria@example.com",
    telefono: "987654321",
    direccion: "Calle 2, Ciudad",
    fechaRegistro: "2023-01-02",
    estado: "activo",
    transactions: [],
    notes: "",
  },
  {
    id: "3",
    apellido: "López",
    nombre: "Carlos",
    correo: "carlos@example.com",
    telefono: "555123456",
    direccion: "Avenida 3, Ciudad",
    fechaRegistro: "2023-01-03",
    estado: "activo",
    transactions: [
      { id: "t3", fecha: "2023-02-15", monto: 200, estado: "completado" },
    ],
    notes: "Cliente frecuente. Prefiere pagos en efectivo.",
  },
  {
    id: "4",
    apellido: "Martínez",
    nombre: "Ana",
    correo: "ana@example.com",
    telefono: "555987654",
    direccion: "Calle 4, Ciudad",
    fechaRegistro: "2023-01-04",
    estado: "inactivo",
    transactions: [],
    notes: "Cliente inactivo desde 2023-02-01.",
  },
  {
    id: "5",
    apellido: "Rodríguez",
    nombre: "Luis",
    correo: "luis@example.com",
    telefono: "555456789",
    direccion: "Calle 5, Ciudad",
    fechaRegistro: "2023-01-05",
    estado: "activo",
    transactions: [
      { id: "t4", fecha: "2023-03-01", monto: 150, estado: "completado" },
      { id: "t5", fecha: "2023-03-20", monto: 75, estado: "pendiente" },
    ],
    notes: "Cliente nuevo. Interesado en descuentos.",
  },
  {
    id: "6",
    apellido: "Gómez",
    nombre: "Laura",
    correo: "laura@example.com",
    telefono: "555321654",
    direccion: "Avenida 6, Ciudad",
    fechaRegistro: "2023-01-06",
    estado: "activo",
    transactions: [
      { id: "t6", fecha: "2023-02-10", monto: 300, estado: "completado" },
    ],
    notes: "Cliente preferente. Contactar para ofertas especiales.",
  },
  {
    id: "7",
    apellido: "Fernández",
    nombre: "Pedro",
    correo: "pedro@example.com",
    telefono: "555654321",
    direccion: "Calle 7, Ciudad",
    fechaRegistro: "2023-01-07",
    estado: "activo",
    transactions: [],
    notes: "",
  },
  {
    id: "8",
    apellido: "Díaz",
    nombre: "Sofía",
    correo: "sofia@example.com",
    telefono: "555789123",
    direccion: "Avenida 8, Ciudad",
    fechaRegistro: "2023-01-08",
    estado: "activo",
    transactions: [
      { id: "t7", fecha: "2023-03-05", monto: 120, estado: "completado" },
    ],
    notes: "Cliente satisfecho. Recomendó a otros clientes.",
  },
  {
    id: "9",
    apellido: "Hernández",
    nombre: "Jorge",
    correo: "jorge@example.com",
    telefono: "555321987",
    direccion: "Calle 9, Ciudad",
    fechaRegistro: "2023-01-09",
    estado: "inactivo",
    transactions: [],
    notes: "Cliente inactivo desde 2023-02-15.",
  },
  {
    id: "10",
    apellido: "Torres",
    nombre: "Carmen",
    correo: "carmen@example.com",
    telefono: "555987321",
    direccion: "Avenida 10, Ciudad",
    fechaRegistro: "2023-01-10",
    estado: "activo",
    transactions: [
      { id: "t8", fecha: "2023-03-12", monto: 90, estado: "pendiente" },
    ],
    notes: "Cliente con preferencia por productos orgánicos.",
  },
  {
    id: "11",
    apellido: "Ramírez",
    nombre: "Diego",
    correo: "diego@example.com",
    telefono: "555123789",
    direccion: "Calle 11, Ciudad",
    fechaRegistro: "2023-01-11",
    estado: "activo",
    transactions: [
      { id: "t9", fecha: "2023-02-20", monto: 250, estado: "completado" },
    ],
    notes: "Cliente con alto potencial de compra.",
  },
  {
    id: "12",
    apellido: "Vargas",
    nombre: "Patricia",
    correo: "patricia@example.com",
    telefono: "555789456",
    direccion: "Avenida 12, Ciudad",
    fechaRegistro: "2023-01-12",
    estado: "activo",
    transactions: [],
    notes: "",
  },
  {
    id: "13",
    apellido: "Morales",
    nombre: "Ricardo",
    correo: "ricardo@example.com",
    telefono: "555456123",
    direccion: "Calle 13, Ciudad",
    fechaRegistro: "2023-01-13",
    estado: "activo",
    transactions: [
      { id: "t10", fecha: "2023-03-15", monto: 180, estado: "completado" },
    ],
    notes: "Cliente con interés en productos tecnológicos.",
  },
  {
    id: "14",
    apellido: "Ortega",
    nombre: "Isabel",
    correo: "isabel@example.com",
    telefono: "555654789",
    direccion: "Avenida 14, Ciudad",
    fechaRegistro: "2023-01-14",
    estado: "inactivo",
    transactions: [],
    notes: "Cliente inactivo desde 2023-02-28.",
  },
  {
    id: "15",
    apellido: "Reyes",
    nombre: "Fernando",
    correo: "fernando@example.com",
    telefono: "555321654",
    direccion: "Calle 15, Ciudad",
    fechaRegistro: "2023-01-15",
    estado: "activo",
    transactions: [
      { id: "t11", fecha: "2023-03-18", monto: 220, estado: "pendiente" },
    ],
    notes: "Cliente con preferencia por productos de lujo.",
  },
];

// ---------------------------------------------------------
// Componente interno que encapsula la lógica del módulo de clientes
// ---------------------------------------------------------
const ClientsModule: React.FC = () => {
  // Estados para la gestión de clientes
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Handlers para selección, creación, edición y cancelación
  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
  };

  // Al cerrar el modal se resetea el estado (detalle o creación)
  const handleCloseModal = () => {
    // Se cierra el modal sin guardar cambios
    if (isCreating) {
      setIsCreating(false);
    } else {
      setSelectedClient(null);
    }
  };

  const handleCreateClient = () => {
    setIsCreating(true);
  };

  const handleSubmitForm = (client: Client) => {
    if (selectedClient) {
      // Modo edición: actualizar el cliente existente.
      setClients((prev) =>
        prev.map((c) => (c.id === client.id ? client : c))
      );
      setSelectedClient(client);
    } else {
      // Modo creación: agregar el nuevo cliente.
      setClients((prev) => [...prev, client]);
    }
    setIsCreating(false);
  };

  const handleUpdateClient = (client: Client) => {
    setClients((prev) =>
      prev.map((c) => (c.id === client.id ? client : c))
    );
    setSelectedClient(client);
  };

  // Si está activo el detalle o el formulario, consideramos "modal abierto"
  const isModalOpen = selectedClient || isCreating;

  return (
    <div className="p-4 relative">
      {/* Fondo: siempre se renderiza la lista. Se le aplica blur cuando hay modal abierto */}
      <div className={isModalOpen ? "filter blur-sm transition duration-300 ease-in-out" : "filter blur-none transition duration-300 ease-in-out"}>
        <ClientsList
          clients={clients}
          onSelectClient={handleSelectClient}
          onCreateClient={handleCreateClient}
        />
      </div>

      {/* Modal: se renderiza si hay detalle o formulario activo */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className={isModalOpen ? "transition-all duration-50 opacity-100 scale-100" : "transition-all duration-50 opacity-0 scale-95"}>
            {selectedClient && !isCreating && (
              <ClientDetail
                client={selectedClient}
                onClose={handleCloseModal}
                onUpdateClient={handleUpdateClient}
              />
            )}
            {isCreating && (
              <ClientForm
                onSubmit={handleSubmitForm}
                onCancel={handleCloseModal}
                existingEmails={clients.map((c) => c.correo)}
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  /* // Si no hay usuario autenticado, redirige al login.
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Mientras se verifica o no haya usuario, se puede renderizar un loader.
  if (!user) {
    return null;
  }
  */
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header del Dashboard */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Clientes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {/* Contenido principal: se renderiza el módulo de clientes (con modal si es necesario) */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ClientsModule />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
