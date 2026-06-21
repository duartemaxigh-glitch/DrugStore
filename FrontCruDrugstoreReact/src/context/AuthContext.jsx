import api from "@/services/api";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [cargando, setCargando] = useState(false);
  const [usuario, setUsuario] = useState(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    return token && rol ? { token, rol } : null;
  });

  async function login(email, password) {
    const datos = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", datos.token);
    localStorage.setItem("rol", datos.rol);
    setUsuario({ token: datos.token, rol: datos.rol });
    
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setUsuario(null);
  }

  function esJefe() {
    return usuario?.rol === "Jefe";
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, setCargando, login, logout, esJefe }}>
      {children}
    </AuthContext.Provider>
  );
}
