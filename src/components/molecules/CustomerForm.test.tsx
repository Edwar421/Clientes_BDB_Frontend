import { render, screen, fireEvent, act } from "@testing-library/react";
import { TaskForm } from "./CustomerForm";
import * as api from "../../services/api";

jest.mock("../../services/api");

describe("TaskForm Component", () => {
    it("renders the form fields", () => {
        render(<TaskForm onCustomerCreated={jest.fn()} />);
        expect(
            screen.getByPlaceholderText("Identificación")
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Nombre completo")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Edad")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Correo electrónico")
        ).toBeInTheDocument();
    });

    it("shows validation errors for invalid input", async () => {
        render(<TaskForm onCustomerCreated={jest.fn()} />);
        await act(async () => {
            fireEvent.submit(
                screen.getByRole("button", { name: /Agregar Cliente/i })
            );
        });
        expect(
            await screen.findByText(
                "La identificación debe contener entre 7 y 10 números."
            )
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                "El nombre debe tener entre 2 y 100 caracteres."
            )
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                "La edad debe ser un número entero entre 18 y 100."
            )
        ).toBeInTheDocument();
        expect(
            await screen.findByText("El correo electrónico debe ser válido.")
        ).toBeInTheDocument();
    });

    it("calls onCustomerCreated when the form is submitted with valid input", async () => {
        const onCustomerCreated = jest.fn();
        (api.createCustomer as jest.Mock).mockResolvedValueOnce({});

        render(<TaskForm onCustomerCreated={onCustomerCreated} />);
        await act(async () => {
            fireEvent.change(
                screen.getByPlaceholderText("Identificación"),
                {
                    target: { value: "12345678" },
                }
            );
            fireEvent.change(screen.getByPlaceholderText("Nombre completo"), {
                target: { value: "Juan Perez" },
            });
            fireEvent.change(screen.getByPlaceholderText("Edad"), {
                target: { value: "32" },
            });
            fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
                target: { value: "juan.perez@correo.com" },
            });
            fireEvent.submit(
                screen.getByRole("button", { name: /Agregar Cliente/i })
            );
        });

        expect(await api.createCustomer).toHaveBeenCalledWith({
            identification: "12345678",
            name: "Juan Perez",
            age: 32,
            email: "juan.perez@correo.com",
            product: "Cuenta de Ahorros",
        });
        expect(onCustomerCreated).toHaveBeenCalledTimes(1);
    });
});
