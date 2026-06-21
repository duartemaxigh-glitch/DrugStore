# ============================================================
# Caso de Uso: Actualizar Producto
# ============================================================

from dominio.entidades.producto import Producto
from dominio.excepciones import EntidadNoEncontrada
from dominio.repositorios.repositorio_producto import RepositorioProducto


class ActualizarProducto:
    def __init__(self, repositorio: RepositorioProducto):
        self.repositorio = repositorio

    def ejecutar(
        self,
        id_producto: int,
        nombre: str,
        precio_venta: float,
        precio_compra: float,
        codigo_barras: str = None,
        id_categoria: int = None,
    ) -> Producto:
        existente = self.repositorio.obtener_por_id(id_producto)
        if existente is None:
            raise EntidadNoEncontrada(
                f"No se encontró el producto con id {id_producto}."
            )

        # Preservar el stock actual — solo se modifica via ventas/compras
        producto = Producto(
            id_producto=id_producto,
            nombre=nombre,
            precio_venta=precio_venta,
            precio_compra=precio_compra,
            stock=existente.stock,
            codigo_barras=codigo_barras,
            id_categoria=id_categoria,
        )
        producto.validar()
        return self.repositorio.actualizar(producto)
