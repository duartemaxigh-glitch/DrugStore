import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SideBarHeader({ alCerrar }) {
    return (
    <header className="sidebar-header">
        <div className="logo">
        <span className="emoji">🏪</span>
        <div className="logo-text">
            <p className="logo-title" id="crudtitle">CRUDrugstore</p>
            <p className="logo-sub">Sistema de Gestión</p>
        </div>
        </div>

        <button onClick={alCerrar} className="btn btn-icon close-btn">
            <XMarkIcon className=".close-btn-icon" aria-hidden="true" />
        </button>
    </header>

    )
}