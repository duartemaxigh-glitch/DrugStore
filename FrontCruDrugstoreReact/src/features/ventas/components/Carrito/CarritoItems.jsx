import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CarritoItems({
    carrito,
    cambiarCantidad,
    quitarDelCarrito
}) {
    return (
        <div className="carrito-items">
            {carrito.map((item) => (
                <div
                    key={item.id_producto}
                    className="carrito-item"
                >
                    <div className="carrito-item__info">
                        <p className="carrito-item__nombre">
                            {item.nombre}
                        </p>

                        <p className="carrito-item__precio">
                            ${item.precio.toFixed(2)} c/u
                        </p>
                    </div>

                    <div className="carrito-item__cantidad">
                        <button
                            onClick={() => cambiarCantidad(item.id_producto, -1)}
                            className="carrito-item__btn-cantidad"
                        >
                            <MinusIcon className="carrito-item__icono-small icon-md" />
                        </button>

                        <span className="carrito-item__cantidad-valor">
                            {item.cantidad}
                        </span>

                        <button
                            onClick={() => cambiarCantidad(item.id_producto, 1)}
                            className="carrito-item__btn-cantidad"
                        >
                            <PlusIcon className="carrito-item__icono-small icon-md" />
                        </button>
                    </div>

                    <p className="carrito-item__subtotal">
                        ${(item.cantidad * item.precio).toFixed(2)}
                    </p>

                    <button
                        onClick={() => quitarDelCarrito(item.id_producto)}
                        className="carrito-item__btn-eliminar"
                    >
                        <TrashIcon className="carrito-item__icono icon-md" />
                    </button>
                </div>
            ))}
        </div>
    );
}