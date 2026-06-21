import api from "@/services/api";

export async function obtenerDatosMaestros() {
    return Promise.all([
        api.get('/productos'),
        api.get('/clientes'),
        api.get('/medios-pago'),
    ])
}

export async function crearVenta(payload) {
    return api.post('/ventas', payload)
}

export async function obtenerVentas() {
    return api.get('/ventas')
}

export async function obtenerDetalleVenta(idVenta) {
    return api.get(`/ventas/${idVenta}`)
}

export async function obtenerDetalleVentaTicket(idVenta) {
    return api.get(`/ventas/${idVenta}/ticket`)
}

export async function eliminarVenta(idVenta) {
    return api.delete(`/ventas/${idVenta}`);
}

export async function obtenerProductos() {
    return api.get('/productos')
}