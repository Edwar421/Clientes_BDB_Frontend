import React, { useMemo, useState } from "react";
import { CustomerList } from "../organisms/CustomerList";
import { Link } from "react-router-dom";
import { FaClipboardList, FaFilter, FaPlus, FaUsers } from "react-icons/fa";
import { Modal } from "../atoms/Modal";
import type { Customer } from "../../types/types";


interface DashboardTemplateProps {
    customers: Customer[];
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
    customers,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalIcon, setModalIcon] = useState<React.ReactNode | null>(null);
    const [sortByDate, setSortByDate] = useState<"recent" | "oldest">("recent");
    const [identificationFilter, setIdentificationFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState("");
    const [productFilter, setProductFilter] = useState("all");

    const customerProducts = [
        "Cuenta de Ahorros",
        "Cuenta Corriente",
        "Tarjeta de Crédito",
        "Crédito Libre Inversión",
        "Crédito de Vehículo",
        "Crédito Rotativo",
    ];

    const handleShowModal = (
        title: string,
        message: string,
        icon: React.ReactNode
    ) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalIcon(icon);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortByDate(event.target.value as "recent" | "oldest");
    };

    const sortedCustomers =
        sortByDate === "recent"
            ? [...customers].sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
            : [...customers].sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
            );

    const filteredCustomers = useMemo(() => {
        const identificationQuery = identificationFilter.trim();
        const numericAge = Number(ageFilter);

        return sortedCustomers.filter((customer) => {
            const matchesIdentification =
                identificationQuery === "" ||
                customer.identification.includes(identificationQuery);
            const matchesAge =
                ageFilter === "" || Number(customer.age) === numericAge;
            const matchesProduct =
                productFilter === "all" || customer.product === productFilter;

            return matchesIdentification && matchesAge && matchesProduct;
        });
    }, [ageFilter, identificationFilter, productFilter, sortedCustomers]);

    const handleClearFilters = () => {
        setIdentificationFilter("");
        setAgeFilter("");
        setProductFilter("all");
    };

    return (
        <section className="min-h-screen bg-transparent dark:text-white">
            <div className="max-w-7xl mx-auto pt-5 px-6">

                <h2 className="text-4xl font-bold text-white">
                    Gestión de Clientes
                </h2>

                <p className="mt-2 text-sky-200">
                    Consulta, registra y administra clientes del Banco de Bogotá.
                </p>

            </div>
            <div className="p-1 max-w-7xl mx-auto">
                <div className="mt-10 p-8 w-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-[0_20px_60px_rgba(13,65,140,0.25)]">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h2 className="flex items-center text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                <FaClipboardList className="text-2xl mr-3 text-sky-500" />
                                Lista de clientes
                            </h2>
                        </div>
                        <div className="flex items-center">
                            <div className="rounded-xl bg-[#0D418C] px-6 py-3 text-white font-semibold shadow-md">
                                Total de Clientes ({filteredCustomers.length})
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 mb-6 rounded-2xl bg-slate-100 dark:bg-slate-700/30 p-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Identificación
                            </label>
                            <input
                                type="text"
                                value={identificationFilter}
                                onChange={(e) => setIdentificationFilter(e.target.value)}
                                placeholder="Buscar por identificación"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Edad
                            </label>
                            <input
                                type="number"
                                value={ageFilter}
                                onChange={(e) => setAgeFilter(e.target.value)}
                                placeholder="Filtrar por edad"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Producto
                            </label>
                            <select
                                value={productFilter}
                                onChange={(e) => setProductFilter(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">Todos</option>
                                {customerProducts.map((product) => (
                                    <option key={product} value={product}>
                                        {product}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-6 flex justify-end">
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                    <CustomerList
                        customers={filteredCustomers}
                        onShowModal={handleShowModal}
                    />
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalTitle}
                message={modalMessage}
                icon={modalIcon}
            />
        </section>
    );
};
