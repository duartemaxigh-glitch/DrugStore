import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import useCatalogos from './useCatalogos';
import useNuevaVenta from './useNuevaVenta';
import useVentasHistoria from './useVentasHistorial';
import { useEffect } from 'react';

// Responsable únicamente de crear ventas
export default function useVentas() {
    const toast = useToast();
    const [vista, setVista] = useState('nueva');
    const [ticketTexto, setTicketTexto] = useState(null);
    const catalogo = useCatalogos({
        toast: toast,
    })
    const nuevaVenta = useNuevaVenta({
        toast: toast,
        productos: catalogo.productos,
        setProductos: catalogo.setProductos,
        setTicketTexto: setTicketTexto
    })
    const historial = useVentasHistoria({ toast })

    useEffect(() => {
    if (catalogo.mediosPago.length > 0) {
        nuevaVenta.setMedioPagoId(
            catalogo.mediosPago[0].id_medio_pago
        );
    }
    }, [catalogo.mediosPago]);

    // Lookup helpers para historial
    const medioPagoNombre = (id) =>
        catalogo.mediosPago.find((m) => m.id_medio_pago === id)?.nombre || '—';

    const clienteNombre = (id) => {
        if (!id) return '—';
        const c = catalogo.clientes.find((cl) => cl.id_cliente === id);
        return c ? [c.nombre, c.apellido].filter(Boolean).join(' ') || '—' : '—';
    };

    const productoNombre = (id) =>
        catalogo.productos.find((p) => p.id_producto === id)?.nombre || `#${id}`;

    return {
        ...catalogo,
        ...nuevaVenta,
        ...historial,
        vista,
        ticketTexto,

        medioPagoNombre,
        clienteNombre,
        productoNombre,

        setVista,
        setTicketTexto
    }
}