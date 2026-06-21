import { useEffect } from 'react';
import VentasTabs from './components/VentasTabs';
import NuevaVenta from './components/NuevaVenta';
import VentasHistorial from './components/VentasHistorial';
import VentasDetalles from './components/VentasDetalle';
import useVentas from './hooks/useVentas';
import './VentasPage.css'
import TicketPreview from '@/components/ui/TicketPreview/TicketPreview';

export default function VentasPage() {
    const vents = useVentas();

    useEffect(() => {
        if (vents.vista === 'historial') {
            vents.cargarVentas();
        }
    }, [vents.vista]);

    return (
        <div className="ventas-page">
            {vents.cargando ? (
                <div className="ventas-page__loading flex-center">
                    <div className="ventas-page__spinner" />
                </div>
            ) : (
                <>
                    <h1 className="ventas-page__titulo">
                        Ventas
                    </h1>

                    <VentasTabs
                        setVista={vents.setVista}
                        vista={vents.vista}
                    />

                    {vents.vista === 'nueva' && (
                        <NuevaVenta
                            ventaExitosa={vents.ventaExitosa}
                            busqueda={vents.busqueda}
                            nuevaVenta={vents.nuevaVenta}
                            imprimirTicket={vents.imprimirTicket}
                            productosFiltrados={vents.productosFiltrados}
                            setBusqueda={vents.setBusqueda}
                            agregarAlCarrito={vents.agregarAlCarrito}
                            carrito={vents.carrito}
                            quitarDelCarrito={vents.quitarDelCarrito}
                            cambiarCantidad={vents.cambiarCantidad}
                            clienteId={vents.clienteId}
                            setClienteId={vents.setClienteId}
                            clientes={vents.clientes}
                            mediosPago={vents.mediosPago}
                            medioPagoId={vents.medioPagoId}
                            setMedioPagoId={vents.setMedioPagoId}
                            finalizarVenta={vents.finalizarVenta}
                            finalizando={vents.finalizando}
                            total={vents.total}
                        />
                    )}

                    {vents.vista === 'historial' && (
                        <VentasHistorial
                            ventas={vents.ventas}
                            verDetalle={vents.verDetalle}
                            eliminarVenta={vents.eliminarVenta}
                            clienteNombre={vents.clienteNombre}
                            medioPagoNombre={vents.medioPagoNombre}
                            imprimirTicket={vents.imprimirTicket}
                        />
                    )}

                    <VentasDetalles
                        ventaDetalle={vents.ventaDetalle}
                        setVentaDetalle={vents.setVentaDetalle}
                        clienteNombre={vents.clienteNombre}
                        medioPagoNombre={vents.medioPagoNombre}
                        productoNombre={vents.productoNombre}
                    />

                    {vents.ticketTexto && (
                        <TicketPreview
                            texto={vents.ticketTexto}
                            onCerrar={() => vents.setTicketTexto(null)}
                        />
                    )}
                </>
            )}

        </div>
    );
}