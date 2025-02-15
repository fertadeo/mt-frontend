"use client";

import React, { useState } from "react";
import { Provider } from "./types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProvidersListProps {
  providers: Provider[];
  onSelectProvider: (provider: Provider) => void;
  onCreateProvider: () => void;
}

const ProvidersList: React.FC<ProvidersListProps> = ({
  providers,
  onSelectProvider,
  onCreateProvider,
}) => {
  const [filters, setFilters] = useState({
    nombreProveedor: "",
    contactoPrincipal: "",
    correo: "",
    telefono: "",
    direccion: "",
    estado: "",
  });

  const handleFilterChange = (
    field: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredProviders = providers.filter((provider) =>
    provider.nombreProveedor
      .toLowerCase()
      .includes(filters.nombreProveedor.toLowerCase()) &&
    provider.contactoPrincipal
      .toLowerCase()
      .includes(filters.contactoPrincipal.toLowerCase()) &&
    provider.correo.toLowerCase().includes(filters.correo.toLowerCase()) &&
    provider.telefono
      .toLowerCase()
      .includes(filters.telefono.toLowerCase()) &&
    provider.direccion
      .toLowerCase()
      .includes(filters.direccion.toLowerCase()) &&
    provider.estado.toLowerCase().includes(filters.estado.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Proveedores</h2>
        <Button onClick={onCreateProvider}>Crear Proveedor</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
          <TableRow>
            <TableCell>
              <Input
                value={filters.nombreProveedor}
                onChange={(e) =>
                  handleFilterChange("nombreProveedor", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.contactoPrincipal}
                onChange={(e) =>
                  handleFilterChange("contactoPrincipal", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.correo}
                onChange={(e) =>
                  handleFilterChange("correo", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.telefono}
                onChange={(e) =>
                  handleFilterChange("telefono", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.direccion}
                onChange={(e) =>
                  handleFilterChange("direccion", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.estado}
                onChange={(e) =>
                  handleFilterChange("estado", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProviders.map((provider) => (
            <TableRow
              key={provider.id}
              onClick={() => onSelectProvider(provider)}
              className="cursor-pointer hover:bg-blue-100"
            >
              <TableCell>{provider.nombreProveedor}</TableCell>
              <TableCell>{provider.contactoPrincipal}</TableCell>
              <TableCell>{provider.correo}</TableCell>
              <TableCell>{provider.telefono}</TableCell>
              <TableCell>{provider.direccion}</TableCell>
              <TableCell>{provider.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProvidersList;
