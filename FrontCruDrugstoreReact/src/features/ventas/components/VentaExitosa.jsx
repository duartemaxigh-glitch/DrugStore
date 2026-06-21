import { CheckCircleIcon, PrinterIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

export default function VentaExitosa({
    ventaExitosa,
    imprimirTicket, 
    nuevaVenta
}) {
    return (
        <div className="venta-exitosa">
            <CheckCircleIcon className="venta-exitosa-icono" />

            <h2 className="venta-exitosa-titulo">
                ¡Venta registrada!
            </h2>

            <p className="venta-exitosa-texto">
                Venta #{ventaExitosa.id_venta} — Total: ${ventaExitosa.total.toFixed(2)}
            </p>

            <div className="venta-exitosa-botones">
                <button
                    onClick={() => imprimirTicket(ventaExitosa.id_venta)}
                    className="btn-imprimir-ticket btn btn-primary"
                >
                    <PrinterIcon className="icon-md" />
                    Imprimir Ticket
                </button>

                <button
                    onClick={nuevaVenta}
                    className="btn-nueva-venta btn btn-secondary"
                >
                    <ShoppingCartIcon className="icon-md" />
                    Nueva Venta
                </button>
            </div>
        </div>
    )
}