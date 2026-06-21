import Carrito from "./Carrito/CarritoVenta"
import BuscadorProductos from "./Productos/BuscardoProductos"
import ListaProducto from "./Productos/ListaProductos"
import VentaExitosa from "./VentaExitosa"

export default function NuevaVenta({ 
    ventaExitosa,
    busqueda,
    nuevaVenta,
    imprimirTicket,
    productosFiltrados, 
    setBusqueda, 
    agregarAlCarrito, 
    carrito, 
    quitarDelCarrito, 
    cambiarCantidad, 
    clienteId, 
    setClienteId, 
    clientes, 
    mediosPago, 
    medioPagoId,
    setMedioPagoId,
    finalizarVenta, 
    finalizando,
    total
    }) {
    if (ventaExitosa) {
        return (
            <VentaExitosa
                ventaExitosa={ventaExitosa}
                imprimirTicket={imprimirTicket}
                nuevaVenta={nuevaVenta}
            />
        )
    }
    return (
        <div className="nueva-venta-grid">
            <div className="nueva-venta__productos">
                <BuscadorProductos
                    busqueda = {busqueda}
                    setBusqueda = {setBusqueda}
                />
                <ListaProducto
                    productosFiltrados = {productosFiltrados}
                    agregarAlCarrito = {agregarAlCarrito}
                />
            </div>
            
            <Carrito
                carrito = {carrito}
                cambiarCantidad = {cambiarCantidad}
                quitarDelCarrito = {quitarDelCarrito}
                clienteId = {clienteId}
                setClienteId = {setClienteId}
                clientes = {clientes}
                medioPagoId = {medioPagoId}
                setMedioPagoId = {setMedioPagoId}
                mediosPago = {mediosPago}
                total = {total}
                finalizarVenta = {finalizarVenta}
                finalizando = {finalizando}
            />
        </div>
    )
}