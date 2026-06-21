# ============================================================
# Caso de Uso: Actualizar Cliente
# ============================================================

from dominio.entidades.cliente import Cliente
from dominio.excepciones import EntidadNoEncontrada
from dominio.repositorios.repositorio_cliente import RepositorioCliente


class ActualizarCliente:
    def __init__(self, repositorio: RepositorioCliente):
        self.repositorio = repositorio

    def ejecutar(
        self,
        id_cliente: int,
        apellido: str = None,
        nombre: str = None,
        dni: str = None,
        cuit: str = None,
        telefono: str = None,
    ) -> Cliente:
        existente = self.repositorio.obtener_por_id(id_cliente)
        if existente is None:
            raise EntidadNoEncontrada(
                f"No se encontró el cliente con id {id_cliente}."
            )

        cliente = Cliente(
            id_cliente=id_cliente,
            apellido=apellido,
            nombre=nombre,
            dni=dni,
            cuit=cuit,
            telefono=telefono,
        )
        cliente.validar()
        return self.repositorio.actualizar(cliente)
