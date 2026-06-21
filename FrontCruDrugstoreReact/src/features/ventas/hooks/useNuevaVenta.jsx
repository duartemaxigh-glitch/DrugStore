import { useMemo } from "react";
import { useState } from "react";
import * as ventasService from "../services/ventasServices";


export default function useNuevaVenta({ toast, productos, setProductos, setTicketTexto }) {
    // POS - Nueva venta
    const [busqueda, setBusqueda] = useState('');
    const [carrito, setCarrito] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [medioPagoId, setMedioPagoId] = useState('');
    const [finalizando, setFinalizando] = useState(false);
    const [ventaExitosa, setVentaExitosa] = useState(null);


    // Productos filtrados por búsqueda
    const productosFiltrados = useMemo(() => {
        if (!busqueda.trim()) return productos;
        const b = busqueda.toLowerCase();
        return productos.filter(
            (p) =>
                p.nombre.toLowerCase().includes(b) ||
                (p.codigo_barras && p.codigo_barras.toLowerCase().includes(b))
        );
    }, [productos, busqueda]);

    // Total del carrito
    const total = useMemo(
        () => carrito.reduce((sum, item) => sum + item.cantidad * item.precio, 0),
        [carrito]
    );

    // Agregar producto al carrito
    function agregarAlCarrito(producto) {
        setCarrito((prev) => {
            const existente = prev.find((i) => i.id_producto === producto.id_producto);
            if (existente) {
                if (existente.cantidad >= producto.stock) {
                    toast.error('No hay más stock disponible');
                    return prev;
                }
                return prev.map((i) =>
                    i.id_producto === producto.id_producto
                        ? { ...i, cantidad: i.cantidad + 1 }
                        : i
                );
            }
            if (producto.stock <= 0) {
                toast.error('Producto sin stock');
                return prev;
            }
            return [
                ...prev,
                {
                    id_producto: producto.id_producto,
                    nombre: producto.nombre,
                    precio: producto.precio_venta,
                    cantidad: 1,
                    stockMax: producto.stock,
                },
            ];
        });
    }

    function cambiarCantidad(id_producto, delta) {
        setCarrito((prev) =>
            prev
                .map((i) => {
                    if (i.id_producto !== id_producto) return i;
                    const nueva = i.cantidad + delta;
                    if (nueva > i.stockMax) {
                        toast.error('Sin stock suficiente');
                        return i;
                    }
                    return { ...i, cantidad: nueva };
                })
                .filter((i) => i.cantidad > 0)
        );
    }

    function quitarDelCarrito(id_producto) {
        setCarrito((prev) => prev.filter((i) => i.id_producto !== id_producto));
    }

    // Finalizar venta
    async function finalizarVenta() {
        if (carrito.length === 0) return;
        if (!medioPagoId) {
            toast.error('Seleccioná un medio de pago');
            return;
        }

        setFinalizando(true);
        try {
            const payload = {
                id_medio_pago: Number(medioPagoId),
                id_cliente: clienteId ? Number(clienteId) : null,
                detalles: carrito.map((i) => ({
                    id_producto: i.id_producto,
                    cantidad: i.cantidad,
                })),
            };

            const venta = await ventasService.crearVenta(payload);
            setVentaExitosa(venta);
            setCarrito([]);
            toast.exito('¡Venta registrada correctamente!');

            // Recargar productos (stock actualizado)
            const prods = await ventasService.obtenerProductos
            setProductos(prods)
        } catch (err) {
            toast.error(err.message);
        } finally {
            setFinalizando(false);
        }
    }

    // Imprimir ticket
    async function imprimirTicket(idVenta) {
        try {
            const texto = await ventasService.obtenerDetalleVentaTicket(idVenta);
            setTicketTexto(texto);
        } catch {
            toast.error('Error al obtener el ticket');
        }
    }

    function nuevaVenta() {
        setVentaExitosa(null);
        setCarrito([]);
        setBusqueda('');
    }

    return {
        busqueda,
        carrito,
        clienteId,
        medioPagoId,
        finalizando,
        ventaExitosa,
        productosFiltrados,
        total,

        agregarAlCarrito,
        cambiarCantidad,
        quitarDelCarrito,
        finalizarVenta,
        imprimirTicket,
        nuevaVenta,

        setBusqueda,
        setCarrito,
        setClienteId,
        setMedioPagoId,
        setFinalizando,
        setVentaExitosa
    }
}