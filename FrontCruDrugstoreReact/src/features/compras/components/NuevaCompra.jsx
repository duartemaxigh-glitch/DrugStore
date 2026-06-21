import { CheckCircleIcon, TruckIcon } from "@heroicons/react/24/outline";
import SelectorProveedor from "./SelectorProveedor";
import BuscadorProducto from "./BuscadorProducto";
import CarritoCompra from "./CarritoCompra";
import * as comprasService from '../services/comprasService.js'


export default function NuevaCompra({ compras }) {
    return (
        <>
            {compras.compraExitosa ? (
                <div className="compra-exitosa">
                    <CheckCircleIcon className="compra-exitosa-icon" />

                    <h2 className="compra-exitosa-title">
                        ¡Compra registrada!
                    </h2>

                    <p className="compra-exitosa-text">
                        Compra #{compras.compraExitosa.id_compra}
                        {' — '}
                        Total: $
                        {compras.compraExitosa.total.toFixed(2)}
                    </p>

                    <button
                        onClick={() => {
                            compras.setCompraExitosa(null);
                            compras.setCarrito([]);
                            compras.setContadorTemp(-1);

                            const prods = comprasService.obtenerProductos();
                            compras.setProductos(prods);
                        }}
                        className="compra-exitosa-btn"
                    >
                        <TruckIcon className="compra-exitosa-btn-icon icon-lg" />
                        Nueva Compra
                    </button>
                </div>
            ) : (
                <div className="nueva-compra">
                    <SelectorProveedor
                        proveedores={compras.proveedores}
                        proveedorId={compras.proveedorId}
                        setProveedorId={compras.setProveedorId}
                        setModalProveedor={compras.setModalProveedor}
                    />

                    <BuscadorProducto
                        setModalProducto={compras.setModalProducto}
                        terminoBusqueda={compras.terminoBusqueda}
                        setTerminoBusqueda={compras.setTerminoBusqueda}
                        setProductoEncontrado={compras.setProductoEncontrado}
                        setResultadosBusqueda={compras.setResultadosBusqueda}
                        productos={compras.productos}
                        resultadosBusqueda={compras.resultadosBusqueda}
                        seleccionarProducto={compras.seleccionarProducto}
                        productoEncontrado={compras.productoEncontrado}
                        limpiarBusqueda={compras.limpiarBusqueda}
                        cantidadAgregar={compras.cantidadAgregar}
                        setCantidadAgregar={compras.setCantidadAgregar}
                        precioAgregar={compras.precioAgregar}
                        setPrecioAgregar={compras.setPrecioAgregar}
                        agregarAlCarrito={compras.agregarAlCarrito}
                    />

                    <CarritoCompra
                        carrito={compras.carrito}
                        total={compras.total}
                        quitarDelCarrito={compras.quitarDelCarrito}
                        finalizando={compras.finalizando}
                        finalizarCompra={compras.finalizarCompra}
                    />
                </div>
            )}
        </>
    );
}