import api from "@/services/api";

export async function obtenerReporteVenta(fecha) {
    return api.get(`/reportes/ventas?fecha=${fecha}`)
}

export async function obtenerReporteCompra(fecha) {
    return  api.get(`/reportes/compras?fecha=${fecha}`)
}

export async function obtenerReporteVentaTicket(fecha) {
    return api.get(`/reportes/ventas/ticket?fecha=${fecha}`)
}

export async function obtenerReporteCompraTicket(fecha) {
    return  api.get(`/reportes/compras/ticket?fecha=${fecha}`)
}