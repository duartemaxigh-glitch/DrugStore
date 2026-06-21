import { useState } from "react";
import * as ventasService from "../services/ventasServices";


// Responsable únicamente del historial
export default function useVentasHistoria({ toast }) {
    // Historial
    const [ventas, setVentas] = useState([]);
    const [ventaDetalle, setVentaDetalle] = useState(null);

    async function cargarVentas() {
        try {
            const vents = await ventasService.obtenerVentas()
            console.log('VENTAS:', vents);
            console.log('ES ARRAY?', Array.isArray(vents));
            setVentas(vents)
        } catch {
            //opcional
        }
    }
    // Ver detalle de venta
    async function verDetalle(idVenta) {
        try {
            const venta = await ventasService.obtenerDetalleVenta(idVenta);
            setVentaDetalle(venta);
        } catch {
            toast.error('Error al obtener el detalle');
        }
    }

    // Eliminar venta
    async function eliminarVenta(idVenta) {
        if (!window.confirm('¿Estás seguro de eliminar esta venta?')) return;
        try {
            await ventasService.eliminarVenta(idVenta)
            toast.exito('Venta eliminada');
            cargarVentas();
        } catch (err) {
            toast.error(err.message);
        }
    }

    return {
        ventas,
        ventaDetalle,

        cargarVentas,
        verDetalle,
        eliminarVenta,
        setVentaDetalle
    }
}