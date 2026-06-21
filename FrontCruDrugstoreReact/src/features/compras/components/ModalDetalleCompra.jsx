import Modal from "@/components/ui/Modal/ModalCrud";

export default function ModalDetalleCompra({ compraDetalle, productoNombre, proveedorNombre, setCompraDetalle }) {
    return (
        <>
            {compraDetalle && (
                <Modal
                    titulo={`Compra #${compraDetalle.id_compra}`}
                    onCerrar={() => setCompraDetalle(null)}
                >
                    <div className="modal-detalle-compra">

                        <p className="modal-detalle-compra__info">
                            <strong>Fecha:</strong>{' '}
                            {compraDetalle.fecha
                                ? new Date(compraDetalle.fecha).toLocaleString('es-AR')
                                : '—'}
                        </p>

                        <p className="modal-detalle-compra__info">
                            <strong>Proveedor:</strong>{' '}
                            {proveedorNombre(compraDetalle.id_proveedor)}
                        </p>

                        <div className="modal-detalle-compra__tabla-container">
                            <table className="modal-detalle-compra__tabla">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cant.</th>
                                        <th>P. Unit.</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {compraDetalle.detalles.map((d, i) => (
                                        <tr key={i}>
                                            <td>
                                                {productoNombre(d.id_producto)}
                                            </td>

                                            <td className="text-center">
                                                {d.cantidad}
                                            </td>

                                            <td className="text-right">
                                                ${d.precio_unitario.toFixed(2)}
                                            </td>

                                            <td className="text-right modal-detalle-compra__subtotal">
                                                ${d.subtotal.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="modal-detalle-compra__total">
                            <span>TOTAL</span>

                            <span className="modal-detalle-compra__total-importe">
                                ${compraDetalle.total.toFixed(2)}
                            </span>
                        </div>

                    </div>
                </Modal>
            )}
        </>
    )
}