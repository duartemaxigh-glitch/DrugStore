# ============================================================
# Servicio de Reportes Diarios
# ============================================================
# Consulta la base de datos para armar reportes de ventas
# y compras filtrados por fecha.
#
# ¿Por qué está en Infraestructura y no como Caso de Uso?
# Porque los reportes son CONSULTAS de lectura que hacen
# JOINs específicos de SQL. No modifican datos ni aplican
# reglas de negocio. Son un detalle de infraestructura.
# ============================================================

from datetime import date
from infraestructura.basedatos.conexion import obtener_conexion


def obtener_reporte_ventas_por_dia(fecha: date) -> dict:
    """
    Devuelve un dict con la estructura:
    {
        'fecha': '15/06/2025',
        'cantidad_ventas': 5,
        'total_dia': 12500.00,
        'ventas': [
            {
                'id_venta': 1,
                'hora': '14:30',
                'cajero': 'Juan Pérez',
                'cliente': 'María López' o None,
                'medio_pago': 'Efectivo',
                'total': 2500.00,
            },
            ...
        ]
    }
    """
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            sql = """
                SELECT
                    v.id_venta,
                    v.fecha,
                    v.total,
                    CONCAT(u.nombre, ' ', u.apellido) AS cajero,
                    CASE
                        WHEN c.id_cliente IS NOT NULL
                        THEN CONCAT(COALESCE(c.nombre, ''), ' ', COALESCE(c.apellido, ''))
                        ELSE NULL
                    END AS cliente,
                    mp.nombre AS medio_pago
                FROM ventas v
                JOIN usuarios u ON v.id_usuario = u.id_usuario
                LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
                JOIN medios_pago mp ON v.id_medio_pago = mp.id_medio_pago
                WHERE DATE(v.fecha) = %s
                ORDER BY v.fecha ASC
            """
            cursor.execute(sql, (fecha.isoformat(),))
            filas = cursor.fetchall()

        ventas = []
        total_dia = 0.0

        for f in filas:
            total_venta = float(f['total'])
            total_dia += total_venta

            cliente = f['cliente']
            if cliente:
                cliente = cliente.strip()
                if not cliente:
                    cliente = None

            ventas.append({
                'id_venta': f['id_venta'],
                'hora': f['fecha'].strftime('%H:%M') if f['fecha'] else '',
                'cajero': f['cajero'],
                'cliente': cliente,
                'medio_pago': f['medio_pago'],
                'total': total_venta,
            })

        return {
            'fecha': fecha.strftime('%d/%m/%Y'),
            'cantidad_ventas': len(ventas),
            'total_dia': total_dia,
            'ventas': ventas,
        }
    finally:
        conexion.close()


def obtener_reporte_compras_por_dia(fecha: date) -> dict:
    """
    Devuelve un dict con la estructura:
    {
        'fecha': '15/06/2025',
        'cantidad_compras': 3,
        'total_dia': 8500.00,
        'compras': [
            {
                'id_compra': 1,
                'hora': '10:00',
                'usuario': 'Juan Pérez',
                'proveedor': 'Distribuidora Norte',
                'total': 3000.00,
            },
            ...
        ]
    }
    """
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            sql = """
                SELECT
                    c.id_compra,
                    c.fecha,
                    c.total,
                    CONCAT(u.nombre, ' ', u.apellido) AS usuario,
                    p.razon_social AS proveedor
                FROM compras c
                JOIN usuarios u ON c.id_usuario = u.id_usuario
                JOIN proveedores p ON c.id_proveedor = p.id_proveedor
                WHERE DATE(c.fecha) = %s
                ORDER BY c.fecha ASC
            """
            cursor.execute(sql, (fecha.isoformat(),))
            filas = cursor.fetchall()

        compras = []
        total_dia = 0.0

        for f in filas:
            total_compra = float(f['total'])
            total_dia += total_compra

            compras.append({
                'id_compra': f['id_compra'],
                'hora': f['fecha'].strftime('%H:%M') if f['fecha'] else '',
                'usuario': f['usuario'],
                'proveedor': f['proveedor'],
                'total': total_compra,
            })

        return {
            'fecha': fecha.strftime('%d/%m/%Y'),
            'cantidad_compras': len(compras),
            'total_dia': total_dia,
            'compras': compras,
        }
    finally:
        conexion.close()
