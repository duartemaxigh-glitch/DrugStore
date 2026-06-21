# ============================================================
# Conexión a la Base de Datos MySQL
# ============================================================
# Usa pymysql para conectarse a MySQL.
# Lee las credenciales desde un archivo .env para no
# dejar contraseñas en el código.
#
# ¿Qué es un "cursor"?
#   Es el objeto que usás para ejecutar consultas SQL.
#   Pensalo como un "puntero" que recorre los resultados.
#
# DictCursor: en lugar de devolver tuplas (1, "Limpieza"),
#   devuelve diccionarios {"id_categoria": 1, "nombre": "Limpieza"}.
#   Esto es más fácil de leer y usar.
# ============================================================

import os
import pymysql
from pymysql.cursors import DictCursor
from dotenv import load_dotenv

# Carga las variables del archivo .env
load_dotenv(override=True)


def obtener_conexion():
    """Crea y devuelve una conexión a MySQL."""
    conexion = pymysql.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        port=int(os.getenv('DB_PORT', 3306)),
        user=os.getenv('DB_USUARIO', 'root'),
        password=os.getenv('DB_PASSWORD', ''),
        database=os.getenv('DB_NOMBRE', 'drugstore'),
        cursorclass=DictCursor,
        autocommit=True,
    )
    return conexion
