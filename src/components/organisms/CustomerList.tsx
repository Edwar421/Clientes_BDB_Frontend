import React from "react";
import { TaskCard } from "../molecules/TaskCard";
import { FaClipboardList } from "react-icons/fa";
import type { Customer } from "../../types/types";

interface CustomerListProps {
    customers: Customer[];
    onShowModal: (
        title: string,
        message: string,
        icon: React.ReactNode
    ) => void;
}

export const TaskList: React.FC<CustomerListProps> = ({
    customers,
    onShowModal,
}) => {
    return (
        <div className="space-y-4">
            {customers.length === 0 ? (
                <div className="flex flex-col items-center">
                    <FaClipboardList className="w-12 h-12 text-sky-300 dark:text-white" />
                    <p className="text-center text-gray-500 mt-4">
                        Agrega un cliente para comenzar.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {customers.map((customer) => (
                        <TaskCard
                            key={customer.id}
                            customer={customer}
                            onShowModal={onShowModal}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
