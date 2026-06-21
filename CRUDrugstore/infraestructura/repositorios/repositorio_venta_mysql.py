# ============================================================
# Repositorio MySQL: Venta
# ============================================================
# Una venta tiene una tabla cabecera (ventas) y una tabla
# de detalles (venta_detalle). Al crear, insertamos ambas.
# Al obtener, hacemos JOIN para traer todo junto.
# ============================================================

from dominio.entidades.venta import Venta, VentaDetalle
from dominio.repositorios.repositorio_venta import RepositorioVenta
from infraestructura.basedatos.conexion import obtener_conexion


class RepositorioVentaMySQL(RepositorioVenta):

    def crear(self, venta: Venta) -> Venta:
        conexion = obtener_conexion()
        try:
            # Desactivamos autocommit para usar transacción
            conexion.autocommit(False)

            with conexion.cursor() as cursor:
                # 1. Insertamos la cabecera de la venta
                sql_venta = """
                    INSERT INTO ventas (id_usuario, id_cliente, id_medio_pago, total)
                    VALUES (%s, %s, %s, %s)
                """
                cursor.execute(sql_venta, (
                    venta.id_usuario,
                    venta.id_cliente,
                    venta.id_medio_pago,
                    venta.total,
                ))
                venta.id_venta = cursor.lastrowid

                # 2. Insertamos cada línea del detalle
                sql_detalle = """
                    INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_unitario, subtotal)
                    VALUES (%s, %s, %s, %s, %s)
                """
                for detalle in venta.detalles:
                    cursor.execute(sql_detalle, (
                        venta.id_venta,
                        detalle.id_producto,
                        detalle.cantidad,
                        detalle.precio_unitario,
                        detalle.subtotal,
                    ))
                    detalle.id_venta = venta.id_venta
                    detalle.id_detalle = cursor.lastrowid

            # Si todo salió bien, confirmamos
            conexion.commit()
            return venta
        except Exception:
            conexion.rollback()
            raise
        finally:
            conexion.close()

    def obtener_por_id(self, id_venta: int) -> Venta | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                # Traemos la cabecera
                cursor.execute("SELECT * FROM ventas WHERE id_venta = %s", (id_venta,))
                fila_venta = cursor.fetchone()

                if fila_venta is None:
                    return None

                # Traemos los detalles
                cursor.execute("SELECT * FROM venta_detalle WHERE id_venta = %s", (id_venta,))
                filas_detalle = cursor.fetchall()

            detalles = [
                VentaDetalle(
                    id_detalle=d['id_detalle'],
                    id_venta=d['id_venta'],
                    id_producto=d['id_producto'],
                    cantidad=d['cantidad'],
                    precio_unitario=float(d['precio_unitario']),
                    subtotal=float(d['subtotal']),
                )
                for d in filas_detalle
            ]

            return Venta(
                id_venta=fila_venta['id_venta'],
                fecha=fila_venta['fecha'],
                id_usuario=fila_venta['id_usuario'],
                id_cliente=fila_venta['id_cliente'],
                id_medio_pago=fila_venta['id_medio_pago'],
                total=float(fila_venta['total']),
                detalles=detalles,
            )
        finally:
            conexion.close()

    def obtener_todos(self) -> list[Venta]:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                cursor.execute("SELECT * FROM ventas ORDER BY id_venta DESC")
                filas_ventas = cursor.fetchall()

            ventas = []
            for fv in filas_ventas:
                with conexion.cursor() as cursor:
                    cursor.execute(
                        "SELECT * FROM venta_detalle WHERE id_venta = %s",
                        (fv['id_venta'],),
                    )
                    filas_detalle = cursor.fetchall()

                detalles = [
                    VentaDetalle(
                        id_detalle=d['id_detalle'],
                        id_venta=d['id_venta'],
                        id_producto=d['id_producto'],
                        cantidad=d['cantidad'],
                        precio_unitario=float(d['precio_unitario']),
                        subtotal=float(d['subtotal']),
                    )
                    for d in filas_detalle
                ]

                ventas.append(Venta(
                    id_venta=fv['id_venta'],
                    fecha=fv['fecha'],
                    id_usuario=fv['id_usuario'],
                    id_cliente=fv['id_cliente'],
                    id_medio_pago=fv['id_medio_pago'],
                    total=float(fv['total']),
                    detalles=detalles,
                ))
            return ventas
        finally:
            conexion.close()

    def eliminar(self, id_venta: int) -> None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                # Los detalles se borran automáticamente por ON DELETE CASCADE
                sql = "DELETE FROM ventas WHERE id_venta = %s"
                cursor.execute(sql, (id_venta,))
        finally:
            conexion.close()
