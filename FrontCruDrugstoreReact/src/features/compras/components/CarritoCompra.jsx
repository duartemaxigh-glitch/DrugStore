import { TrashIcon } from "@heroicons/react/24/outline";

export default function CarritoCompra({ carrito, quitarDelCarrito, finalizarCompra, total, finalizando }) {
    return (
        <div className="compras-card">
            <h2 className="compras-carrito-title">
                Detalle de Compra
            </h2>

            {carrito.length === 0 ? (
                <p className="compras-carrito-vacio">
                    Agregá productos a la compra
                </p>
            ) : (
                <div className="compras-carrito-table-container">
                    <table className="compras-carrito-table">
                        <thead>
                            <tr>
                                <th className="text-left">Producto</th>
                                <th className="text-center">Cant.</th>
                                <th className="text-right">P. Unit.</th>
                                <th className="text-right">Subtotal</th>
                                <th className="text-right"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {carrito.map((item) => (
                                <tr
                                    key={item.id_producto}
                                    className="compras-carrito-row"
                                >
                                    <td>{item.nombre}</td>

                                    <td className="text-center">
                                        {item.cantidad}
                                    </td>

                                    <td className="text-right">
                                        ${item.precioUnitario.toFixed(2)}
                                    </td>

                                    <td className="text-right compras-carrito-subtotal">
                                        ${(item.cantidad * item.precioUnitario).toFixed(2)}
                                    </td>

                                    <td className="text-right">
                                        <button
                                            onClick={() =>
                                                quitarDelCarrito(item.id_producto)
                                            }
                                            className="compras-carrito-delete"
                                        >
                                            <TrashIcon className="icon-md" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="compras-carrito-footer">
                <div className="compras-carrito-total">
                    <span className="compras-carrito-total-label">
                        TOTAL
                    </span>

                    <span className="compras-carrito-total-value">
                        ${total.toFixed(2)}
                    </span>
                </div>

                <button
                    onClick={finalizarCompra}
                    disabled={carrito.length === 0 || finalizando}
                    className="compras-carrito-finalizar"
                >
                    {finalizando
                        ? 'Procesando...'
                        : 'Finalizar Compra'}
                </button>
            </div>
        </div>
    )
}