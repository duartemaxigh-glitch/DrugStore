# ============================================================
# Rutas: Usuarios (CRUD completo)
# ============================================================
# TODO el CRUD de usuarios requiere rol 'jefe'.
# Los empleados no tienen acceso a esta sección.
# ============================================================

from fastapi import APIRouter, Depends, HTTPException, status
from api.esquemas import UsuarioCrear, UsuarioActualizar, UsuarioRespuesta
from api.dependencias import obtener_repo_usuario, requiere_rol_jefe
from aplicacion.casos_de_uso.usuarios.crear_usuario import CrearUsuario
from aplicacion.casos_de_uso.usuarios.obtener_usuario import ObtenerUsuario
from aplicacion.casos_de_uso.usuarios.listar_usuarios import ListarUsuarios
from aplicacion.casos_de_uso.usuarios.actualizar_usuario import ActualizarUsuario
from aplicacion.casos_de_uso.usuarios.eliminar_usuario import EliminarUsuario
from dominio.excepciones import ErrorDeValidacion, EntidadNoEncontrada, EntidadDuplicada

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


def _a_respuesta(u) -> UsuarioRespuesta:
    return UsuarioRespuesta(
        id_usuario=u.id_usuario,
        apellido=u.apellido,
        nombre=u.nombre,
        dni=u.dni,
        email=u.email,
        rol=u.rol,
        telefono=u.telefono,
        activo=u.activo,
    )


@router.post("/", response_model=UsuarioRespuesta, status_code=status.HTTP_201_CREATED)
def crear(datos: UsuarioCrear, repo=Depends(obtener_repo_usuario), usuario=Depends(requiere_rol_jefe)):
    try:
        caso_de_uso = CrearUsuario(repo)
        nuevo = caso_de_uso.ejecutar(
            apellido=datos.apellido,
            nombre=datos.nombre,
            dni=datos.dni,
            email=datos.email,
            password=datos.password,
            rol=datos.rol,
            telefono=datos.telefono,
        )
        return _a_respuesta(nuevo)
    except ErrorDeValidacion as e:
        raise HTTPException(status_code=400, detail=str(e))
    except EntidadDuplicada as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.get("/", response_model=list[UsuarioRespuesta])
def listar(repo=Depends(obtener_repo_usuario), usuario=Depends(requiere_rol_jefe)):
    caso_de_uso = ListarUsuarios(repo)
    usuarios = caso_de_uso.ejecutar()
    return [_a_respuesta(u) for u in usuarios]


@router.get("/{id_usuario}", response_model=UsuarioRespuesta)
def obtener(id_usuario: int, repo=Depends(obtener_repo_usuario), usuario=Depends(requiere_rol_jefe)):
    try:
        caso_de_uso = ObtenerUsuario(repo)
        u = caso_de_uso.ejecutar(id_usuario)
        return _a_respuesta(u)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.put("/{id_usuario}", response_model=UsuarioRespuesta)
def actualizar(id_usuario: int, datos: UsuarioActualizar, repo=Depends(obtener_repo_usuario), usuario=Depends(requiere_rol_jefe)):
    try:
        caso_de_uso = ActualizarUsuario(repo)
        u = caso_de_uso.ejecutar(
            id_usuario=id_usuario,
            apellido=datos.apellido,
            nombre=datos.nombre,
            dni=datos.dni,
            email=datos.email,
            rol=datos.rol,
            telefono=datos.telefono,
        )
        return _a_respuesta(u)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ErrorDeValidacion as e:
        raise HTTPException(status_code=400, detail=str(e))
    except EntidadDuplicada as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.delete("/{id_usuario}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar(id_usuario: int, repo=Depends(obtener_repo_usuario), usuario=Depends(requiere_rol_jefe)):
    try:
        caso_de_uso = EliminarUsuario(repo)
        caso_de_uso.ejecutar(id_usuario)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))
