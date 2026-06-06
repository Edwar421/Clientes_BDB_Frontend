import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import type { Customer } from "../../types/types";

interface CustomerCardProps {
    customer: Customer;
    onShowModal: (
        title: string,
        message: string,
        icon: React.ReactNode
    ) => void;
}

export const TaskCard: React.FC<CustomerCardProps> = ({
    customer,
    onShowModal,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatCreatedAt = (value: string) =>
        new Date(value).toLocaleString("es-CO", {
            dateStyle: "medium",
            timeStyle: "short",
        });

    const handleToggleDetails = () => {
        setIsExpanded((currentValue) => !currentValue);
    };

    const handleCopyIdentification = async () => {
        try {
            await navigator.clipboard.writeText(customer.identification);
            onShowModal(
                "Éxito",
                "Identificación copiada al portapapeles.",
                <FaCheckCircle className="w-12 h-12 text-sky-400 dark:text-white" />
            );
        } catch (error) {
            console.log("Error copiando la identificación", error);
        }
    };

    return (
        <div className="relative m-4 p-4 border rounded-lg border-gray-200 hover:border-gray-400 hover:bg-gray-100 shadow-sm group dark:border-gray-600 dark:hover:border-gray-200 dark:hover:bg-gray-700">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-grow min-w-0 break-words">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {customer.name}
                        </h3>
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900 dark:text-sky-100">
                            {customer.product}
                        </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                        {customer.email}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ID {customer.identification} · {customer.age} años
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopyIdentification}
                        className="rounded-md border border-sky-300 px-3 py-1 text-sm text-sky-600 hover:bg-sky-300 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-800"
                    >
                        Copiar ID
                    </button>
                    <button
                        onClick={handleToggleDetails}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        {isExpanded ? "Ocultar" : "Ver detalle"}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="mt-4 grid gap-2 rounded-lg bg-white/70 p-4 text-sm text-gray-700 dark:bg-gray-800/70 dark:text-gray-200">
                    <p>
                        <span className="font-semibold">Correo:</span> {customer.email}
                    </p>
                    <p>
                        <span className="font-semibold">Producto:</span> {customer.product}
                    </p>
                    <p>
                        <span className="font-semibold">Creado:</span>{" "}
                        {formatCreatedAt(customer.createdAt)}
                    </p>
                </div>
            )}
        </div>
    );
};
