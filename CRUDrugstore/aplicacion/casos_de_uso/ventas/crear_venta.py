# ============================================================
# Caso de Uso: Crear Venta
# ============================================================
# Una venta se crea con todos sus detalles de una sola vez.
# Además, al vender se DESCUENTA el stock de cada producto.
# ============================================================

from dominio.entidades.venta import Venta, VentaDetalle
from dominio.excepciones import EntidadNoEncontrada, ErrorDeValidacion
from dominio.repositorios.repositorio_venta import RepositorioVenta
from dominio.repositorios.repositorio_producto import RepositorioProducto


class CrearVenta:
    def __init__(
        self,
        repositorio_venta: RepositorioVenta,
        repositorio_producto: RepositorioProducto,
    ):
        self.repositorio_venta = repositorio_venta
        self.repositorio_producto = repositorio_producto

    def ejecutar(
        self,
        id_usuario: int,
        id_medio_pago: int,
        detalles: list[dict],
        id_cliente: int = None,
    ) -> Venta:
        lista_detalles = []
        total = 0.0

        for item in detalles:
            # Verificamos que el producto exista
            producto = self.repositorio_producto.obtener_por_id(item['id_producto'])
            if producto is None:
                raise EntidadNoEncontrada(
                    f"No se encontró el producto con id {item['id_producto']}."
                )

            # Verificamos que haya stock suficiente
            if producto.stock < item['cantidad']:
                raise ErrorDeValidacion(
                    f"Stock insuficiente para '{producto.nombre}'. "
                    f"Disponible: {producto.stock}, solicitado: {item['cantidad']}."
                )

            subtotal = round(producto.precio_venta * item['cantidad'], 2)
            detalle = VentaDetalle(
                id_producto=item['id_producto'],
                cantidad=item['cantidad'],
                precio_unitario=producto.precio_venta,
                subtotal=subtotal,
            )
            detalle.validar()
            lista_detalles.append(detalle)
            total += subtotal

            # Descontamos el stock
            producto.stock -= item['cantidad']
            self.repositorio_producto.actualizar(producto)

        venta = Venta(
            id_usuario=id_usuario,
            id_cliente=id_cliente,
            id_medio_pago=id_medio_pago,
            total=round(total, 2),
            detalles=lista_detalles,
        )
        venta.validar()
        return self.repositorio_venta.crear(venta)
