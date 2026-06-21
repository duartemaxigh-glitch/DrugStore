export default function ProductoCard({ producto, agregarAlCarrito }) {
    return (
        <button
            key={producto.id_producto}
            onClick={() => agregarAlCarrito(producto)}
            disabled={producto.stock <= 0}
            className={`producto-card ${producto.stock <= 0 ? 'producto-card--sin-stock' : ''}`}
        >
            <p className="producto-card__nombre">
                {producto.nombre}
            </p>
            <p className="producto-card__precio">
                ${producto.precio_venta.toFixed(2)}
            </p>
            <p className={`producto-card__stock ${producto.stock <= 5 ? 'producto-card__stock--bajo' : ''}`}>
                Stock: {producto.stock}
            </p>
        </button>
    )
}