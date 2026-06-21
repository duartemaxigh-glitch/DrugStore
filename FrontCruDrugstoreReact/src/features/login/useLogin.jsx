import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);
    const { login } = useAuth();

    async function manejarSubmit(e) {
        e.preventDefault();
        setCargando(true);
        try {
            await login(email, password);
            navigate("/dashboard")
            toast.success("Bienvenido!");
        } catch (err) {
            toast.error(err.message || "Credenciales inválidas");
        } finally {
            setCargando(false);
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        cargando,
        manejarSubmit,
    };
}
