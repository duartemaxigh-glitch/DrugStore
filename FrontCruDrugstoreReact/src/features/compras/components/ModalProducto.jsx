import Modal from "@/components/ui/Modal/ModalCrud";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ModalProducto({ modalProducto, setModalProducto, setNuevoProducto, nuevoProducto, categorias, crearProducto, guardandoProducto }) {
    return (
        <>
            {modalProducto && (
                <Modal
                    titulo="Nuevo Producto"
                    onCerrar={() => setModalProducto(false)}
                >
                    <div className="modal-producto">

                        <div className="modal-producto__campo">
                            <label className="modal-producto__label">
                                Nombre *
                            </label>

                            <input
                                type="text"
                                value={nuevoProducto.nombre}
                                onChange={(e) =>
                                    setNuevoProducto({
                                        ...nuevoProducto,
                                        nombre: e.target.value,
                                    })
                                }
                                placeholder="Ej: Coca-Cola 500ml"
                                className="modal-input"
                            />
                        </div>

                        <div className="modal-producto__grid">
                            <div className="modal-producto__campo">
                                <label className="modal-producto__label">
                                    Precio de Venta *
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={nuevoProducto.precio_venta}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoProducto,
                                            precio_venta: e.target.value,
                                        })
                                    }
                                    placeholder="0.00"
                                    className="modal-input"
                                />
                            </div>

                            <div className="modal-producto__campo">
                                <label className="modal-producto__label">
                                    Precio de Compra *
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={nuevoProducto.precio_compra}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoProducto,
                                            precio_compra: e.target.value,
                                        })
                                    }
                                    placeholder="0.00"
                                    className="modal-input"
                                />
                            </div>
                        </div>

                        <div className="modal-producto__campo">
                            <label className="modal-producto__label">
                                Código de Barras
                            </label>

                            <input
                                type="text"
                                value={nuevoProducto.codigo_barras}
                                onChange={(e) =>
                                    setNuevoProducto({
                                        ...nuevoProducto,
                                        codigo_barras: e.target.value,
                                    })
                                }
                                placeholder="Opcional"
                                className="modal-input"
                            />
                        </div>

                        <div className="modal-producto__campo">
                            <label className="modal-producto__label">
                                Categoría
                            </label>

                            <select
                                value={nuevoProducto.id_categoria}
                                onChange={(e) =>
                                    setNuevoProducto({
                                        ...nuevoProducto,
                                        id_categoria: e.target.value,
                                    })
                                }
                                className="modal-input"
                            >
                                <option value="">Sin categoría</option>

                                {categorias.map((cat) => (
                                    <option
                                        key={cat.id_categoria}
                                        value={cat.id_categoria}
                                    >
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-producto__acciones">
                            <button
                                onClick={() => setModalProducto(false)}
                                className="btn btn-secondary"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={crearProducto}
                                disabled={guardandoProducto}
                                className="btn btn-primary"
                            >
                                <PlusIcon className="icon-md" />

                                {guardandoProducto
                                    ? 'Guardando...'
                                    : 'Crear y Seleccionar'}
                            </button>
                        </div>

                    </div>
                </Modal>
            )}
        </>
    )
}