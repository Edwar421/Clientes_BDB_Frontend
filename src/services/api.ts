import axios from "axios";
import type { Customer, CustomerInput } from "../types/types";

const API_URL = "http://localhost:8080/api/customers";

const axiosInstance = axios.create();

export const getCustomers = async (): Promise<Customer[]> => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

export const createCustomer = async (customer: CustomerInput) => {
    const response = await axiosInstance.post(API_URL, {
        ...customer,
    });
    return response.data;
};
