import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function BuscadorProductos({ busqueda, setBusqueda }) {
    return (
        <div className="buscador-productos">
            <MagnifyingGlassIcon className="buscador-productos__icono" />

            <input
                type="text"
                placeholder="Buscar producto por nombre o código..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                autoFocus
                className="buscador-productos__input"
            />
        </div>
    );
}