import ProductoCard from "./ProductoCard";

export default function ListaProducto({
    productosFiltrados,
    agregarAlCarrito
}) {
    return (
        <div className="lista-productos">
            <div className="lista-productos__grid">
                {productosFiltrados.map((p) => (
                    <ProductoCard
                        key={p.id_producto}
                        producto={p}
                        agregarAlCarrito={agregarAlCarrito}
                    />
                ))}

                {productosFiltrados.length === 0 && (
                    <p className="lista-productos__vacio">
                        No se encontraron productos
                    </p>
                )}
            </div>
        </div>
    );
}