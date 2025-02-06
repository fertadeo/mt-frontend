// File: app/src/components/clientes/ClientForm.tsx
"use client";

import React, { useState } from "react";
import { Client } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClientFormProps {
  client?: Client; // Si se pasa, es modo edición; de lo contrario, creación.
  onSubmit: (client: Client) => void;
  onCancel: () => void;
  existingEmails: string[];
}

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onSubmit,
  onCancel,
  existingEmails,
}) => {
  const [formData, setFormData] = useState<Client>(
    client || {
      id: Date.now().toString(), // ID temporal; en producción el backend asignará el ID único.
      apellido: "",
      nombre: "",
      correo: "",
      telefono: "",
      direccion: "",
      fechaRegistro: new Date().toISOString().split("T")[0],
      estado: "activo",
      transactions: [],
      notes: "",
    }
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre) {
      valid = false;
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!formData.correo) {
      valid = false;
      newErrors.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      valid = false;
      newErrors.correo = "El correo no es válido";
    } else if (!client && existingEmails.includes(formData.correo)) {
      valid = false;
      newErrors.correo = "El correo ya existe";
    }
    if (!formData.telefono) {
      valid = false;
      newErrors.telefono = "El teléfono es obligatorio";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Integrar llamada al backend para crear/editar el cliente.
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="apellido">Apellido</Label>
        <Input
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="nombre">
          Nombre <span className="text-red-500">*</span>
        </Label>
        <Input
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm">{errors.nombre}</p>
        )}
      </div>
      <div>
        <Label htmlFor="correo">
          Correo <span className="text-red-500">*</span>
        </Label>
        <Input
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />
        {errors.correo && (
          <p className="text-red-500 text-sm">{errors.correo}</p>
        )}
      </div>
      <div>
        <Label htmlFor="telefono">
          Teléfono <span className="text-red-500">*</span>
        </Label>
        <Input
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
        {errors.telefono && (
          <p className="text-red-500 text-sm">{errors.telefono}</p>
        )}
      </div>
      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="fechaRegistro">Fecha de Registro</Label>
        <Input
          id="fechaRegistro"
          name="fechaRegistro"
          type="date"
          value={formData.fechaRegistro}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="estado">Estado</Label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button type="submit">Guardar</Button>
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
