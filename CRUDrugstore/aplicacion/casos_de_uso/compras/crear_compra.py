# ============================================================
# Caso de Uso: Crear Compra
# ============================================================
# Una compra se registra con todos sus detalles de una vez.
# Al comprar, se SUMA stock a cada producto (lo opuesto a venta).
# ============================================================

from dominio.entidades.compra import Compra, CompraDetalle
from dominio.excepciones import EntidadNoEncontrada
from dominio.repositorios.repositorio_compra import RepositorioCompra
from dominio.repositorios.repositorio_producto import RepositorioProducto


class CrearCompra:
    def __init__(
        self,
        repositorio_compra: RepositorioCompra,
        repositorio_producto: RepositorioProducto,
    ):
        self.repositorio_compra = repositorio_compra
        self.repositorio_producto = repositorio_producto

    def ejecutar(
        self,
        id_proveedor: int,
        id_usuario: int,
        detalles: list[dict],
    ) -> Compra:
        lista_detalles = []
        total = 0.0

        for item in detalles:
            # Verificamos que el producto exista
            producto = self.repositorio_producto.obtener_por_id(item['id_producto'])
            if producto is None:
                raise EntidadNoEncontrada(
                    f"No se encontró el producto con id {item['id_producto']}."
                )

            subtotal = round(item['precio_unitario'] * item['cantidad'], 2)
            detalle = CompraDetalle(
                id_producto=item['id_producto'],
                cantidad=item['cantidad'],
                precio_unitario=item['precio_unitario'],
                subtotal=subtotal,
            )
            detalle.validar()
            lista_detalles.append(detalle)
            total += subtotal

            # Sumamos el stock (compramos mercadería)
            producto.stock += item['cantidad']
            self.repositorio_producto.actualizar(producto)

        compra = Compra(
            id_proveedor=id_proveedor,
            id_usuario=id_usuario,
            total=round(total, 2),
            detalles=lista_detalles,
        )
        compra.validar()
        return self.repositorio_compra.crear(compra)
