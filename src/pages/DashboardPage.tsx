import React, { useState, useEffect } from "react";
import { DashboardTemplate } from "../components/templates/DashboardTemplate";
import { ThemeToggle } from "../components/atoms/ThemeToggle";
import { getCustomers } from "../services/api";
import type { Customer } from "../types/types";
import { Header } from "../components/organisms/Header";


export const DashboardPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const fetchCustomers = async () => {
        const customers = await getCustomers();
        setCustomers(customers);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <>
            <Header />
            <DashboardTemplate customers={customers} />
        </>
    );
};
