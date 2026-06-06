import React from "react";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "../components/molecules/CustomerForm";
import { ThemeToggle } from "../components/atoms/ThemeToggle";

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-transparent dark:bg-gray-900">
            <ThemeToggle />
            <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-10">
                <div className="w-full rounded-2xl bg-white shadow-2xl shadow-sky-200 dark:border dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
                    <div className="border-b border-gray-200 px-8 py-6 dark:border-gray-700">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400 dark:text-sky-300">
                            Clientes BDB
                        </p>
                        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                            Registrar cliente
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Crea un cliente nuevo sin mezclarlo con la lista.
                        </p>
                    </div>
                    <TaskForm
                        onCustomerCreated={() => undefined}
                        onSuccess={() => navigate("/dashboard")}
                    />
                    <div className="px-8 pb-8">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Volver a la lista
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};