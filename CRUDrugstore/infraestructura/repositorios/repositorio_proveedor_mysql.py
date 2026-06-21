# ============================================================
# Repositorio MySQL: Proveedor
# ============================================================

from dominio.entidades.proveedor import Proveedor
from dominio.excepciones import EntidadDuplicada
from dominio.repositorios.repositorio_proveedor import RepositorioProveedor
from infraestructura.basedatos.conexion import obtener_conexion


def _fila_a_proveedor(fila: dict) -> Proveedor:
    return Proveedor(
        id_proveedor=fila['id_proveedor'],
        razon_social=fila['razon_social'],
        cuit_cuil=fila['cuit_cuil'],
        contacto_nombre=fila['contacto_nombre'],
        telefono=fila['telefono'],
        email=fila['email'],
        activo=bool(fila['activo']),
    )


class RepositorioProveedorMySQL(RepositorioProveedor):

    def crear(self, proveedor: Proveedor) -> Proveedor:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = """
                    INSERT INTO proveedores (razon_social, cuit_cuil, contacto_nombre, telefono, email)
                    VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    proveedor.razon_social,
                    proveedor.cuit_cuil,
                    proveedor.contacto_nombre,
                    proveedor.telefono,
                    proveedor.email,
                ))
                proveedor.id_proveedor = cursor.lastrowid
            return proveedor
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada("Ya existe un proveedor con ese CUIT/CUIL.")
            raise
        finally:
            conexion.close()

    def obtener_por_id(self, id_proveedor: int) -> Proveedor | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM proveedores WHERE id_proveedor = %s AND activo = TRUE"
                cursor.execute(sql, (id_proveedor,))
                fila = cursor.fetchone()
            if fila is None:
                return None
            return _fila_a_proveedor(fila)
        finally:
            conexion.close()

    def obtener_todos(self) -> list[Proveedor]:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM proveedores WHERE activo = TRUE ORDER BY id_proveedor"
                cursor.execute(sql)
                filas = cursor.fetchall()
            return [_fila_a_proveedor(f) for f in filas]
        finally:
            conexion.close()

    def actualizar(self, proveedor: Proveedor) -> Proveedor:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = """
                    UPDATE proveedores
                    SET razon_social = %s, cuit_cuil = %s, contacto_nombre = %s,
                        telefono = %s, email = %s
                    WHERE id_proveedor = %s
                """
                cursor.execute(sql, (
                    proveedor.razon_social,
                    proveedor.cuit_cuil,
                    proveedor.contacto_nombre,
                    proveedor.telefono,
                    proveedor.email,
                    proveedor.id_proveedor,
                ))
            return proveedor
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada("Ya existe un proveedor con ese CUIT/CUIL.")
            raise
        finally:
            conexion.close()

    def eliminar(self, id_proveedor: int) -> None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "UPDATE proveedores SET activo = FALSE WHERE id_proveedor = %s"
                cursor.execute(sql, (id_proveedor,))
        finally:
            conexion.close()
