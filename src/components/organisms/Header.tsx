import { Link, useLocation } from "react-router-dom";
import {
    FaClipboardList,
    FaPlusCircle,
} from "react-icons/fa";

import { ThemeToggle } from "../atoms/ThemeToggle";
import logo from "../../../logo.png";

export const Header = () => {
    const location = useLocation();

    return (
        <header
            className="
            sticky
            top-0
            z-50
            w-full
            bg-[#0D418C]/95
            backdrop-blur-md
            border-b
            border-white/10
            shadow-lg
            shadow-black/20
            "
        >
            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-4">

                        <img
                            src={logo}
                            alt="Banco de Bogotá"
                            className="h-12 w-auto"
                        />

                        <div>
                            <h1 className="text-white font-bold text-xl">
                                Clientes BDB
                            </h1>

                            <p className="text-sky-200 text-sm">
                                Gestión de Clientes
                            </p>
                        </div>

                    </div>

                    {/* Navegación */}
                    <div className="flex items-center gap-4">

                        <Link
                            to="/dashboard"
                            className={`
                                flex items-center gap-2
                                rounded-xl
                                px-4 py-2
                                transition-all
                                ${
                                    location.pathname === "/dashboard"
                                        ? "bg-white text-[#0D418C] font-semibold"
                                        : "text-white hover:bg-white/10"
                                }
                            `}
                        >
                            <FaClipboardList />
                            Lista Clientes
                        </Link>

                        <Link
                            to="/register"
                            className={`
                                flex items-center gap-2
                                rounded-xl
                                px-4 py-2
                                transition-all
                                ${
                                    location.pathname === "/register"
                                        ? "bg-sky-500 text-white font-semibold"
                                        : "text-white hover:bg-white/10"
                                }
                            `}
                        >
                            <FaPlusCircle />
                            Registrar Cliente
                        </Link>

                        <div className="ml-2 rounded-full bg-white/10 px-2 py-1">
                            <ThemeToggle />
                        </div>

                    </div>

                </div>

            </div>
        </header>
    );
};