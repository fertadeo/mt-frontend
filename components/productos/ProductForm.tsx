"use client";

import React, { useState } from "react";
import { Product } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
  product?: Product; // Modo edición si se pasa
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  existingCodes: string[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  existingCodes,
}) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Date.now().toString(),
      codigoProducto: "",
      nombreProducto: "",
      descripcion: "",
      categoria: "",
      marca: "",
      precioCompra: 0,
      precioVenta: 0,
      stockActual: 0,
      stockMinimo: 0,
      proveedorId: "",
      ubicacionAlmacen: "",
      fechaCaducidad: "",
      loteSerie: "",
      imagen: "",
      notas: "",
      unidadMedida: "",
      dimensionesPeso: "",
      estado: "activo",
      fechaCreacion: new Date().toISOString().split("T")[0],
      fechaActualizacion: new Date().toISOString().split("T")[0],
      promocionesDescuentos: "",
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

    if (!formData.codigoProducto) {
      valid = false;
      newErrors.codigoProducto =
        "El código del producto es obligatorio";
    } else if (!product && existingCodes.includes(formData.codigoProducto)) {
      valid = false;
      newErrors.codigoProducto = "El código del producto ya existe";
    }
    if (!formData.nombreProducto) {
      valid = false;
      newErrors.nombreProducto =
        "El nombre del producto es obligatorio";
    }
    if (formData.precioCompra < 0) {
      valid = false;
      newErrors.precioCompra =
        "El precio de compra no puede ser negativo";
    }
    if (formData.precioVenta < 0) {
      valid = false;
      newErrors.precioVenta =
        "El precio de venta no puede ser negativo";
    }
    if (formData.stockActual < 0) {
      valid = false;
      newErrors.stockActual =
        "El stock actual no puede ser negativo";
    }
    if (formData.stockMinimo < 0) {
      valid = false;
      newErrors.stockMinimo =
        "El stock mínimo no puede ser negativo";
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Actualiza la fecha de actualización automáticamente
      onSubmit({
        ...formData,
        fechaActualizacion: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Código de Producto */}
      <div>
        <Label htmlFor="codigoProducto">
          Código de Producto{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="codigoProducto"
          name="codigoProducto"
          value={formData.codigoProducto}
          onChange={handleChange}
        />
        {errors.codigoProducto && (
          <p className="text-red-500 text-sm">
            {errors.codigoProducto}
          </p>
        )}
      </div>
      {/* Nombre del Producto */}
      <div>
        <Label htmlFor="nombreProducto">
          Nombre del Producto{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="nombreProducto"
          name="nombreProducto"
          value={formData.nombreProducto}
          onChange={handleChange}
        />
        {errors.nombreProducto && (
          <p className="text-red-500 text-sm">
            {errors.nombreProducto}
          </p>
        )}
      </div>
      {/* Descripción */}
      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Input
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>
      {/* Categoría */}
      <div>
        <Label htmlFor="categoria">Categoría</Label>
        <Input
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />
      </div>
      {/* Marca */}
      <div>
        <Label htmlFor="marca">Marca</Label>
        <Input
          id="marca"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
        />
      </div>
      {/* Precio de Compra */}
      <div>
        <Label htmlFor="precioCompra">Precio de Compra</Label>
        <Input
          id="precioCompra"
          name="precioCompra"
          type="number"
          value={formData.precioCompra.toString()}
          onChange={handleChange}
        />
        {errors.precioCompra && (
          <p className="text-red-500 text-sm">
            {errors.precioCompra}
          </p>
        )}
      </div>
      {/* Precio de Venta */}
      <div>
        <Label htmlFor="precioVenta">Precio de Venta</Label>
        <Input
          id="precioVenta"
          name="precioVenta"
          type="number"
          value={formData.precioVenta.toString()}
          onChange={handleChange}
        />
        {errors.precioVenta && (
          <p className="text-red-500 text-sm">
            {errors.precioVenta}
          </p>
        )}
      </div>
      {/* Stock Actual */}
      <div>
        <Label htmlFor="stockActual">Stock Actual</Label>
        <Input
          id="stockActual"
          name="stockActual"
          type="number"
          value={formData.stockActual.toString()}
          onChange={handleChange}
        />
        {errors.stockActual && (
          <p className="text-red-500 text-sm">
            {errors.stockActual}
          </p>
        )}
      </div>
      {/* Stock Mínimo */}
      <div>
        <Label htmlFor="stockMinimo">Stock Mínimo</Label>
        <Input
          id="stockMinimo"
          name="stockMinimo"
          type="number"
          value={formData.stockMinimo.toString()}
          onChange={handleChange}
        />
        {errors.stockMinimo && (
          <p className="text-red-500 text-sm">
            {errors.stockMinimo}
          </p>
        )}
      </div>
      {/* Proveedor (ID) */}
      <div>
        <Label htmlFor="proveedorId">
          Proveedor (ID)
        </Label>
        <Input
          id="proveedorId"
          name="proveedorId"
          value={formData.proveedorId}
          onChange={handleChange}
        />
      </div>
      {/* Ubicación en Almacén */}
      <div>
        <Label htmlFor="ubicacionAlmacen">
          Ubicación en Almacén
        </Label>
        <Input
          id="ubicacionAlmacen"
          name="ubicacionAlmacen"
          value={formData.ubicacionAlmacen}
          onChange={handleChange}
        />
      </div>
      {/* Fecha de Caducidad */}
      <div>
        <Label htmlFor="fechaCaducidad">
          Fecha de Caducidad
        </Label>
        <Input
          id="fechaCaducidad"
          name="fechaCaducidad"
          type="date"
          value={formData.fechaCaducidad}
          onChange={handleChange}
        />
      </div>
      {/* Lote/Número de Serie */}
      <div>
        <Label htmlFor="loteSerie">
          Lote/Número de Serie
        </Label>
        <Input
          id="loteSerie"
          name="loteSerie"
          value={formData.loteSerie}
          onChange={handleChange}
        />
      </div>
      {/* Imagen */}
      <div>
        <Label htmlFor="imagen">Imagen (URL)</Label>
        <Input
          id="imagen"
          name="imagen"
          value={formData.imagen}
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
      {/* Unidad de Medida */}
      <div>
        <Label htmlFor="unidadMedida">
          Unidad de Medida
        </Label>
        <Input
          id="unidadMedida"
          name="unidadMedida"
          value={formData.unidadMedida}
          onChange={handleChange}
        />
      </div>
      {/* Dimensiones y Peso */}
      <div>
        <Label htmlFor="dimensionesPeso">
          Dimensiones y Peso
        </Label>
        <Input
          id="dimensionesPeso"
          name="dimensionesPeso"
          value={formData.dimensionesPeso}
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
      {/* Fecha de Creación */}
      <div>
        <Label htmlFor="fechaCreacion">
          Fecha de Creación
        </Label>
        <Input
          id="fechaCreacion"
          name="fechaCreacion"
          type="date"
          value={formData.fechaCreacion}
          onChange={handleChange}
        />
      </div>
      {/* Promociones/Descuentos */}
      <div>
        <Label htmlFor="promocionesDescuentos">
          Promociones/Descuentos
        </Label>
        <Input
          id="promocionesDescuentos"
          name="promocionesDescuentos"
          value={formData.promocionesDescuentos}
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

export default ProductForm;
