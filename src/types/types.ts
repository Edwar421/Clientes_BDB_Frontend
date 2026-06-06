export type typeIdentification =
    | "Cedula de Ciudadania"
    | "Cedula de Extranjeria"
    | "Pasaporte";

export type CustomerProduct =
    | "Cuenta de Ahorros"
    | "Cuenta Corriente"
    | "Tarjeta de Crédito"
    | "Crédito Libre Inversión"
    | "Crédito de Vehículo"
    | "Crédito Rotativo";

export interface Customer {
    id: number;
    typeIdentification: typeIdentification;
    identification: string;
    name: string;
    age: number;
    email: string;
    product: CustomerProduct;
    createdAt: string;
}

export interface CustomerInput {
    typeIdentification: typeIdentification;
    identification: string;
    name: string;
    age: number;
    email: string;
    product: CustomerProduct;
}
