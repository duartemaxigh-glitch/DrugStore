import './MainLayout.css'
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.jsx";
import Sidebar from "../Sidebar/SideBar";
import ChatBot from "@/features/chatbot/ChatBotComp";

export default function DashboardLayout() {
  const { usuario, cargando } = useAuth();

  // loading
  if (cargando) {
    return (
      <div className="loader-screen">
        <div className="loader"></div>
      </div>
    );
  }

  // protección de ruta
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout">
      <Sidebar />

      <main className="main">
        <Outlet />
      </main>

      <ChatBot />

    </div>
  );
}
