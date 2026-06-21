// ============================================================
// Cliente API — Conexión con el backend FastAPI
// ============================================================
// Centraliza TODAS las llamadas HTTP al backend.
// Maneja automáticamente: headers, token JWT, errores 401.
// ============================================================

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function obtenerToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

async function solicitud(endpoint, opciones = {}) {
  const token = obtenerToken();

  const headers = { ...opciones.headers };

  // Solo agregar Content-Type si hay body (no en GET/DELETE)
  if (opciones.body) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const respuesta = await fetch(`${API_URL}${endpoint}`, {
    ...opciones,
    headers,
  });

  // Token expirado → redirigir al login
  if (respuesta.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    window.location.href = "/login";
    throw new Error("Sesión expirada");
  }

  // Error del servidor → lanzar con mensaje del backend
  if (!respuesta.ok) {
    const error = await respuesta
      .json()
      .catch(() => ({ detail: "Error desconocido" }));
    throw new Error(error.detail || "Error en la solicitud");
  }

  // 204 No Content (DELETE exitoso)
  if (respuesta.status === 204) return null;

  // Respuesta de texto plano (tickets)
  const contentType = respuesta.headers.get("content-type");
  if (contentType && contentType.includes("text/plain")) {
    return respuesta.text();
  }

  return respuesta.json();
}

const api = {
  get: (endpoint) => solicitud(endpoint),

  post: (endpoint, datos) =>
    solicitud(endpoint, { method: "POST", body: JSON.stringify(datos) }),

  put: (endpoint, datos) =>
    solicitud(endpoint, { method: "PUT", body: JSON.stringify(datos) }),
  
  delete: (endpoint) => solicitud(endpoint, { method: "DELETE" }),
};

export default api;
