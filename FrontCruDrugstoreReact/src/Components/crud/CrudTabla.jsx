import {
    PencilSquareIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

export default function CrudTabla({ 
    datosFiltrados, 
    columnas, 
    sinEditar, 
    abrirEditar, 
    sinEliminar, 
    eliminar, 
    datos,
    idCampo
    }) {
    return (
        <>
            <div className="table-container">

                { datosFiltrados.length === 0 ? (
                <div className="empty">
                    <p className='empty-text'>No se encontraron resultados</p>
                </div>
                ) : (
                <div className="table-wrapper">
                    <table className="table">
                    <thead>
                        <tr className="thead-row">
                        {columnas.map((col) => (
                            <th key={col.clave} className="th">
                            {col.titulo}
                            </th>
                        ))}
                        <th className="th th-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosFiltrados.map((item) => (
                        <tr key={item[idCampo]} className="tr">
                            {columnas.map((col) => (
                            <td key={col.clave} className="td">
                                {col.render
                                ? col.render(item[col.clave], item)
                                : (item[col.clave] ?? '—')}
                            </td>
                            ))}
                            <td className="td td-right">
                            <div className="actions">

                                {!sinEditar && (
                                <button onClick={() => abrirEditar(item)} className="btn-edit">
                                    <PencilSquareIcon className='icon-md' />
                                </button>
                                )}

                                {!sinEliminar && (
                                <button onClick={() => eliminar(item)} className="btn-delete" >
                                    <TrashIcon className='icon-md' />
                                </button>
                                )}

                            </div>
                            </td>

                        </tr>
                        ))}
                    </tbody>
                    </table>

                </div>
                )}
            </div>

            <p className="crud-info">
                {datosFiltrados.length} de {datos.length} registros
            </p>
        </>
    )
}