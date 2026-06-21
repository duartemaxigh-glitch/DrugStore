import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export default function SelectorProveedor({
    setModalProveedor,
    proveedorId,
    setProveedorId,
    proveedores
}) {
    return (
        <div className="compras-card">
            <div className="compras-proveedor-header">
                <label className="compras-proveedor-label">
                    Proveedor *
                </label>

                <button
                    onClick={() => setModalProveedor(true)}
                    className="compras-link-btn"
                >
                    <BuildingStorefrontIcon className="icon-md" />
                    + Nuevo Proveedor
                </button>
            </div>

            <select
                value={proveedorId}
                onChange={(e) => setProveedorId(e.target.value)}
                className="compras-proveedor-select"
            >
                <option value="">Seleccionar proveedor...</option>

                {proveedores.map((p) => (
                    <option
                        key={p.id_proveedor}
                        value={p.id_proveedor}
                    >
                        {p.razon_social}
                    </option>
                ))}
            </select>
        </div>
    );
}