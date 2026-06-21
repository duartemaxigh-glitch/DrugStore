import { useEffect } from "react";
import { useState } from "react";
import * as reportesService from '../services/reportesService.js'

export default function useReportes({ esJefe, toast }) {
    const [tab, setTab] = useState('ventas');
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
    const [reporteVentas, setReporteVentas] = useState(null);
    const [reporteCompras, setReporteCompras] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [ticketTexto, setTicketTexto] = useState(null);

    async function cargarReporte() {
        setCargando(true);
        try {
            if (tab === 'ventas') {
                const data = await reportesService.obtenerReporteVenta(fecha);
                setReporteVentas(data);
            } else {
                const data = await reportesService.obtenerReporteCompra(fecha);
                setReporteCompras(data);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        if (esJefe()) cargarReporte();
    }, [tab, fecha]);

    async function imprimirReporte() {
        try {
            const texto =
                tab === 'ventas'
                    ? await reportesService.obtenerReporteVentaTicket(fecha)
                    : await reportesService.obtenerReporteCompraTicket(fecha);
            setTicketTexto(texto);
        } catch {
            toast.error('Error al obtener el ticket del reporte');
        }
    }

    const reporte = tab === 'ventas' ? reporteVentas : reporteCompras;

    return {
        reporte,
        cargando,
        tab,
        ticketTexto,
        fecha,

        imprimirReporte,

        setTab,
        setFecha,
        setTicketTexto
    }
}