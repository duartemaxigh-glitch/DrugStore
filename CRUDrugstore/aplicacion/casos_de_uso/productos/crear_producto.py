# ============================================================
# Caso de Uso: Crear Producto
# ============================================================

from dominio.entidades.producto import Producto
from dominio.repositorios.repositorio_producto import RepositorioProducto


class CrearProducto:
    def __init__(self, repositorio: RepositorioProducto):
        self.repositorio = repositorio

    def ejecutar(
        self,
        nombre: str,
        precio_venta: float,
        precio_compra: float,
        stock: int = 0,
        codigo_barras: str = None,
        id_categoria: int = None,
    ) -> Producto:
        producto = Producto(
            nombre=nombre,
            precio_venta=precio_venta,
            precio_compra=precio_compra,
            stock=stock,
            codigo_barras=codigo_barras,
            id_categoria=id_categoria,
        )
        producto.validar()
        return self.repositorio.crear(producto)
