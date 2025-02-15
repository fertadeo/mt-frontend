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

// COMPONENTES DEL MÓDULO DE PRODUCTOS
import ProductsList from "@/components/productos/ProductsList";
import ProductDetail from "@/components/productos/ProductDetail";
import ProductForm from "@/components/productos/ProductForm";
import Modal from "@/components/ui/Modal";
import { Product } from "@/components/productos/types";

// Dummy data: algunos productos ficticios
const initialProducts: Product[] = [
  {
    id: "1",
    codigoProducto: "P001",
    nombreProducto: "Producto A",
    descripcion: "Descripción del producto A",
    categoria: "Electrónica",
    marca: "Marca X",
    precioCompra: 100,
    precioVenta: 150,
    stockActual: 20,
    stockMinimo: 5,
    proveedorId: "1", // ID del proveedor (relación)
    ubicacionAlmacen: "Estante 1",
    fechaCaducidad: "2024-12-31",
    loteSerie: "L001",
    imagen: "",
    notas: "Producto de alta rotación",
    unidadMedida: "unidad",
    dimensionesPeso: "10x10x10 cm / 500g",
    estado: "activo",
    fechaCreacion: "2023-01-01",
    fechaActualizacion: "2023-03-01",
    promocionesDescuentos:
      "10% de descuento en compras mayores a 10 unidades",
  },
  // Puedes agregar más productos dummy
];

const ProductsModule: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    if (isCreating) {
      setIsCreating(false);
    } else {
      setSelectedProduct(null);
    }
  };

  const handleCreateProduct = () => {
    setIsCreating(true);
  };

  const handleSubmitForm = (product: Product) => {
    if (selectedProduct) {
      // Modo edición
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
      setSelectedProduct(product);
    } else {
      // Modo creación
      setProducts((prev) => [...prev, product]);
    }
    setIsCreating(false);
  };

  const handleUpdateProduct = (product: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? product : p))
    );
    setSelectedProduct(product);
  };

  const isModalOpen = selectedProduct || isCreating;

  return (
    <div className="p-4 relative">
      <div
        className={
          isModalOpen
            ? "filter blur-sm transition duration-300 ease-in-out"
            : "filter blur-none transition duration-300 ease-in-out"
        }
      >
        <ProductsList
          products={products}
          onSelectProduct={handleSelectProduct}
          onCreateProduct={handleCreateProduct}
        />
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="transition-all duration-50">
            {selectedProduct && !isCreating && (
              <ProductDetail
                product={selectedProduct}
                onClose={handleCloseModal}
                onUpdateProduct={handleUpdateProduct}
              />
            )}
            {isCreating && (
              <ProductForm
                onSubmit={handleSubmitForm}
                onCancel={handleCloseModal}
                existingCodes={products.map((p) => p.codigoProducto)}
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

  /* Si se requiere redirigir si no hay usuario autenticado, se puede implementar igual que en Clientes */

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
                <BreadcrumbPage>Productos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {/* Contenido principal */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ProductsModule />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
