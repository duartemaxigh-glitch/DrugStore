# ============================================================
# Entidad: Producto
# ============================================================
# Representa una fila de la tabla 'productos'.
# Tiene código de barras, precios de compra/venta y stock.
# ============================================================

from dominio.validaciones import (
    validar_no_vacio,
    validar_precio,
    validar_cantidad,
)


class Producto:
    def __init__(
        self,
        nombre: str,
        precio_venta: float,
        precio_compra: float,
        stock: int = 0,
        codigo_barras: str = None,
        id_categoria: int = None,
        id_producto: int = None,
    ):
        self.id_producto = id_producto
        self.codigo_barras = codigo_barras
        self.nombre = nombre
        self.precio_venta = precio_venta
        self.precio_compra = precio_compra
        self.stock = stock
        self.id_categoria = id_categoria

    def validar(self):
        validar_no_vacio(self.nombre, 'nombre')
        validar_precio(self.precio_venta, 'precio_venta')
        validar_precio(self.precio_compra, 'precio_compra')
        validar_cantidad(self.stock, 'stock')
