# ============================================================
# Caso de Uso: Crear Usuario
# ============================================================
# Recibe la contraseña en texto plano y la hashea con bcrypt
# antes de guardarla. NUNCA se guarda la contraseña sin hash.
# ============================================================

import bcrypt
from dominio.entidades.usuario import Usuario
from dominio.repositorios.repositorio_usuario import RepositorioUsuario


class CrearUsuario:
    def __init__(self, repositorio: RepositorioUsuario):
        self.repositorio = repositorio

    def ejecutar(
        self,
        apellido: str,
        nombre: str,
        dni: str,
        email: str,
        password: str,
        rol: str = 'empleado',
        telefono: str = None,
    ) -> Usuario:
        # Hasheamos la contraseña antes de crear la entidad
        password_hash = bcrypt.hashpw(
            password.encode('utf-8'), bcrypt.gensalt()
        ).decode('utf-8')

        usuario = Usuario(
            apellido=apellido,
            nombre=nombre,
            dni=dni,
            email=email,
            password_hash=password_hash,
            rol=rol,
            telefono=telefono,
        )
        usuario.validar()
        return self.repositorio.crear(usuario)
