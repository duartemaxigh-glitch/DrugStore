import Modal from "@/components/ui/Modal/ModalCrud";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export default function ModalProveedor({ modalProveedor, crearProveedor, guardandoProveedor, nuevoProveedor, setNuevoProveedor, setModalProveedor }) {
    return (
        <>
            {modalProveedor && (
                <Modal
                    titulo="Nuevo Proveedor"
                    onCerrar={() => setModalProveedor(false)}
                >
                    <div className="modal-proveedor">
                        <div className="modal-campo">
                            <label className="modal-label">
                                Razón Social *
                            </label>

                            <input
                                type="text"
                                value={nuevoProveedor.razon_social}
                                onChange={(e) =>
                                    setNuevoProveedor({
                                        ...nuevoProveedor,
                                        razon_social: e.target.value,
                                    })
                                }
                                placeholder="Ej: Distribuidora Norte Bebidas S.A."
                                className="modal-input"
                            />
                        </div>

                        <div className="modal-grid-2">
                            <div className="modal-campo">
                                <label className="modal-label">
                                    CUIT/CUIL
                                </label>

                                <input
                                    type="text"
                                    value={nuevoProveedor.cuit_cuil}
                                    onChange={(e) =>
                                        setNuevoProveedor({
                                            ...nuevoProveedor,
                                            cuit_cuil: e.target.value,
                                        })
                                    }
                                    placeholder="Opcional"
                                    className="modal-input"
                                />
                            </div>

                            <div className="modal-campo">
                                <label className="modal-label">
                                    Contacto
                                </label>

                                <input
                                    type="text"
                                    value={nuevoProveedor.contacto_nombre}
                                    onChange={(e) =>
                                        setNuevoProveedor({
                                            ...nuevoProveedor,
                                            contacto_nombre: e.target.value,
                                        })
                                    }
                                    placeholder="Nombre del contacto comercial"
                                    className="modal-input"
                                />
                            </div>
                        </div>

                        <div className="modal-grid-2">
                            <div className="modal-campo">
                                <label className="modal-label">
                                    Teléfono
                                </label>

                                <input
                                    type="text"
                                    value={nuevoProveedor.telefono}
                                    onChange={(e) =>
                                        setNuevoProveedor({
                                            ...nuevoProveedor,
                                            telefono: e.target.value,
                                        })
                                    }
                                    placeholder="Opcional"
                                    className="modal-input"
                                />
                            </div>

                            <div className="modal-campo">
                                <label className="modal-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={nuevoProveedor.email}
                                    onChange={(e) =>
                                        setNuevoProveedor({
                                            ...nuevoProveedor,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="Opcional"
                                    className="modal-input"
                                />
                            </div>
                        </div>

                        <div className="modal-acciones">
                            <button
                                onClick={() => setModalProveedor(false)}
                                className="btn btn-secondary"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={crearProveedor}
                                disabled={guardandoProveedor}
                                className="btn btn-primary"
                            >
                                <BuildingStorefrontIcon className="icon-md" />

                                {guardandoProveedor
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