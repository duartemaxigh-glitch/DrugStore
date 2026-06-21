# ============================================================
# Repositorio MySQL: Compra
# ============================================================
# Igual que Venta: cabecera + detalles, con transacciones.
# ============================================================

from dominio.entidades.compra import Compra, CompraDetalle
from dominio.repositorios.repositorio_compra import RepositorioCompra
from infraestructura.basedatos.conexion import obtener_conexion


class RepositorioCompraMySQL(RepositorioCompra):

    def crear(self, compra: Compra) -> Compra:
        conexion = obtener_conexion()
        try:
            conexion.autocommit(False)

            with conexion.cursor() as cursor:
                sql_compra = """
                    INSERT INTO compras (id_proveedor, id_usuario, total)
                    VALUES (%s, %s, %s)
                """
                cursor.execute(sql_compra, (
                    compra.id_proveedor,
                    compra.id_usuario,
                    compra.total,
                ))
                compra.id_compra = cursor.lastrowid

                sql_detalle = """
                    INSERT INTO compra_detalle (id_compra, id_producto, cantidad, precio_unitario, subtotal)
                    VALUES (%s, %s, %s, %s, %s)
                """
                for detalle in compra.detalles:
                    cursor.execute(sql_detalle, (
                        compra.id_compra,
                        detalle.id_producto,
                        detalle.cantidad,
                        detalle.precio_unitario,
                        detalle.subtotal,
                    ))
                    detalle.id_compra = compra.id_compra
                    detalle.id_detalle = cursor.lastrowid

            conexion.commit()
            return compra
        except Exception:
            conexion.rollback()
            raise
        finally:
            conexion.close()

    def obtener_por_id(self, id_compra: int) -> Compra | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                cursor.execute("SELECT * FROM compras WHERE id_compra = %s", (id_compra,))
                fila_compra = cursor.fetchone()

                if fila_compra is None:
                    return None

                cursor.execute("SELECT * FROM compra_detalle WHERE id_compra = %s", (id_compra,))
                filas_detalle = cursor.fetchall()

            detalles = [
                CompraDetalle(
                    id_detalle=d['id_detalle'],
                    id_compra=d['id_compra'],
                    id_producto=d['id_producto'],
                    cantidad=d['cantidad'],
                    precio_unitario=float(d['precio_unitario']),
                    subtotal=float(d['subtotal']),
                )
                for d in filas_detalle
            ]

            return Compra(
                id_compra=fila_compra['id_compra'],
                fecha=fila_compra['fecha'],
                id_proveedor=fila_compra['id_proveedor'],
                id_usuario=fila_compra['id_usuario'],
                total=float(fila_compra['total']),
                detalles=detalles,
            )
        finally:
            conexion.close()

    def obtener_todos(self) -> list[Compra]:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                cursor.execute("SELECT * FROM compras ORDER BY id_compra DESC")
                filas_compras = cursor.fetchall()

            compras = []
            for fc in filas_compras:
                with conexion.cursor() as cursor:
                    cursor.execute(
                        "SELECT * FROM compra_detalle WHERE id_compra = %s",
                        (fc['id_compra'],),
                    )
                    filas_detalle = cursor.fetchall()

                detalles = [
                    CompraDetalle(
                        id_detalle=d['id_detalle'],
                        id_compra=d['id_compra'],
                        id_producto=d['id_producto'],
                        cantidad=d['cantidad'],
                        precio_unitario=float(d['precio_unitario']),
                        subtotal=float(d['subtotal']),
                    )
                    for d in filas_detalle
                ]

                compras.append(Compra(
                    id_compra=fc['id_compra'],
                    fecha=fc['fecha'],
                    id_proveedor=fc['id_proveedor'],
                    id_usuario=fc['id_usuario'],
                    total=float(fc['total']),
                    detalles=detalles,
                ))
            return compras
        finally:
            conexion.close()

    def eliminar(self, id_compra: int) -> None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "DELETE FROM compras WHERE id_compra = %s"
                cursor.execute(sql, (id_compra,))
        finally:
            conexion.close()
