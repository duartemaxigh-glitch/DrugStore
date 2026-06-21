import api from "@/services/api";

export async function obtenerDatosIniciales() {
    return Promise.all([
        api.get('/productos'),
        api.get('/proveedores'),
        api.get('/categorias'),
    ]);
}

export async function obtenerCompras() {
    return api.get('/compras');
}

export async function obtenerDetalleCompra(idCompra) {
    return api.get(`/compras/${idCompra}`);
}

export async function eliminarCompra(idCompra) {
    return api.delete(`/compras/${idCompra}`);
}

export async function crearProveedor(payload) {
    return api.post('/proveedores', payload);
}

export async function obtenerProveedores() {
    return api.get('/proveedores');
}

export async function crearProducto(payload) {
    return api.post('/productos', payload);
}

export async function obtenerProductos() {
    return api.get('/productos');
}

export async function crearCompra(payload) {
    return api.post('/compras', payload);
}