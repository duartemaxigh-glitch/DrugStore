export default function VentasTabs({ setVista, vista }) {
    return (
        <div className="ventas-tabs">
            <button
                onClick={() => setVista('nueva')}
                className={`ventas-tab-btn ${
                    vista === 'nueva' ? 'ventas-tab-btn--active' : 'ventas-tab-btn--inactive'
                }`}
            >
                🛒 Nueva Venta
            </button>

            <button
                onClick={() => setVista('historial')}
                className={`ventas-tab-btn ${
                    vista === 'historial' ? 'ventas-tab-btn--active' : 'ventas-tab-btn--inactive'
                }`}
            >
                📋 Historial
            </button>
        </div>
    );
}