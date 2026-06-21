# ============================================================
# Rutas: Medios de Pago (CRUD completo)
# ============================================================

from fastapi import APIRouter, Depends, HTTPException, status
from api.esquemas import MedioPagoCrear, MedioPagoRespuesta
from api.dependencias import obtener_repo_medio_pago, obtener_usuario_actual
from aplicacion.casos_de_uso.medios_pago.crear_medio_pago import CrearMedioPago
from aplicacion.casos_de_uso.medios_pago.obtener_medio_pago import ObtenerMedioPago
from aplicacion.casos_de_uso.medios_pago.listar_medios_pago import ListarMediosPago
from aplicacion.casos_de_uso.medios_pago.actualizar_medio_pago import ActualizarMedioPago
from aplicacion.casos_de_uso.medios_pago.eliminar_medio_pago import EliminarMedioPago
from dominio.excepciones import ErrorDeValidacion, EntidadNoEncontrada, EntidadDuplicada

router = APIRouter(prefix="/medios-pago", tags=["Medios de Pago"])


@router.post("/", response_model=MedioPagoRespuesta, status_code=status.HTTP_201_CREATED)
def crear(datos: MedioPagoCrear, repo=Depends(obtener_repo_medio_pago), usuario=Depends(obtener_usuario_actual)):
    try:
        caso_de_uso = CrearMedioPago(repo)
        mp = caso_de_uso.ejecutar(datos.nombre)
        return MedioPagoRespuesta(id_medio_pago=mp.id_medio_pago, nombre=mp.nombre)
    except ErrorDeValidacion as e:
        raise HTTPException(status_code=400, detail=str(e))
    except EntidadDuplicada as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.get("/", response_model=list[MedioPagoRespuesta])
def listar(repo=Depends(obtener_repo_medio_pago), usuario=Depends(obtener_usuario_actual)):
    caso_de_uso = ListarMediosPago(repo)
    medios = caso_de_uso.ejecutar()
    return [
        MedioPagoRespuesta(id_medio_pago=m.id_medio_pago, nombre=m.nombre)
        for m in medios
    ]


@router.get("/{id_medio_pago}", response_model=MedioPagoRespuesta)
def obtener(id_medio_pago: int, repo=Depends(obtener_repo_medio_pago), usuario=Depends(obtener_usuario_actual)):
    try:
        caso_de_uso = ObtenerMedioPago(repo)
        mp = caso_de_uso.ejecutar(id_medio_pago)
        return MedioPagoRespuesta(id_medio_pago=mp.id_medio_pago, nombre=mp.nombre)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.put("/{id_medio_pago}", response_model=MedioPagoRespuesta)
def actualizar(id_medio_pago: int, datos: MedioPagoCrear, repo=Depends(obtener_repo_medio_pago), usuario=Depends(obtener_usuario_actual)):
    try:
        caso_de_uso = ActualizarMedioPago(repo)
        mp = caso_de_uso.ejecutar(id_medio_pago, datos.nombre)
        return MedioPagoRespuesta(id_medio_pago=mp.id_medio_pago, nombre=mp.nombre)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ErrorDeValidacion as e:
        raise HTTPException(status_code=400, detail=str(e))
    except EntidadDuplicada as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.delete("/{id_medio_pago}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar(id_medio_pago: int, repo=Depends(obtener_repo_medio_pago), usuario=Depends(obtener_usuario_actual)):
    try:
        caso_de_uso = EliminarMedioPago(repo)
        caso_de_uso.ejecutar(id_medio_pago)
    except EntidadNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))
