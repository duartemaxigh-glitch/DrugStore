import "./Dashboard.css";
import { useAuth } from "@/hooks/useAuth.jsx";
import { Link } from "react-router-dom";
import { accesos, accesosJefe } from "./dashboardConfig";


export default function DashboardPage() {
    const { esJefe } = useAuth();

    const todos = esJefe() ? [...accesos, ...accesosJefe] : accesos;

    return (
        <div className="animate-fade-in">
            {/* Bienvenida */}
            <div className="welcome">
                <h1 className="welcome-title">Bienvenido 👋</h1>
                <p className="welcome-text">¿Qué querés hacer hoy?</p>
            </div>

            {/* Accesos rápidos */}
            <div className="dashboard-grid">
                {todos.map((acceso, i) => (
                    <Link
                        key={acceso.ruta}
                        to={acceso.ruta}
                        className="card"
                        style={{
                            animationDelay: `${i * 80}ms`,
                            animationFillMode: "both",
                        }}
                    >
                        <div className={`card-icon ${acceso.color}`}>
                            <acceso.icono className="icon-lg" />
                        </div>

                        <h3 className="card-title">{acceso.titulo}</h3>

                        <p className="card-desc">{acceso.descripcion}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
