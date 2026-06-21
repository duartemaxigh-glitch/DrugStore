# ============================================================
# Repositorio MySQL: Producto
# ============================================================

from dominio.entidades.producto import Producto
from dominio.excepciones import EntidadDuplicada
from dominio.repositorios.repositorio_producto import RepositorioProducto
from infraestructura.basedatos.conexion import obtener_conexion


def _fila_a_producto(fila: dict) -> Producto:
    return Producto(
        id_producto=fila['id_producto'],
        codigo_barras=fila['codigo_barras'],
        nombre=fila['nombre'],
        precio_venta=float(fila['precio_venta']),
        precio_compra=float(fila['precio_compra']),
        stock=fila['stock'],
        id_categoria=fila['id_categoria'],
    )


class RepositorioProductoMySQL(RepositorioProducto):

    def crear(self, producto: Producto) -> Producto:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = """
                    INSERT INTO productos (codigo_barras, nombre, precio_venta, precio_compra, stock, id_categoria)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    producto.codigo_barras,
                    producto.nombre,
                    producto.precio_venta,
                    producto.precio_compra,
                    producto.stock,
                    producto.id_categoria,
                ))
                producto.id_producto = cursor.lastrowid
            return producto
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada("Ya existe un producto con ese código de barras.")
            raise
        finally:
            conexion.close()

    def obtener_por_id(self, id_producto: int) -> Producto | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM productos WHERE id_producto = %s"
                cursor.execute(sql, (id_producto,))
                fila = cursor.fetchone()
            if fila is None:
                return None
            return _fila_a_producto(fila)
        finally:
            conexion.close()

    def obtener_todos(self) -> list[Producto]:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM productos ORDER BY id_producto"
                cursor.execute(sql)
                filas = cursor.fetchall()
            return [_fila_a_producto(f) for f in filas]
        finally:
            conexion.close()

    def actualizar(self, producto: Producto) -> Producto:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = """
                    UPDATE productos
                    SET codigo_barras = %s, nombre = %s, precio_venta = %s,
                        precio_compra = %s, stock = %s, id_categoria = %s
                    WHERE id_producto = %s
                """
                cursor.execute(sql, (
                    producto.codigo_barras,
                    producto.nombre,
                    producto.precio_venta,
                    producto.precio_compra,
                    producto.stock,
                    producto.id_categoria,
                    producto.id_producto,
                ))
            return producto
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada("Ya existe un producto con ese código de barras.")
            raise
        finally:
            conexion.close()

    def eliminar(self, id_producto: int) -> None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "DELETE FROM productos WHERE id_producto = %s"
                cursor.execute(sql, (id_producto,))
        finally:
            conexion.close()
