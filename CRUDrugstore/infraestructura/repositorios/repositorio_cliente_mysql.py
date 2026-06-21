# ============================================================
# Repositorio MySQL: Cliente
# ============================================================

from dominio.entidades.cliente import Cliente
from dominio.excepciones import EntidadDuplicada
from dominio.repositorios.repositorio_cliente import RepositorioCliente
from infraestructura.basedatos.conexion import obtener_conexion


def _fila_a_cliente(fila: dict) -> Cliente:
    return Cliente(
        id_cliente=fila['id_cliente'],
        apellido=fila['apellido'],
        nombre=fila['nombre'],
        dni=fila['dni'],
        cuit=fila['cuit'],
        telefono=fila['telefono'],
        activo=bool(fila['activo']),
    )


class RepositorioClienteMySQL(RepositorioCliente):

    def crear(self, cliente: Cliente) -> Cliente:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = """
                    INSERT INTO clientes (apellido, nombre, dni, cuit, telefono)
                    VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    cliente.apellido,
                    cliente.nombre,
                    cliente.dni,
                    cliente.cuit,
                    cliente.telefono,
                ))
                cliente.id_cliente = cursor.lastrowid
            return cliente
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada("Ya existe un cliente con ese DNI o CUIT.")
            raise
        finally:
            conexion.close()

    def obtener_por_id(self, id_cliente: int) -> Cliente | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM clientes WHERE id_cliente = %s AND activo = TRUE"
                cursor.execute(sql, (id_cliente,))
                fila = cursor.fetchone()
            if fila is None:
                return None
            return _fila_a_cliente(fila)
        finally:
            conexion.close()

    def obtener_todos(self) -> list[Cliente]:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM clientes WHERE activo = TRUE ORDER BY id_cliente"
                cursor.execute(sql)
                filas = cursor.fetchall()
            return [_fila_a_cliente(f) for f in filas]
        finally:
            conexion.close()

    def actualizar(self, cliente: Cliente) -> Cliente:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = """
                    UPDATE clientes
                    SET apellido = %s, nombre = %s, dni = %s,
                        cuit = %s, telefono = %s
                    WHERE id_cliente = %s
                """
                cursor.execute(sql, (
                    cliente.apellido,
                    cliente.nombre,
                    cliente.dni,
                    cliente.cuit,
                    cliente.telefono,
                    cliente.id_cliente,
                ))
            return cliente
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada("Ya existe un cliente con ese DNI o CUIT.")
            raise
        finally:
            conexion.close()

    def eliminar(self, id_cliente: int) -> None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "UPDATE clientes SET activo = FALSE WHERE id_cliente = %s"
                cursor.execute(sql, (id_cliente,))
        finally:
            conexion.close()
