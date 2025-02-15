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

// COMPONENTES DEL MÓDULO DE PROVEEDORES
import ProvidersList from "@/components/proveedores/ProvidersList";
import ProviderDetail from "@/components/proveedores/ProviderDetail";
import ProviderForm from "@/components/proveedores/ProviderForm";
import Modal from "@/components/ui/Modal";
import { Provider } from "@/components/proveedores/types";

// Dummy data: algunos proveedores ficticios
const initialProviders: Provider[] = [
  {
    id: "1",
    nombreProveedor: "Proveedor Uno",
    contactoPrincipal: "Juan Pérez",
    telefono: "123456789",
    correo: "proveedor1@example.com",
    direccion: "Calle Principal 123",
    idFiscal: "20-12345678-9",
    condicionesPago: "30 días",
    plazoEntrega: "5 días",
    productosSuministra: "Producto A, Producto B",
    historialPedidos: "Pedido 1, Pedido 2",
    calificacion: 4.5,
    notas: "Proveedor confiable y puntual.",
    estado: "activo",
    fechaRegistro: "2023-01-01",
    docAdjunta: "",
    categoriaProveedor: "Mayorista",
    contactoSecundario: "María López",
  },
  // Puedes agregar más proveedores dummy
];

const ProvidersModule: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleSelectProvider = (provider: Provider) => {
    setSelectedProvider(provider);
  };

  const handleCloseModal = () => {
    if (isCreating) {
      setIsCreating(false);
    } else {
      setSelectedProvider(null);
    }
  };

  const handleCreateProvider = () => {
    setIsCreating(true);
  };

  const handleSubmitForm = (provider: Provider) => {
    if (selectedProvider) {
      // Modo edición
      setProviders((prev) =>
        prev.map((p) => (p.id === provider.id ? provider : p))
      );
      setSelectedProvider(provider);
    } else {
      // Modo creación
      setProviders((prev) => [...prev, provider]);
    }
    setIsCreating(false);
  };

  const handleUpdateProvider = (provider: Provider) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === provider.id ? provider : p))
    );
    setSelectedProvider(provider);
  };

  const isModalOpen = selectedProvider || isCreating;

  return (
    <div className="p-4 relative">
      {/* La lista siempre se muestra; se le aplica blur si hay modal activo */}
      <div
        className={
          isModalOpen
            ? "filter blur-sm transition duration-300 ease-in-out"
            : "filter blur-none transition duration-300 ease-in-out"
        }
      >
        <ProvidersList
          providers={providers}
          onSelectProvider={handleSelectProvider}
          onCreateProvider={handleCreateProvider}
        />
      </div>

      {/* Modal para detalle o formulario */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="transition-all duration-50">
            {selectedProvider && !isCreating && (
              <ProviderDetail
                provider={selectedProvider}
                onClose={handleCloseModal}
                onUpdateProvider={handleUpdateProvider}
              />
            )}
            {isCreating && (
              <ProviderForm
                onSubmit={handleSubmitForm}
                onCancel={handleCloseModal}
                existingEmails={providers.map((p) => p.correo)}
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

  /* Si se requiere redirigir si no hay usuario:
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  if (!user) return null;
  */

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header del Dashboard */}
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
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
                <BreadcrumbPage>Proveedores</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {/* Contenido principal */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ProvidersModule />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
