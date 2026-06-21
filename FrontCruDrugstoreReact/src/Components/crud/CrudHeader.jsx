import { PlusIcon } from '@heroicons/react/24/outline';

export default function CrudHeader({ titulo, sinCrear, abrirCrear }) {
    return (
        <header className="crud-header">
            <h1 className="crud-title">{titulo}</h1>

            {!sinCrear && (
            <button onClick={abrirCrear} className="btn-nuevo">
                <PlusIcon className="btn-nuevo-icon" aria-hidden="true"/>
                Nuevo
            </button>
            )}
        </header>
    )
}