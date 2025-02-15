"use client";

import React, { useState } from "react";
import { Provider } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProviderFormProps {
  provider?: Provider; // Modo edición si se pasa
  onSubmit: (provider: Provider) => void;
  onCancel: () => void;
  existingEmails: string[];
}

const ProviderForm: React.FC<ProviderFormProps> = ({
  provider,
  onSubmit,
  onCancel,
  existingEmails,
}) => {
  const [formData, setFormData] = useState<Provider>(
    provider || {
      id: Date.now().toString(),
      nombreProveedor: "",
      contactoPrincipal: "",
      telefono: "",
      correo: "",
      direccion: "",
      idFiscal: "",
      condicionesPago: "",
      plazoEntrega: "",
      productosSuministra: "",
      historialPedidos: "",
      calificacion: 0,
      notas: "",
      estado: "activo",
      fechaRegistro: new Date().toISOString().split("T")[0],
      docAdjunta: "",
      categoriaProveedor: "",
      contactoSecundario: "",
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombreProveedor) {
      valid = false;
      newErrors.nombreProveedor =
        "El nombre del proveedor es obligatorio";
    }
    if (!formData.contactoPrincipal) {
      valid = false;
      newErrors.contactoPrincipal =
        "El contacto principal es obligatorio";
    }
    if (!formData.telefono) {
      valid = false;
      newErrors.telefono = "El teléfono es obligatorio";
    }
    if (!formData.correo) {
      valid = false;
      newErrors.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      valid = false;
      newErrors.correo = "El correo no es válido";
    } else if (!provider && existingEmails.includes(formData.correo)) {
      valid = false;
      newErrors.correo = "El correo ya existe";
    }
    if (!formData.idFiscal) {
      valid = false;
      newErrors.idFiscal = "El ID Fiscal es obligatorio";
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Nombre del Proveedor */}
      <div>
        <Label htmlFor="nombreProveedor">
          Nombre del Proveedor{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="nombreProveedor"
          name="nombreProveedor"
          value={formData.nombreProveedor}
          onChange={handleChange}
        />
        {errors.nombreProveedor && (
          <p className="text-red-500 text-sm">
            {errors.nombreProveedor}
          </p>
        )}
      </div>
      {/* Contacto Principal */}
      <div>
        <Label htmlFor="contactoPrincipal">
          Contacto Principal{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contactoPrincipal"
          name="contactoPrincipal"
          value={formData.contactoPrincipal}
          onChange={handleChange}
        />
        {errors.contactoPrincipal && (
          <p className="text-red-500 text-sm">
            {errors.contactoPrincipal}
          </p>
        )}
      </div>
      {/* Teléfono */}
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
          <p className="text-red-500 text-sm">
            {errors.telefono}
          </p>
        )}
      </div>
      {/* Correo Electrónico */}
      <div>
        <Label htmlFor="correo">
          Correo Electrónico{" "}
          <span className="text-red-500">*</span>
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
      {/* Dirección */}
      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>
      {/* ID Fiscal */}
      <div>
        <Label htmlFor="idFiscal">
          CUIT/CUIL/RUT/ID Fiscal{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="idFiscal"
          name="idFiscal"
          value={formData.idFiscal}
          onChange={handleChange}
        />
        {errors.idFiscal && (
          <p className="text-red-500 text-sm">{errors.idFiscal}</p>
        )}
      </div>
      {/* Condiciones de Pago */}
      <div>
        <Label htmlFor="condicionesPago">
          Condiciones de Pago
        </Label>
        <Input
          id="condicionesPago"
          name="condicionesPago"
          value={formData.condicionesPago}
          onChange={handleChange}
        />
      </div>
      {/* Plazo de Entrega */}
      <div>
        <Label htmlFor="plazoEntrega">Plazo de Entrega</Label>
        <Input
          id="plazoEntrega"
          name="plazoEntrega"
          value={formData.plazoEntrega}
          onChange={handleChange}
        />
      </div>
      {/* Productos que Suministra */}
      <div>
        <Label htmlFor="productosSuministra">
          Productos que Suministra
        </Label>
        <Input
          id="productosSuministra"
          name="productosSuministra"
          value={formData.productosSuministra}
          onChange={handleChange}
        />
      </div>
      {/* Historial de Pedidos */}
      <div>
        <Label htmlFor="historialPedidos">
          Historial de Pedidos
        </Label>
        <Input
          id="historialPedidos"
          name="historialPedidos"
          value={formData.historialPedidos}
          onChange={handleChange}
        />
      </div>
      {/* Calificación */}
      <div>
        <Label htmlFor="calificacion">
          Calificación/Evaluación
        </Label>
        <Input
          id="calificacion"
          name="calificacion"
          type="number"
          value={formData.calificacion.toString()}
          onChange={handleChange}
        />
      </div>
      {/* Notas */}
      <div>
        <Label htmlFor="notas">Notas/Comentarios</Label>
        <Input
          id="notas"
          name="notas"
          value={formData.notas}
          onChange={handleChange}
        />
      </div>
      {/* Estado */}
      <div>
        <Label htmlFor="estado">Estado</Label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      {/* Fecha de Registro */}
      <div>
        <Label htmlFor="fechaRegistro">
          Fecha de Registro
        </Label>
        <Input
          id="fechaRegistro"
          name="fechaRegistro"
          type="date"
          value={formData.fechaRegistro}
          onChange={handleChange}
        />
      </div>
      {/* Documentación Adjunta */}
      <div>
        <Label htmlFor="docAdjunta">
          Documentación Adjunta (URL)
        </Label>
        <Input
          id="docAdjunta"
          name="docAdjunta"
          value={formData.docAdjunta}
          onChange={handleChange}
        />
      </div>
      {/* Categoría del Proveedor */}
      <div>
        <Label htmlFor="categoriaProveedor">
          Categoría del Proveedor
        </Label>
        <Input
          id="categoriaProveedor"
          name="categoriaProveedor"
          value={formData.categoriaProveedor}
          onChange={handleChange}
        />
      </div>
      {/* Contacto Secundario */}
      <div>
        <Label htmlFor="contactoSecundario">
          Contacto Secundario
        </Label>
        <Input
          id="contactoSecundario"
          name="contactoSecundario"
          value={formData.contactoSecundario}
          onChange={handleChange}
        />
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

export default ProviderForm;
