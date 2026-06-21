# ============================================================
# Caso de Uso: Login (Iniciar Sesión)
# ============================================================
# Busca al usuario por email, verifica la contraseña con
# bcrypt y devuelve el usuario si es correcto.
# Este caso de uso NO genera el JWT (eso es infraestructura).
# Solo valida credenciales.
# ============================================================

import bcrypt
from dominio.entidades.usuario import Usuario
from dominio.excepciones import ErrorDeValidacion
from dominio.repositorios.repositorio_usuario import RepositorioUsuario


class LoginUsuario:
    def __init__(self, repositorio: RepositorioUsuario):
        self.repositorio = repositorio

    def ejecutar(self, email: str, password: str) -> Usuario:
        usuario = self.repositorio.obtener_por_email(email)
        if usuario is None:
            raise ErrorDeValidacion("Email o contraseña incorrectos.")

        # Verificamos la contraseña con bcrypt
        password_correcta = bcrypt.checkpw(
            password.encode('utf-8'),
            usuario.password_hash.encode('utf-8'),
        )
        if not password_correcta:
            raise ErrorDeValidacion("Email o contraseña incorrectos.")

        return usuario
