import { ShoppingCartIcon } from "lucide-react"
import CarritoItems from "./CarritoItems"
import DatosVentas from "./DatosVenta"
import ResumenVenta from "./ResumenVenta"

export default function Carrito({
    carrito,
    cambiarCantidad,
    quitarDelCarrito,
    clienteId,
    setClienteId,
    clientes,
    medioPagoId,
    setMedioPagoId,
    mediosPago,
    total,
    finalizarVenta,
    finalizando
}) {
    return (
        <div className="carrito-columna">
            <div className="carrito-panel">

                <h2 className="carrito-titulo">
                    <ShoppingCartIcon className="carrito-titulo__icono icon-md" />
                    Detalle de Venta
                    {carrito.length > 0 && (
                        <span className="carrito-badge">
                            {carrito.length}
                        </span>
                    )}
                </h2>

                {carrito.length === 0 ? (
                    <p className="carrito-vacio">
                        Hacé clic en un producto para agregarlo
                    </p>
                ) : (
                    <CarritoItems
                        carrito={carrito}
                        cambiarCantidad={cambiarCantidad}
                        quitarDelCarrito={quitarDelCarrito}
                    />
                )}

                <DatosVentas
                    clienteId={clienteId}
                    setClienteId={setClienteId}
                    clientes={clientes}
                    medioPagoId={medioPagoId}
                    setMedioPagoId={setMedioPagoId}
                    mediosPago={mediosPago}
                />

                <ResumenVenta
                    total={total}
                    finalizarVenta={finalizarVenta}
                    carrito={carrito}
                    finalizando={finalizando}
                />
            </div>
        </div>
    );
}