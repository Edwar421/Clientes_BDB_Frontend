import React, { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { FaPlusCircle } from "react-icons/fa";
import { FaCheckCircle, FaUser, FaEnvelope, FaIdCard, FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";
import { createCustomer } from "../../services/api";
import type { CustomerInput, CustomerProduct } from "../../types/types";

interface CustomerFormProps {
    onCustomerCreated: () => void;
    onSuccess?: () => void;
}

const customerProducts: CustomerProduct[] = [
    "Cuenta de Ahorros",
    "Cuenta Corriente",
    "Tarjeta de Crédito",
    "Crédito Libre Inversión",
    "Crédito de Vehículo",
    "Crédito Rotativo",
];

export const TaskForm: React.FC<CustomerFormProps> = ({
    onCustomerCreated,
    onSuccess,
}) => {
    const [identification, setIdentification] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [product, setProduct] = useState<CustomerProduct>(
        "Cuenta de Ahorros"
    );
    const [errors, setErrors] = useState<{
        identification?: string;
        name?: string;
        age?: string;
        email?: string;
        product?: string;
        submit?: string;
    }>({});

    const validate = () => {
        const newErrors: {
            identification?: string;
            name?: string;
            age?: string;
            email?: string;
            product?: string;
            submit?: string;
        } = {};

        if (!/^\d{7,10}$/.test(identification.trim())) {
            newErrors.identification =
                "La identificación debe contener entre 7 y 10 números.";
        }

        if (name.trim().length < 2 || name.trim().length > 100) {
            newErrors.name = "El nombre debe tener entre 2 y 100 caracteres.";
        }

        const numericAge = Number(age);
        if (!Number.isInteger(numericAge) || numericAge < 18 || numericAge > 100) {
            newErrors.age = "La edad debe ser un número entero entre 18 y 100.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            newErrors.email = "El correo electrónico debe ser válido.";
        }

        if (!customerProducts.includes(product)) {
            newErrors.product = "Selecciona un producto válido.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        const customer: CustomerInput = {
            identification: identification.trim(),
            name: name.trim(),
            age: Number(age),
            email: email.trim(),
            product,
        };

        try {
            await createCustomer(customer);
            setIdentification("");
            setName("");
            setAge("");
            setEmail("");
            setProduct("Cuenta de Ahorros");
            setErrors({});
            onCustomerCreated();
            onSuccess?.();
        } catch (error) {
            console.log("Error creando cliente", error);
            setErrors((currentErrors) => ({
                ...currentErrors,
                submit:
                    "No se pudo conectar con el backend. Verifica que esté corriendo en el puerto 8080.",
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-8 py-4">
            <div className="relative mb-2">
                <FaIdCard className="absolute left-4 top-4 text-slate-400" />
                <Input
                    type="text"
                    name="identification"
                    placeholder="Identificación"
                    value={identification}
                    onChange={(e) => setIdentification(e.target.value)}
                    className="pl-12"
                />
            </div>
            <div className="relative mb-2">
                <FaUser className="absolute left-4 top-4 text-slate-400" />
                <Input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12"
                />
            </div>
            <div className="relative mb-2">
                <FaBirthdayCake className="absolute left-4 top-4 text-slate-400" />
                <Input
                    type="number"
                    name="age"
                    placeholder="Edad"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="pl-12"
                />
            </div>
            <div className="relative mb-2">
                <FaEnvelope className="absolute left-4 top-4 text-slate-400" />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12"
                />
            </div>
            <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Producto
                </label>
                <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value as CustomerProduct)}
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition focus:border-sky-500 focus:ring-4 focus:ring-sky-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-sky-900"
                >
                    {customerProducts.map((customerProduct) => (
                        <option key={customerProduct} value={customerProduct}>
                            {customerProduct}
                        </option>
                    ))}
                </select>
                {errors.product && (
                    <p className="text-red-500 text-sm">{errors.product}</p>
                )}
            </div>
            <Button type="submit" className="mt-4 w-full rounded-xl bg-gradient-to-r from-sky-500 to-[#0D418C] py-3 text-white font-semibold shadow-lg hover:scale-[1.01] hover:shadow-xl transition-all">
                <FaPlusCircle className="mr-2" /> Agregar Cliente
            </Button>
            <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
                Todos los datos son almacenados de forma segura siguiendo buenas prácticas
                de gestión de información.
            </p>
            {errors.submit && (
                <p className="mt-4 text-sm text-red-500">{errors.submit}</p>
            )}
        </form>
    );
};
