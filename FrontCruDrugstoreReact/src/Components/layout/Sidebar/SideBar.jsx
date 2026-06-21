import "./Sidebar.css";
import useSidebar from "@/components/layout/Sidebar/hooks/useSidebar";
import SideBarHeader from "./SideBarHeader";
import SideBarNav from "./SideBarNav";
import SideBarFooter from "./SideBarFooter";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { 
    abierto, 
    setAbierto, 
    pathname, 
    logout, 
    usuario, 
    links } = useSidebar();

  return (
    <>
      <button 
        onClick={() => setAbierto(true)} 
        className="btn btn-icon menu-btn"
        aria-label="Abrir menú de navegación"
        aria-expanded={abierto}
        aria-controls="sidebar-navigation"
      >
        <Bars3Icon className="icon-lg" aria-hidden="true" />
      </button>

      {abierto && (
        <div
          className="overlay"
          onClick={() => setAbierto(false)}
          aria-label="Cerrar fondo"
        />
      )}

      <aside className={`sidebar ${abierto ? "open" : ""}`}>
        <SideBarHeader alCerrar={() => setAbierto(false)}/>
        <SideBarNav links={links} pathname={pathname} clickEnLink={() => setAbierto(false)}/>
        <SideBarFooter usuario={usuario} alSalir={logout}/>
      </aside>
    </>
  );
}
