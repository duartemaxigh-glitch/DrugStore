import Modal from "@/components/ui/Modal/ModalCrud"

export default function VentasDetalles({
    ventaDetalle,
    setVentaDetalle,
    clienteNombre,
    medioPagoNombre,
    productoNombre
}) {
    return (
        <>
            {ventaDetalle && (
                <Modal
                    titulo={`Venta #${ventaDetalle.id_venta}`}
                    onCerrar={() => {setVentaDetalle(null)}}
                >
                    <div className="detalle-venta">

                        <p className="detalle-info">
                            <strong>Fecha:</strong>{' '}
                            {ventaDetalle.fecha
                                ? new Date(ventaDetalle.fecha).toLocaleString('es-AR')
                                : '—'}
                        </p>

                        <p className="detalle-info">
                            <strong>Cliente:</strong> {clienteNombre(ventaDetalle.id_cliente)}
                        </p>

                        <p className="detalle-info">
                            <strong>Medio de Pago:</strong>{' '}
                            {medioPagoNombre(ventaDetalle.id_medio_pago)}
                        </p>

                        <div className="detalle-productos">
                            <table className="detalle-tabla">
                                <thead>
                                    <tr className="detalle-tabla-header">
                                        <th className="text-left">Producto</th>
                                        <th className="text-center">Cant.</th>
                                        <th className="text-right">P. Unit.</th>
                                        <th className="text-right">Subtotal</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {ventaDetalle.detalles.map((d, i) => (
                                        <tr key={i} className="detalle-tabla-row">
                                            <td>{productoNombre(d.id_producto)}</td>

                                            <td className="text-center">
                                                {d.cantidad}
                                            </td>

                                            <td className="text-right">
                                                ${d.precio_unitario.toFixed(2)}
                                            </td>

                                            <td className="detalle-subtotal text-right">
                                                ${d.subtotal.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="detalle-total">
                            <span className="detalle-total-label">
                                TOTAL
                            </span>

                            <span className="detalle-total-valor">
                                ${ventaDetalle.total.toFixed(2)}
                            </span>
                        </div>

                    </div>
                </Modal>
            )}
        </>
    );
}