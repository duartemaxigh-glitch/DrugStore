import { Link } from "react-router-dom";


export default function SideBarNav({ links, pathname, clickEnLink }) {
    return (
        <nav className="nav" aria-label="Navegación principal">
            <ul className="nav-list">
                {links.map((item) => {
                    const activo = pathname === item.ruta;
                    return (
                        <li key={item.nombre}>
                            <Link
                                key={item.ruta}
                                to={item.ruta}
                                onClick={clickEnLink}
                                className={`nav-item ${activo ? "active" : ""}`}
                                aria-current={activo ? "page" : undefined} // Estándar para indicar página activa
                            >
                                <item.icono className= "nav-item-icon" aria-hidden="true" />
                                <span className="nav-item-label">{item.nombre}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}