"use client";

import React, { useState } from "react";
import { Product } from "./types";
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

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onUpdateProduct: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onUpdateProduct,
}) => {
  const [notes, setNotes] = useState(product.notas);

  const handleSaveNotes = () => {
    onUpdateProduct({ ...product, notas: notes });
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
              <CardTitle>Datos del Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Código:</strong> {product.codigoProducto}
              </p>
              <p>
                <strong>Nombre:</strong> {product.nombreProducto}
              </p>
              <p>
                <strong>Descripción:</strong> {product.descripcion}
              </p>
              <p>
                <strong>Categoría:</strong> {product.categoria}
              </p>
              <p>
                <strong>Marca:</strong> {product.marca}
              </p>
              <p>
                <strong>Precio de Compra:</strong> {product.precioCompra}
              </p>
              <p>
                <strong>Precio de Venta:</strong> {product.precioVenta}
              </p>
              <p>
                <strong>Stock Actual:</strong> {product.stockActual}
              </p>
              <p>
                <strong>Stock Mínimo:</strong> {product.stockMinimo}
              </p>
              <p>
                <strong>Proveedor (ID):</strong> {product.proveedorId}
              </p>
              <p>
                <strong>Ubicación en Almacén:</strong> {product.ubicacionAlmacen}
              </p>
              <p>
                <strong>Fecha de Caducidad:</strong> {product.fechaCaducidad}
              </p>
              <p>
                <strong>Lote/Número de Serie:</strong> {product.loteSerie}
              </p>
              <p>
                <strong>Imagen:</strong> {product.imagen}
              </p>
              <p>
                <strong>Unidad de Medida:</strong> {product.unidadMedida}
              </p>
              <p>
                <strong>Dimensiones/Peso:</strong> {product.dimensionesPeso}
              </p>
              <p>
                <strong>Estado:</strong> {product.estado}
              </p>
              <p>
                <strong>Fecha de Creación:</strong> {product.fechaCreacion}
              </p>
              <p>
                <strong>Fecha de Actualización:</strong> {product.fechaActualizacion}
              </p>
              <p>
                <strong>Promociones/Descuentos:</strong> {product.promocionesDescuentos}
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

export default ProductDetail;
