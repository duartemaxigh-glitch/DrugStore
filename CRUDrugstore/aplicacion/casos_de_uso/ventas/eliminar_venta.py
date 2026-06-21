# ============================================================
# Caso de Uso: Eliminar Venta
# ============================================================

from dominio.excepciones import EntidadNoEncontrada
from dominio.repositorios.repositorio_venta import RepositorioVenta


class EliminarVenta:
    def __init__(self, repositorio: RepositorioVenta):
        self.repositorio = repositorio

    def ejecutar(self, id_venta: int) -> None:
        existente = self.repositorio.obtener_por_id(id_venta)
        if existente is None:
            raise EntidadNoEncontrada(
                f"No se encontró la venta con id {id_venta}."
            )
        self.repositorio.eliminar(id_venta)
