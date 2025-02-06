// File: app/src/components/clientes/ExportButtons.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Client } from "./types";

interface ExportButtonsProps {
  clients: Client[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ clients }) => {
  const exportCSV = () => {
    const header =
      "Apellido,Nombre,Correo,Teléfono,Dirección,FechaRegistro,Estado\n";
    const rows = clients
      .map(
        (client) =>
          `${client.apellido},${client.nombre},${client.correo},${client.telefono},${client.direccion},${client.fechaRegistro},${client.estado}`
      )
      .join("\n");
    const csvContent = header + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "clientes.csv");
    link.click();
  };

  const exportPDF = () => {
    // TODO: Integrar una librería (por ejemplo, jsPDF) para generar PDF.
    alert("Exportación a PDF pendiente de implementación");
  };

  return (
    <div className="flex gap-2">
      <Button onClick={exportCSV}>Exportar CSV</Button>
      <Button variant="secondary" onClick={exportPDF}>
        Exportar PDF
      </Button>
    </div>
  );
};

export default ExportButtons;
