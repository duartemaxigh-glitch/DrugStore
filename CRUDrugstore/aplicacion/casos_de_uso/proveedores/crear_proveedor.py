# ============================================================
# Caso de Uso: Crear Proveedor
# ============================================================

from dominio.entidades.proveedor import Proveedor
from dominio.repositorios.repositorio_proveedor import RepositorioProveedor


class CrearProveedor:
    def __init__(self, repositorio: RepositorioProveedor):
        self.repositorio = repositorio

    def ejecutar(
        self,
        razon_social: str,
        cuit_cuil: str = None,
        contacto_nombre: str = None,
        telefono: str = None,
        email: str = None,
    ) -> Proveedor:
        proveedor = Proveedor(
            razon_social=razon_social,
            cuit_cuil=cuit_cuil,
            contacto_nombre=contacto_nombre,
            telefono=telefono,
            email=email,
        )
        proveedor.validar()
        return self.repositorio.crear(proveedor)
