# ============================================================
# Repositorio MySQL: Usuario
# ============================================================
# Implementa RepositorioUsuario.
# Incluye obtener_por_email que es necesario para el login.
# ============================================================

from dominio.entidades.usuario import Usuario
from dominio.excepciones import EntidadDuplicada
from dominio.repositorios.repositorio_usuario import RepositorioUsuario
from infraestructura.basedatos.conexion import obtener_conexion


def _fila_a_usuario(fila: dict) -> Usuario:
    """Convierte un diccionario (fila de la BD) en una entidad Usuario."""
    return Usuario(
        id_usuario=fila['id_usuario'],
        apellido=fila['apellido'],
        nombre=fila['nombre'],
        dni=fila['dni'],
        telefono=fila['telefono'],
        email=fila['email'],
        password_hash=fila['password_hash'],
        rol=fila['rol'],
        activo=bool(fila['activo']),
    )


class RepositorioUsuarioMySQL(RepositorioUsuario):

    def crear(self, usuario: Usuario) -> Usuario:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = """
                    INSERT INTO usuarios (apellido, nombre, dni, telefono, email, password_hash, rol)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    usuario.apellido,
                    usuario.nombre,
                    usuario.dni,
                    usuario.telefono,
                    usuario.email,
                    usuario.password_hash,
                    usuario.rol,
                ))
                usuario.id_usuario = cursor.lastrowid
            return usuario
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada("Ya existe un usuario con ese DNI o email.")
            raise
        finally:
            conexion.close()

    def obtener_por_id(self, id_usuario: int) -> Usuario | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM usuarios WHERE id_usuario = %s AND activo = TRUE"
                cursor.execute(sql, (id_usuario,))
                fila = cursor.fetchone()
            if fila is None:
                return None
            return _fila_a_usuario(fila)
        finally:
            conexion.close()

    def obtener_por_email(self, email: str) -> Usuario | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM usuarios WHERE email = %s AND activo = TRUE"
                cursor.execute(sql, (email,))
                fila = cursor.fetchone()
            if fila is None:
                return None
            return _fila_a_usuario(fila)
        finally:
            conexion.close()

    def obtener_todos(self) -> list[Usuario]:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM usuarios WHERE activo = TRUE ORDER BY id_usuario"
                cursor.execute(sql)
                filas = cursor.fetchall()
            return [_fila_a_usuario(f) for f in filas]
        finally:
            conexion.close()

    def actualizar(self, usuario: Usuario) -> Usuario:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = """
                    UPDATE usuarios
                    SET apellido = %s, nombre = %s, dni = %s,
                        telefono = %s, email = %s, rol = %s
                    WHERE id_usuario = %s
                """
                cursor.execute(sql, (
                    usuario.apellido,
                    usuario.nombre,
                    usuario.dni,
                    usuario.telefono,
                    usuario.email,
                    usuario.rol,
                    usuario.id_usuario,
                ))
            return usuario
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada("Ya existe un usuario con ese DNI o email.")
            raise
        finally:
            conexion.close()

    def eliminar(self, id_usuario: int) -> None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "UPDATE usuarios SET activo = FALSE WHERE id_usuario = %s"
                cursor.execute(sql, (id_usuario,))
        finally:
            conexion.close()
