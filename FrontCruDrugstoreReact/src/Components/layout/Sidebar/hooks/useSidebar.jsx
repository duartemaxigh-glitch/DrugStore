import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import { navegacion, navegacionJefe } from "../sidebarConfig.js";

export default function useSidebar() {
    const [abierto, setAbierto] = useState(false);
    const { pathname } = useLocation();
    const { esJefe, logout, usuario } = useAuth();

    const links = esJefe() ? [...navegacion, ...navegacionJefe] : navegacion;

    return {
        abierto,
        setAbierto,
        pathname,
        logout,
        usuario,
        links
    }
}