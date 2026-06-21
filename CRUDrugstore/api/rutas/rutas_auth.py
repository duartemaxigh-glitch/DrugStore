# ============================================================
# Rutas: Autenticación (Login)
# ============================================================
# POST /auth/login → Recibe email y password, devuelve JWT.
# Este es el ÚNICO endpoint que no requiere token.
# ============================================================

from fastapi import APIRouter, Depends, HTTPException, status
from api.esquemas import LoginEsquema, TokenEsquema
from api.dependencias import obtener_repo_usuario
from aplicacion.casos_de_uso.usuarios.login_usuario import LoginUsuario
from infraestructura.seguridad.jwt_servicio import crear_token
from dominio.excepciones import ErrorDeValidacion

router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/login", response_model=TokenEsquema)
def login(datos: LoginEsquema, repo=Depends(obtener_repo_usuario)):
    try:
        caso_de_uso = LoginUsuario(repo)
        usuario = caso_de_uso.ejecutar(datos.email, datos.password)

        token = crear_token(usuario.id_usuario, usuario.email, usuario.rol)

        return TokenEsquema(token=token, rol=usuario.rol)

    except ErrorDeValidacion as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )
