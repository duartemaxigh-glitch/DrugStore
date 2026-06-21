import {
    TrashIcon,
    PrinterIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';

export default function VentasHistorial({
    ventas,
    verDetalle,
    eliminarVenta,
    clienteNombre,
    medioPagoNombre,
    imprimirTicket
}) {
    return (
        <div className="historial-container">
            <div className="historial-table-wrapper">
                <table className="historial-table">
                    <thead>
                        <tr className="historial-header-row">
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Medio de Pago</th>
                            <th>Total</th>
                            <th className="acciones-header">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ventas.map((v) => (
                            <tr key={v.id_venta} className="historial-row">
                                <td className="historial-id">
                                    #{v.id_venta}
                                </td>

                                <td className="historial-fecha">
                                    {v.fecha
                                        ? new Date(v.fecha).toLocaleString('es-AR')
                                        : '—'}
                                </td>

                                <td>
                                    {clienteNombre(v.id_cliente)}
                                </td>

                                <td>
                                    {medioPagoNombre(v.id_medio_pago)}
                                </td>

                                <td className="historial-total">
                                    ${v.total.toFixed(2)}
                                </td>

                                <td className="historial-acciones">
                                    <div className="acciones-container">
                                        <button
                                            onClick={() => verDetalle(v.id_venta)}
                                            className="btn btn-icon btn-ver"
                                            title="Ver detalle"
                                        >
                                            <EyeIcon className="icon-md" />
                                        </button>

                                        <button
                                            onClick={() => imprimirTicket(v.id_venta)}
                                            className="btn btn-icon btn-imprimir"
                                            title="Imprimir ticket"
                                        >
                                            <PrinterIcon className="icon-md" />
                                        </button>

                                        <button
                                            onClick={() => eliminarVenta(v.id_venta)}
                                            className="btn btn-icon btn-eliminar"
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="icon-md" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {ventas.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="historial-sin-datos"
                                >
                                    No hay ventas registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}