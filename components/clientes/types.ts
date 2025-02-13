// File: app/src/components/clientes/types.ts
export interface Transaction {
    id: string;
    fecha: string;
    monto: number;
    estado: string;
}

export interface Client {
    id: string;
    apellido: string;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    fechaRegistro: string;
    estado: "activo" | "inactivo";
    transactions: Transaction[];
    notes: string;
}