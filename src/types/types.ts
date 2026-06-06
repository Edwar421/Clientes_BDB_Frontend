export type CustomerProduct =
    | "Cuenta de Ahorros"
    | "Cuenta Corriente"
    | "Tarjeta de Crédito"
    | "Crédito Libre Inversión"
    | "Crédito de Vehículo"
    | "Crédito Rotativo";

export interface Customer {
    id: number;
    identification: string;
    name: string;
    age: number;
    email: string;
    product: CustomerProduct;
    createdAt: string;
}

export interface CustomerInput {
    identification: string;
    name: string;
    age: number;
    email: string;
    product: CustomerProduct;
}
