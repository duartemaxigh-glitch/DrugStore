# ============================================================
# Dependencias de la API
# ============================================================
# Las "dependencias" en FastAPI son funciones que se ejecutan
# ANTES de cada endpoint. Las usamos para:
#
#   1. Crear instancias de los repositorios MySQL
#   2. Verificar el token JWT (autenticación)
#
# FastAPI inyecta el resultado de estas funciones en los
# endpoints usando Depends().
#
# Ejemplo:
#   @router.get("/categorias")
#   def listar(usuario = Depends(obtener_usuario_actual)):
#       # 'usuario' ya está verificado y autenticado
# ============================================================

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

from infraestructura.seguridad.jwt_servicio import verificar_token

# --- Repositorios (instancias concretas) ---
from infraestructura.repositorios.repositorio_categoria_mysql import RepositorioCategoriaMySQL
from infraestructura.repositorios.repositorio_usuario_mysql import RepositorioUsuarioMySQL
from infraestructura.repositorios.repositorio_cliente_mysql import RepositorioClienteMySQL
from infraestructura.repositorios.repositorio_proveedor_mysql import RepositorioProveedorMySQL
from infraestructura.repositorios.repositorio_medio_pago_mysql import RepositorioMedioPagoMySQL
from infraestructura.repositorios.repositorio_producto_mysql import RepositorioProductoMySQL
from infraestructura.repositorios.repositorio_venta_mysql import RepositorioVentaMySQL
from infraestructura.repositorios.repositorio_compra_mysql import RepositorioCompraMySQL


# ============================================================
# Funciones que crean los repositorios
# ============================================================
# Cada vez que un endpoint necesita un repositorio,
# FastAPI llama a estas funciones con Depends().

def obtener_repo_categoria():
    return RepositorioCategoriaMySQL()

def obtener_repo_usuario():
    return RepositorioUsuarioMySQL()

def obtener_repo_cliente():
    return RepositorioClienteMySQL()

def obtener_repo_proveedor():
    return RepositorioProveedorMySQL()

def obtener_repo_medio_pago():
    return RepositorioMedioPagoMySQL()

def obtener_repo_producto():
    return RepositorioProductoMySQL()

def obtener_repo_venta():
    return RepositorioVentaMySQL()

def obtener_repo_compra():
    return RepositorioCompraMySQL()


# ============================================================
# Autenticación JWT
# ============================================================
# HTTPBearer extrae el token del header "Authorization: Bearer <token>"

esquema_seguridad = HTTPBearer()


def obtener_usuario_actual(
    credenciales: HTTPAuthorizationCredentials = Depends(esquema_seguridad),
) -> dict:
    """
    Verifica el token JWT y devuelve los datos del usuario.
    Si el token es inválido o expiró, devuelve error 401.
    """
    try:
        payload = verificar_token(credenciales.credentials)
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="El token ha expirado.",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido.",
        )


def requiere_rol_jefe(
    usuario: dict = Depends(obtener_usuario_actual),
) -> dict:
    """
    Verifica que el usuario autenticado sea 'jefe'.
    Si no lo es, devuelve error 403 (Prohibido).
    """
    if usuario.get('rol') != 'jefe':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se necesita rol de jefe para esta operación.",
        )
    return usuario
