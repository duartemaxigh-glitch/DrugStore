export default function ReportesTablaDetalle({ tab, reporte }) {
    return (
        <div className="tabla-detalle-container">
            <div className="tabla-detalle-scroll">
                {tab === 'ventas' ? (
                    <table className="tabla-detalle">
                        <thead>
                            <tr className="tabla-header-row">
                                <th className="tabla-header-cell"># Venta</th>
                                <th className="tabla-header-cell">Hora</th>
                                <th className="tabla-header-cell">Cajero</th>
                                <th className="tabla-header-cell">Cliente</th>
                                <th className="tabla-header-cell">Medio de Pago</th>
                                <th className="tabla-header-cell tabla-header-right">
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {reporte.ventas.map((v) => (
                                <tr
                                    key={v.id_venta}
                                    className="tabla-row tabla-row-ventas"
                                >
                                    <td className="tabla-cell tabla-cell-mono">
                                        #{v.id_venta}
                                    </td>

                                    <td className="tabla-cell tabla-cell-secondary">
                                        {v.hora}
                                    </td>

                                    <td className="tabla-cell">
                                        {v.cajero}
                                    </td>

                                    <td className="tabla-cell">
                                        {v.cliente || '—'}
                                    </td>

                                    <td className="tabla-cell">
                                        {v.medio_pago}
                                    </td>

                                    <td className="tabla-cell tabla-cell-total tabla-total-ventas">
                                        ${v.total.toFixed(2)}
                                    </td>
                                </tr>
                            ))}

                            {reporte.ventas.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="tabla-empty"
                                    >
                                        No hay ventas en esta fecha
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <table className="tabla-detalle">
                        <thead>
                            <tr className="tabla-header-row">
                                <th className="tabla-header-cell"># Compra</th>
                                <th className="tabla-header-cell">Hora</th>
                                <th className="tabla-header-cell">Usuario</th>
                                <th className="tabla-header-cell">Proveedor</th>
                                <th className="tabla-header-cell tabla-header-right">
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {reporte.compras.map((c) => (
                                <tr
                                    key={c.id_compra}
                                    className="tabla-row tabla-row-compras"
                                >
                                    <td className="tabla-cell tabla-cell-mono">
                                        #{c.id_compra}
                                    </td>

                                    <td className="tabla-cell tabla-cell-secondary">
                                        {c.hora}
                                    </td>

                                    <td className="tabla-cell">
                                        {c.usuario}
                                    </td>

                                    <td className="tabla-cell">
                                        {c.proveedor}
                                    </td>

                                    <td className="tabla-cell tabla-cell-total tabla-total-compras">
                                        ${c.total.toFixed(2)}
                                    </td>
                                </tr>
                            ))}

                            {reporte.compras.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="tabla-empty"
                                    >
                                        No hay compras en esta fecha
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}