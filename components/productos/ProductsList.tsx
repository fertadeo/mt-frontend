"use client";

import React, { useState } from "react";
import { Product } from "./types";
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

interface ProductsListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onCreateProduct: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onSelectProduct,
  onCreateProduct,
}) => {
  const [filters, setFilters] = useState({
    codigoProducto: "",
    nombreProducto: "",
    categoria: "",
    marca: "",
    estado: "",
  });

  const handleFilterChange = (
    field: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredProducts = products.filter((product) =>
    product.codigoProducto
      .toLowerCase()
      .includes(filters.codigoProducto.toLowerCase()) &&
    product.nombreProducto
      .toLowerCase()
      .includes(filters.nombreProducto.toLowerCase()) &&
    product.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&
    product.marca.toLowerCase().includes(filters.marca.toLowerCase()) &&
    product.estado.toLowerCase().includes(filters.estado.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
        <Button onClick={onCreateProduct}>Crear Producto</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
          <TableRow>
            <TableCell>
              <Input
                value={filters.codigoProducto}
                onChange={(e) =>
                  handleFilterChange("codigoProducto", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.nombreProducto}
                onChange={(e) =>
                  handleFilterChange("nombreProducto", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.categoria}
                onChange={(e) =>
                  handleFilterChange("categoria", e.target.value)
                }
                placeholder="Buscar"
              />
            </TableCell>
            <TableCell>
              <Input
                value={filters.marca}
                onChange={(e) =>
                  handleFilterChange("marca", e.target.value)
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
          {filteredProducts.map((product) => (
            <TableRow
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="cursor-pointer hover:bg-blue-100"
            >
              <TableCell>{product.codigoProducto}</TableCell>
              <TableCell>{product.nombreProducto}</TableCell>
              <TableCell>{product.categoria}</TableCell>
              <TableCell>{product.marca}</TableCell>
              <TableCell>{product.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsList;
