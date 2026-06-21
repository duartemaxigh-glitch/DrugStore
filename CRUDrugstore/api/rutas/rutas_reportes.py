# ============================================================
# Rutas: Reportes Diarios de Ventas y Compras
# ============================================================
# Cada reporte tiene 2 endpoints:
#   - GET .../reportes/ventas?fecha=2025-06-15     → JSON
#   - GET .../reportes/ventas/ticket?fecha=2025-06-15 → Texto
#
# Si no se pasa fecha, se usa la fecha de hoy.
#
# El JSON es para mostrar en pantalla (tabla, gráficos, etc).
# El ticket es texto plano para enviar a la impresora térmica.
# ============================================================

from datetime import date
from fastapi import APIRouter, Depends, Query
from fastapi.responses import PlainTextResponse

from api.esquemas import ReporteVentasDia, ReporteComprasDia
from api.dependencias import requiere_rol_jefe
from infraestructura.servicios.servicio_reportes import (
    obtener_reporte_ventas_por_dia,
    obtener_reporte_compras_por_dia,
)
from infraestructura.servicios.generador_ticket import (
    generar_ticket_reporte_ventas,
    generar_ticket_reporte_compras,
)

router = APIRouter(prefix="/reportes", tags=["Reportes"])


# ======================== VENTAS ========================

@router.get("/ventas", response_model=ReporteVentasDia)
def reporte_ventas_dia(
    fecha: date = Query(default=None, description="Fecha en formato YYYY-MM-DD. Si no se envía, se usa hoy."),
    usuario=Depends(requiere_rol_jefe),
):
    """Devuelve el reporte de ventas del día en JSON (para mostrar en pantalla)."""
    if fecha is None:
        fecha = date.today()
    return obtener_reporte_ventas_por_dia(fecha)


@router.get("/ventas/ticket", response_class=PlainTextResponse)
def reporte_ventas_dia_ticket(
    fecha: date = Query(default=None, description="Fecha en formato YYYY-MM-DD. Si no se envía, se usa hoy."),
    usuario=Depends(requiere_rol_jefe),
):
    """Devuelve el reporte de ventas del día como texto plano para impresora de 80mm."""
    if fecha is None:
        fecha = date.today()
    reporte = obtener_reporte_ventas_por_dia(fecha)
    texto = generar_ticket_reporte_ventas(reporte)
    return PlainTextResponse(content=texto)


# ======================== COMPRAS ========================

@router.get("/compras", response_model=ReporteComprasDia)
def reporte_compras_dia(
    fecha: date = Query(default=None, description="Fecha en formato YYYY-MM-DD. Si no se envía, se usa hoy."),
    usuario=Depends(requiere_rol_jefe),
):
    """Devuelve el reporte de compras del día en JSON (para mostrar en pantalla)."""
    if fecha is None:
        fecha = date.today()
    return obtener_reporte_compras_por_dia(fecha)


@router.get("/compras/ticket", response_class=PlainTextResponse)
def reporte_compras_dia_ticket(
    fecha: date = Query(default=None, description="Fecha en formato YYYY-MM-DD. Si no se envía, se usa hoy."),
    usuario=Depends(requiere_rol_jefe),
):
    """Devuelve el reporte de compras del día como texto plano para impresora de 80mm."""
    if fecha is None:
        fecha = date.today()
    reporte = obtener_reporte_compras_por_dia(fecha)
    texto = generar_ticket_reporte_compras(reporte)
    return PlainTextResponse(content=texto)
