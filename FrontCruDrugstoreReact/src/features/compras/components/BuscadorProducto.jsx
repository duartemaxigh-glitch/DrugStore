import { CubeIcon, MagnifyingGlassIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function BuscadorProducto({ setModalProducto, terminoBusqueda, setTerminoBusqueda, setProductoEncontrado, setResultadosBusqueda, productos, resultadosBusqueda, seleccionarProducto, productoEncontrado, limpiarBusqueda, cantidadAgregar, setCantidadAgregar, precioAgregar, setPrecioAgregar, agregarAlCarrito }) {
    return (
        <div className="compras-card">
            <div className="compras-buscador-header">
                <h2 className="compras-buscador-title">
                    Agregar Producto
                </h2>

                <button
                    onClick={() => setModalProducto(true)}
                    className="compras-link-btn"
                >
                    <CubeIcon className="icon-md" />
                    + Nuevo Producto
                </button>
            </div>

            <div className="compras-buscador-wrapper">
                <div className="compras-buscador-input-container">
                    <MagnifyingGlassIcon className="compras-buscador-icon icon-md" />

                    <input
                        type="text"
                        value={terminoBusqueda}
                        onChange={(e) => {
                            const val = e.target.value;
                            setTerminoBusqueda(val);
                            setProductoEncontrado(null);

                            if (!val.trim()) {
                                setResultadosBusqueda([]);
                                return;
                            }

                            const term = val.toLowerCase();

                            setResultadosBusqueda(
                                productos
                                    .filter(
                                        (p) =>
                                            p.nombre.toLowerCase().includes(term) ||
                                            (p.codigo_barras &&
                                                p.codigo_barras.includes(term))
                                    )
                                    .slice(0, 8)
                            );
                        }}
                        onKeyDown={(e) => {
                            if (
                                e.key === 'Enter' &&
                                resultadosBusqueda.length === 1
                            ) {
                                seleccionarProducto(resultadosBusqueda[0]);
                            }
                        }}
                        placeholder="Buscar por nombre o código de barras..."
                        className="compras-buscador-input"
                    />
                </div>

                {resultadosBusqueda.length > 0 && (
                    <div className="compras-buscador-dropdown">
                        {resultadosBusqueda.map((p) => (
                            <button
                                key={p.id_producto}
                                onClick={() => seleccionarProducto(p)}
                                className="compras-buscador-item"
                            >
                                <span className="compras-buscador-item-nombre">
                                    {p.nombre}
                                </span>

                                <span className="compras-buscador-item-codigo">
                                    {p.codigo_barras
                                        ? `📦 ${p.codigo_barras}`
                                        : 'Sin cód.'}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {productoEncontrado && (
                <div className="compras-producto-seleccionado">
                    <div className="compras-producto-header">
                        <div>
                            <p className="compras-producto-nombre">
                                {productoEncontrado.nombre}
                            </p>

                            {productoEncontrado.codigo_barras && (
                                <p className="compras-producto-codigo">
                                    📦 {productoEncontrado.codigo_barras}
                                </p>
                            )}

                            <p className="compras-producto-precio">
                                Precio compra registrado:{' '}
                                <span>
                                    ${productoEncontrado.precio_compra.toFixed(2)}
                                </span>
                            </p>
                        </div>

                        <button
                            onClick={limpiarBusqueda}
                            className="compras-producto-cerrar"
                        >
                            <XMarkIcon className="icon-md" />
                        </button>
                    </div>

                    <div className="compras-producto-form">
                        <div>
                            <label className="compras-producto-form-label">
                                Cantidad
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={cantidadAgregar}
                                onChange={(e) =>
                                    setCantidadAgregar(Number(e.target.value))
                                }
                                className="compras-producto-form-input"
                            />
                        </div>

                        <div>
                            <label className="compras-producto-form-label">
                                Precio unitario
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={precioAgregar}
                                onChange={(e) =>
                                    setPrecioAgregar(e.target.value)
                                }
                                className="compras-producto-form-input"
                            />
                        </div>

                        <div className="compras-producto-accion">
                            <button
                                onClick={agregarAlCarrito}
                                className="compras-producto-agregar"
                            >
                                <PlusIcon className="icon-md" />
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}