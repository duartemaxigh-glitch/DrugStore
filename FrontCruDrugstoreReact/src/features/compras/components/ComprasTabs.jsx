export default function ComprasTabs({ vista, setVista }) {
    return (
        <div className="compras-tabs">
            <button
                onClick={() => setVista('nueva')}
                className={`compras-tab-btn ${
                            vista === 'nueva'
                                ? 'compras-tab-btn--active'
                                : 'compras-tab-btn--inactive'
                }`}
            >
                📦 Nueva Compra
            </button>
            <button
                onClick={() => setVista('historial')}
                className={`compras-tab-btn ${
                            vista === 'historial'
                                ? 'compras-tab-btn--active'
                                : 'compras-tab-btn--inactive'
                }`}
            >
                📋 Historial
            </button>
        </div>
    )
}