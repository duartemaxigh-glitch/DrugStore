import {  ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function SideBarFooter({ usuario, alSalir }) {
    return (
        <footer className="sidebar-footer">
            <div className="user-info">
                <span className="user-label">Sesión iniciada como:</span>
                <strong className="user-role truncate">{usuario?.rol || "..."}</strong>
            </div>

            <button onClick={alSalir} className="logout-btn">
                <ArrowRightStartOnRectangleIcon className="logout-icon" aria-hidden="true" />
                <span className="nav-text">Cerrar Sesión</span>
            </button>
        </footer>
    )
}