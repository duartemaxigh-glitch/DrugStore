# ============================================================
# Caso de Uso: Crear Cliente
# ============================================================

from dominio.entidades.cliente import Cliente
from dominio.repositorios.repositorio_cliente import RepositorioCliente


class CrearCliente:
    def __init__(self, repositorio: RepositorioCliente):
        self.repositorio = repositorio

    def ejecutar(
        self,
        apellido: str = None,
        nombre: str = None,
        dni: str = None,
        cuit: str = None,
        telefono: str = None,
    ) -> Cliente:
        cliente = Cliente(
            apellido=apellido,
            nombre=nombre,
            dni=dni,
            cuit=cuit,
            telefono=telefono,
        )
        cliente.validar()
        return self.repositorio.crear(cliente)
