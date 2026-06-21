# ============================================================
# Caso de Uso: Eliminar Producto
# ============================================================

from dominio.excepciones import EntidadNoEncontrada
from dominio.repositorios.repositorio_producto import RepositorioProducto


class EliminarProducto:
    def __init__(self, repositorio: RepositorioProducto):
        self.repositorio = repositorio

    def ejecutar(self, id_producto: int) -> None:
        existente = self.repositorio.obtener_por_id(id_producto)
        if existente is None:
            raise EntidadNoEncontrada(
                f"No se encontró el producto con id {id_producto}."
            )
        self.repositorio.eliminar(id_producto)
