# ============================================================
# Repositorio MySQL: Categoría
# ============================================================
# Esta clase IMPLEMENTA el contrato RepositorioCategoria.
# Hereda de la interfaz abstracta y escribe el código real
# que ejecuta las consultas SQL con pymysql.
#
# Fijate que esta clase está en INFRAESTRUCTURA y referencia
# a DOMINIO (la interfaz y la entidad). Así es Clean Arch:
# la capa externa conoce a la interna, nunca al revés.
# ============================================================

from dominio.entidades.categoria import Categoria
from dominio.excepciones import EntidadDuplicada
from dominio.repositorios.repositorio_categoria import RepositorioCategoria
from infraestructura.basedatos.conexion import obtener_conexion


class RepositorioCategoriaMySQL(RepositorioCategoria):

    def crear(self, categoria: Categoria) -> Categoria:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "INSERT INTO categorias (nombre) VALUES (%s)"
                cursor.execute(sql, (categoria.nombre,))
                categoria.id_categoria = cursor.lastrowid
            return categoria
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada(f"Ya existe una categoría con nombre '{categoria.nombre}'.")
            raise
        finally:
            conexion.close()

    def obtener_por_id(self, id_categoria: int) -> Categoria | None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM categorias WHERE id_categoria = %s"
                cursor.execute(sql, (id_categoria,))
                fila = cursor.fetchone()
            if fila is None:
                return None
            return Categoria(
                id_categoria=fila['id_categoria'],
                nombre=fila['nombre'],
            )
        finally:
            conexion.close()

    def obtener_todos(self) -> list[Categoria]:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "SELECT * FROM categorias ORDER BY id_categoria"
                cursor.execute(sql)
                filas = cursor.fetchall()
            return [
                Categoria(id_categoria=f['id_categoria'], nombre=f['nombre'])
                for f in filas
            ]
        finally:
            conexion.close()

    def actualizar(self, categoria: Categoria) -> Categoria:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "UPDATE categorias SET nombre = %s WHERE id_categoria = %s"
                cursor.execute(sql, (categoria.nombre, categoria.id_categoria))
            return categoria
        except Exception as e:
            if 'Duplicate' in str(e):
                raise EntidadDuplicada(f"Ya existe una categoría con nombre '{categoria.nombre}'.")
            raise
        finally:
            conexion.close()

    def eliminar(self, id_categoria: int) -> None:
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                sql = "DELETE FROM categorias WHERE id_categoria = %s"
                cursor.execute(sql, (id_categoria,))
        finally:
            conexion.close()
