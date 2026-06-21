# ============================================================
# Interfaz: RepositorioProducto
# ============================================================
# Contrato para operaciones CRUD de productos.
# ============================================================

from abc import ABC, abstractmethod
from dominio.entidades.producto import Producto


class RepositorioProducto(ABC):

    @abstractmethod
    def crear(self, producto: Producto) -> Producto:
        pass

    @abstractmethod
    def obtener_por_id(self, id_producto: int) -> Producto | None:
        pass

    @abstractmethod
    def obtener_todos(self) -> list[Producto]:
        pass

    @abstractmethod
    def actualizar(self, producto: Producto) -> Producto:
        pass

    @abstractmethod
    def eliminar(self, id_producto: int) -> None:
        pass
