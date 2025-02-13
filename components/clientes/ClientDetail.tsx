// File: app/src/components/clientes/ClientDetail.tsx
"use client";

import React, { useState } from "react";
import { Client } from "./types";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ClientDetailProps {
  client: Client;
  onClose: () => void;
  onUpdateClient: (client: Client) => void;
}

const ClientDetail: React.FC<ClientDetailProps> = ({
  client,
  onClose,
  onUpdateClient,
}) => {
  const [notes, setNotes] = useState(client.notes);

  const handleSaveNotes = () => {
    // TODO: Integrar llamada al API para actualizar las notas en el backend.
    onUpdateClient({ ...client, notes });
  };

  return (
    <div className="p-4">
      <Button onClick={onClose}>Volver</Button>
      <Tabs defaultValue="info" className="mt-4">
        <TabsList>
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="transacciones">Transacciones</TabsTrigger>
          <TabsTrigger value="notas">Notas</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Datos del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Apellido:</strong> {client.apellido}
              </p>
              <p>
                <strong>Nombre:</strong> {client.nombre}
              </p>
              <p>
                <strong>Correo:</strong> {client.correo}
              </p>
              <p>
                <strong>Teléfono:</strong> {client.telefono}
              </p>
              <p>
                <strong>Dirección:</strong> {client.direccion}
              </p>
              <p>
                <strong>Fecha de Registro:</strong> {client.fechaRegistro}
              </p>
              <p>
                <strong>Estado:</strong> {client.estado}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transacciones">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Transacciones</CardTitle>
            </CardHeader>
            <CardContent>
              {client.transactions.length === 0 ? (
                <p>No hay transacciones registradas.</p>
              ) : (
                // Para simplificar, se usa una tabla HTML; en el futuro se puede refactorizar a los componentes de tabla de shadcn.
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Monto</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.transactions.map((tr) => (
                      <tr key={tr.id}>
                        <td>{tr.fecha}</td>
                        <td>{tr.monto}</td>
                        <td>{tr.estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notas">
          <Card>
            <CardHeader>
              <CardTitle>Notas y Observaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Agregar notas..."
                className="w-full"
              />
              <Button className="mt-2" onClick={handleSaveNotes}>
                Guardar Notas
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
