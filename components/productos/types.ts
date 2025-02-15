export interface Product {
    id: string;
    codigoProducto: string;
    nombreProducto: string;
    descripcion: string;
    categoria: string;
    marca: string;
    precioCompra: number;
    precioVenta: number;
    stockActual: number;
    stockMinimo: number;
    proveedorId: string;
    ubicacionAlmacen: string;
    fechaCaducidad: string;
    loteSerie: string;
    imagen: string;
    notas: string;
    unidadMedida: string;
    dimensionesPeso: string;
    estado: string;
    fechaCreacion: string;
    fechaActualizacion: string;
    promocionesDescuentos: string;
  }
  