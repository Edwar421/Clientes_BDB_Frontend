import axios from "axios";
import type { Customer, CustomerInput } from "../types/types";
import config from "../config";

const API_URL = config.API_URL;

const axiosInstance = axios.create();

type BackendCustomer = {
    id: number;
    typeId: string;
    identification: string;
    name: string;
    age: number;
    email: string;
    product: string;
    createdAt: string;
};

const customerTypeLabels: Record<string, Customer["typeIdentification"]> = {
    "cedula de ciudadania": "Cedula de Ciudadania",
    "cedula de extranjeria": "Cedula de Extranjeria",
    pasaporte: "Pasaporte",
};

const customerProductLabels: Record<string, Customer["product"]> = {
    "cuenta de ahorros": "Cuenta de Ahorros",
    "cuenta corriente": "Cuenta Corriente",
    "tarjeta de credito": "Tarjeta de Crédito",
    "credito libre inversion": "Crédito Libre Inversión",
    "credito de vehiculo": "Crédito de Vehículo",
    "credito rotativo": "Crédito Rotativo",
};

const normalizeKey = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

const normalizeCustomerFromBackend = (customer: BackendCustomer): Customer => ({
    id: customer.id,
    typeIdentification:
        customerTypeLabels[normalizeKey(customer.typeId)] ??
        (customer.typeId as Customer["typeIdentification"]),
    identification: customer.identification,
    name: customer.name,
    age: customer.age,
    email: customer.email,
    product:
        customerProductLabels[normalizeKey(customer.product)] ??
        (customer.product as Customer["product"]),
    createdAt: customer.createdAt,
});

export const getCustomers = async (): Promise<Customer[]> => {
    const response = await axiosInstance.get(API_URL);
    if (Array.isArray(response.data)) {
        return response.data.map((customer: BackendCustomer) =>
            normalizeCustomerFromBackend(customer)
        );
    }

    if (Array.isArray(response.data?.value)) {
        return response.data.value.map((customer: BackendCustomer) =>
            normalizeCustomerFromBackend(customer)
        );
    }

    return [];
};

export const createCustomer = async (customer: CustomerInput) => {
    const response = await axiosInstance.post(API_URL, {
        typeId: customer.typeIdentification,
        identification: customer.identification,
        name: customer.name,
        age: customer.age,
        email: customer.email,
        product: customer.product,
    });
    return response.data;
};

export const updateCustomer = async (id: number, customer: CustomerInput) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, {
        typeId: customer.typeIdentification,
        identification: customer.identification,
        name: customer.name,
        age: customer.age,
        email: customer.email,
        product: customer.product,
    });
    return response.data;
};

export const deleteCustomer = async (id: number) => {
    await axiosInstance.delete(`${API_URL}/${id}`);
};
