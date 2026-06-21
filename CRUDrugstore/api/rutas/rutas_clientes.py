# ============================================================
# Rutas: Clientes (CRUD completo)
# ============================================================

from fastapi import APIRouter, Depends, HTTPException, status
from api.esquemas import ClienteCrear, ClienteRespuesta
from api.dependencias import obtener_repo_cliente, obtener_usuario_actual
from aplicacion.casos_de_uso.clientes.crear_cliente import CrearCliente
from aplicacion.casos_de_uso.clientes.obtener_cliente import ObtenerCliente
from aplicacion.casos_de_uso.clientes.listar_clientes import ListarClientes
from aplicacion.casos_de_uso.clientes.actualizar_cliente import ActualizarCliente
from aplicacion.casos_de_uso.clientes.eliminar_cliente import EliminarCliente
from dominio.excepciones import ErrorDeValidacion, EntidadNoEncontrada, EntidadDuplicada

router = APIRouter(prefix="/clientes", tags=["Clientes"])


def _a_respuesta(c) -> ClienteRespuesta:
    return ClienteRespuesta(
        id_cliente=c.id_cliente,
        apellido=c.apellido,
        nombre=c.nombre,
        dni=c.dni,
        cuit=c.cuit,
        telefono=c.telefono,
        activo=c.activo,
    )


@router.post("/", response_model=ClienteRespuesta, status_code=status.HTTP_201_CREATED)
def crear(datos: ClienteCrear, repo=Depends(obtener_repo_cliente), usuario=Depends(obtener_usuario_actual)):
    try:
        caso_de_uso = CrearCliente(repo)
        cliente = caso_de_uso.ejecutar(
            apellido=datos.apellido,
            nombre=datos.nombre,
            dni=datos.dni,
            cuit=datos.cuit,
            telefono=datos.telefono,
        )
        return _a_respuesta(cliente)
    except ErrorDeValidacion as e:
        raise HTTPException(status_code=400, detail=str(e))
    except EntidadDuplicada as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.get("/", response_model=list[ClienteRespuesta])
def listar(repo=Depends(obtener_repo_cliente), usuario=Depends(obtener_usuario_actual)):
    caso_de_uso = ListarClientes(repo)
    clientes = caso_de_uso.ejecutar()
    return [_a_respuesta(c) for c in clientes]


@router.get("/{id_cliente}", response_model=ClienteRespuesta)
def obtener(id_cliente: int, repo=Depends(obtener_repo_cliente), usuario=Depends(obtener_usuario_actual)):
    try:
        caso_de_uso = ObtenerCliente(repo)
        cliente = caso_de_uso.ejecutar(id_cliente)
        return _a_respuesta(cliente)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.put("/{id_cliente}", response_model=ClienteRespuesta)
def actualizar(id_cliente: int, datos: ClienteCrear, repo=Depends(obtener_repo_cliente), usuario=Depends(obtener_usuario_actual)):
    try:
        caso_de_uso = ActualizarCliente(repo)
        cliente = caso_de_uso.ejecutar(
            id_cliente=id_cliente,
            apellido=datos.apellido,
            nombre=datos.nombre,
            dni=datos.dni,
            cuit=datos.cuit,
            telefono=datos.telefono,
        )
        return _a_respuesta(cliente)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ErrorDeValidacion as e:
        raise HTTPException(status_code=400, detail=str(e))
    except EntidadDuplicada as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.delete("/{id_cliente}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar(id_cliente: int, repo=Depends(obtener_repo_cliente), usuario=Depends(obtener_usuario_actual)):
    try:
        caso_de_uso = EliminarCliente(repo)
        caso_de_uso.ejecutar(id_cliente)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))
