import React, { useMemo, useState } from "react";
import { TaskList } from "../organisms/CustomerList";
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
        "Tarjeta de Credito",
        "Credito Libre Inversion",
        "Credito de Vehiculo",
        "Credito Rotativo",
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
        <section className="min-h-screen min-w-screen bg-transparent dark:bg-gray-900 dark:text-white">
            <div className="p-6 max-w-5xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <p className="flex text-sky-300 items-center text-2xl font-bold dark:text-white">
                        <FaUsers className="mr-2" /> Clientes BDB
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center rounded-lg border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/25 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                        <FaPlus className="mr-2" /> Registrar cliente
                    </Link>
                </div>

                <div className="mt-10 p-6 w-full bg-white rounded-lg shadow-lg shadow-sky-200 dark:border dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-500">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h2 className="flex items-center text-xl font-semibold mb-4 text-sky-300  dark:text-white">
                                <FaClipboardList className="text-2xl mr-2 text-sky-300 dark:text-white" />
                                Lista de clientes
                            </h2>
                        </div>
                        <div className="flex items-center">
                            <div className="relative">
                                <FaFilter className="absolute left-5 top-3 text-sm text-sky-300 dark:text-white" />
                                <select
                                    value={sortByDate}
                                    onChange={handleSortChange}
                                    className="text-sm py-2 bg-gray-500 text-white pr-2 pl-8 mx-2 rounded-lg cursor-pointer"
                                >
                                    <option value="recent">
                                        Más recientes
                                    </option>
                                    <option value="oldest">Más antiguos</option>
                                </select>
                            </div>
                            <div className="text-sm bg-gray-500 text-white py-2 px-7 mx-2 rounded-lg">
                                Total ({filteredCustomers.length})
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 mb-6">
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
                    <TaskList
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
