// File: app/src/components/clientes/ClientsList.tsx
"use client";

import React, { useState } from "react";
import { Client } from "./types";
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
import ExportButtons from "./ExportButtons";

interface ClientsListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  onCreateClient: () => void;
}

const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  onSelectClient,
  onCreateClient,
}) => {
  const [filters, setFilters] = useState({
    apellido: "",
    nombre: "",
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

  const filteredClients = clients.filter((client) =>
    client.apellido.toLowerCase().includes(filters.apellido.toLowerCase()) &&
    client.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
    client.correo.toLowerCase().includes(filters.correo.toLowerCase()) &&
    client.telefono.toLowerCase().includes(filters.telefono.toLowerCase()) &&
    client.direccion.toLowerCase().includes(filters.direccion.toLowerCase()) &&
    client.estado.toLowerCase().includes(filters.estado.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Clientes</h2>
        <Button onClick={onCreateClient}>Crear Cliente</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Apellido</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Fecha Registro</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
          <TableRow>
            <TableCell>
              <Input
                value={filters.apellido}
                onChange={(e) =>
                  handleFilterChange("apellido", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.nombre}
                onChange={(e) =>
                  handleFilterChange("nombre", e.target.value)
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
            <TableCell>{/* Sin filtro para fechaRegistro */}</TableCell>
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
          {filteredClients.map((client) => (
            <TableRow
              key={client.id}
              onClick={() => onSelectClient(client)}
              className="cursor-pointer hover:bg-blue-100"
            >
              <TableCell>{client.apellido}</TableCell>
              <TableCell>{client.nombre}</TableCell>
              <TableCell>{client.correo}</TableCell>
              <TableCell>{client.telefono}</TableCell>
              <TableCell>{client.direccion}</TableCell>
              <TableCell>{client.fechaRegistro}</TableCell>
              <TableCell>{client.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <ExportButtons clients={filteredClients} />
      </div>
    </div>
  );
};

export default ClientsList;
