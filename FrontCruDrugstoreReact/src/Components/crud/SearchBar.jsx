import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ busqueda, buscar }) {
    return (
        <div className="search-container">
            <MagnifyingGlassIcon className="search-icon" />

            <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => buscar(e.target.value)}
            className="search-input"
            />
        </div>
    )
}