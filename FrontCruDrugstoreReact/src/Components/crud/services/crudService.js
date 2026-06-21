import api from "@/services/api";

export async function obtenerTodos(endpoint) {
    return await api.get(endpoint);
}

export async function crear(endpoint, datos) {
    return await api.post(endpoint, datos);
}

export async function actualizar(endpoint, id, datos) {
    return await api.put(`${endpoint}/${id}`, datos);
}

export async function eliminar(endpoint, id) {
    return await api.delete(`${endpoint}/${id}`);
}