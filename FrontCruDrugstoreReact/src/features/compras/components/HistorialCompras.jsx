import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function HistorialCompras({
    compras,
    proveedorNombre,
    verDetalle,
    eliminarCompra
}) {
    return (
        <div className="compras-historial">
            <div className="compras-historial__table-container">
                <table className="compras-historial__table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Proveedor</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {compras.map((c) => (
                            <tr
                                key={c.id_compra}
                                className="compras-historial__row"
                            >
                                <td className="compras-historial__id">
                                    #{c.id_compra}
                                </td>

                                <td>
                                    {c.fecha
                                        ? new Date(c.fecha).toLocaleString('es-AR')
                                        : '—'}
                                </td>

                                <td>
                                    {proveedorNombre(c.id_proveedor)}
                                </td>

                                <td className="compras-historial__total">
                                    ${c.total.toFixed(2)}
                                </td>

                                <td>
                                    <div className="compras-historial__acciones">
                                        <button
                                            onClick={() => verDetalle(c.id_compra)}
                                            className="compras-historial__btn compras-historial__btn--detalle"
                                            title="Ver detalle"
                                        >
                                            <EyeIcon className="icon-md" />
                                        </button>

                                        <button
                                            onClick={() => eliminarCompra(c.id_compra)}
                                            className="compras-historial__btn compras-historial__btn--eliminar"
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="icon-md" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {compras.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="compras-historial__empty"
                                >
                                    No hay compras registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}