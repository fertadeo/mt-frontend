"use client";

import React, { useState } from "react";
import { Provider } from "./types";
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

interface ProviderDetailProps {
  provider: Provider;
  onClose: () => void;
  onUpdateProvider: (provider: Provider) => void;
}

const ProviderDetail: React.FC<ProviderDetailProps> = ({
  provider,
  onClose,
  onUpdateProvider,
}) => {
  const [notes, setNotes] = useState(provider.notas);

  const handleSaveNotes = () => {
    onUpdateProvider({ ...provider, notas: notes });
  };

  return (
    <div className="p-4">
      <Button onClick={onClose}>Volver</Button>
      <Tabs defaultValue="info" className="mt-4">
        <TabsList>
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="notas">Notas</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Datos del Proveedor</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Nombre:</strong> {provider.nombreProveedor}
              </p>
              <p>
                <strong>Contacto Principal:</strong> {provider.contactoPrincipal}
              </p>
              <p>
                <strong>Teléfono:</strong> {provider.telefono}
              </p>
              <p>
                <strong>Correo:</strong> {provider.correo}
              </p>
              <p>
                <strong>Dirección:</strong> {provider.direccion}
              </p>
              <p>
                <strong>ID Fiscal:</strong> {provider.idFiscal}
              </p>
              <p>
                <strong>Condiciones de Pago:</strong> {provider.condicionesPago}
              </p>
              <p>
                <strong>Plazo de Entrega:</strong> {provider.plazoEntrega}
              </p>
              <p>
                <strong>Productos que Suministra:</strong> {provider.productosSuministra}
              </p>
              <p>
                <strong>Historial de Pedidos:</strong> {provider.historialPedidos}
              </p>
              <p>
                <strong>Calificación:</strong> {provider.calificacion}
              </p>
              <p>
                <strong>Estado:</strong> {provider.estado}
              </p>
              <p>
                <strong>Fecha de Registro:</strong> {provider.fechaRegistro}
              </p>
              <p>
                <strong>Documentación Adjunta:</strong> {provider.docAdjunta}
              </p>
              <p>
                <strong>Categoría:</strong> {provider.categoriaProveedor}
              </p>
              <p>
                <strong>Contacto Secundario:</strong> {provider.contactoSecundario}
              </p>
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

export default ProviderDetail;
