# ============================================================
# Repositorio MySQL: Medio de Pago
# ============================================================

from dominio.entidades.medio_pago import MedioPago
from dominio.excepciones import EntidadDuplicada
from dominio.repositorios.repositorio_medio_pago import RepositorioMedioPago
from infraestructura.basedatos.conexion import obtener_conexion


class RepositorioMedioPagoMySQL(RepositorioMedioPago):

    def crear(self, medio_pago: MedioPago) -> MedioPago:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "INSERT INTO medios_pago (nombre) VALUES (%s)"
                cursor.execute(sql, (medio_pago.nombre,))
                medio_pago.id_medio_pago = cursor.lastrowid
            return medio_pago
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada(f"Ya existe un medio de pago con nombre '{medio_pago.nombre}'.")
            raise
        finally:
            conexion.close()

    def obtener_por_id(self, id_medio_pago: int) -> MedioPago | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM medios_pago WHERE id_medio_pago = %s"
                cursor.execute(sql, (id_medio_pago,))
                fila = cursor.fetchone()
            if fila is None:
                return None
            return MedioPago(
                id_medio_pago=fila['id_medio_pago'],
                nombre=fila['nombre'],
            )
        finally:
            conexion.close()

    def obtener_todos(self) -> list[MedioPago]:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM medios_pago ORDER BY id_medio_pago"
                cursor.execute(sql)
                filas = cursor.fetchall()
            return [
                MedioPago(id_medio_pago=f['id_medio_pago'], nombre=f['nombre'])
                for f in filas
            ]
        finally:
            conexion.close()

    def actualizar(self, medio_pago: MedioPago) -> MedioPago:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "UPDATE medios_pago SET nombre = %s WHERE id_medio_pago = %s"
                cursor.execute(sql, (medio_pago.nombre, medio_pago.id_medio_pago))
            return medio_pago
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada(f"Ya existe un medio de pago con nombre '{medio_pago.nombre}'.")
            raise
        finally:
            conexion.close()

    def eliminar(self, id_medio_pago: int) -> None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "DELETE FROM medios_pago WHERE id_medio_pago = %s"
                cursor.execute(sql, (id_medio_pago,))
        finally:
            conexion.close()
