# ============================================================
# Caso de Uso: Eliminar Compra
# ============================================================

from dominio.excepciones import EntidadNoEncontrada
from dominio.repositorios.repositorio_compra import RepositorioCompra


class EliminarCompra:
    def __init__(self, repositorio: RepositorioCompra):
        self.repositorio = repositorio

    def ejecutar(self, id_compra: int) -> None:
        existente = self.repositorio.obtener_por_id(id_compra)
        if existente is None:
            raise EntidadNoEncontrada(
                f"No se encontró la compra con id {id_compra}."
            )
        self.repositorio.eliminar(id_compra)
