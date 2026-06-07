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
        <header className="sticky top-0 z-50 w-full bg-[#0D418C]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 h-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-4">

                {/* Mobile: Logo centrado + toggle arriba */}
                <div className="flex items-center justify-between md:hidden mb-2">
                    <div className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="Banco de Bogotá"
                            className="h-8 w-auto"
                        />
                        <div>
                            <h1 className="text-white font-bold text-sm">
                                Clientes BDB
                            </h1>
                            <p className="text-sky-200 text-xs leading-tight">
                                Gestión de Clientes
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full bg-white/10 px-2 py-1.5 flex items-center">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile: Navegación horizontal */}
                <div className="flex items-center justify-center gap-2 md:hidden pb-1">
                    <Link
                        to="/dashboard"
                        className={`
                            flex items-center justify-center gap-1.5
                            rounded-lg
                            px-3 py-2
                            text-xs sm:text-sm
                            transition-all
                            ${location.pathname === "/dashboard"
                                ? "bg-white text-[#0D418C] font-semibold"
                                : "text-white bg-white/10"
                            }
                        `}
                    >
                        <FaClipboardList />
                        Lista Clientes
                    </Link>

                    <Link
                        to="/register"
                        className={`
                            flex items-center justify-center gap-1.5
                            rounded-lg
                            px-3 py-2
                            text-xs sm:text-sm
                            transition-all
                            ${location.pathname === "/register"
                                ? "bg-sky-500 text-white font-semibold"
                                : "text-white bg-white/10"
                            }
                        `}
                    >
                        <FaPlusCircle />
                        Registrar
                    </Link>
                </div>

                {/* Desktop: Layout original */}
                <div className="hidden md:flex md:items-center md:justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Banco de Bogotá"
                            className="h-10 w-auto"
                        />
                        <div>
                            <h1 className="text-white font-bold text-lg">
                                Clientes BDB
                            </h1>
                            <p className="text-sky-200 text-xs leading-tight">
                                Gestión de Clientes
                            </p>
                        </div>
                    </div>

                    {/* Navegación */}
                    <div className="flex items-center gap-4 lg:gap-6">

                        <Link
                            to="/dashboard"
                            className={`
                                flex items-center justify-center gap-2
                                rounded-lg
                                px-4 py-2.5
                                text-sm
                                transition-all
                                whitespace-nowrap
                                ${location.pathname === "/dashboard"
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
                                flex items-center justify-center gap-2
                                rounded-lg
                                px-4 py-2.5
                                text-sm
                                transition-all
                                whitespace-nowrap
                                ${location.pathname === "/register"
                                    ? "bg-sky-500 text-white font-semibold"
                                    : "text-white hover:bg-white/10"
                                }
                            `}
                        >
                            <FaPlusCircle />
                            Registrar Cliente
                        </Link>

                        <div className="rounded-full bg-white/10 px-3 py-2 flex items-center">
                            <ThemeToggle />
                        </div>

                    </div>

                </div>

            </div>
        </header>
    );
};